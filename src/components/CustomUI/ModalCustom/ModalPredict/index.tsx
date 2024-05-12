/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
import { selectAddress, selectBalance, selectChainId } from 'redux/slices/web3InfoSlice';
// import { CreateOrderForOfferAction } from 'redux/actions/OrderAction/createOrderForOfferAction';
import { toast } from 'react-toastify';
// import ButtonWhite from 'components/CustomUI/ButtonWhite';
import FormPrediction from 'components/Form/FormPrediction';
import { AcceptEventAction, ApproveForPredictInput } from 'redux/actions/EventAction';
import { BigNumber } from 'ethers';
import { erc20function } from 'utils/contract/erc20Function';
import {
	PredictionContractFunction,
	predictEventData,
} from 'utils/contract/predictionContractFunction';
import { formatUnits, parseUnits } from '@ethersproject/units';
import eventApi from 'apis/eventApi';
import { isNativeToken } from 'utils';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DialogContentStyle, DialogStyle } from '../styled';
import Modal from 'components/CustomUI/Modal';
// import { parseEther } from '@ethersproject/units';
// const { ApproveItemPriceAndServiceFee } = CreateOrderForOfferAction();
const { ApproveForPredict } = AcceptEventAction();
const { predictEvent } = PredictionContractFunction();

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
interface dataPredict {
	amount: any;
	amountEther: number;
	outcome: any;
	option: any;
}

const ModalPredict = ({ isModal = true, open = false, handleClose, dataEvent }: IProps) => {
	const [dataPredict, setDataPredict] = React.useState<dataPredict | null>(null);
	const [modalConfirm, setModalConfirm] = React.useState(false);
	const [step1, setStep1] = React.useState<StepStatus>(initialStepStatus);
	const [step2, setStep2] = React.useState<StepStatus>(initialStepStatus);
	const [activeStep, setActiveStep] = React.useState<number>(0);

	const [balanceEventUser, setBalanceEventUser] = React.useState<number>(0);
	//
	const chainId = useSelector(selectChainId);
	const userAddress = useSelector(selectAddress);
	const userBalance = useSelector(selectBalance);
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
	React.useEffect(() => {
		const resolveGetBalanceUserWithEvent = async () => {
			if (dataEvent?.paymentToken && userAddress) {
				if (isNativeToken(dataEvent?.paymentToken as string)) {
					setBalanceEventUser(Number(userBalance));
					return;
				}
				const result = await erc20function().getBalanceOfUser(
					userAddress,
					dataEvent.paymentToken
				);
				let balanceOfUser = formatUnits(result.toString(), 18);
				setBalanceEventUser(Number(balanceOfUser));
			}
		};
		resolveGetBalanceUserWithEvent();
	}, [dataEvent]);
	// useSelector
	// const isLoadingItem = useSelector(selectLoading);

	// const listTokenPayment: TokenPayment[] = useSelector(selectListTokenPayment);
	const handleStep1 = async (): Promise<void> => {
		if (!chainId || !userAddress || !dataPredict || !dataEvent) {
			toast.error('Missing Field Step 1');
			return;
		}

		// setLoading state
		setStep1({ ...step1, isExecuting: true });
		// execute
		const data: ApproveForPredictInput = {
			userAddress,
			chainId,
			paymentToken: dataEvent.paymentToken,
			amount: dataPredict?.amountEther,
		};
		console.log(dataPredict);
		const isCompleted = await ApproveForPredict(data);

		// setLoading state
		setStep1({ ...step1, isExecuting: false });

		// set completed state
		console.log(isCompleted);
		if (isCompleted) {
			setStep1({ ...step1, isCompleted: true });
		} else {
			setStep1({ ...step1, isCompleted: false });
		}
	};

	const handleStep2 = async (): Promise<void> => {
		if (!userAddress || !chainId || !dataPredict || !dataEvent) {
			console.log('Missing Field Step 2');
			return;
		}

		// setLoading state
		setStep2({ ...step2, isExecuting: true });
		const data: predictEventData = {
			chainId,
			userAddress,
			paymentToken: dataEvent.paymentToken,
			eventId: dataEvent.eventId,
			option: dataPredict.option,
			amount: dataPredict.amount,
		};
		let isCompleted = false;
		await predictEvent(data)
			.then(async (result: any) => {
				setStep2({ ...step2, isExecuting: false });
				const dataResult = result.events.PredictedEvent;
				console.log(dataResult);
				const dataPost: any = {
					userAddress: dataResult.returnValues.predictor,
					eventObjectId: dataEvent._id,
					option: Number(dataResult.returnValues.option),
					amount: dataResult.returnValues.amount,
					txHash: dataResult.transactionHash,
				};
				const resutlPredict = await eventApi.predictEvent(dataPost);
				if (resutlPredict) {
					isCompleted = true;
					toast.success(' Predict successfully');
				}
			})
			.catch((error) => {
				toast.error('Failed to predict');
			});

		// // setLoading state

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
	async function handlePredict(data: dataPredict) {
		if (!userAddress || !chainId) {
			toast.error('Please connect with wallet to make this feature');
			return;
		}
		if (!dataEvent) {
			toast.error('Missing field!');
			return;
		}
		try {
			let totalAmountToWei: BigNumber = BigNumber.from(0);
			let isEnough = false;
			if (isNativeToken(dataEvent.paymentToken)) {
				totalAmountToWei = parseUnits(data.amount.toString(), 18);
				isEnough = data.amount < userBalance;
			} else {
				totalAmountToWei = await erc20function().changeTokenToWei(
					dataEvent.paymentToken,
					data.amount
				);

				isEnough = await erc20function().checkBalance(
					dataEvent.paymentToken,
					userAddress,
					totalAmountToWei
				);
			}

			if (!isEnough) {
				toast.error('Split fee: Not enough Token to purchase!');
				return;
			}
			setDataPredict({
				...data,
				amountEther: data.amount,
				amount: totalAmountToWei.toString(),
			});
			handleClose && handleClose();
			setModalConfirm(true);
		} catch (error) {
			toast.error('Failed to predict');
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
					{/* <DialogContentStyle> */}
					<FormPrediction
						title="Predict Event"
						note="Select the option"
						submitTxt="Predict"
						onSubmit={handlePredict}
						dataEvent={{ ...dataEvent, balance: balanceEventUser }}
					/>
					{/* </DialogContentStyle> */}
				</Modal>
			) : (
				<FormPrediction
					title="Predict Event"
					note="Select the option"
					submitTxt="Predict"
					onSubmit={handlePredict}
					dataEvent={{ ...dataEvent, balance: balanceEventUser }}
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
								Confirm
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
							<StepLabel optional={null}>Successfully</StepLabel>
							<StepContent>
								{/* <Typography>Your offer is up!</Typography> */}
								<Box sx={{ mb: 2 }}>
									<ButtonGradient
										onClick={handleDone}
										sx={{ width: '180px', mt: 1 }}
									>
										<Typography variant="button">Finish</Typography>
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

export default ModalPredict;
