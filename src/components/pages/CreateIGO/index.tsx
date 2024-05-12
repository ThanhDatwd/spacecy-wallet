/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Box,
	CircularProgress,
	Input,
	Stack,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import igoApi from 'apis/igoApi';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import { ApproveAuction, ApproveData, Response } from 'models';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectAddress, selectChainId, selectCurrentProvider } from 'redux/slices/web3InfoSlice';
import IGOOffering from './Body';
import EndedIGO from './Footer';
import CreateIGO from './Header';

import HeaderImg from 'assets/Test/header.jpeg';
import BackgroundImg from 'assets/Test/background.jpeg';
import LogoImg from 'assets/Test/logo.jpeg';
import { IGOPreview } from 'models/IGO';
import Modal from 'components/CustomUI/Modal';
import { ApproveAuctionFunction } from 'redux/actions/OrderAction/createAuction';
import { ApproveFunction } from 'redux/actions/OrderAction/createIGO';
import { getWeb3Contract } from 'hooks';
import INO721 from 'abis/INO/INO721.json';
import INO1155 from 'abis/INO/INO1155.json';
import { useNavigate } from 'react-router-dom';
import { ButtonBlue } from 'pages/Home/styled';
import { BigNumber } from 'ethers';
import { TextArea } from 'components/CustomField/FieldTextArea/styled';
import FieldTextArea from 'components/CustomField/FieldTextArea';

const exampTypography = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

export interface ICreateIGOComponentProps {}

const data = {
	headerImg: HeaderImg,
	background: BackgroundImg,
	logo: LogoImg,
	thumbnail: '',
	nameProject: 'Vinh Test',
	description: exampTypography,
	startTime: 1660461091,
	endTime: 1660979431,
	networkPaymentName: 'ETH',
	networkPaymentPrice: 0.1,
	stableCoinPaymentPrice: 2,
	nativeTokenPaymentPrice: 3,
	totalItems: 1000,
	totalVolume: 300000,
};
const initialStepStatus: StepStatus = {
	isChecking: false,
	isExecuting: false,
	isCompleted: false,
};
export interface StepStatus {
	isChecking: boolean;
	isExecuting: boolean;
	isCompleted: boolean;
}

