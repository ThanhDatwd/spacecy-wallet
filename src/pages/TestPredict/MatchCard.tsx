/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
//web3
import { getWeb3Contract } from 'hooks';
import PredictContract from 'abis/PredictContract.json';
import SportCardContract from 'abis/SportCardContract.json';
import { CONTRACT } from '../../constants';
//redux
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
import CountDown from 'components/CustomUI/Card/NFTItemCardInAuction/CountDown';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import { Typography } from '@mui/material';
interface Props {
	match: any;
	userMatchesPosition: any;
}

const MatchCard: React.FC<Props> = ({ match, userMatchesPosition }) => {
	const [btn, setBtn] = useState(false);
	const [btn1, setBtn1] = useState(false);
	const currentChainId = useSelector(selectChainId);
	const userAddress = useSelector(selectAddress);
	const today = new Date().getTime();
	let teams = match.name.split('-');
	teams.push('drawn');
	//contract
	const contractPredict = getWeb3Contract(
		PredictContract.abi,
		CONTRACT[currentChainId].PredictMatches
	);
	const contractSportCard = getWeb3Contract(
		SportCardContract.abi,
		CONTRACT[currentChainId].SportCard
	);
	//function
	let isClaimable;
	const checkIsClaimable = async (epoch: any, address: any) => {
		isClaimable = await contractPredict.methods
			.claimable(epoch, address)
			.call()
			.then((res: any) => {
				// console.log(res);
				return res;
			})
			.catch((error: any) => {
				console.log(error);
			});
	};
	const checkIsApprovedForAll = async () => {
		let check = await contractSportCard.methods
			.isApprovedForAll(userAddress, CONTRACT[currentChainId].PredictMatches)
			.call()
			.then((res: any) => {
				return res;
			})
			.catch((error: any) => {
				console.log(error);
			});
		return check;
	};
	const pickTeam = async (e: any, epoch: any) => {
		let position = e.currentTarget.dataset.team;
		//how to find tokenid of card
		if (!(await checkIsApprovedForAll())) {
			await contractSportCard.methods
				.setApprovalForAll(CONTRACT[currentChainId].PredictMatches, true)
				.send({ from: userAddress })
				.catch((error: any) => {
					console.log(error);
				});
		}
		await contractPredict.methods
			.predict(epoch, position, 3)
			.send({ from: userAddress })
			.catch((error: any) => {
				console.log(error);
			});
	};
	const renderBtnBet = () => {
		// console.log(userMatchesPosition);
		let betMatchEpoch;
		const keyIterate = userMatchesPosition.keys();
		for (let i = 0; i < userMatchesPosition.size; i++) {
			if (keyIterate.next().value === match.epoch) {
				betMatchEpoch = match.epoch;
			}
		}
		// console.log(betMatchEpoch);
		if (betMatchEpoch === undefined) {
			// console.log('1');
			return (
				<>
					<div
						style={{ border: '2px solid red', padding: '10px 5px' }}
						onClick={(e) => pickTeam(e, match.epoch)}
						data-team="0"
					>
						{teams[0]}
					</div>
					<div
						style={{ border: '2px solid blue', padding: '10px 5px' }}
						onClick={(e) => pickTeam(e, match.epoch)}
						data-team="1"
					>
						{teams[1]}
					</div>
					<div
						style={{ border: '2px solid blue', padding: '10px 5px' }}
						onClick={(e) => pickTeam(e, match.epoch)}
						data-team="2"
					>
						draw
					</div>
				</>
			);
		} else {
			let position = userMatchesPosition.get(betMatchEpoch);
			return (
				<>
					<div style={{ border: '2px solid red', padding: '10px 5px' }}>
						you have picked {teams[position[0]]}
					</div>
				</>
			);
		}
	};
	useEffect(() => {
		// renderBtnBet();
		checkIsClaimable(match.epoch, userAddress);
	}, []);
	return (
		<>
			<div>
				<div style={{ display: 'flex', border: '2px solid red' }}>
					<div style={{ margin: ' 0px 20px 0px 0px' }}>
						<h1>team A</h1>
						<p>{teams[0]}</p>
					</div>
					<div>
						<h1>team B</h1>
						<p>{teams[1]}</p>
					</div>
				</div>
				<p>{match.epoch}</p>
				<div>waiting for pool</div>
				{match.start * 1000 > today ? (
					<>
						<div>
							<p>count down still match start</p>
							<CountDown
								timeEnd={match.start * 1000}
								timeStart={today}
								className="CountDownBar"
								executeZero={() => {
									setBtn(true);
								}}
								executeOne={() => {
									setBtn1(true);
								}}
							/>
						</div>
						<div>
							<div>
								<h1>choose winning team</h1>
								<div>{renderBtnBet()}</div>
							</div>
						</div>
					</>
				) : match.start * 1000 + 5400000 < today ? (
					<>
						<div>
							<div>
								<ButtonWhite disabled={isClaimable ? false : true}>
									<Typography>Claimable</Typography>
								</ButtonWhite>
							</div>
						</div>
					</>
				) : (
					<div>
						<div>
							<h1>choose winning team</h1>
							{/* <div
								style={{ border: '2px solid red', padding: '10px 5px' }}
								onClick={(e) => pickTeam(e, match.epoch)}
								data-team="0"
							>
								team-1
							</div>
							<div
								style={{ border: '2px solid blue', padding: '10px 5px' }}
								onClick={(e) => pickTeam(e, match.epoch)}
								data-team="1"
							>
								team-2
							</div>
							<div
								style={{ border: '2px solid blue', padding: '10px 5px' }}
								onClick={(e) => pickTeam(e, match.epoch)}
								data-team="2"
							>
								draw
							</div> */}
							<div>{renderBtnBet()}</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default MatchCard;
