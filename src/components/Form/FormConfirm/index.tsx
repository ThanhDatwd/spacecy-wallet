import React from 'react';
import {
	Box,
	Typography,
	CircularProgress,
	Stepper,
	Step,
	StepLabel,
	StepContent,
} from '@mui/material';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId, selectCurrentProvider } from 'redux/slices/web3InfoSlice';
import { CreateOrderForOfferAction } from 'redux/actions/OrderAction/createOrderForOfferAction';
import { toast } from 'react-toastify';

const { ApproveItemPriceAndServiceFee } = CreateOrderForOfferAction();
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

const FormConFirm = ({ data }: any) => {
	console.log(data);
	const [step1, setStep1] = React.useState<StepStatus>(initialStepStatus);
	const [step2, setStep2] = React.useState<StepStatus>(initialStepStatus);
	const [activeStep, setActiveStep] = React.useState<number>(0);
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
	const web3Info = useSelector(selectCurrentProvider);
	// const listTokenPayment: TokenPayment[] = useSelector(selectListTokenPayment);

	const handleStep1 = async (): Promise<void> => {
		if (!chainId || !userAddress) {
			toast.error('Missing Field Step 1');
			return;
		}

		// setLoading state
		setStep1({ ...step1, isExecuting: true });

		// execute
		const data = {
			offerPrice: 0,
			paymentToken: 'adadad',
			userAddress,
			chainId,
		};
		// console.log(data);
		const isCompleted = await ApproveItemPriceAndServiceFee(data);

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
		if (!userAddress || !chainId || !web3Info) {
			console.log('Missing Field Step 2');
			return;
		}

		// setLoading state
		setStep2({ ...step2, isExecuting: true });

		// execute
		// const data: HashOrderAndSignForCreateOfferInput = {
		// 	chainId,
		// 	userAddress,
		// 	paymentToken: dataForOffer.paymentToken,
		// 	offerPrice: dataForOffer.offerPrice,
		// 	quantity: dataForOffer.quantity,
		// 	listingTime: String(dateToTimestamp(new Date())),
		// 	expirationTime: String(dataForOffer.expirationTime),
		// 	itemTokenId: item.itemTokenId,
		// 	itemStandard: item.itemStandard,
		// 	collectionAddress: item.collectionInfo.collectionAddress,
		// 	collectionOwner: item.collectionInfo.userAddress,
		// 	royalties: item.collectionInfo.royalties,
		// 	web3: web3Info,
		// 	itemId: item._id,
		// 	collectionId: item.collectionInfo._id,
		// };
		// console.log(data);
		// const isCompleted: boolean = await HashOrderAndSign(data);

		// // setLoading state
		// setStep2({ ...step2, isExecuting: false });

		// // set completed state
		// if (isCompleted) {
		// 	setStep2({ ...step2, isCompleted: true });
		// } else {
		// 	setStep2({ ...step2, isCompleted: false });
		// }
	};

	const handleDone = () => {
		window.location.reload();
	};
	return (
		<Box>
			<Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 2 }}>
				{/* ===================================================================== STEP 1 =====================================================================*/}
				<Step>
					<StepLabel optional={<Typography variant="caption">Recurring fees</Typography>}>
						Approve token
					</StepLabel>
					<StepContent>
						<Typography>
							Recurring fees are incurred whenever doing actions on blockchain.
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
									<CircularProgress sx={{ color: 'white', mr: 1 }} size={16} />
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
					<StepLabel optional={<Typography variant="caption">No gas fee</Typography>}>
						Confirm offer
					</StepLabel>
					<StepContent>
						<Typography>
							Accept request of sign type data and put your offer to this item .
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
									<CircularProgress sx={{ color: 'white', mr: 1 }} size={16} />
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
						<Typography>Your offer is up!</Typography>
						<Box sx={{ mb: 2 }}>
							<ButtonGradient onClick={handleDone} sx={{ width: '180px', mt: 1 }}>
								<Typography variant="button">Agree</Typography>
							</ButtonGradient>
						</Box>
					</StepContent>
				</Step>
			</Stepper>
		</Box>
	);
};

export default FormConFirm;
