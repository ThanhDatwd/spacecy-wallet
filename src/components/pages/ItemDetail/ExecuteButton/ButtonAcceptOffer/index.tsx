/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// mui
import {
	Avatar,
	Box,
	Checkbox,
	CircularProgress,
	Link,
	Stack,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
	useTheme,
} from '@mui/material';
// components
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import Modal from 'components/CustomUI/Modal';
// models
import {
	NFT,
	OrderResponseAPI,
	ApproveWalletNftAssetInput,
	ApproveRoyaltiesFeeForAcceptOfferInput,
	ExecuteAtomicMatchForAcceptOfferInput,
} from 'models';
// models
import { AcceptOrderForOfferAction } from 'redux/actions/OrderAction/acceptOrderForOfferAction';
// utils
import { compareDate, formatNumber, sliceAddress, timestampToDate } from 'utils';
// redux
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId, selectCurrentProvider } from 'redux/slices/web3InfoSlice';
import { selectNftItem, selectLoading } from 'redux/slices/nftItemByItemIdSlice';
// actions
import { ApproveWalletNftAsset } from 'redux/actions/OrderAction/common';
// constants
import { RELATED_URLS } from '../../../../../constants';
// order actions
const { ApproveRoyaltiesFee, ExecuteAtomicMatch } = AcceptOrderForOfferAction();

export interface StepStatus {
	isChecking: boolean;
	isExecuting: boolean;
	isCompleted: boolean;
}

const initialStepStatus: StepStatus = {
	isChecking: false,
	isExecuting: false,
	isCompleted: false,
};

export interface IButtonAcceptOfferProps {
	orderBuy: OrderResponseAPI;
}

