/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
	Box,
	Typography,
	CircularProgress,
	Stepper,
	Step,
	StepLabel,
	StepContent,
	DialogContent,
} from '@mui/material';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
// import { CreateOrderForOfferAction } from 'redux/actions/OrderAction/createOrderForOfferAction';
import { toast } from 'react-toastify';
// import ButtonWhite from 'components/CustomUI/ButtonWhite';
import FormPrediction from 'components/Form/FormPrediction';
import { AcceptEventAction, ApproveForRedeemInput } from 'redux/actions/EventAction';
// import { BigNumber } from 'ethers';
import {
	PredictionContractFunction,
	redeemEventData,
} from 'utils/contract/predictionContractFunction';
import { formatUnits } from '@ethersproject/units';
import eventApi from 'apis/eventApi';
import { DialogContentStyle, DialogStyle } from '../styled';
import { erc20function } from 'utils';
import Modal from 'components/CustomUI/Modal';
// import { parseEther } from '@ethersproject/units';
// const { ApproveItemPriceAndServiceFee } = CreateOrderForOfferAction();
const { ApproveForRedeem, getBalanceOfEvent } = AcceptEventAction();
const { redeemEvent } = PredictionContractFunction();

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
interface IProps {
	open?: boolean;
	handleClose?: void | any;
	isModal?: boolean;
	dataEvent: {
		_id: string;
		paymentToken: string;
		eventId: any;
		outcomes?: any[];
		options?: any[];
		message?: string;
		time?: any;
		balance?: any;
		totalReward: number;
		status: number;
		dataPayment?: any;
	};
}
interface dataRedeem {
	amount: any;
	outcome: any;
	option: any;
}

