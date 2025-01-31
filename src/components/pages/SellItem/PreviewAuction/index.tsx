/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAddress, selectChainId, selectCurrentProvider } from 'redux/slices/web3InfoSlice';
// actions
import { CreateOrderForSaleAction } from 'redux/actions/OrderAction/createOrderForSaleAction';
import { ApproveWalletNftAsset } from 'redux/actions/OrderAction/common';
// components
import Modal from 'components/CustomUI/Modal';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
// styled
import { ContentText, PreviewItemWrapper } from './styled';
import { Title } from 'pages/TermsOfService/SellItem/styled';
// models
import {
	NFT,
	Collection,
	ApproveWalletNftAssetInput,
	ApproveRoyaltiesFeeForSellInput,
	HashOrderAndSignForSellInput,
	CustomFile,
} from 'models';
// utils
import { erc20function, isNativeToken, isPlatformTokenAddress, parseUnits } from 'utils';
import moment from 'moment';
import { BigNumber } from 'ethers';
// mui
import {
	Box,
	CircularProgress,
	Stack,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';

// constants
import { CONTRACT, ORDER_CONFIGURATION, ServiceFee } from '../../../../constants';
// context
import { useSelling } from 'contexts/SellingContext';
// path
import { PATH_ITEM } from 'routes/path';
import PreviewItem from 'components/CustomUI/PreviewItem';
// order actions
const { ApproveRoyaltiesFee, HashOrderAndSign } = CreateOrderForSaleAction();

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

export interface SaleItemSummaryProps {
	collection: Collection | null;
	currentItem: NFT | null;
}

function PreviewAuction({ collection, currentItem }: SaleItemSummaryProps) {
	let dispatch = useDispatch();
	const navigate = useNavigate();

	//useState
	const [modal, setModal] = useState(false);
	const [step1, setStep1] = useState<StepStatus>(initialStepStatus);
	const [step2, setStep2] = useState<StepStatus>(initialStepStatus);
	const [step3, setStep3] = useState<StepStatus>(initialStepStatus);
	const [activeStep, setActiveStep] = useState<number>(0);

	//Sale kind
	const FIXED = ORDER_CONFIGURATION.FIXED_PRICE;
	const DUTCH = ORDER_CONFIGURATION.DUTCH_AUCTION;

	//context
	const context = useSelling();
	const { state } = context;
	const dispatchContext = context.dispatch;

	const {
		isErc1155,
		saleKind,
		fixedPrice,
		startPrice,
		endPrice,
		quantity,
		maxSupply,
		tokenPayment,
		feeMethod,
		startTime,
		endTime,
	} = state;

	const currentProvider = useSelector(selectCurrentProvider);
	const address = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);
	const [media, setMedia] = useState<CustomFile | string | null>(null);
	const [thumbnail, setThumbnail] = useState<CustomFile | string | null>(null);
	const [name, setName] = useState<string>('');

	// useEffect
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

	// handle toggle modal
	useEffect(() => {
		if (modal) {
			// Check steps
			// step1
			handleStep1(true); // isCheck = true
		} else {
			// reset step
			setActiveStep(0);
			setStep1({ ...step1, isCompleted: false });
			setStep2({ ...step2, isCompleted: false });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modal]);

	// functions
	const onSubmit = async () => {
		// check prices
		if (saleKind === FIXED) {
			if (fixedPrice <= 0) {
				toast.warning('Invalid price!');
				return;
			}
		} else {
			if (startPrice <= 0 || endPrice <= 0) {
				toast.warning('Invalid price!');
				return;
			}
		}

		// check quantity

		if (isErc1155 && (quantity <= 0 || quantity > maxSupply)) {
			toast.warning('Invalid quantity!');
			return;
		}

		setModal(true);
	};

	const specifyFeeMethod = (): number => {
		// dutch must be split_fee method
		if (saleKind === DUTCH) {
			return ORDER_CONFIGURATION.SPLIT_FEE_METHOD;
		} else {
			if (feeMethod) {
				return ORDER_CONFIGURATION.SPLIT_FEE_METHOD;
			} else {
				return ORDER_CONFIGURATION.PROTOCOL_FEE_METHOD;
			}
		}
	};

	const specifyStartPrice = (): number => {
		if (saleKind === FIXED) {
			return fixedPrice;
		} else {
			return startPrice;
		}
	};

	const specifyEndPrice = (): number => {
		if (saleKind === FIXED) {
			return fixedPrice;
		} else {
			return endPrice;
		}
	};

	const handleStep1 = async (isCheck: boolean): Promise<void> => {
		if (!chainId || !address || !collection) {
			console.log('Missing Field Step 1');
			return;
		}

		// setLoading state
		if (isCheck) {
			setStep1({ ...step1, isChecking: true });
		} else {
			setStep1({ ...step1, isExecuting: true });
		}

		// execute
		const data: ApproveWalletNftAssetInput = {
			chainId,
			userAddress: address,
			collectionAddress: collection.collectionAddress,
			itemStandard: collection.collectionStandard,
		};
		const isCompleted = await ApproveWalletNftAsset(data, isCheck);

		// setLoading state
		if (isCheck) {
			setStep1({ ...step1, isChecking: false });
		} else {
			setStep1({ ...step1, isExecuting: false });
		}

		// set completed state
		if (isCompleted) {
			setStep1({ ...step1, isCompleted: true });
		} else {
			setStep1({ ...step1, isCompleted: false });
		}
	};

	const handleStep2 = async (): Promise<void> => {
		if (!collection || !tokenPayment || !address || !chainId) {
			console.log('Missing Field Step 2');
			return;
		}

		// setLoading state
		setStep2({ ...step2, isExecuting: true });

		// execute
		const data: ApproveRoyaltiesFeeForSellInput = {
			royalties: collection.royalties,
			startPrice: specifyStartPrice(),
			paymentToken: String(tokenPayment.value),
			chainId,
			userAddress: address,
		};
		const isCompleted: boolean = await ApproveRoyaltiesFee(data);
		// setLoading state

		setStep2({ ...step2, isExecuting: false });

		// set completed state
		if (isCompleted) {
			setStep2({ ...step2, isCompleted: true });
		} else {
			setStep2({ ...step2, isCompleted: false });
		}
	};

	const handleStep3 = async (): Promise<void> => {
		if (!chainId || !address || !currentItem || !collection || !tokenPayment) {
			console.log('Missing Field Step 3');
			return;
		}
		// setLoading state
		setStep3({ ...step3, isExecuting: true });

		// execute
		// dutch must be split_fee method
		const data: HashOrderAndSignForSellInput = {
			chainId,
			userAddress: address,
			paymentToken: String(tokenPayment.value),
			feeMethod: specifyFeeMethod(),
			startPrice: specifyStartPrice(),
			endPrice: specifyEndPrice(),
			quantity: isErc1155 ? quantity : 1,
			itemTokenId: currentItem.itemTokenId,
			itemStandard: currentItem.itemStandard,
			collectionAddress: collection.collectionAddress,
			collectionOwner: collection.userAddress,
			royalties: collection.royalties,
			web3: currentProvider,
			startTime: moment(startTime).format('X'),
			endTime: moment(endTime).format('X'),
			saleKind,
			itemId: currentItem._id,
			collectionId: collection._id,
		};
		const isCompleted = await HashOrderAndSign(data);

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
		if (currentItem) navigate(`${PATH_ITEM.detail}/${currentItem._id}`);
	};

	return (
		<>
			<Stack spacing={2} color="#5A5D79">
				{saleKind === FIXED && (
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Title variant="h6" color="#131740">
							Price:
						</Title>
						<ContentText variant="h6">
							{state.fixedPrice} {state.tokenPayment?.name}
						</ContentText>
					</Box>
				)}
				{saleKind === DUTCH && (
					<Fragment>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Title variant="h6" color="#131740">
								Start price:
							</Title>
							<ContentText variant="h6">
								{state.startPrice} {state.tokenPayment?.name}
							</ContentText>
						</Box>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Title variant="h6">End price:</Title>
							<ContentText variant="h6">
								{state.endPrice} {state.tokenPayment?.name}
							</ContentText>
						</Box>
					</Fragment>
				)}

				<Box>
					<Title variant="h6" color="#131740">
						Start sale:
					</Title>
					<ContentText variant="h6">
						{moment(startTime).format('MMMM DD, YYYY, h:mm a')}
					</ContentText>
				</Box>
				<Box>
					<Title variant="h6" color="#131740">
						End sale:
					</Title>
					<ContentText variant="h6">
						{moment(endTime).format('MMMM DD, YYYY, h:mm a')}
					</ContentText>
				</Box>

				<Box>
					<Title variant="h6" color="#131740">
						Fees:
					</Title>
					<ContentText variant="h6">
						Listing is free! At the time of the sale, the following fees will be
						deducted.
					</ContentText>
					<ContentText variant="h6">- Royalties: {collection?.royalties}%</ContentText>
					<ContentText variant="h6">
						- Service fee:{' '}
						{saleKind === FIXED && feeMethod === ORDER_CONFIGURATION.PROTOCOL_FEE_METHOD
							? '0'
							: `${ServiceFee}`}
						%
					</ContentText>
				</Box>
				<Box>
					<ButtonGradient
						onClick={onSubmit}
						disabled={
							!address ||
							!chainId ||
							!currentItem ||
							!tokenPayment?.value ||
							!collection
						}
					>
						<Typography variant="h6">Listing</Typography>
					</ButtonGradient>
				</Box>
			</Stack>

			{/* <PreviewItemWrapper>
				<PreviewItem media={media} thumbnail={thumbnail} name={name} />
			</PreviewItemWrapper> */}

			<Modal
				onOpen={modal}
				onClose={() => {
					setModal(false);
				}}
				allowClose={
					!step1.isExecuting &&
					!step2.isExecuting &&
					!step3.isExecuting &&
					!step3.isCompleted
				}
				mainHeader={'Complete listing'}
				style={{ maxWidth: '600px', overflowY: 'auto' }}
			>
				<Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 2 }}>
					{/* ===================================================================== STEP 1 =====================================================================*/}
					<Step>
						<StepLabel
							optional={<Typography variant="caption">One-time fees</Typography>}
						>
							Initialize your account
						</StepLabel>
						<StepContent>
							<Typography>
								One-time fees are incurred whenever you initialize your account for
								the first time.
							</Typography>
							<Box sx={{ mb: 2 }}>
								<ButtonGradient
									onClick={() => {
										handleStep1(false);
									}}
									disabled={step1.isChecking || step1.isExecuting}
									sx={{ width: '180px' }}
								>
									{(step1.isChecking || step1.isExecuting) && (
										<CircularProgress
											sx={{ color: 'white', mr: 1 }}
											size={16}
										/>
									)}

									<Typography variant="button">
										{step1.isChecking
											? 'Checking...'
											: step1.isExecuting
											? 'Executing...'
											: 'Initialize'}
									</Typography>
								</ButtonGradient>
							</Box>
						</StepContent>
					</Step>

					{/* ===================================================================== STEP 2 =====================================================================*/}
					<Step>
						<StepLabel
							optional={<Typography variant="caption">Recurring fees</Typography>}
						>
							Approve token
						</StepLabel>
						<StepContent>
							<Typography>
								Recurring fees are incurred whenever doing actions on blockchain.
							</Typography>
							<Box sx={{ mb: 2 }}>
								<ButtonGradient
									onClick={() => {
										handleStep2();
									}}
									disabled={step2.isChecking || step2.isExecuting}
									sx={{ width: '180px', mt: 1 }}
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
											: 'Approve'}
									</Typography>
								</ButtonGradient>
							</Box>
						</StepContent>
					</Step>

					{/* ===================================================================== STEP 3 =====================================================================*/}
					<Step>
						<StepLabel optional={<Typography variant="caption">No gas fee</Typography>}>
							Confirm listing
						</StepLabel>
						<StepContent>
							<Typography>
								Accept request of sign type data and list your NFT item to
								Metaspacecy marketplace.
							</Typography>
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
											: 'Confirm'}
									</Typography>
								</ButtonGradient>
							</Box>
						</StepContent>
					</Step>

					{/* ===================================================================== STEP 4 =====================================================================*/}
					<Step>
						<StepLabel optional={null}>Listing Successfully</StepLabel>
						<StepContent>
							<Typography>Your item is listing!</Typography>
							<Box sx={{ mb: 2 }}>
								<ButtonGradient
									onClick={handleDone}
									sx={{
										width: '180px',
										mt: 1,
										background: 'rgba(157, 195, 230, 0.6)',
									}}
								>
									<Typography variant="button">View listing</Typography>
								</ButtonGradient>
							</Box>
						</StepContent>
					</Step>
				</Stepper>
			</Modal>
		</>
	);
}

export default PreviewAuction;
