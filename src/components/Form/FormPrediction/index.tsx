/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import SelectCustom from 'components/CustomField/SelectCustom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
// react-hook-form
import { SubmitHandler, useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	ListItemCustom,
	FormGetBalance,
	FormGetBalanceItem,
	FormGroup,
	FormHeader,
	FormFlex,
	FormLabe,
	FormTitle,
	FormTypographySm,
	FormWrapper,
	TimeStyle,
	ButtonStyle,
	FormFooter,
	DialogContentStyle,
	DialogStyle,
	DialogHeaderStyle,
	DialogClose,
} from '../Common/styled';
import { Avatar, Box, Typography } from '@mui/material';
import FieldInput from 'components/CustomField/FieldInput';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import { ErrorMessage } from 'components/Form/Common/styled';
// import ButtonWhite from 'components/CustomUI/ButtonWhite';

import List from '@mui/material/List';
import CalculateIcon from '@mui/icons-material/Calculate';
import CloseIcon from '@mui/icons-material/Close';
// import Collapse from '@mui/material/Collapse';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import iconAward from 'assets/icons/icon-award.svg';
import { Tooltip } from '@mui/material';
import Modal from 'components/CustomUI/Modal';
import { AcceptEventAction } from 'redux/actions/EventAction';
import { formatUnits } from '@ethersproject/units';
import FormCalculator from '../FormCalculator';
const { getBalanceOfEvent } = AcceptEventAction();

