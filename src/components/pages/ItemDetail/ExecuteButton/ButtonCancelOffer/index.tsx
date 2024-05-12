/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
// mui
import { CircularProgress, Stack, Typography } from '@mui/material';
// components
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import Modal from 'components/CustomUI/Modal';
// models
import { CancelOrderInput, NFT, OrderResponseAPI } from 'models';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectNftItem, selectLoading } from 'redux/slices/nftItemByItemIdSlice';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
// actions
import { cancelOrder } from 'redux/actions/OrderAction/cancelOrderAction';
// utils
import { compareDate, timestampToDate } from 'utils';
import ButtonWhite from 'components/CustomUI/ButtonWhite';

export interface IButtonCancelOfferProps {
	personalOffer: OrderResponseAPI | null;
	loadingPersonalOffer: boolean;
	refetchApi: VoidFunction;
}

export default function ButtonCancelOffer({
	personalOffer,
	loadingPersonalOffer,
	refetchApi,
}: IButtonCancelOfferProps) {
	const dispatch = useDispatch();

	// useState
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [modalOrderExpired, setModalOrderExpired] = useState<boolean>(false);

	// useSelector
	const item: NFT | null = useSelector(selectNftItem);
	const isLoadingItem = useSelector(selectLoading);
	const userAddress = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);

	// functions
	const isQualifiedToCancelOffer = () => {
		if (
			!isLoadingItem &&
			item &&
			!loadingPersonalOffer &&
			personalOffer &&
			compareDate(new Date(), timestampToDate(parseInt(personalOffer.expirationTime))) < 0
		) {
			return true;
		}
		return false;
	};

	const handleCancelOffer = async () => {
		if (!item || !userAddress || !chainId || !personalOffer) {
			console.log('Missing Field!');
			return;
		}

		// this condition met when user go to this page when offering is not expired and click a button when offering is expired
		if (compareDate(new Date(), timestampToDate(parseInt(personalOffer.expirationTime))) > 0) {
			setModalOrderExpired(true);
			return;
		}

		setIsLoading(true);

		const cancelOrderInput: CancelOrderInput = {
			orderMaker: personalOffer,
			makerAddress: userAddress,
			chainId,
			setLoading: setIsLoading,
			refetchApi,
			itemId: item._id,
			collectionId: item.collectionId,
		};

		dispatch(cancelOrder(cancelOrderInput));
	};

	return (
		<>
			{isQualifiedToCancelOffer() && (
				<ButtonWhite
					onClick={handleCancelOffer}
					disabled={isLoading}
					sx={{ width: 'fit-content' }}
				>
					{isLoading && <CircularProgress sx={{ color: 'white', mr: 1 }} size={16} />}

					<Typography variant="body1">Cancel offer</Typography>
				</ButtonWhite>
			)}

			{modalOrderExpired && (
				<Modal
					onOpen={modalOrderExpired}
					mainHeader="Your item offering is expired!"
					onClose={() => {
						window.location.reload();
					}}
				>
					<Typography variant="h6" sx={{ width: '100%', textAlign: 'center' }}>
						We have updated your infomation, take a look now.
					</Typography>

					<ButtonWhite
						sx={{
							paddingLeft: '30px',
							paddingRight: '30px',
							maxWidth: '150px',
							margin: '15px auto',
						}}
						onClick={() => {
							window.location.reload();
						}}
					>
						<Stack direction="row" alignItems="center">
							<Typography variant="button">Agree</Typography>
						</Stack>
					</ButtonWhite>
				</Modal>
			)}
		</>
	);
}
