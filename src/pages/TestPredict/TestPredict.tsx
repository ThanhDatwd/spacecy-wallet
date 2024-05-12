/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import MatchCard from './MatchCard';
//web3
import { getWeb3Contract } from 'hooks';
import PredictContract from 'abis/PredictContract.json';
import SportCardContract from 'abis/SportCardContract.json';
import { CONTRACT } from '../../constants';
//redux
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import { Typography } from '@mui/material';
const TestPredict: React.FC = () => {
	const [arrayMatches, setArrayMatches] = useState<any>([]);
	const [pastMatches, setPastMatches] = useState<any>([]);
	const [comingMatches, setComingMatches] = useState<any>([]);
	const [currentMatches, setCurrentMatches] = useState<any>([]);
	const [userBetMatches, setUserBetMatches] = useState<any>([]);
	const [userMatchesPosition, setUserMatchesPosition] = useState<any>([]);
	const [isAdmin, setIsAdmin] = useState<any>();
	const currentChainId = useSelector(selectChainId);
	const userAddress = useSelector(selectAddress);
	const finaliseRef = useRef<any>();
	const createMatchRef = useRef<any>();
	const createMatchTimeRef = useRef<any>();
	const [createMatchValue, setCreateMatchValue] = useState<any>();
	const [finaliseValue, setFinaliseValue] = useState<any>();
	// console.log(currentChainId);
	let epoch = useRef(0);
	const contractPredict = getWeb3Contract(
		PredictContract.abi,
		CONTRACT[currentChainId].PredictMatches
	);
	//function admin
	const checkIsAdmin = async () => {
		await contractPredict.methods
			.admin()
			.call()
			.then((res: any) => {
				if (userAddress === res.toLowerCase()) {
					setIsAdmin(true);
				} else {
					setIsAdmin(false);
				}
			})
			.catch((error: any) => {
				console.log(error);
			});
	};
	const createMatch = async (e: any) => {
		e.preventDefault();
		await contractPredict.methods.createMatch();
	};
	//function bet
	const fectchMatches = async () => {
		await contractPredict.methods
			.currentEpoch()
			.call()
			.then(async (res: any) => {
				// console.log(res);
				epoch.current = parseInt(res);
			})
			.catch((error: any) => {
				console.log(error);
			});
		for (let i = 1; i <= epoch.current; i++) {
			await contractPredict.methods
				.matchInfo(i)
				.call()
				.then((res: any) => {
					const today = new Date().getTime();
					setArrayMatches((prev: any) => [...prev, res]);
					if (res.start * 1000 + 5400000 < today) {
						setPastMatches((prev: any) => [...prev, res]);
					} else if (res.start * 1000 > today) {
						setComingMatches((prev: any) => [...prev, res]);
					} else {
						setCurrentMatches((prev: any) => [...prev, res]);
					}
				})
				.catch((error: any) => {
					console.log(error);
				});
		}
	};

	const getUserBetMatches = async () => {
		// console.log(epoch.current);
		if (epoch.current) {
			for (let i = 1; i <= epoch.current; i++) {
				await contractPredict.methods
					.ledger(i, userAddress)
					.call()
					.then((res: any) => {
						let a = parseInt(res.cardId);
						// console.log(a);
						if (a !== 0) {
							// console.log(typeof res.cardId);
							// console.log(arrayMatches);
							let b = arrayMatches.filter((match: any) => {
								// console.log(parseInt(match.epoch) === i);
								return parseInt(match.epoch) === i;
							});
							// console.log(b);
							setUserBetMatches((prev: any) => [...prev, b[0]]);
						}
					})
					.catch((error: any) => {
						console.log(error);
					});
			}
		}
	};
	const getUserPosition = async () => {
		await contractPredict.methods
			.userInfo(userAddress)
			.call()
			.then((res: any) => {
				// console.log(res);

				const map = new Map();
				for (let i = 0; i < res.matchesJoined.length; i++) {
					map.set(res.matchesJoined[i], res.predictInfo[i]);
				}
				setUserMatchesPosition(map);
				// console.log(map);
				// const test = map.keys();
				// console.log(test.next().value);
				// console.log(test.next().value);
			});
	};
	useEffect(() => {
		checkIsAdmin();
		getUserPosition();
		fectchMatches();
	}, []);

	useEffect(() => {
		// console.log(arrayMatches);
		// console.log(currentMatches);
		// console.log(pastMatches);
		// console.log(comingMatches);
		if (epoch.current === arrayMatches.length) {
			getUserBetMatches();
		}
	}, [currentMatches, comingMatches, pastMatches]);
	return (
		<div style={{ padding: '100px 50px' }}>
			{isAdmin && (
				<div>
					<h1>Admin</h1>
					<div>
						<h1>create match</h1>
						<form onSubmit={createMatch}>
							<input
								type="text"
								ref={createMatchRef}
								// onChange={(e) => {
								// 	setCreateMatchValue(e.target.value);
								// 	console.log(createMatchRef.current.value);
								// }}
							/>
							<input
								type="text"
								ref={createMatchTimeRef}
								// onChange={(e) => {
								// 	setCreateMatchValue(e.target.value);
								// 	console.log(createMatchRef.current.value);
								// }}
							/>
							<ButtonWhite type="submit">submit match</ButtonWhite>
						</form>
					</div>
					<div>
						<h1>finalise match</h1>
						<form>
							<input type="text" ref={finaliseRef} />
							<ButtonWhite>finalise match</ButtonWhite>
						</form>
					</div>
				</div>
			)}

			<div style={{ border: '2px solid pink', marginBottom: '100px' }}>
				<h1>Tran Sap Den</h1>
				{comingMatches.map((match: any, idx: any) => {
					// console.log(match);
					return (
						<MatchCard
							match={match}
							key={idx}
							userMatchesPosition={userMatchesPosition}
						/>
					);
				})}
			</div>
			<div style={{ border: '2px solid purple', marginBottom: '100px' }}>
				<h1>Tran Da Qua</h1>
				{pastMatches.map((match: any, idx: any) => {
					return (
						<MatchCard
							match={match}
							key={idx}
							userMatchesPosition={userMatchesPosition}
						/>
					);
				})}
			</div>
			<div style={{ border: '2px solid red', marginBottom: '100px' }}>
				<h1>Tran Dang Da</h1>
				{currentMatches.map((match: any, idx: any) => {
					return (
						<MatchCard
							match={match}
							key={idx}
							userMatchesPosition={userMatchesPosition}
						/>
					);
				})}
			</div>
			<div style={{ border: '2px solid blue', marginBottom: '100px' }}>
				<h1>Tran Da Bet</h1>
				{userBetMatches &&
					userBetMatches.map((match: any, idx: any) => {
						// console.log(match);
						return (
							<MatchCard
								match={match}
								userMatchesPosition={userMatchesPosition}
								key={idx}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default TestPredict;
