/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	NFT,
	CreateAndUpdateNFTInput,
	Collection,
	UploadItemResponse,
	MintItemInput,
	FreezeItemInput,
	Response,
} from 'models';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
// redux slice
import {
	selectLoading as selectLoadingItem,
	selectNftItem,
} from 'redux/slices/nftItemByItemIdSlice';
import { selectLoading as selectLoadingCollection } from 'redux/slices/collectionSlice';
import { selectLoading as selectLoadingAddOrEditItem } from 'redux/slices/collectionItemSlice';
import { selectAddress, selectChainId, selectCurrentProvider } from 'redux/slices/web3InfoSlice';
import { FreezeItemAction } from 'redux/actions/OrderAction/freezeItemAction';
// redux action
import { fetchDetailNftItemById } from 'redux/actions/nftItemByItemIdAction';
// api
import nftsApi from 'apis/nftsApi';
import collectionApi from 'apis/collectionApi';
import uploadApi from 'apis/uploadApi';
// component
import Modal from 'components/CustomUI/Modal';
import FormAddOrEditItem, { IFormAddOrEditItemInputs } from 'components/Form/FormAddOrEditItem';
import Loading from 'components/CustomUI/LoadingPage';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
// mui
import {
	Box,
	CircularProgress,
	Container,
	Stack,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import { fetchAllCollection } from 'redux/actions/collectionAction';
import LinearBuffer from 'components/CustomUI/UploadProgress';
import fakeRequest from 'utils/fakeRequest';
// path
import { PATH_COLLECTION, PATH_ITEM, PATH_PAGE } from 'routes/path';

// item actions
const { MintItem, FreezeItem } = FreezeItemAction();

interface StepStatus {
	isChecking: boolean;
	isExecuting: boolean;
	isCompleted: boolean;
}

const initialStepStatus: StepStatus = {
	isChecking: false,
	isExecuting: false,
	isCompleted: false,
};

function CreateOrEditItem() {
	const { pathname } = useLocation();
	const isEdit = pathname.includes('edit');
	const { itemId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// useState
	const [modalItemError, setModalItemError] = useState(false);
	const [modalNotHaveCollection, setModalNotHaveCollection] = useState(false);
	const [listCollectionTemp, setListCollectionTemp] = useState<Collection[]>([]);
	const [freezeNow, setFreezeNow] = useState<boolean>(false);
	const [newItemDetail, setNewItemDetail] = useState<NFT | null>(null);

	const [modal, setModal] = useState(false);
	const [step1, setStep1] = useState<StepStatus>(initialStepStatus);
	const [step2, setStep2] = useState<StepStatus>(initialStepStatus);
	const [step3, setStep3] = useState<StepStatus>(initialStepStatus);
	const [activeStep, setActiveStep] = useState<number>(0);

	// useSelector
	const item: NFT | null = useSelector(selectNftItem);
	const userAddress = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);
	const isLoadingItem = useSelector(selectLoadingItem);
	const isLoadingCollection = useSelector(selectLoadingCollection);
	const isLoadingAddOrEditItem = useSelector(selectLoadingAddOrEditItem);
	const web3Info = useSelector(selectCurrentProvider);

	// useEffect
	// if isEdit: fetch nft item by id
	useEffect(() => {
		if (isEdit && itemId && userAddress) {
			dispatch(fetchDetailNftItemById(userAddress, itemId, executeAfterFetchNftItemById));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chainId]);

	// fetch list collection
	useEffect(() => {
		if (userAddress && chainId) {
			dispatch(
				fetchAllCollection(
					{ pageSize: 9999, page: 1 },
					{ userAddress },
					true,
					executeAfterFetchListCollection
				)
			);
		}
	}, [dispatch, userAddress, chainId]);

	// Change Active Step
	useEffect(() => {
		if (step1.isCompleted) {
			setActiveStep(1);
			if (step2.isCompleted) {
				setActiveStep(2);
				if (step3.isCompleted) {
					setActiveStep(3);
				}
			}
		}
	}, [step1, step2, step3]);

	// function
	const executeAfterFetchNftItemById = (globalStateNewest: RootState) => {
		const { nftItem } = globalStateNewest;
		if (!nftItem.isSuccess) {
			setModalItemError(true);
		}
	};

	const executeAfterFetchListCollection = async (globalStateNewest: RootState) => {
		const { collection } = globalStateNewest;
		if (!collection.isSuccess) {
			toast.error('Some error occur when getting your collections!');
		} else {
			if (collection.listCollections.length <= 0) {
				setModalNotHaveCollection(true);
				setListCollectionTemp([]);
			} else {
				try {
					const list = await Promise.all(
						collection.listCollections.map(async (item: any, idx: number) => {
							const res: Response<any> = await collectionApi.getCollectionById(
								item._id
							);
							return res.data;
						})
					);
					setListCollectionTemp(list);
				} catch (error) {
					toast.error('Some error occur when getting your collections!');
				}
			}
		}
	};

	const handleChangeFreezeOption = (event: any) => {
		setFreezeNow(event.target.checked);
	};

	const onSubmit = async (data: IFormAddOrEditItemInputs) => {
		setModal(true);
		let itemIdTemp: string = '';
		console.log('create item itemMedia', data);
		let p: any = {};
		data.properties.map((item: any, index: number) => {
			p[item.key] = item.value;
		});
		data.properties = p;
		try {
			// --------------------------------step1: upload media
			setStep1({ ...step1, isExecuting: true });
			const media: any = data.itemMedia;
			const thumbnail: any = data.itemThumbnail;
			let mediaURL: UploadItemResponse = { itemMedia: '', itemOriginMedia: '' };
			let thumbnailURL: UploadItemResponse = { itemMedia: '', itemOriginMedia: '' };

			if (typeof media === 'string') {
				mediaURL.itemMedia = media;
			} else {
				const mediaForm = new FormData();
				mediaForm.append('file', media.raw);
				const res: Response<UploadItemResponse> = await uploadApi.uploadItemMedia(
					mediaForm
				);
				mediaURL = res.data;
			}

			if (thumbnail) {
				if (typeof thumbnail === 'string') {
					thumbnailURL.itemMedia = thumbnail;
				} else {
					const thumbnailForm = new FormData();
					thumbnailForm.append('file', thumbnail.raw);
					const res: Response<UploadItemResponse> = await uploadApi.uploadItemMedia(
						thumbnailForm
					);
					thumbnailURL = res.data;
				}
			}

			if (!isEdit) {
				const newData: CreateAndUpdateNFTInput = {
					...data,
					itemMedia: mediaURL.itemMedia,
					itemPreviewMedia: thumbnailURL.itemMedia,
					itemOriginMedia: mediaURL.itemOriginMedia,
					userAddress: userAddress!,
					creator: userAddress!,
					chainId,
				};

				const res: Response<NFT> = await nftsApi.createNft(newData);
				itemIdTemp = res.data._id;
			} else {
				if (item && itemId) {
					const updateData: CreateAndUpdateNFTInput = {
						...item,
						...data,
						itemMedia: mediaURL.itemMedia,
						itemPreviewMedia: thumbnailURL.itemMedia,
						itemOriginMedia: mediaURL.itemOriginMedia,
					};

					await nftsApi.updateNftByItemId(updateData, userAddress!, itemId);
					itemIdTemp = itemId;
				}
			}

			const res: Response<NFT> = await nftsApi.getDetailNftItemById({
				itemId: itemIdTemp,
				userAddress:
					userAddress ?? '0x00B91B2F8aFE87FCDc2b3fFA9ee2278cd1E4DDf8'.toLowerCase(),
			});
			setNewItemDetail(res.data);

			setStep1({ ...step1, isExecuting: false });
			await fakeRequest(1000);
			setStep1({ ...step1, isCompleted: true });

			if (freezeNow) {
				// state not updated yet, so we pass prop newItem to handleStep2() func
				handleStep2(res.data, true); // isCheck = true
			}
		} catch (error: any) {
			// toast.error(error.message);
			setModal(false);
		}
	};

	const handleStep2 = async (itemDetail: NFT | null, isCheck: boolean): Promise<void> => {
		if (!itemDetail || !itemDetail.collectionInfo || !userAddress) {
			console.log('Missing Field Step 2');
			return;
		}

		// setLoading state
		if (isCheck) {
			setStep2({ ...step2, isChecking: true });
		} else {
			setStep2({ ...step2, isExecuting: true });
		}

		// execute
		const data: MintItemInput = {
			itemTokenId: itemDetail.itemTokenId,
			chainId: itemDetail.chainId,
			collectionAddress: itemDetail.collectionInfo.collectionAddress,
			userAddress,
			web3: web3Info,
		};
		const isCompleted = await MintItem(data, isCheck);

		// setLoading state
		if (isCheck) {
			setStep2({ ...step2, isChecking: false });
		} else {
			setStep2({ ...step2, isExecuting: false });
		}

		// set completed state
		if (isCompleted) {
			setStep2({ ...step2, isCompleted: true });
		} else {
			setStep2({ ...step2, isCompleted: false });
		}
	};

	const handleStep3 = async (): Promise<void> => {
		if (!newItemDetail || !newItemDetail.collectionInfo || !userAddress) {
			console.log('Missing Field Step 3');
			return;
		}

		// setLoading state
		setStep3({ ...step3, isExecuting: true });

		// execute
		const data: FreezeItemInput = {
			itemId: newItemDetail._id,
			itemStandard: newItemDetail.itemStandard,
			collectionAddress: newItemDetail.collectionInfo.collectionAddress,
			userAddress,
		};
		const isCompleted: boolean = await FreezeItem(data);

		// setLoading state
		setStep3({ ...step3, isExecuting: false });

		// set completed state
		if (isCompleted) {
			setStep3({ ...step3, isCompleted: true });
		} else {
			setStep3({ ...step3, isCompleted: false });
		}
	};

	const handleDone = () => {
		navigate(`${PATH_ITEM.detail}/${newItemDetail?._id}`);
	};

	return (
		<>
			{isLoadingItem || isLoadingCollection || isLoadingAddOrEditItem ? (
				<Loading />
			) : (
				<Container>
					<Box>
						<FormAddOrEditItem
							isEdit={isEdit}
							currentItem={item}
							listCollectionTemp={listCollectionTemp}
							handleChangeFreezeOption={handleChangeFreezeOption}
							onSubmit={onSubmit}
						/>
					</Box>

					<Modal
						onOpen={modal}
						allowClose={false}
						mainHeader={isEdit ? 'Edit item' : 'Create item'}
						style={{ maxWidth: '450px', overflowY: 'auto' }}
					>
						<Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 2 }}>
							{/* ===================================================================== STEP 1 =====================================================================*/}
							<Step>
								<StepLabel
									optional={
										<Typography variant="caption">No gas fees</Typography>
									}
								>
									Upload item
								</StepLabel>
								<StepContent>
									<Typography>
										The item is being uploaded to our store.
									</Typography>

									<Box sx={{ mt: 1 }}>
										<LinearBuffer isCompleted={step1.isExecuting} />
									</Box>
								</StepContent>
							</Step>

							{/* ===================================================================== STEP 2 =====================================================================*/}
							{freezeNow && (
								<Step>
									<StepLabel
										optional={
											<Typography variant="caption">
												Recurring fees
											</Typography>
										}
									>
										Mint item
									</StepLabel>
									<StepContent>
										<Typography>
											Recurring fees are incurred whenever doing actions on
											blockchain.
										</Typography>
										<Box sx={{ mb: 2, mt: 1 }}>
											<ButtonGradient
												onClick={() => {
													handleStep2(newItemDetail, false); // isCheck = false
												}}
												disabled={step2.isChecking || step2.isExecuting}
												sx={{ width: '180px' }}
											>
												{(step2.isChecking || step2.isExecuting) && (
													<CircularProgress
														sx={{ color: 'white', mr: 1 }}
														size={16}
													/>
												)}

												<Typography variant="button">
													{step2.isChecking
														? 'Checking...'
														: step2.isExecuting
														? 'Executing...'
														: 'Mint'}
												</Typography>
											</ButtonGradient>
										</Box>
									</StepContent>
								</Step>
							)}

							{/* ===================================================================== STEP 3 =====================================================================*/}
							{freezeNow && (
								<Step>
									<StepLabel
										optional={
											<Typography variant="caption">
												Recurring fees
											</Typography>
										}
									>
										Freeze item
									</StepLabel>
									<StepContent>
										<Typography>Freeze data to blockchain.</Typography>
										<Box sx={{ mb: 2 }}>
											<ButtonGradient
												onClick={() => {
													handleStep3();
												}}
												disabled={step3.isChecking || step3.isExecuting}
												sx={{ width: '180px', mt: 1 }}
											>
												{(step3.isChecking || step3.isExecuting) && (
													<CircularProgress
														sx={{ color: 'white', mr: 1 }}
														size={16}
													/>
												)}

												<Typography variant="button">
													{step3.isChecking
														? 'Checking...'
														: step3.isExecuting
														? 'Executing...'
														: 'Freeze'}
												</Typography>
											</ButtonGradient>
										</Box>
									</StepContent>
								</Step>
							)}

							{/* ===================================================================== STEP 4 =====================================================================*/}
							<Step>
								<StepLabel optional={null}>
									{isEdit ? 'Update' : 'Create'} Successfully
								</StepLabel>
								<StepContent>
									<Typography>
										{isEdit ? 'Your item is updated!' : 'The item is created!'}
									</Typography>
									<Box sx={{ mb: 2 }}>
										<ButtonGradient
											onClick={handleDone}
											sx={{ width: '180px', mt: 1 }}
										>
											<Typography variant="button">View now</Typography>
										</ButtonGradient>
									</Box>
								</StepContent>
							</Step>
						</Stepper>
					</Modal>

					{isEdit && modalItemError ? (
						<Modal
							onOpen={modalItemError}
							mainHeader="Can not find item!"
							onClose={() => {
								navigate(`${PATH_PAGE.user}`);
							}}
						>
							<Typography sx={{ pb: 2, textAlign: 'center' }}>
								We can not find this item!
							</Typography>
						</Modal>
					) : (
						''
					)}

					{!isEdit && modalNotHaveCollection ? (
						<Modal
							onOpen={modalNotHaveCollection}
							mainHeader="No collections yet! 
							"
							onClose={() => {
								navigate(`${PATH_PAGE.user}`);
							}}
							style={{ maxWidth: '540px', textAlign: 'center' }}
						>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',
									paddingBottom: '1.5rem',
								}}
							>
								<Typography>Item must be in one specified collection!</Typography>
								<Stack alignItems="center" sx={{ mt: 2 }}>
									<ButtonGradient
										onClick={() => {
											navigate(`${PATH_COLLECTION.createCollection}`);
										}}
										sx={{ width: 'fit-content' }}
									>
										Create A Collection
									</ButtonGradient>
								</Stack>
							</Box>
						</Modal>
					) : (
						''
					)}
				</Container>
			)}
		</>
	);
}

export default CreateOrEditItem;
