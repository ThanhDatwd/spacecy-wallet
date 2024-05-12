/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectNftItem } from 'redux/slices/nftItemByItemIdSlice';
import { selectAddress, setChainId, selectChainId } from 'redux/slices/web3InfoSlice';
// mui
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { ContractAddress, DetailTitle, TabWrapper } from './styled';
// constants
import { NETWORKINFO } from '../../../../../constants';
import { ETHERSCAN } from 'constants/etherscan.constant';
// componentss
import CopyToClipboardButton from 'components/CustomUI/CopyToClipboardButton';
// utils
import { sliceAddress, sliceString, tokenErcFunction } from 'utils';
import {
	// mainnetAvalanche,
	mainnetBinance,
	mainnetEthereum,
	// mainnetPolygon,
} from 'constants/rpcUrl.constant';
import Web3 from 'web3';
declare let window: any;
const { checkTokenContractStandard, getBlanceOfToken1155 } = tokenErcFunction();

export interface IDetailTabProps {}

export default function DetailTab(props: IDetailTabProps) {
	const theme = useTheme();
	const dispatch = useDispatch();
	// useState
	const [ownedQuantity, setOwnedQuantity] = useState<number>(0);

	// useSelector
	const item = useSelector(selectNftItem);
	const userAddress = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);
	//function
	const changeNetwork = async (mainnet: any, newChainId: number) => {
		if (typeof window.ethereum !== 'undefined') {
			try {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: Web3.utils.toHex(newChainId) }],
				});
				dispatch(setChainId(newChainId));
				toast.success('Switch network successfully');
			} catch (switchError: any) {
				if (switchError !== 4001) {
					try {
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: mainnet,
						});
						dispatch(setChainId(newChainId));
						toast.success('Switch network successfully');
					} catch (error) {
						toast.error('Switch network failed!');
					}
				}
			}
		}
	};
	const followNetworkOfItem = (itemChainId: number, currentChainId: number) => {
		if (itemChainId === currentChainId) {
		} else {
			if (itemChainId === 56) {
				// console.log('bnb');
				changeNetwork(mainnetBinance, itemChainId);
			} else if (itemChainId === 1) {
				// console.log('ether');
				changeNetwork(mainnetEthereum, itemChainId);
			} else if (itemChainId === 97) {
				// console.log('bnbtestnet');
				changeNetwork(mainnetBinance, itemChainId); //testnet chain use in development process
			} else if (itemChainId === 4) {
				// console.log('ethertestnet');
				changeNetwork(mainnetEthereum, itemChainId); //testnet chain use in development process
			} else if (itemChainId === 5) {
				// console.log('ethertestnet');
				changeNetwork(mainnetEthereum, itemChainId); //testnet chain use in development process
			}
		}
	};
	// useEffect
	//switch network to item's network
	// check standard and quantity
	useEffect(() => {
		(async () => {
			if (!item || !item.collectionInfo || !userAddress) {
				return;
			}

			try {
				// check standard
				const standard: 'ERC1155' | 'ERC721' = await checkTokenContractStandard(
					item.collectionInfo.collectionAddress
				);

				if (standard.includes('1155')) {
					const ownedQuantity: number = await getBlanceOfToken1155(
						userAddress,
						item.collectionInfo.collectionAddress,
						item.itemTokenId
					);

					setOwnedQuantity(ownedQuantity);
				} else {
					if (item.owner.includes(userAddress)) {
						setOwnedQuantity(1);
					}
				}
			} catch (error) {
				followNetworkOfItem(item?.chainId, chainId);
				console.log(error);
				return;
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userAddress, item]);

	return (
		<TabWrapper>
			<Stack direction="row" spacing={2}>
				{/* Title */}
				<DetailTitle spacing={1}>
					<Typography variant="body1">Contract Address:</Typography>
					<Typography variant="body1">Token ID:</Typography>
					<Typography variant="body1">Token Standard:</Typography>
					<Typography variant="body1">Blockchain:</Typography>
					<Typography variant="body1">Owned Quantity:</Typography>
				</DetailTitle>

				{/* Value */}
				<Stack spacing={1} sx={{ minWidth: 0 }}>
					<ContractAddress
						variant="body1"
						href={`${ETHERSCAN[item?.chainId ?? 4].url}address/${
							item?.collectionInfo?.collectionAddress
						}`}
						target="_blank"
						noWrap
					>
						{item?.collectionInfo?.collectionAddress}
					</ContractAddress>
					<Stack direction="row" spacing={1}>
						<Typography
							variant="body1"
							sx={{
								[theme.breakpoints.down(430)]: {
									width: 'calc(100% - 28px)',
									overflow: 'hidden',
									// display: '-webkit-box',
									// WebkitBoxOrient: 'vertical',
									// WebkitLineClamp: '1',
								},
							}}
						>
							{sliceString(item?.itemTokenId ?? '', 15)}
						</Typography>
						<CopyToClipboardButton text={item?.itemTokenId} placementTooltip="top" />
					</Stack>
					<Typography variant="body1">{item?.itemStandard}</Typography>
					<Typography variant="body1">{NETWORKINFO[item?.chainId ?? 4].name}</Typography>
					<Typography variant="body1">{ownedQuantity}</Typography>
				</Stack>
			</Stack>
		</TabWrapper>
	);
}