export default function ButtonAcceptOffer({ orderBuy }: IButtonAcceptOfferProps) {
	const theme = useTheme();
	// useState
	const [modal, setModal] = useState(false);
	const [step1, setStep1] = useState<StepStatus>(initialStepStatus);
	const [step2, setStep2] = useState<StepStatus>(initialStepStatus);
	const [step3, setStep3] = useState<StepStatus>(initialStepStatus);
	const [activeStep, setActiveStep] = useState<number>(0);
	const [checked, setChecked] = useState<boolean>(false);
	const [isOfferExpired, setIsOfferExpired] = useState<boolean>(false);

	// useSelector
	const item: NFT | null = useSelector(selectNftItem);
	const chainId = useSelector(selectChainId);
	const isLoadingItem = useSelector(selectLoading);
	const userAddress = useSelector(selectAddress);
	const web3Info = useSelector(selectCurrentProvider);

	// useEffect
	// Check steps when accepting offer
	useEffect(() => {
		if (modal) {
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

	// Change Active Step Accept Offer
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

	// check if the offer is expired
	useEffect(() => {
		if (compareDate(new Date(), timestampToDate(parseInt(orderBuy.expirationTime))) > 0) {
			setIsOfferExpired(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// functions
	const isQualifiedToAcceptOffer = (): boolean => {
		if (
			!isLoadingItem &&
			item &&
			userAddress &&
			item.owner.includes(userAddress) &&
			orderBuy.maker !== userAddress
		) {
			return true;
		}
		return false;
	};

	const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	const handleAcceptOffer = async () => {
		try {
			// this condition met when user go to this page when the offer is not expired and click a button when the offer is expired
			if (compareDate(new Date(), timestampToDate(parseInt(orderBuy.expirationTime))) > 0) {
				setIsOfferExpired(true);
				return;
			}

			setModal(true);
		} catch (error) {
			toast.error('Some error occur when getting offer order!');
			console.log(error);
		}
	};

	const handleStep1 = async (isCheck: boolean): Promise<void> => {
		if (!chainId || !item || !item.collectionInfo || !userAddress) {
			console.log('Missing Field Step 1!');
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
			userAddress,
			collectionAddress: item.collectionInfo.collectionAddress,
			itemStandard: item.itemStandard,
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
		if (!userAddress || !chainId) {
			console.log('Missing Field Step 2!');
			return;
		}

		// setLoading state
		setStep2({ ...step2, isExecuting: true });

		// execute
		const data: ApproveRoyaltiesFeeForAcceptOfferInput = {
			userAddress,
			chainId,
			orderBuy,
		};
		const isCompleted = await ApproveRoyaltiesFee(data);

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
		if (!chainId || !userAddress || !item) {
			console.log('Missing Field Step 3');
			return;
		}
		// setLoading state
		setStep3({ ...step3, isExecuting: true });

		// execute
		// dutch must be split_fee method
		const data: ExecuteAtomicMatchForAcceptOfferInput = {
			orderBuy,
			userAddress,
			chainId,
			web3: web3Info,
			itemTokenId: item.itemTokenId,
			itemStandard: item.itemStandard,
			collectionId: item.collectionId,
		};
		const isCompleted = await ExecuteAtomicMatch(data);

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
		window.location.reload();
	};

	return (
		<>
			{isQualifiedToAcceptOffer() && (
				<ButtonGradient
					sx={{ mb: 0 }}
					disabled={isOfferExpired}
					onClick={() => handleAcceptOffer()}
				>
					<Typography variant="body1">{isOfferExpired ? 'Expired' : 'Accept'}</Typography>
				</ButtonGradient>
			)}

			{item && (
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
					mainHeader={'Accepting offer'}
					style={{ maxWidth: '450px', overflowY: 'auto' }}
				>
					<Box sx={{ p: '0 2rem 2rem 2rem' }}>
						<Box>
							<Typography
								variant="caption"
								sx={{ color: theme.palette.text.special }}
							>
								{item.collectionInfo?.collectionName}
							</Typography>
							<Typography variant="h4">{item.itemName}</Typography>
						</Box>

						<Stack spacing={1} sx={{ mt: 2 }}>
							<Stack direction="row" justifyContent="space-between">
								<Typography variant="body2">Quantity:</Typography>
								<Typography variant="body2">{orderBuy.quantity}</Typography>
							</Stack>

							<Stack direction="row" justifyContent="space-between">
								<Typography variant="body2">Price:</Typography>
								<Typography variant="body2">
									{formatNumber(orderBuy.salePrice ?? 0, 0, 4)}{' '}
									{orderBuy.tokenSymbol?.toUpperCase()}
								</Typography>
							</Stack>

							<Stack direction="row" justifyContent="space-between">
								<Typography variant="body2">
									Royalties fee ( {Number(orderBuy.takerRelayerFee) / 100}% ):
								</Typography>
								<Typography variant="body2">
									{formatNumber(
										(Number(orderBuy.salePrice) *
											Number(orderBuy.takerRelayerFee)) /
											10000,
										0,
										6
									)}{' '}
									{orderBuy.tokenSymbol?.toUpperCase()}
								</Typography>
							</Stack>
						</Stack>

						<Stack
							direction="row"
							alignItems="center"
							sx={{ marginLeft: '-10px', marginTop: 2 }}
						>
							<Checkbox
								checked={checked}
								aria-checked="false"
								onChange={handleChangeCheckBox}
							/>
							<Typography variant="body2" component="span">
								I agree to Metaspacecy
							</Typography>
							<Link
								variant="body2"
								sx={{
									ml: 0.5,
									color: theme.palette.text.special,
									cursor: 'pointer',
									'&:hover': {
										textDecoration: 'underline !important',
									},
								}}
								href="/#/terms-of-service"
								target="_blank"
							>
								Terms of Service
							</Link>
						</Stack>

						<Box height="1px" sx={{ borderBottom: '1px solid' }} />

						<Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
							<Typography variant="body2">Total Earnings:</Typography>
							<Typography variant="body2">
								{Number(orderBuy.salePrice) -
									(Number(orderBuy.salePrice) *
										Number(orderBuy.takerRelayerFee)) /
										10000}{' '}
								{orderBuy.tokenSymbol?.toUpperCase()}
							</Typography>
						</Stack>

						{checked && (
							<Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 2 }}>
								{/* ===================================================================== STEP 1 =====================================================================*/}
								<Step>
									<StepLabel
										optional={
											<Typography variant="caption">One-time fees</Typography>
										}
									>
										Initialize your wallet
									</StepLabel>
									<StepContent>
										<Typography>
											To get set up for selling on Metaspacecy for the first
											time, you must initialize your wallet, which requires a
											one-time gas fee.
										</Typography>
										<Box sx={{ mb: 2 }}>
											<ButtonGradient
												onClick={() => {
													handleStep1(false); // isCheck = false
												}}
												disabled={step1.isChecking || step1.isExecuting}
												sx={{ width: '180px', mb: 0, mt: 2 }}
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
										optional={
											<Typography variant="caption">
												Recurring fees
											</Typography>
										}
									>
										Approve token
									</StepLabel>
									<StepContent>
										<Typography>
											Recurring fees are incurred whenever doing actions on
											blockchain.
										</Typography>
										<Box sx={{ mb: 2 }}>
											<ButtonGradient
												onClick={() => {
													handleStep2();
												}}
												disabled={step2.isChecking || step2.isExecuting}
												sx={{ width: '180px', mt: 1, mb: 0 }}
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
									<StepLabel
										optional={
											<Typography variant="caption">
												Recurring fees
											</Typography>
										}
									>
										Completing Accept Offer
									</StepLabel>
									<StepContent>
										<Typography>
											Complete accept offer automatic with contract.
										</Typography>
										<Box sx={{ mb: 2 }}>
											<ButtonGradient
												onClick={() => {
													handleStep3();
												}}
												disabled={step3.isChecking || step3.isExecuting}
												sx={{ width: 'fit-content', mt: 1, mb: 0 }}
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
									<StepLabel optional={null}>Accept Offer Successfully</StepLabel>
									<StepContent>
										<Typography>Your item is sold!</Typography>
										<Box sx={{ mb: 2 }}>
											<ButtonGradient
												onClick={handleDone}
												sx={{ width: '180px', mt: 1, mb: 0 }}
											>
												<Typography variant="button">Done</Typography>
											</ButtonGradient>
										</Box>
									</StepContent>
								</Step>
							</Stepper>
						)}
					</Box>
				</Modal>
			)}
		</>
	);
}
