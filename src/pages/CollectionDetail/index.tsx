/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { lazy, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
//mui
import { Avatar, Box, Container, Tooltip, useTheme } from '@mui/material';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { selectChainId } from 'redux/slices/web3InfoSlice';
import {
	selectCollectionItem,
	selectLoading as selectLoadingCollection,
} from 'redux/slices/collectionSlice';
// actions
import { fetchCollectionDetailById } from 'redux/actions/collectionAction';
import { fetchListPaymentTokenByChainId } from 'redux/actions/tokenPaymentAction';
// styled
import {
	CollectionAvatar,
	CollectionBackground,
	CollectionDescription,
	CollectionMoreInfo,
	CollectionMoreInfoWrapper,
	ContainerContentCollectionDetail,
	ReadMoreButton,
} from './styled';
import { fetchCollectionHistory } from 'redux/actions/tradingAction';
// utils
import { sliceString } from 'utils';
// components
import LazyImage from 'components/CustomUI/LazyImages/LazyImage';
import CollectionInfo from 'components/pages/CollectionDetail/CollectionInfo';
import TabDetailCollection from 'components/pages/CollectionDetail/TabDetailCollection';
import LoadingPage from 'components/CustomUI/LoadingPage';
// images
import VerifiedIcon from 'assets/icons/icon-verify-check.svg';

function DetailCollection() {
	const { collectionId } = useParams();
	const dispatch = useDispatch();
	const theme = useTheme();

	// useState
	const [stateRefetchApi, setStateRefetchApi] = useState<boolean>(false);

	// useSelector
	const chainId = useSelector(selectChainId);
	const collection = useSelector(selectCollectionItem);
	const loadingCollection = useSelector(selectLoadingCollection);
	// useEffect
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// fetch collection by id
	useEffect(() => {
		if (!collectionId) return;
		dispatch(fetchCollectionDetailById(collectionId));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [collectionId, stateRefetchApi]);

	// fetch list token payment
	useEffect(() => {
		if (chainId) {
			dispatch(fetchListPaymentTokenByChainId(chainId, executeAfterFetchListTokenPayment));
		}
	}, [chainId, dispatch, collectionId]);

	// function
	const executeAfterFetchListTokenPayment = (globalStateNewest: RootState) => {
		const { tokenPayment } = globalStateNewest;
		if (!tokenPayment.isSuccess) {
			toast.error('Can not fetch list token payment!');
		}
	};

	const refetchApi = () => {
		setStateRefetchApi(!stateRefetchApi);
	};

	return (
		<>
			{loadingCollection ? (
				<LoadingPage />
			) : (
				<>
					{/* Collection background / avatar */}
					<CollectionBackground sx={{ mt: 16 }}>
						<LazyImage
							src={collection?.background ? collection.background : ''}
							alt="user background"
							style={{
								objectFit: 'cover',
								width: '100%',
								height: '100%',
							}}
						/>

						<CollectionAvatar>
							<Avatar
								variant="square"
								sx={{
									width: '100%',
									height: '100%',
									background: theme.palette.primary.light,
									borderRadius: '12px',
								}}
								src={collection?.logo ?? ''}
								alt="collection logo"
							/>

							{/* icon verified */}
							<Box
								sx={{
									position: 'absolute',
									bottom: '-10px',
									right: '-10px',
									background: theme.palette.primary.light,
									borderRadius: '50%',
									border: '2px solid #fff',
									padding: '6px 4px',
									height: 32,
								}}
							>
								<Tooltip title="Collection verified" placement="top" arrow>
									<img
										src={VerifiedIcon}
										alt="icon verified"
										style={{ width: '20px', height: 'auto' }}
									/>
								</Tooltip>
							</Box>
						</CollectionAvatar>
					</CollectionBackground>
					<ContainerContentCollectionDetail pb={14}>
						<Container maxWidth="xxl" sx={{ pt: '5px' }}>
							<CollectionInfo collection={collection} />

							<Box sx={{ mt: 5 }}>
								<TabDetailCollection
									// props for InWalletTab
									refetchApi={refetchApi}
								/>
							</Box>
						</Container>
					</ContainerContentCollectionDetail>
				</>
			)}
		</>
	);
}

export default React.memo(DetailCollection);
