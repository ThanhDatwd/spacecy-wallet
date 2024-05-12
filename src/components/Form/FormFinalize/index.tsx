// /* eslint-disable @typescript-eslint/no-unused-vars */
// import SelectCustom from 'components/CustomField/SelectCustom';
// import { useEffect, useState } from 'react';
// react-hook-form
import { SubmitHandler, useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormGroup, FormWrapper, FormHeader, FormFooter, FormTitle } from '../Common/styled';
import FieldInput from 'components/CustomField/FieldInput';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import { ErrorMessage } from 'components/Form/Common/styled';
import { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
// import { useState } from 'react';
// import ButtonWhite from 'components/CustomUI/ButtonWhite';
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
import { toast } from 'react-toastify';
import {
	PredictionContractFunction,
	resolveEventData,
} from 'utils/contract/predictionContractFunction';
import eventApi from 'apis/eventApi';
const { resolveEvent } = PredictionContractFunction();
export interface IRedeemForm {
	outcome: any;
	options: any;
	amount: number;
}
export interface IProps {
	isRedeem?: boolean;
	outcomes?: any[];
	options: any[];
	submitTxt?: string;
	sx?: any;
	time?: any;
	title?: string;
	balance: number;
	note?: string;
	totalReward?: number;
	status: number;
	_id: string;
	onSubmit: SubmitHandler<any>;
}

const FormFinalize = ({ event }: any) => {
	const [listOptions, setListOptions] = useState(
		event.outcomes.map((option: any) => {
			return { ...option, outcome: 0 };
		})
	);
	const chainId = useSelector(selectChainId);
	const userAddress = useSelector(selectAddress);
	const schema = yup.object().shape({
		options: yup
			.array()
			.of(
				yup.number().required().min(0) // Mỗi phần tử trong mảng phải là một số và không được rỗng, giá trị tối thiểu là 0
			)
			.required() // Mảng không được rỗng
			.test('sum-of-100', 'The sum of the outcome must be 100 %', (value) => {
				if (!value) return false;
				const sum = value.reduce((a: number, b: any) => a + b, 0);
				return sum === 100;
			}),
	});
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
	const handleChangeOption = (e: any, i: number) => {
		const value = e.target.value;
		listOptions[i].outcome = value;
		setListOptions(listOptions);
		setValue(
			'options',
			listOptions.map((option: any) => Number(option.outcome))
		);
	};
	const onSubmit = async (data: any) => {
		if (!userAddress || !chainId) {
			toast.error('Please connect with wallet to make this feature');
			return;
		}
		if (!event) {
			toast.error('Missing file');
			return;
		}
		const dataResovle: resolveEventData = {
			chainId,
			userAddress,
			eventId: event.eventId,
			outcomes: data.options,
		};
		const result = await resolveEvent(dataResovle);
		if (result) {
			console.log(result);
			const dataPost: any = {
				userAddress: result.events.ResolvedEvent.returnValues.creator,
				eventObjectId: event._id,
				outcomes: data.options,
				txHash: result.transactionHash,
			};
			console.log(dataPost);
			const resultPost = await eventApi.resovleEvent(dataPost);
			if (resultPost) {
				toast.success('Successful setup outcome');
				window.location.reload();
			}
		}
		try {
		} catch (error) {
			toast.error('Failed to set outcome');
		}
	};
	return (
		<FormWrapper>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormHeader>
					<FormTitle>OutCome *</FormTitle>
				</FormHeader>
				<FormGroup>
					{event &&
						listOptions.length > 0 &&
						listOptions.map((option: any) => {
							return (
								<FormGroup key={option.value}>
									<FieldInput
										id="amount"
										type="number"
										onChange={(e: any) => handleChangeOption(e, option.value)}
										placeholder={`Option ${option.value}`}
									/>
								</FormGroup>
							);
						})}
					{Array.isArray(errors.options) ? (
						<Box>
							{errors.options.map((error: any, index: number) => (
								<ErrorMessage key={index}>{error.message}</ErrorMessage>
							))}
						</Box>
					) : (
						<Box>
							{errors.options && (
								<ErrorMessage>{(errors.options as any)?.message}</ErrorMessage>
							)}
						</Box>
					)}
				</FormGroup>
				<FormFooter>
					<ButtonWhite type="submit" disabled={isSubmitting}>
						{isSubmitting === true ? (
							<CircularProgress sx={{ color: 'white' }} size={25} />
						) : (
							'Finalize'
						)}
					</ButtonWhite>
				</FormFooter>
			</form>
		</FormWrapper>
	);
};

export default FormFinalize;
