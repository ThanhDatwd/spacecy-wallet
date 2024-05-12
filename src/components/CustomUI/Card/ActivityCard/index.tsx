/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
// mui
import { Box, Stack, Typography, useTheme } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
// model
import { HistoryActivity, HistoryIdsByTxHash, Response } from 'models';
// styled
import { ItemMedia, StyledSpan } from './styled';
// utils
import {
	compressImage,
	formatAddressHistory,
	formatNumber,
	formatTimeHistory,
	getFileType,
} from 'utils';
// constants
import { ETHERSCAN } from 'constants/etherscan.constant';
import { TYPE_TRANSACTION } from '../../../../constants';
// redux
import { useSelector } from 'react-redux';
import { selectAddress } from 'redux/slices/web3InfoSlice';
// api
import historyApi from 'apis/historyApi';
// hooks
import { useIsMounted } from 'hooks';
// components
import SkeletonActivityCard from 'components/CustomUI/Skeleton/Item/SkeletonActivityCard';
import LazyImageCustom from 'components/CustomUI/LazyImages/LazyImageCustom';

import iconBurn from 'assets/icons/iconBurn.svg';
import iconBurnWhite from 'assets/icons/iconBurn-white.svg';
import iconUpgrade from 'assets/icons/iconUpgrade.svg';
import iconUpgradeWhite from 'assets/icons/iconUpgrade-white.svg';
import iconBuyTicket from 'assets/icons/iconBuyTicket.svg';
import iconBuyTicketWhite from 'assets/icons/iconBuyTicket-white.svg';
import iconCancelStaking from 'assets/icons/iconCancelStaking.svg';
import iconCancelStakingWhite from 'assets/icons/iconCancelStaking-white.svg';
import iconHarvestNCA from 'assets/icons/iconHarvestNCA.svg';
import iconHarvestNCAWhite from 'assets/icons/iconHarvestNCA-white.svg';
import iconCreateStaking from 'assets/icons/iconCreateStaking.svg';
import iconCreateStakingWhite from 'assets/icons/iconCreateStaking-white.svg';
import iconBuyBox from 'assets/icons/iconBuyBox.svg';
import iconBuyBoxWhite from 'assets/icons/iconBuyBox-white.svg';
import iconUnpack from 'assets/icons/iconUnpack.svg';
import iconUnpackWhite from 'assets/icons/iconUnpack-white.svg';
import iconExpire from 'assets/icons/iconExpire.svg';
import iconExpireWhite from 'assets/icons/iconExpire-white.svg';
import iconAuctionSettle from 'assets/icons/iconAuctionSettle.svg';
import iconAuctionSettleWhite from 'assets/icons/iconAuctionSettle-white.svg';
import iconAuctionCreate from 'assets/icons/iconAuctionCreate.svg';
import iconAuctionCreateWhite from 'assets/icons/iconAuctionCreate-white.svg';
import iconOrder from 'assets/icons/iconOrder.svg';
import iconOrderWhite from 'assets/icons/iconOrder-white.svg';
import iconCancel from 'assets/icons/iconCancel.svg';
import iconCancelWhite from 'assets/icons/iconCancel-white.svg';
import iconListing from 'assets/icons/iconListing.svg';
import iconListingWhite from 'assets/icons/iconListing-white.svg';
import iconTransfer from 'assets/icons/iconTransfer.svg';
import iconTransferWhite from 'assets/icons/iconTransfer-white.svg';
import iconSale from 'assets/icons/iconSale.svg';
import iconSaleWhite from 'assets/icons/iconSale-white.svg';
import iconAcceptOffer from 'assets/icons/iconAcceptOffer.svg';
import iconAcceptOfferWhite from 'assets/icons/iconAcceptOffer-white.svg';
import iconMint from 'assets/icons/iconMint.svg';
import iconMintWhite from 'assets/icons/iconMint-white.svg';
import { Link } from 'react-router-dom';
import { PATH_PAGE } from 'routes/path';
export const checkTypeEvent = (
	type: number,
	item: HistoryActivity,
	userAddress: string | null | undefined
) => {
	var returnText;

	const getTransactionType = (type: number) => {
		return TYPE_TRANSACTION[type];
	};

	const textOfTransferAndBurnKind = (historyTransfer: HistoryActivity): string => {
		if (historyTransfer.tokenPrice === 0) {
			// transfer / burn NFT
			return `${historyTransfer.quantity} ${historyTransfer.itemInfo.itemName}`;
		} else {
			// transfer / burn token
			return `${formatNumber(
				historyTransfer.tokenPrice,
				0,
				3
			)} ${historyTransfer.priceType.toUpperCase()}`;
		}
	};

	switch (type) {
		case 1: {
			// Mint
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.to}`} style={{ color: 'black' }}>
						<StyledSpan>{formatAddressHistory(item.to, userAddress)}</StyledSpan>{' '}
					</Link>
					{getTransactionType(type)}{' '}
					<StyledSpan>
						{item.quantity} {item.itemInfo.itemName}
					</StyledSpan>
				</Typography>
			);
			break;
		}
		case 2: {
			// Accept Offer
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.to}`} style={{ color: 'black' }}>
						<StyledSpan>{formatAddressHistory(item.to, userAddress)}</StyledSpan>{' '}
					</Link>
					{getTransactionType(type)}{' '}
					<StyledSpan>for perchasing {item.itemInfo.itemName}</StyledSpan> of{' '}
					<StyledSpan>
						<Link to={`${PATH_PAGE.otherUser}/${item.to}`} style={{ color: 'black' }}>
							{formatAddressHistory(item.from, userAddress)}
						</Link>
						with price {item.tokenPrice} {item.priceType.toUpperCase()}
					</StyledSpan>
				</Typography>
			);
			break;
		}
		case 3: {
			// Sales
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.to}`} style={{ color: 'black' }}>
						<StyledSpan>{formatAddressHistory(item.to, userAddress)}</StyledSpan>{' '}
					</Link>
					{getTransactionType(type)} <StyledSpan>{item.itemInfo.itemName}</StyledSpan> to{' '}
					<StyledSpan>
						<Link to={`${PATH_PAGE.otherUser}/${item.to}`} style={{ color: 'black' }}>
							{formatAddressHistory(item.from, userAddress)}
						</Link>
						with price {item.tokenPrice} {item.priceType.toUpperCase()}
					</StyledSpan>
				</Typography>
			);
			break;
		}
		case 4: {
			// Transfer
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
						<StyledSpan>{formatAddressHistory(item.from, userAddress)}</StyledSpan>
					</Link>{' '}
					{getTransactionType(type)}{' '}
					<StyledSpan>{textOfTransferAndBurnKind(item)}</StyledSpan> to
					<Link to={`${PATH_PAGE.otherUser}/${item.to}`} style={{ color: 'black' }}>
						<StyledSpan> {formatAddressHistory(item.to, userAddress)}</StyledSpan>
					</Link>{' '}
				</Typography>
			);
			break;
		}
		case 5: {
			// Cancel
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
						<StyledSpan>{formatAddressHistory(item.from, userAddress)}</StyledSpan>
					</Link>{' '}
					{getTransactionType(type)}{' '}
					<StyledSpan>
						listing {item.quantity} {item.itemInfo.itemName}
					</StyledSpan>
				</Typography>
			);
			break;
		}
		case 6: {
			// List
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
						<StyledSpan>{formatAddressHistory(item.from, userAddress)}</StyledSpan>
					</Link>{' '}
					{getTransactionType(type)}{' '}
					<StyledSpan>
						{item.quantity} {item.itemInfo.itemName} for {item.tokenPrice}{' '}
						{item.priceType.toUpperCase()}
					</StyledSpan>
				</Typography>
			);
			break;
		}
		case 7: {
			// Offer
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
						<StyledSpan>{formatAddressHistory(item.from, userAddress)}</StyledSpan>
					</Link>{' '}
					{getTransactionType(type)}{' '}
					<StyledSpan>
						{item.quantity} {item.itemInfo.itemName} to{' '}
						<Link to={`${PATH_PAGE.otherUser}/${item.to}`} style={{ color: 'black' }}>
							{formatAddressHistory(item.to, userAddress)}
						</Link>
					</StyledSpan>
				</Typography>
			);
			break;
		}
		case 8: {
			// Auction Created
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
						<StyledSpan>{formatAddressHistory(item.from, userAddress)}</StyledSpan>
					</Link>{' '}
					Create Auction{' '}
					<StyledSpan>
						of {item.quantity} {item.itemInfo.itemName}
					</StyledSpan>
				</Typography>
			);
			break;
		}
		case 9: {
			// Auction Settle
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
						<StyledSpan>{formatAddressHistory(item.from, userAddress)}</StyledSpan>
					</Link>{' '}
					Settle Auction{' '}
					<StyledSpan>
						of {item.quantity} {item.itemInfo.itemName}
					</StyledSpan>
				</Typography>
			);
			break;
		}
		case 10: {
			// Expired
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					{getTransactionType(type)}{' '}
					<StyledSpan>
						{item.quantity} {item.itemInfo.itemName} ({item.itemInfo.itemName} ) from{' '}
						<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
							{formatAddressHistory(item.from, userAddress)}
						</Link>
						to{' '}
						<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
							{formatAddressHistory(item.from, userAddress)}
						</Link>
					</StyledSpan>
				</Typography>
			);
			break;
		}
		case 11: {
			// Unbox
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
						<StyledSpan>{formatAddressHistory(item.from, userAddress)}</StyledSpan>
					</Link>{' '}
					{getTransactionType(type)}{' '}
					<StyledSpan>
						{item.quantity} {item.itemInfo.itemName}
					</StyledSpan>
				</Typography>
			);
			break;
		}
		case 12: {
			// Buy Box
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.to}`} style={{ color: 'black' }}>
						<StyledSpan>{formatAddressHistory(item.to, userAddress)}</StyledSpan>{' '}
					</Link>
					{getTransactionType(type)}{' '}
					<StyledSpan>
						{item.quantity} {item.itemInfo.itemName}
					</StyledSpan>
				</Typography>
			);
			break;
		}

		case 13: {
			// Create Staking
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
						<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
							<StyledSpan>{formatAddressHistory(item.from, userAddress)}</StyledSpan>
						</Link>
					</Link>{' '}
					Stake{' '}
					<StyledSpan>
						{item.quantity} {item.itemInfo.itemName}
					</StyledSpan>
				</Typography>
			);
			break;
		}
		case 14: {
			// Harvest NCA
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.to}`} style={{ color: 'black' }}>
						<StyledSpan>{formatAddressHistory(item.to, userAddress)}</StyledSpan>
					</Link>{' '}
					Harvest{' '}
					<StyledSpan>
						reward for staking {item.quantity} {item.itemInfo.itemName}
					</StyledSpan>
				</Typography>
			);
			break;
		}
		case 15: {
			// Cancel Staking
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
						<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
							<StyledSpan>{formatAddressHistory(item.from, userAddress)}</StyledSpan>
						</Link>
					</Link>{' '}
					Cancel Staking{' '}
					<StyledSpan>
						{item.quantity} {item.itemInfo.itemName}
					</StyledSpan>
				</Typography>
			);
			break;
		}
		case 16: {
			// Buy Ticket Card
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
						<Link to={`${PATH_PAGE.otherUser}/${item.from}`} style={{ color: 'black' }}>
							<StyledSpan>{formatAddressHistory(item.from, userAddress)}</StyledSpan>
						</Link>
					</Link>
					Buy{' '}
					<StyledSpan>
						{item.quantity} {item.itemInfo.itemName}
					</StyledSpan>
				</Typography>
			);
			break;
		}
		case 17: {
			// Upgrade
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.to}`} style={{ color: 'black' }}>
						<StyledSpan>{formatAddressHistory(item.to, userAddress)}</StyledSpan>{' '}
					</Link>
					{getTransactionType(type)}{' '}
					<StyledSpan>
						lower level MCAs to {item.quantity} {item.itemInfo.itemName}
					</StyledSpan>{' '}
				</Typography>
			);
			break;
		}
		case 18: {
			// Burn
			returnText = (
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					<Link to={`${PATH_PAGE.otherUser}/${item.to}`} style={{ color: 'black' }}>
						<StyledSpan>{formatAddressHistory(item.to, userAddress)}</StyledSpan>{' '}
					</Link>
					{getTransactionType(type)}{' '}
					<StyledSpan>{textOfTransferAndBurnKind(item)}</StyledSpan>
				</Typography>
			);
			break;
		}
	}
	return returnText;
};

