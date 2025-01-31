/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
//components
import SaleItemMethod from 'components/pages/SellItem/SaleItemMethod';
import SaleItemSetup from 'components/pages/SellItem/SaleItemSetup';
import SaleItemSummary from 'components/pages/SellItem/SaleItemSummary';
import Modal from 'components/CustomUI/Modal/index';
import LoadingPage from 'components/CustomUI/LoadingPage';
//redux
import { RootState } from 'redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
import {
	selectNftItem,
	selectLoading as selectLoadingNftItem,
} from 'redux/slices/nftItemByItemIdSlice';
import {
	selectListTokenPayment,
	selectLoading as selectLoadingListToken,
} from 'redux/slices/tokenPaymentSlice';
import {
	selectCollectionItem,
	selectLoading as selectLoadingCollection,
} from 'redux/slices/collectionSlice';
// actions
import { fetchDetailNftItemById } from 'redux/actions/nftItemByItemIdAction';
import { fetchListPaymentTokenByChainId } from 'redux/actions/tokenPaymentAction';
import { fetchCollectionById } from 'redux/actions/collectionAction';
// model
import { NFT, TokenPayment } from 'models';
// mui
import { Container, Grid, Typography, Stack } from '@mui/material';
// context
import SellingController from 'contexts/SellingContext';
// constants
import { ITEM_STATUS } from '../../../constants';
// path
import { PATH_ITEM } from 'routes/path';
import PreviewAuction from 'components/pages/SellItem/PreviewAuction';

function SellItem() {
	const { itemId } = useParams();
	const dispatch = useDispatch();

	const navigate = useNavigate();

	//state
	const [modalErrorItem, setModalErrorItem] = useState(false);
	const [modalErrorCollection, setModalErrorCollection] = useState(false);
	const [modalErrorListTokenPayment, setModalErrorListTokenPayment] = useState(false);

	//selector
	const chainId = useSelector(selectChainId);
	const userAddress = useSelector(selectAddress);

	const item: NFT | null = useSelector(selectNftItem);
	const loadingNftItem = useSelector(selectLoadingNftItem);

	const listTokenPayment: TokenPayment[] = useSelector(selectListTokenPayment);
	const loadingListToken: boolean = useSelector(selectLoadingListToken);

	const collection = useSelector(selectCollectionItem);
	const loadingCollection = useSelector(selectLoadingCollection);

	// useEffect
	// fetch nft info and list payment token
	useEffect(() => {
		if (itemId && userAddress) {
			dispatch(fetchDetailNftItemById(userAddress, itemId, executeAfterFetchNftItemById));
			dispatch(fetchListPaymentTokenByChainId(chainId, executeAfterFetchListTokenPayment));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemId]);

	// functions
	const executeAfterFetchCollectionById = (globalStateNewest: RootState) => {
		const { collection } = globalStateNewest;
		if (!collection.isSuccess) {
			setModalErrorCollection(true);
		}
	};

	const executeAfterFetchNftItemById = async (globalStateNewest: RootState) => {
		const { nftItem } = globalStateNewest;
		if (nftItem.isSuccess) {
			const item: NFT | null | undefined = nftItem.NFTItem;

			if (!item || !item.collectionInfo) {
				toast.error('Some error occur when fetching your item!');
				return;
			}

			// check if item is not listing
			// if (item.status === ITEM_STATUS.BUY_NOW) {
			// 	navigate(`${PATH_ITEM.detail}/${itemId}`);
			// 	return;
			// }

			// after fetch item success, fetch collection of the item
			dispatch(fetchCollectionById(item.collectionInfo._id, executeAfterFetchCollectionById));
		} else {
			setModalErrorItem(true);
		}
	};

	const executeAfterFetchListTokenPayment = (globalStateNewest: RootState) => {
		const { tokenPayment } = globalStateNewest;
		if (!tokenPayment.isSuccess) {
			setModalErrorListTokenPayment(true);
		}
	};

	return (
		<SellingController>
			{loadingNftItem || loadingCollection || loadingListToken ? (
				<LoadingPage />
			) : (
				item &&
				collection &&
				listTokenPayment.length > 0 && (
					<Container maxWidth="xxl" sx={{ mt: 16, fontStyle: 'italic', mb: 4 }}>
						<Typography variant="h3" fontWeight="600" sx={{ p: '2rem 0 0.5rem' }}>
							List your item for sale
						</Typography>
						<Typography variant="h6" sx={{ pb: '1rem' }}>
							Choose the sale method
						</Typography>
						<SaleItemMethod />
						<Grid container spacing={3} mt={0.5}>
							<Grid item xs={12} md={7}>
								<Grid container spacing={3}>
									<Grid item xs={12} lg={12} xl={12}>
										<SaleItemSetup listTokenPayment={listTokenPayment} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} md={5}>
								<Stack>
									<Typography variant="h6" fontWeight="500" sx={{ pb: '1rem' }}>
										Review
									</Typography>

									<SaleItemSummary collection={collection} currentItem={item} />
								</Stack>
								{/* <Stack>
									<Typography variant="h6" fontWeight="500" sx={{ pb: '1rem' }}>
										Preview
									</Typography>

									<PreviewAuction collection={collection} currentItem={item} />
								</Stack> */}
							</Grid>
						</Grid>
					</Container>
				)
			)}

			{modalErrorItem && (
				<Modal
					onOpen={modalErrorItem}
					mainHeader="An error occurred"
					onClose={() => {
						navigate('/');
					}}
					style={{ maxWidth: 400 }}
				>
					<Typography
						variant="h6"
						sx={{ width: '100%', textAlign: 'center', pb: '1rem' }}
					>
						Item not found!
					</Typography>
				</Modal>
			)}

			{!loadingNftItem && userAddress && item && !item.owner.includes(userAddress) && (
				<Modal
					onOpen={true}
					mainHeader="An error occurred"
					onClose={() => {
						navigate('/');
					}}
					style={{ maxWidth: 400 }}
				>
					<Typography
						variant="h6"
						sx={{ width: '100%', textAlign: 'center', pb: '1rem' }}
					>
						You are not the owner of this item!
					</Typography>
				</Modal>
			)}

			{!modalErrorCollection && (
				<Modal
					onOpen={modalErrorCollection}
					mainHeader="An error occurred"
					onClose={() => {
						navigate('/');
					}}
					style={{ maxWidth: 400 }}
				>
					<Typography
						variant="h6"
						sx={{ width: '100%', textAlign: 'center', pb: '1rem' }}
					>
						Collection not found!
					</Typography>
				</Modal>
			)}

			{modalErrorListTokenPayment && (
				<Modal
					onOpen={modalErrorListTokenPayment}
					mainHeader="An error occurred"
					onClose={() => {
						navigate('/');
					}}
					style={{ maxWidth: 400 }}
				>
					<Typography
						variant="h6"
						sx={{ width: '100%', textAlign: 'center', pb: '1rem' }}
					>
						List token payment not found!
					</Typography>
				</Modal>
			)}
		</SellingController>
	);
}

export default SellItem;
