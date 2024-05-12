/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import SelectCustom from 'components/CustomField/SelectCustom';
import { useEffect, useState } from 'react';
// react-hook-form
import { SubmitHandler, useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	FormGetBalance,
	FormGetBalanceItem,
	FormGroup,
	FormHeader,
	FormFlex,
	FormLabe,
	FormTitle,
	FormTypographySm,
	FormWrapper,
	ButtonStyle,
	PrettoSlider,
	FormFooter,
} from '../Common/styled';
import FieldInput from 'components/CustomField/FieldInput';
import { ErrorMessage } from 'components/Form/Common/styled';
// import ExpandMore from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { Avatar, Box, Grid, Tooltip, Typography } from '@mui/material';
import outsiteApi from 'apis/outsideApi';

export interface IRedeemForm {
	outcome: any;
	option: any;
	amount: number;
}
export interface IProps {
	options: any[];
	sx?: any;
	time?: any;
	title?: string;
	note?: string;
	totalReward: number;
	dataPayment?: {
		tokenSymbol: string;
		logoURI: string;
	};
}
const FormCalculator = ({ title, options = [], sx, note, totalReward, dataPayment }: IProps) => {
	const [currentOption, setCurrentOption] = useState<any>(null);
	// const [currentOutCome, setCurrentOutCome] = useState(null);
	const [amount, setAmount] = useState<number>(0);
	const [outcome, setOutcome] = useState<number>(100);
	const [currentPL, setCurrentPL] = useState<number>(0);
	const [currentPayout, setCurrentPayout] = useState<number>(0);
	const [receive, setReceive] = useState<number>(currentPayout * currentPL * amount);
	const [totalUsd, setTotalUsd] = useState<number>(0);
	// const [open, setOpen] = useState(false);
	// const handleChangeOutCome = (outcome: any) => {
	// 	setCurrentOutCome(outcome);
	// 	setValue('outcome', outcome.value);
	// };
	const handleChangeOption = (option: any) => {
		setCurrentOption(option);
		if (totalReward >= 0 && option.amount + +amount > 0) {
			setCurrentPayout(Number(totalReward + +amount) / Number(option.amount + +amount));
		} else {
			setCurrentPayout(0);
		}
		handlePAndL(outcome, amount);
	};
	useEffect(() => {
		if (options.length <= 0) return;
		setCurrentOption({ ...options[0], name: `${options[0].name}: ${options[0].title}` });
		handlePayout(Number(options[0].amount));
		setCurrentPL(Number(((outcome * totalReward) / 100 / options[0].amount).toFixed(4)));
	}, [options]);
	useEffect(() => {
		if (dataPayment && totalReward > 0) {
			(async () => {
				outsiteApi
					.handleConvertTokenToMonney(dataPayment.tokenSymbol, totalReward)
					.then((ressult) => {
						if (ressult) {
							let usd = ressult.data.data[0].quote.USD.price;
							setTotalUsd(usd);
						}
					});
				// setTotalUsd()
			})();
		}
	}, [totalReward, dataPayment]);

	const handleChangeAmount = (value: number) => {
		setAmount(value);
		if (totalReward >= 0 && currentOption.amount + +value > 0) {
			setCurrentPayout(Number(totalReward + +value) / Number(currentOption.amount + +value));
		} else {
			setCurrentPayout(0);
		}
		handlePAndL(outcome, value);
	};
	const handlePAndL = (outcome: number, amount: number) => {
		if (totalReward >= 0 && amount > 0) {
			setCurrentPL(
				Number(
					(
						(outcome * (totalReward + +amount)) /
						100 /
						(currentOption.amount + +amount)
					).toFixed(4)
				)
			);
			return;
		}
		setCurrentPL(0);
	};
	const handlePayout = (amountOption: number) => {
		if (totalReward && totalReward >= 0 && amountOption > 0) {
			setCurrentPayout(Number(totalReward + amount / amountOption));
			return;
		}
		setCurrentPayout(0);
	};
	const handleChangReceive = () => {
		console.log('currentPayout;;', currentPayout);
		console.log('currentPL;;', currentPL);
		console.log('amount;;', amount);
		setReceive(currentPL * Number(amount));
	};
	useEffect(() => {
		handleChangReceive();
	}, [currentPL, amount, currentOption]);

	return (
		<FormWrapper sx={sx}>
			{/* <FormHeader>
				{title && <FormTitle>{title}</FormTitle>}
				{note && <FormTypographySm>{note}</FormTypographySm>}
			</FormHeader> */}
			{options && options.length > 0 && (
				<FormGroup>
					<FormFlex>
						<FormLabe>Option</FormLabe>
						{/* <FormTypographySm>Price: 10BNB</FormTypographySm> */}
					</FormFlex>
					<FormFlex sx={{ alignItems: 'stretch' }}>
						<Box sx={{ flex: 5 }}>
							<SelectCustom
								sx={{
									borderStartEndRadius: '0',
									borderEndEndRadius: '0',
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
							{currentPayout.toFixed(2)}x Payout
						</ButtonStyle>
					</FormFlex>
				</FormGroup>
			)}
			<FormGroup>
				<FormLabe>Amount</FormLabe>
				<FieldInput
					id="amount"
					type="number"
					value={amount}
					onChange={(e: any) => handleChangeAmount(e.target.value)}
					placeholder="0"
				/>
				<FormFlex>
					<Typography variant="subtitle1" fontSize={'12px'} fontWeight={600}>
						Fund
					</Typography>
					<FormGroup sx={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
						<FormGetBalanceItem
							sx={{ border: '1px solid #D9D9D9', padding: '2px 20px' }}
							onClick={() => handleChangeAmount(50)}
						>
							50
						</FormGetBalanceItem>
						<FormGetBalanceItem
							sx={{ border: '1px solid #D9D9D9', padding: '2px 20px' }}
							onClick={() => handleChangeAmount(100)}
						>
							100
						</FormGetBalanceItem>
						<FormGetBalanceItem
							sx={{ border: '1px solid #D9D9D9', padding: '2px 20px' }}
							onClick={() => handleChangeAmount(1000)}
						>
							1000
						</FormGetBalanceItem>
					</FormGroup>
				</FormFlex>
				<FormFlex>
					<Typography variant="subtitle1" fontSize={'12px'} fontWeight={600}>
						Total Pool
					</Typography>
					<FormFlex sx={{ gap: '8px' }}>{totalUsd.toFixed(4)} $</FormFlex>
				</FormFlex>
			</FormGroup>
			<FormGroup>
				<FormLabe>OutCome</FormLabe>
				<Typography variant="subtitle1" fontSize={'50px'} fontWeight={600}>
					{outcome}%
				</Typography>
				<PrettoSlider
					// valueLabelDisplay="auto"
					aria-label="pretto slider"
					defaultValue={outcome}
					value={outcome}
					onChange={(e: any) => {
						handlePAndL(e.target.value, amount);
						setOutcome(e.target.value);
					}}
					marks={[
						{
							value: 0,
							label: '0%',
						},
						{
							value: 100,
							label: '100%',
						},
					]}
				/>
			</FormGroup>
			<FormFooter>
				<Grid container>
					<Grid md={receive > 1000000 ? 12 : 6}>
						<Box>
							<FormFlex sx={{ justifyContent: 'flex-start', gap: '10px' }}>
								<FormLabe>Receive</FormLabe>
								<Tooltip
									title={`Estimate the amount you can obtain by entering the value and calculate it as follows: P/L= (Total pool of events / Total pool of option) * percentage of outcome Receive = P/L * Amount`}
								>
									<InfoOutlinedIcon sx={{ fontSize: '18px', color: 'black' }} />
								</Tooltip>
							</FormFlex>
							<Typography variant="subtitle1" fontSize={'14px'} fontWeight={400}>
								Estimate the amount that can be received
							</Typography>
						</Box>
					</Grid>
					<Grid md={receive > 1000000 ? 12 : 6}>
						<FormLabe
							sx={{
								fontSize: '30px',
								textAlign: receive > 1000000 ? '' : 'end',
								overflowWrap: 'break-word',
							}}
						>
							{receive.toFixed(2)}$
						</FormLabe>
					</Grid>
				</Grid>
			</FormFooter>
		</FormWrapper>
	);
};

export default FormCalculator;