export interface IActivityCardProps {
	historyIdsByTxHash: HistoryIdsByTxHash;
}

export default function ActivityCard({ historyIdsByTxHash }: IActivityCardProps) {
	const theme = useTheme();

	const listHistoryTypeObj: any = {
		1: iconMint,
		2: iconAcceptOffer,
		3: iconSale,
		4: iconTransfer,
		5: iconCancel,
		6: iconListing,
		7: iconOrder,
		8: iconAuctionCreate,
		9: iconAuctionSettle,
		10: iconExpire,
		11: iconUnpack,
		12: iconBuyBox,
		13: iconCreateStaking,
		14: iconHarvestNCA,
		15: iconCancelStaking,
		16: iconBuyTicket,
		17: iconUpgrade,
		18: iconBurn,
	};
	// useState
	const [listHistory, setListHistory] = useState<HistoryActivity[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [iconHis, setIconHis] = useState<string>('');
	// useSelector
	const userAddress = useSelector(selectAddress);

	// hooks
	const isMounted = useIsMounted();

	// useEffect
	useEffect((): any => {
		if (!historyIdsByTxHash) return;

		(async () => {
			setIsLoading(true);

			try {
				const list = await Promise.all(
					historyIdsByTxHash.histories.map(async (item: any, idx: number) => {
						const res: Response<HistoryActivity> =
							await historyApi.getDetailActivityById(item._id ?? item);
						return res.data;
					})
				);

				if (isMounted()) {
					setListHistory(list);
				}
			} catch (error) {
				console.log(error);
			} finally {
				if (isMounted()) {
					setIsLoading(false);
				}
			}
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [historyIdsByTxHash, userAddress]);
	useEffect(() => {
		getIconOfHis();
	}, [listHistory]);
	// functions
	const getIconOfHis = () => {
		if (listHistory.length < 1) return;
		let type = listHistory[0].type;
		setIconHis(listHistoryTypeObj[type]);
	};
	const getEtherscanInfoByChainId = (id: number) => {
		return ETHERSCAN[id];
	};

	return !isLoading ? (
		listHistory?.length > 0 ? (
			<Box>
				<Stack
					direction="row"
					sx={{
						justifyContent: 'space-between',

						border: '1px solid #E7E8EC',
						alignItems: 'center',
						padding: '8px 12px',
						margin: '4px 0',
						borderRadius: '12px',
						gap: '12px',
						...(theme.palette.mode === 'light'
							? { background: '#fff' }
							: {
									background: theme.palette.primary.dark,
							  }),
					}}
				>
					<Stack
						direction="row"
						sx={{
							gap: '12px',
							cursor: 'default',
						}}
					>
						<ItemMedia>
							{getFileType(listHistory[0].itemInfo.itemMedia) === 'mp4' ? (
								<ReactPlayer
									url={compressImage(
										listHistory[0].itemInfo.itemMedia,
										240,
										'best'
									)}
									className="react-player"
									muted={true}
									playing={true}
									loop={true}
									controls={false}
									volume={0.5}
								/>
							) : getFileType(listHistory[0].itemInfo.itemMedia) === 'mp3' ? (
								<LazyImageCustom
									src={compressImage(
										listHistory[0].itemInfo.itemPreviewMedia,
										480,
										'best'
									)}
									alt="item avatar"
									wrapperPosition="relative"
									imgStyle={{ borderRadius: '10px' }}
									type="progress"
								/>
							) : (
								<LazyImageCustom
									src={compressImage(
										listHistory[0].itemInfo.itemMedia,
										480,
										'best'
									)}
									alt="item avatar"
									wrapperPosition="relative"
									imgStyle={{ borderRadius: '10px' }}
									type="progress"
								/>
							)}
						</ItemMedia>
						<Box>
							{listHistory.map((item: HistoryActivity, index: number) => (
								<Box key={index}>
									{/* <Box>{item.collectionId}</Box> */}
									<Box
										display="-webkit-box"
										sx={{
											WebkitBoxOrient: 'vertical',
											WebkitLineClamp: '2',
											overflow: 'hidden',
											userSelect: 'none',
										}}
									>
										{checkTypeEvent(item.type, item, userAddress)}
									</Box>
								</Box>
							))}

							<Typography variant="body2">
								<StyledSpan>
									{formatTimeHistory(listHistory[0].createdAt)}
								</StyledSpan>
							</Typography>
						</Box>
					</Stack>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: '50%',
								border: '1px solid #E7E8EC',
								width: 36,
								height: 36,
							}}
						>
							<img src={iconHis} alt="heart-icon" />
						</Box>

						{historyIdsByTxHash.txHash.length > 10 && (
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: '50%',
									border: '1px solid #E7E8EC',
									width: 36,
									height: 36,
								}}
								onClick={() => {
									if (historyIdsByTxHash.txHash.length > 10) {
										window.open(
											`${
												getEtherscanInfoByChainId(listHistory[0].chainId)
													.url
											}tx/${historyIdsByTxHash.txHash}`,
											'_blank'
										);
									}
								}}
							>
								<LaunchIcon sx={{ width: '20px', cursor: 'pointer' }} />
							</Box>
						)}
					</Box>
				</Stack>
			</Box>
		) : (
			<></>
		)
	) : (
		<SkeletonActivityCard />
	);
}