export default function CreateIGOComponent(props: ICreateIGOComponentProps) {
	const [requestId, setRequestId] = useState<string | undefined>();
	const [requestData, setRequestData] = useState<IGOPreview | undefined>();
	const [modal, setModal] = useState<boolean>(false);
	const [modalReport, setModalReport] = useState<boolean>(false);
	const [activeStep, setActiveStep] = useState<number>(0);
	const [step1, setStep1] = useState<StepStatus>(initialStepStatus);
	const [step2, setStep2] = useState<StepStatus>(initialStepStatus);
	const userAddress = useSelector(selectAddress);
	const web3Info = useSelector(selectCurrentProvider);

	const navigate = useNavigate();

	// Change Active Step
	useEffect(() => {
		if (step1.isCompleted) {
			setActiveStep(1);
			if (step2.isCompleted) {
				setActiveStep(2);
			}
		}
	}, [step1, step2]);

	useEffect(() => {
		if (!userAddress) return;
		(async () => {
			try {
				const data: Response<any> = await igoApi.getIdRequestIGOByUserAddress(userAddress);
				setRequestId(data.data[0]._id);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [userAddress]);

	useEffect(() => {
		if ((!userAddress && !requestId) || requestId === undefined) return;

		(async () => {
			try {
				const data: Response<any> = await igoApi.getRequestDetailByIGORequestId(requestId);
				setRequestData(data.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [userAddress, requestId]);

	const handleStep1 = async (isCheck: boolean): Promise<void> => {
		if (
			(!userAddress && !requestData) ||
			requestData === undefined ||
			userAddress === undefined ||
			userAddress === null
		) {
			return;
		}
		//

		if (isCheck) {
			setStep1({ ...step1, isChecking: true });
		} else {
			setStep1({ ...step1, isExecuting: true });
		}
		// excute
		const data: ApproveData = {
			userAddress,
			collectionAddress: requestData.collectionInfo.collectionAddress,
			operatorAddress: requestData.addressINO,
			standard: requestData.collectionInfo.collectionStandard,
		};
		const isCompleted = await ApproveFunction(data, isCheck);
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

	// Handle Step 2:
	const handleStep2 = async (): Promise<void> => {
		if (!userAddress || !web3Info || !requestData) {
			console.log('Missing Field Step 2');
			return;
		}

		// setLoading state
		setStep2({ ...step2, isExecuting: true });
		const listPayment = [
			requestData.networkPaymentAddress,
			requestData.stableCoinAddress,
			requestData.nativeTokenAddress,
		];
		const priceItems = [
			BigNumber.from(requestData.requestINO.networkPaymentPrice),
			BigNumber.from(requestData.requestINO.stableCoinPaymentPrice),
			BigNumber.from(requestData.requestINO.nativeTokenPaymentPrice),
		];
		if (requestData.collectionInfo.collectionStandard === 'ERC721') {
			const IGOContract = getWeb3Contract(INO721.abi, requestData.addressINO);
			const dataContract = await IGOContract.methods
				.createIno(
					requestData.collectionInfo.collectionAddress, //nftAddress
					[BigNumber.from('6')], // TokenIds
					listPayment, // PaymentTokens
					priceItems, // PriceItems
					requestData.limitItemsPerUser, // LimitItemPercent User
					requestData.floorPoint, // FloorPoint
					requestData.requestINO.startTime, // Start Time (s)
					requestData.requestINO.endTime // End Time (s)
				)
				.send({ from: userAddress });
		} else {
			const IGOContract = getWeb3Contract(INO1155.abi, requestData.addressINO);
			const dataContract = await IGOContract.methods
				.createIno(
					requestData.collectionInfo.collectionAddress, //nftAddress
					requestData.listItemId, // TokenIds
					10, // Quantity
					listPayment, // PaymentTokens
					priceItems, //PriceItems
					requestData.limitItemsPerUser, // LimitItemPercent User
					requestData.floorPoint, // FloorPoint
					requestData.requestINO.startTime, // Start Time (s)
					requestData.requestINO.endTime // End Time (s)
				)
				.send({ from: userAddress });
		}

		const newData = {
			...requestData,
		};
		await igoApi.sendConfirmIGO();
		const isCompleted = true;
		//
		// console.log('isCompleted xxx', isCompleted);

		// setLoading state
		setStep2({ ...step2, isExecuting: false });

		// set completed state
		if (isCompleted) {
			setStep2({ ...step2, isCompleted: true });
		} else {
			setStep2({ ...step2, isCompleted: false });
		}
	};

	return requestData !== undefined ? (
		<>
			<Box>
				<CreateIGO data={requestData} />
			</Box>
			<Box>
				<Box>
					<Stack direction="row">
						<Typography variant="h3" sx={{ flex: '1 1 0%', fontStyle: 'italic' }}>
							All IGO Offerings
						</Typography>
						<Input placeholder="Search"></Input>
					</Stack>
				</Box>
				<Box>
					<IGOOffering data={requestData} />
				</Box>
			</Box>
			<Box mt={6}>
				<Stack direction="row">
					<Typography variant="h3" sx={{ flex: '1 1 0%', fontStyle: 'italic' }}>
						Ended IGO
					</Typography>
					<Input placeholder="Search"></Input>
				</Stack>
				<Box>
					<EndedIGO data={requestData} />
				</Box>
			</Box>
			<Stack direction="row" gap={2} mt={6}>
				<Box>
					<ButtonGradient
						sx={{ width: '160px' }}
						onClick={() => {
							setModal(true);
						}}
					>
						<Typography>Accept</Typography>
					</ButtonGradient>
				</Box>
				<Box>
					<ButtonBlue
						sx={{ width: '160px' }}
						onClick={() => {
							setModalReport(true);
						}}
					>
						<Typography>Report</Typography>
					</ButtonBlue>
				</Box>
			</Stack>
			<Modal
				onOpen={modal}
				mainHeader={`Accept`}
				style={{ maxWidth: '450px', overflowY: 'auto' }}
				allowClose={true}
				onClose={() => {
					setModal(false);
				}}
			>
				<Box>
					<Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 2 }}>
						<Step>
							<StepLabel>Approve data to blockchain.</StepLabel>
							<StepContent>
								{/* <Typography>Approve data to blockchain.</Typography> */}
								<Box sx={{ mb: 2 }}>
									<ButtonGradient
										onClick={() => {
											handleStep1(false);
										}}
										disabled={step1.isChecking || step1.isExecuting}
										sx={{ width: '180px', mt: 1 }}
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
												: step1.isCompleted
												? 'Done Step 1'
												: 'Start Approve'}
										</Typography>
									</ButtonGradient>
								</Box>
							</StepContent>
						</Step>
						<Step>
							<StepLabel>Check data.</StepLabel>
							<StepContent>
								<Typography>Send data to blockchain.</Typography>
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
												: step2.isCompleted
												? 'All Done'
												: 'Start Send Info'}
										</Typography>
									</ButtonGradient>
								</Box>
							</StepContent>
						</Step>
						<Step>
							<StepLabel>Done.</StepLabel>
							<StepContent>
								<ButtonGradient
									onClick={() => {
										setModal(false);
										// navigate(`${PATH_AUCTION.root}`);
									}}
									sx={{ width: '180px', height: '40px', mt: 1 }}
								>
									<Typography variant="button">Close</Typography>
								</ButtonGradient>
							</StepContent>
						</Step>
					</Stepper>
				</Box>
			</Modal>
			<Modal
				onOpen={modalReport}
				mainHeader={`Report`}
				style={{ maxWidth: '450px', overflowY: 'auto' }}
				allowClose={true}
				onClose={() => {
					setModalReport(false);
				}}
			>
				<Box>
					<TextArea rows={4} cols={4} placeholder="Give us your problem" />
				</Box>
				<Box mt={2}>
					<ButtonGradient sx={{ width: '180px', height: '40px', margin: '8px auto' }}>
						<Typography>Send</Typography>
					</ButtonGradient>
				</Box>
			</Modal>
		</>
	) : (
		<h1>Hello</h1>
	);
}
