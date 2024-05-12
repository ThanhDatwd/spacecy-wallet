/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
// mui
import { Box, Button, Stack, Typography } from '@mui/material';
// styled
import { ButtonShow, FilterButton } from './styled';
// constant
import { TYPE_TRANSACTION } from '../../../../../../constants';
// hooks
import { useDebounce, useIsFirstRender } from 'hooks';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setFilter } from 'redux/slices/tradingSlice';
// contexts
import { SizeContext } from 'contexts/SizeObserver';
import IconSearch from 'assets/icons/icon-search-black.svg';
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

import { NONAME } from 'dns';

export interface IHistoryFilterProps {}

export default function HistoryFilter(props: IHistoryFilterProps) {
	const dispatch = useDispatch();
	const { innerWidth } = useContext(SizeContext);

	// useState
	const [currentHistoryType, setCurrentHistoryType] = useState<string | undefined>('');
	const [isShowMore, setIsShowMore] = useState<boolean>(false);

	// useSelector
	const filter = useSelector(selectFilter);

	// hook
	const isFirstRender = useIsFirstRender();
	const debouncedHistoryType = useDebounce<string | undefined>(currentHistoryType, 500);

	// vars
	const listHistoryType = [
		['1', 'Mint', iconMint, iconMintWhite],
		['2', 'Accept Offer', iconAcceptOffer, iconAcceptOfferWhite],
		['3', 'Sale', iconSale, iconSaleWhite],
		['4', 'Transfer', iconTransfer, iconTransferWhite],
		['5', 'Cancel', iconCancel, iconCancelWhite],
		['6', 'List', iconListing, iconListingWhite],
		['7', 'Order', iconOrder, iconOrderWhite],
		['8', 'Auction Create', iconAuctionCreate, iconAuctionCreateWhite],
		['9', 'Auction Settle', iconAuctionSettle, iconAuctionSettleWhite],
		['10', 'Exprire', iconExpire, iconExpireWhite],
		['11', 'Unpack', iconUnpack, iconUnpackWhite],
		['12', 'Buy Box', iconBuyBox, iconBuyBoxWhite],
		['13', 'Create Staking', iconCreateStaking, iconCreateStakingWhite],
		['14', 'Harvest NCA', iconHarvestNCA, iconHarvestNCAWhite],
		['15', 'Cancel Staking', iconCancelStaking, iconCancelStakingWhite],
		['16', 'Buy Ticket Card', iconBuyTicket, iconBuyTicketWhite],
		['17', 'Upgrade', iconUpgrade, iconUpgradeWhite],
		['18', 'Burn', iconBurn, iconBurnWhite],
	];

	// const listHistoryType = Object.entries(TYPE_TRANSACTION);

	// useEffect
	useEffect(() => {
		if (innerWidth > 1200) {
			setIsShowMore(true);
		}
	}, []);

	useEffect(() => {
		if (isFirstRender) return;

		dispatch(setFilter({ ...filter, type: debouncedHistoryType }));
	}, [debouncedHistoryType]);

	return (
		<>
			<Box
				sx={{
					marginBottom: 2,
					display: 'flex',
					gap: '10px',
					padding: '12px 16px',
					border: '1px solid #E7E8EC',
					background: '#fff',
					borderRadius: '12px',
					img: {
						width: '20px',
					},
					input: {
						outline: 'none',
						border: 0,
						width: '100%',
						fontStyle: 'italic',
						'::placeholder': {
							fontStyle: 'italic',
						},
					},
				}}
			>
				<img src={IconSearch} alt="search icon" />
				<input placeholder="Search name..." />
			</Box>

			<Typography variant="h6" fontWeight="600">
				FilterNft
			</Typography>

			<Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
				{listHistoryType
					.map((historyType: any, index: number) => {
						// just show 6 activity when !isShowMore
						if (!isShowMore && index > 6) return null;

						const [typeId, name, img, img1] = historyType;

						return (
							<FilterButton
								key={index}
								onClick={() => {
									if (currentHistoryType === typeId) {
										setCurrentHistoryType(undefined);
									} else {
										setCurrentHistoryType(typeId);
									}
								}}
								className={currentHistoryType === typeId ? 'active' : ''}
							>
								<Box>
									<img
										src={currentHistoryType === typeId ? img1 : img}
										alt={name}
									/>
								</Box>
								<Typography fontSize={12} fontWeight={500}>
									{name}
								</Typography>
							</FilterButton>
						);
					})
					.filter((item) => item !== null)}

				<FilterButton
					onClick={() => {
						setIsShowMore(!isShowMore);
					}}
				>
					<Typography fontSize={12} color="#007aff" fontWeight={500}>
						{isShowMore ? 'Clear All' : 'Clear All'}
					</Typography>
				</FilterButton>
			</Stack>
		</>
	);
}