export interface IRedeemForm {
	outcome: any;
	option: any;
	amount: number;
}
export interface IProps {
	isRedeem?: boolean;
	// outcomes: any[];
	// options: any[];
	submitTxt?: string;
	sx?: any;
	// time?: any;
	title?: string;
	// balance: number;
	note?: string;
	// totalReward: number;
	// status: number;
	// dataPayment?: any;
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
	onSubmit: SubmitHandler<any>;
}
const FormPrediction = ({
	title,
	submitTxt,
	sx,
	note,
	isRedeem = false,
	onSubmit,
	dataEvent,
}: IProps) => {
	const {
		outcomes = [],
		options = [],
		balance = 0,
		time,
		totalReward,
		status,
		eventId,
		paymentToken,
		dataPayment,
		_id,
	} = dataEvent;
	const [currentOption, setCurrentOption] = useState<any>(null);
	const [balaneEventPredicted, setBalanceEventPrediced] = useState<number>(0);
	// const [currentOutCome, setCurrentOutCome] = useState(null);
	const [amount, setAmount] = useState<number>();
	const [openCaculator, setOpenCaculator] = useState(false);
	// const handleChangeOutCome = (outcome: any) => {
	// 	setCurrentOutCome(outcome);
	// 	setValue('outcome', outcome.value);
	// };
	const chainId = useSelector(selectChainId);
	const userAddress = useSelector(selectAddress);

	const handleChangeOption = (option: any) => {
		setCurrentOption(option);
		setValue('option', option.value);
	};
	useEffect(() => {
		if (options.length <= 0) return;
		setCurrentOption({
			...options[0],
			name: `${options[0].name}: ${options[0].title}`,
		});
		setValue('option', options[0].value);
	}, [options]);
	const schema = yup
		.object({
			option: yup.number().required(),
			amount: yup.number().min(0).required(),
		})
		.required();
	const {
		// register,
		handleSubmit,
		setValue,
		// getValues,
		// clearErrors,
		formState: { errors, isSubmitting },
		// reset,
		// formState,
	} = useForm<IRedeemForm>({
		resolver: yupResolver(schema),
	});
	const handleChangeAmount = (e: any, balance: number) => {
		const value = Number(e.target.value);
		if (value <= balance) {
			setAmount(value);
			setValue('amount', value);
			return;
		}
		setAmount(balance);
	};
	const handleChangeAmountPrecent = (present: number, balance: number) => {
		if (balance && balance > 0) {
			const value = (present * balance) / 100;
			setAmount(value);
			setValue('amount', value);
			return;
		}
	};
	const handlePAndL = (): number => {
		if (
			totalReward &&
			totalReward > 0 &&
			currentOption?.percent > 0 &&
			currentOption.amount / 0
		) {
			return Number(
				((currentOption.percent * totalReward) / 100 / currentOption.amount).toFixed(2)
			);
		}
		return 0;
	};

	const handleCloseCaculator = () => {
		setOpenCaculator(false);
	};
	useEffect(() => {
		if (isRedeem === true && userAddress && eventId && currentOption && chainId) {
			const resolveGetBalanceUserPredicted = async () => {
				if (dataEvent && userAddress) {
					const result = await getBalanceOfEvent({
						chainId,
						userAddress: userAddress,
						eventId: dataEvent.eventId,
						option: currentOption.value,
					});
					let balanceOfUser = Number(formatUnits(result.toString(), 18));
					setBalanceEventPrediced(balanceOfUser);
				}
			};
			resolveGetBalanceUserPredicted();
		}
	}, [currentOption]);
	useEffect(() => {}, []);
	const ButtonHandleModal = () => {
		switch (status) {
			case 0:
				return (
					<ButtonWhite type="button" disabled={true}>
						Upcoming
					</ButtonWhite>
				);
			case 1:
				return (
					<ButtonWhite type="submit" disabled={isSubmitting}>
						Predict
					</ButtonWhite>
				);
			case 2:
				if (outcomes && outcomes.some((item: any) => item.percent > 0)) {
					return (
						<ButtonWhite type="submit" disabled={isSubmitting}>
							Redeem
						</ButtonWhite>
					);
				}
				return (
					<ButtonWhite type="submit" disabled={true}>
						Wait outcome!
					</ButtonWhite>
				);

			default:
				break;
		}
	};

	return (
		<FormWrapper sx={sx}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormHeader>
					{time && <TimeStyle>2h</TimeStyle>}
					{title && <FormTitle>{title}</FormTitle>}
					{outcomes && outcomes.length > 0 && (
						<>
							<FormFlex sx={{ alignItems: 'flex-start' }}>
								<FormTitle
									sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
								>
									<img src={iconAward} alt="" /> Outcome:
								</FormTitle>
								<Box
									sx={{
										padding: '8px 10px',
										background:
											handlePAndL() > 1
												? '#10B9814D'
												: 'rgba(239, 61, 61, 0.3)',
										color: handlePAndL() > 1 ? '#10B981' : '#EF3D3D',
										borderRadius: '5px',
									}}
								>
									<FormFlex sx={{ gap: '20px' }}>
										<FormFlex sx={{ gap: '4px' }}>
											<FormTitle sx={{ fontSize: '18px' }}>P/L</FormTitle>
											<Tooltip
												title={`P/L is short for "profit and loss," used to measure the potential for profit or loss of a prediction`}
											>
												<InfoOutlinedIcon
													sx={{ fontSize: '18px', color: 'black' }}
												/>
											</Tooltip>
										</FormFlex>
										<FormTitle sx={{ fontSize: '18px' }}>
											{handlePAndL()}x
										</FormTitle>
									</FormFlex>
								</Box>
							</FormFlex>
						</>
					)}
					{note && <FormTypographySm>{note}</FormTypographySm>}
				</FormHeader>
				{dataEvent?.outcomes && outcomes.length > 0 && (
					<FormGroup sx={{ mb: 2 }}>
						<List component="span" disablePadding>
							{outcomes.map((item, i) => {
								return (
									<ListItemCustom
										key={i}
										onClick={() => handleChangeOption(item)}
										sx={{
											background:
												currentOption !== null &&
												currentOption?.value == item.value
													? '#E7E8EC;'
													: '',
										}}
									>
										<FormTypographySm>
											{item?.name}: {item?.title}
										</FormTypographySm>
										<FormTypographySm>{item.percent}%</FormTypographySm>
									</ListItemCustom>
								);
							})}
							{errors.option?.message && (
								<ErrorMessage>{errors.option?.message}</ErrorMessage>
							)}
						</List>
					</FormGroup>
				)}
				{options && options.length > 0 && (
					<FormGroup>
						<FormFlex>
							<FormLabe>Option</FormLabe>
							<FormTypographySm sx={{ fontSize: '12px' }}>
								Predicted : {balaneEventPredicted}{' '}
								{dataPayment && dataPayment.tokenSymbol.toUpperCase()}
							</FormTypographySm>
						</FormFlex>
						{isRedeem === true ? (
							<SelectCustom
								currentItem={currentOption}
								listItem={options}
								onChange={handleChangeOption}
							/>
						) : (
							<FormFlex sx={{ alignItems: 'stretch' }}>
								<Box sx={{ flex: 5 }}>
									<SelectCustom
										sx={{
											borderStartEndRadius: '0',
											borderEndEndRadius: '0',
											// '& .optionItem': {
											// 	heigth: '50px !impotant',
											// 	overFlow: 'auto',
											// 	background: 'red',
											// },
										}}
										currentItem={currentOption}
										listItem={options.map((option) => {
											return {
												...option,
												name: `${option.name}: ${option.title}`,
											};
										})}
										onChange={handleChangeOption}
									/>
								</Box>
								<ButtonStyle sx={{ flex: 3 }}>
									<FormFlex sx={{ gap: '5px' }}>
										{totalReward && totalReward > 0 && currentOption?.amount > 0
											? (totalReward / currentOption?.amount).toFixed(2)
											: '0'}
										x
										<CalculateIcon onClick={() => setOpenCaculator(true)} />
									</FormFlex>
								</ButtonStyle>
							</FormFlex>
						)}
						{errors.option?.message && (
							<ErrorMessage>{errors.option?.message}</ErrorMessage>
						)}
					</FormGroup>
				)}
				<FormGroup>
					<FormFlex>
						<FormLabe>Amount</FormLabe>
						<Typography variant="subtitle1" fontSize={'12px'} fontWeight={400}>
							{isRedeem == false
								? `Balance: ${balance}`
								: `Predicted: ${balaneEventPredicted}`}
							{dataPayment && dataPayment.tokenSymbol.toUpperCase()}
						</Typography>
					</FormFlex>
					<FieldInput
						type="number"
						value={amount}
						onChange={(e: any) =>
							handleChangeAmount(e, isRedeem ? balaneEventPredicted : Number(balance))
						}
						placeholder="0"
					/>
					{errors.amount?.message && (
						<ErrorMessage>{errors.amount?.message}</ErrorMessage>
					)}
					<FormGroup sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<FormGetBalance>
							<FormGetBalanceItem
								onClick={() =>
									handleChangeAmountPrecent(
										25,
										isRedeem ? balaneEventPredicted : Number(balance)
									)
								}
							>
								25%
							</FormGetBalanceItem>
							<FormGetBalanceItem
								onClick={() =>
									handleChangeAmountPrecent(
										50,
										isRedeem ? balaneEventPredicted : Number(balance)
									)
								}
							>
								50%
							</FormGetBalanceItem>
							<FormGetBalanceItem
								onClick={() =>
									handleChangeAmountPrecent(
										75,
										isRedeem ? balaneEventPredicted : Number(balance)
									)
								}
							>
								75%
							</FormGetBalanceItem>
							<FormGetBalanceItem
								onClick={() =>
									handleChangeAmountPrecent(
										100,
										isRedeem ? balaneEventPredicted : Number(balance)
									)
								}
							>
								100%
							</FormGetBalanceItem>
						</FormGetBalance>
					</FormGroup>
					<FormFlex>
						<FormTypographySm sx={{ fontSize: '14px' }}>Total Pool</FormTypographySm>
						<FormTypographySm sx={{ fontSize: '14px' }}>
							<FormFlex sx={{ gap: '8px' }}>
								{totalReward.toFixed(4)}{' '}
								{dataPayment && (
									<>
										<Avatar
											sx={{ width: '20px', height: '20px' }}
											src={dataPayment.logoURI}
										/>{' '}
										{dataPayment.tokenSymbol.toUpperCase()}
									</>
								)}
							</FormFlex>
						</FormTypographySm>
					</FormFlex>
				</FormGroup>
				{/* <ButtonWhite type="submit" disabled={isSubmitting}>
					{submitTxt}
				</ButtonWhite> */}
				<FormFooter>{ButtonHandleModal()}</FormFooter>
			</form>
			<Modal
				isHasHeader={false}
				onOpen={openCaculator}
				allowClose={false}
				style={{ padding: '0', width: '450px' }}
				styleChildren={{ padding: '0' }}
			>
				<DialogHeaderStyle>
					<FormTitle>Calculator</FormTitle>
					<CloseIcon
						onClick={handleCloseCaculator}
						sx={{
							fontSize: '22px',
							cursor: 'pointer',
						}}
					/>
				</DialogHeaderStyle>
				<DialogContentStyle>
					<FormCalculator
						sx={{ padding: '0 0 0 0' }}
						options={options}
						totalReward={totalReward}
						dataPayment={dataPayment}
					/>
				</DialogContentStyle>
			</Modal>
		</FormWrapper>
	);
};

export default FormPrediction;
