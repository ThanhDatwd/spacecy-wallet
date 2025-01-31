/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
//mui
import { Grid, Box, Stack, Typography, useTheme } from '@mui/material';
//components
import FieldInput from 'components/CustomField/FieldInput';
import SelectCustom from 'components/CustomField/SelectCustom';
import DateTimePicker from '../DateTimePickerCustom';
//context
import { useSelling } from 'contexts/SellingContext';
// models
import { OptionSelectCustom } from 'models';
//styled
import { Title } from 'pages/TermsOfService/SellItem/styled';
import AutoCompleteCustom2 from 'components/CustomField/AutoCompleteCustom2';

export interface FallingPriceProps {
	listTokenPayment: OptionSelectCustom<string>[];
	onChangePaymentToken: (value: OptionSelectCustom<string> | null | undefined) => void;
}

export default function FallingPrice({
	listTokenPayment,
	onChangePaymentToken,
}: FallingPriceProps) {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';
	//state
	const [errorStartPrice, setErrorStartPrice] = useState<string | null>('');
	const [errorEndPrice, setErrorEndPrice] = useState<string | null>('');
	const [errQuantity, setErrQuantity] = useState<string | null>('');

	//context
	const context = useSelling();
	const { state, dispatch } = context;

	// functions
	const handleChangePaymentToken = (
		currentPaymentToken: OptionSelectCustom<string> | null | undefined
	) => {
		if (currentPaymentToken) {
			onChangePaymentToken(currentPaymentToken);
		} else {
			onChangePaymentToken(undefined);
		}
	};

	const setStartPrice = (e: any) => {
		if (parseFloat(e.target.value) <= 0) {
			setErrorStartPrice('Start price must be greater than 0');
		} else if (parseFloat(e.target.value) < 0.001) {
			setErrorEndPrice('Start price too low! Min price is 0.001!');
		} else {
			setErrorStartPrice(null);
			dispatch({ type: 'SET_START_PRICE', value: e.target.value });
			return;
		}

		dispatch({ type: 'SET_START_PRICE', value: 0 });
	};

	const setEndPrice = (e: any) => {
		if (parseFloat(e.target.value) <= 0) {
			setErrorEndPrice('End price must be greater then 0');
		} else if (parseFloat(e.target.value) < 0.001) {
			setErrorEndPrice('End price too low! Min price is 0.001!');
		} else if (parseFloat(e.target.value) >= state.startPrice) {
			setErrorEndPrice('End price must be less than start price');
		} else {
			setErrorEndPrice(null);
			dispatch({ type: 'SET_END_PRICE', value: e.target.value });
			return;
		}

		dispatch({ type: 'SET_END_PRICE', value: 0 });
	};

	const setQuantity = (e: any) => {
		const newValue = e.target.value;

		if (newValue === '') {
			setErrQuantity('');
			dispatch({ type: 'SET_QUANTITY', value: 0 });
			return;
		}

		if (!Number.isInteger(Number(newValue))) {
			setErrQuantity('Quantity must be a integer!');
			dispatch({ type: 'SET_QUANTITY', value: 0 });
			return;
		}

		if (Number(newValue) <= 0) {
			setErrQuantity('Quantity must be greater than 0!');
		} else if (Number(newValue) > state.maxSupply) {
			setErrQuantity(`Quantity must be less or by ${state.maxSupply}!`);
		} else {
			setErrQuantity('');
			dispatch({ type: 'SET_QUANTITY', value: newValue });
			return;
		}

		dispatch({ type: 'SET_QUANTITY', value: 0 });
	};

	return (
		<Stack spacing={3}>
			{/*-------------------------------Price-------------------------------- */}
			<Box>
				<Title variant="h6">Price</Title>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<AutoCompleteCustom2
							currentItem={state.tokenPayment}
							listItem={listTokenPayment}
							onChange={handleChangePaymentToken}
							placeholder="Token name..."
							sx={{
								width: '100%',
								background: '#fff',
								border: '1px solid #E7E8EC',
								borderRadius: '12px',
								// ...(isLightTheme
								// 	? {
								// 			backgroundColor: theme.palette.primaryLight.main,
								// 	  }
								// 	: {
								// 			backgroundColor: theme.palette.primary.dark,
								// 	  }),
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<Title variant="h6">Start price</Title>
						<FieldInput
							id="price"
							type="number"
							placeholder="0"
							onChange={setStartPrice}
							sx={{ borderWidth: '1px', borderRadius: '12px', padding: '14px 15px' }}
						></FieldInput>
						<Typography variant="body1" sx={{ color: 'red', pt: 1 }}>
							{errorStartPrice}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Title variant="h6">End price</Title>
						<FieldInput
							id="price"
							type="number"
							placeholder="0"
							onChange={setEndPrice}
							sx={{
								borderWidth: '1px',
								borderRadius: '12px',
								padding: '14px 15px',
								boxShadow: 0,
							}}
						></FieldInput>
						<Typography variant="body1" sx={{ color: 'red', pt: 1 }}>
							{errorEndPrice}
						</Typography>
					</Grid>
				</Grid>
			</Box>

			<Box>
				<Title variant="h6">Quantity</Title>

				<FieldInput
					id="quantity"
					type="number"
					placeholder="Ex: 1, 2,..."
					onChange={setQuantity}
					sx={{
						fontSize: '16px',
						textOverflow: 'ellipsis',
						padding: '14px 15px',
					}}
				/>

				<Typography variant="body2" sx={{ mt: 0.25, textAlign: 'right', opacity: 0.5 }}>
					{state.maxSupply} available
				</Typography>

				<Typography variant="body1" sx={{ color: 'red', pt: 1 }}>
					{errQuantity}
				</Typography>
			</Box>

			{/*-------------------------------Fee method-------------------------------- */}
			{/* <Stack direction="row" alignItems="center" justifyContent="space-between">
				<Box>
					<Typography variant="h6">Fee method</Typography>
					<Typography variant="body2" sx={{ opacity: '0.5' }}>
						({state.feeMethod ? 'Split Fee' : 'Protocol Fee'})
					</Typography>
				</Box>

				<SwitchButton onChange={handleChangeFeeMethod} />
			</Stack> */}

			<Box>
				<Title variant="h6" sx={{ pb: 1 }}>
					Duration
				</Title>
				<DateTimePicker />
			</Box>
		</Stack>
	);
}