const ModalRedeem = ({ isModal = true, open = false, handleClose, dataEvent }: IProps) => {
	const [dataRedeem, setDataRedeem] = React.useState<dataRedeem | null>(null);
	const [modalConfirm, setModalConfirm] = React.useState(false);
	const [step1, setStep1] = React.useState<StepStatus>(initialStepStatus);
	const [step2, setStep2] = React.useState<StepStatus>(initialStepStatus);
	const [activeStep, setActiveStep] = React.useState<number>(0);
	const [balanceEventUser, setBalanceEventUser] = React.useState<any>(0);
	// const handleCloseModalPredict = (e: any) => {
	// 	e.preventDefault();
	// 	setModalPredict(false);
	// };
	const handleCloseModalConfirm = (e: any) => {
		e.preventDefault();
		if (
			step2.isChecking === false &&
			step2.isExecuting === false &&
			step2.isCompleted === true
		) {
			window.location.reload();
		}
		setModalConfirm(false);
	};
	React.useEffect(() => {
		if (step1.isCompleted) {
			setActiveStep(1);
			if (step2.isCompleted) {
				setActiveStep(2);
			}
		}
	}, [step1, step2]);
	// useSelector
	// const isLoadingItem = useSelector(selectLoading);
	const chainId = useSelector(selectChainId);
	const userAddress = useSelector(selectAddress);
	// const listTokenPayment: TokenPayment[] = useSelector(selectListTokenPayment);

	const handleStep1 = async (): Promise<void> => {
		if (!chainId || !userAddress || !dataRedeem || !dataEvent) {
			toast.error('Missing Field Step 1');
			return;
		}

		// setLoading state
		setStep1({ ...step1, isExecuting: true });
		// execute
		const data: ApproveForRedeemInput = {
			userAddress,
			chainId,
		};
		const isCompleted = await ApproveForRedeem(data, false);

		// setLoading state
		setStep1({ ...step1, isExecuting: false });

		// set completed state
		if (isCompleted) {
			setStep1({ ...step1, isCompleted: true });
		} else {
			setStep1({ ...step1, isCompleted: false });
		}
	};

	const handleStep2 = async (): Promise<void> => {
		if (!userAddress || !chainId || !dataRedeem || !dataEvent) {
			console.log('Missing Field Step 2');
			return;
		}

		// setLoading state
		setStep2({ ...step2, isExecuting: true });
		const data: redeemEventData = {
			chainId,
			userAddress,
			eventId: dataEvent.eventId,
			option: dataRedeem.option,
			amount: dataRedeem.amount,
		};
		let isCompleted = false;
		await redeemEvent(data)
			.then(async (result: any) => {
				setStep2({ ...step2, isExecuting: false });
				const dataResult = result.events.RedeemEvent;
				const dataPost: any = {
					userAddress: dataResult.returnValues.predictor,
					eventObjectId: dataEvent._id,
					option: Number(dataResult.returnValues.option),
					amount: dataResult.returnValues.reward,
					txHash: dataResult.transactionHash,
				};
				const resutlPredict = await eventApi.redeemEvent(dataPost);
				if (resutlPredict) {
					isCompleted = true;
					toast.success('Redeem successfully');
				}
			})
			.catch((error) => {
				console.log(error);
				toast.error('Failed to redeem');
			});

		// // setLoading state
		setStep2({ ...step2, isExecuting: false });

		// set completed state
		if (isCompleted) {
			setStep2({ ...step2, isCompleted: true });
		} else {
			setStep2({ ...step2, isCompleted: false });
		}
	};

	const handleDone = () => {
		window.location.reload();
	};
	async function handleRedeem(data: any) {
		if (!userAddress || !chainId) {
			toast.error('Please connect with wallet to make this feature');
			return;
		}
		if (!dataEvent) {
			toast.error('Missing field!');
			return;
		}
		try {
			const amountToWei = await erc20function().changeTokenToWei(
				dataEvent.paymentToken,
				data.amount
			);
			setDataRedeem({ ...data, amount: amountToWei.toString() });
			console.log({ ...data, amount: amountToWei.toString() });
			handleClose && handleClose();
			setModalConfirm(true);
		} catch (error) {
			console.log(error);
			toast.error('Failed to redeem');
		}
	}

	return (
		<>
			{isModal === true ? (
				<Modal
					onOpen={open}
					isHasHeader={false}
					onClose={handleClose}
					style={{ padding: '0', width: '450px' }}
				>
					<DialogContentStyle>
						<FormPrediction
							note="Select an option"
							submitTxt="Redeem"
							onSubmit={handleRedeem}
							dataEvent={dataEvent}
							isRedeem={true}
						/>
					</DialogContentStyle>
				</Modal>
			) : (
				<FormPrediction
					submitTxt="Redeem"
					note="Select an option"
					onSubmit={handleRedeem}
					isRedeem={true}
					dataEvent={dataEvent}
				/>
			)}
			<Modal
				onOpen={modalConfirm}
				isHasHeader={false}
				onClose={handleCloseModalConfirm as VoidFunction}
				style={{ padding: '0', width: '450px' }}
			>
				<DialogContent sx={{ width: '450px', maxWidth: '100%' }}>
					<Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 2 }}>
						{/* ===================================================================== STEP 1 =====================================================================*/}
						<Step>
							<StepLabel
								optional={<Typography variant="caption">Recurring fees</Typography>}
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
											handleStep1();
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
												: 'Approve'}
										</Typography>
									</ButtonGradient>
								</Box>
							</StepContent>
						</Step>

						{/* ===================================================================== STEP 2 =====================================================================*/}
						<Step>
							<StepLabel optional={<Typography variant="caption"></Typography>}>
								Confirm offer
							</StepLabel>
							<StepContent>
								<Typography>
									The action is being processed and will incur a fee.
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
												: 'Confirm'}
										</Typography>
									</ButtonGradient>
								</Box>
							</StepContent>
						</Step>

						{/* ===================================================================== STEP 3 =====================================================================*/}
						<Step>
							<StepLabel optional={null}>Offer Successfully</StepLabel>
							<StepContent>
								{/* <Typography>Your offer is up!</Typography> */}
								<Box sx={{ mb: 2 }}>
									<ButtonGradient
										onClick={handleDone}
										sx={{ width: '180px', mt: 1 }}
									>
										<Typography variant="button">Agree</Typography>
									</ButtonGradient>
								</Box>
							</StepContent>
						</Step>
					</Stepper>
				</DialogContent>
			</Modal>
		</>
	);
};

export default ModalRedeem;
