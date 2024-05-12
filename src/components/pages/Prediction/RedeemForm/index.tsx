// /* eslint-disable @typescript-eslint/no-unused-vars */
import SelectCustom from 'components/CustomField/SelectCustom';
import { useState } from 'react';
// react-hook-form
import { SubmitHandler, useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	RedeemFormGetBalance,
	RedeemFormGetBalanceItem,
	RedeemFormGroup,
	RedeemFormLabel,
	RedeemFormWrapper,
	TimeStyle,
} from './styled';
import { Typography } from '@mui/material';
import FieldInput from 'components/CustomField/FieldInput';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import { ErrorMessage } from 'components/Form/Common/styled';
// import ButtonWhite from 'components/CustomUI/ButtonWhite';

export interface IRedeemForm {
	outcome: any;
	option: any;
	amount: number;
}
export interface IProps {
	outcome?: any;
	option?: any;
	message?: string;
	sx?: any;
	time?: any;
	onSubmit: SubmitHandler<any>;
}
const RedeemForm = ({ outcome = [], option = [], message, sx, time, onSubmit }: IProps) => {
	const [currentOption, setCurrentOption] = useState(null);
	const [currentOutCome, setCurrentOutCome] = useState(null);
	const [amount, setAmount] = useState(0);
	const handleChangeOutCome = (outcome: any) => {
		setCurrentOutCome(outcome);
		setValue('outcome', outcome.value);
	};
	const handleChangeOption = (option: any) => {
		setCurrentOption(option);
		setValue('option', option.value);
	};
	const list = [
		{
			name: 'option1',
			value: '1',
		},
		{
			name: 'option2',
			value: '2',
		},
		{
			name: 'option3',
			value: '3',
		},
		{
			name: 'option4',
			value: '4',
		},
	];
	const schema = yup
		.object({
			// outcome: yup.number().min(0).max(100).required(),
			// option: yup.number().required(),
			// amount: yup.number().required(),
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
	const handleChangeBalancePrecent = (present: number) => {
		console.log(present);
	};
	return (
		<RedeemFormWrapper sx={sx}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{time && <TimeStyle>2h</TimeStyle>}
				{message && (
					<RedeemFormLabel>
						<Typography
							variant="subtitle1"
							fontSize={'18px'}
							fontWeight={600}
							color="initial"
						>
							{message}
						</Typography>
					</RedeemFormLabel>
				)}
				<RedeemFormGroup>
					<RedeemFormLabel>
						<Typography
							variant="subtitle1"
							fontSize={'20px'}
							fontWeight={700}
							color="initial"
						>
							Outcome
						</Typography>
					</RedeemFormLabel>
					<SelectCustom
						currentItem={currentOutCome}
						listItem={list}
						onChange={handleChangeOutCome}
					/>
					{errors.outcome?.message && (
						<ErrorMessage>{errors.outcome?.message}</ErrorMessage>
					)}
				</RedeemFormGroup>
				<RedeemFormGroup>
					<RedeemFormLabel>
						<Typography
							variant="subtitle1"
							fontSize={'20px'}
							fontWeight={700}
							color="initial"
						>
							Option
						</Typography>
					</RedeemFormLabel>
					<SelectCustom
						currentItem={currentOption}
						listItem={list}
						onChange={handleChangeOption}
					/>
					{errors.option?.message && (
						<ErrorMessage>{errors.option?.message}</ErrorMessage>
					)}
				</RedeemFormGroup>
				<RedeemFormGroup>
					<RedeemFormLabel>
						<Typography
							variant="subtitle1"
							fontSize={'20px'}
							fontWeight={700}
							color="initial"
						>
							Amount
						</Typography>
						<Typography
							variant="subtitle1"
							fontSize={'10px'}
							fontWeight={400}
							color="initial"
						>
							Balance
						</Typography>
					</RedeemFormLabel>
					<FieldInput
						id="amount"
						type="number"
						value={amount}
						onChange={(e: any) => {
							setAmount(e.target.value);
							setValue('amount', e.target.value);
						}}
						placeholder="Ex: 1, 2,..."
					/>
					{errors.amount?.message && (
						<ErrorMessage>{errors.amount?.message}</ErrorMessage>
					)}
					<RedeemFormGroup sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<RedeemFormGetBalance>
							<RedeemFormGetBalanceItem
								onClick={() => handleChangeBalancePrecent(25)}
							>
								25%
							</RedeemFormGetBalanceItem>
							<RedeemFormGetBalanceItem
								onClick={() => handleChangeBalancePrecent(50)}
							>
								50%
							</RedeemFormGetBalanceItem>
							<RedeemFormGetBalanceItem
								onClick={() => handleChangeBalancePrecent(75)}
							>
								75%
							</RedeemFormGetBalanceItem>
							<RedeemFormGetBalanceItem
								onClick={() => handleChangeBalancePrecent(100)}
							>
								100%
							</RedeemFormGetBalanceItem>
						</RedeemFormGetBalance>
					</RedeemFormGroup>
				</RedeemFormGroup>
				<ButtonWhite type="submit" disabled={isSubmitting}>
					Redeem
				</ButtonWhite>
			</form>
		</RedeemFormWrapper>
	);
};

export default RedeemForm;
