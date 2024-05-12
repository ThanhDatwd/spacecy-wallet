/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
// constants
import { ITEM_STATUS } from '../../../../../constants';
// models
import { NFT, OrderResponseAPI } from 'models';
// redux
import { useSelector } from 'react-redux';
import { selectNftItem, selectLoading } from 'redux/slices/nftItemByItemIdSlice';
import { selectAddress } from 'redux/slices/web3InfoSlice';
// components
import ButtonGradient from 'components/CustomUI/ButtonGradient';
// mui
import { Typography } from '@mui/material';
// image
import CardIcon from 'assets/icons/icon-offer.svg';
// path
import { PATH_ITEM } from 'routes/path';
import ButtonWhite from 'components/CustomUI/ButtonWhite';

export interface IButtonSellProps {
	personalOrderSell: OrderResponseAPI | null;
	loadingPersonalOrderSell: boolean;
}

export default function ButtonSell({
	personalOrderSell,
	loadingPersonalOrderSell,
}: IButtonSellProps) {
	const navigate = useNavigate();

	// useSelector
	const item: NFT | null = useSelector(selectNftItem);
	const isLoadingItem = useSelector(selectLoading);
	const userAddress = useSelector(selectAddress);

	// functions
	const isQualifiedToSell = () => {
		if (
			!isLoadingItem &&
			item &&
			userAddress &&
			item.owner.includes(userAddress) &&
			!loadingPersonalOrderSell &&
			!personalOrderSell
		) {
			return true;
		}
		return false;
	};

	return (
		<>
			{isQualifiedToSell() && (
				<ButtonWhite
					onClick={() => navigate(`${PATH_ITEM.sell}/${item!._id}`)}
					sx={{ width: 'fit-content', mb: 0 }}
				>
					{/* <img src={CardIcon} alt="card icon" height={16} width={22} /> */}
					<Typography sx={{ fontSize: '16px', fontWeight: 500 }}>Sell Item</Typography>
				</ButtonWhite>
			)}
		</>
	);
}
