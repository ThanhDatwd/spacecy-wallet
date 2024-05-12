/* eslint-disable @typescript-eslint/no-unused-vars */

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Checkbox, CircularProgress, Stack, Typography } from '@mui/material';
import FieldInput from 'components/CustomField/FieldInput';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Asterisk, ErrorMessage } from '../Common/styled';
import { FieldTitleName, PageTitle } from '../FormAddOrEditItem/styled';
import * as yup from 'yup';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import DateTimePickerCustom from './DateTimePickerCustom';
import moment from 'moment';
import DropDown from 'components/CustomUI/DropDown';
import { DropDownWrapper } from 'components/CustomUI/DropDown/styled';
import { ListOption } from 'components/CustomField/SelectCustom/styled';
import CheckIcon from '@mui/icons-material/Check';
import {
	CheckIconWrapperInCreateAution,
	ItemImageInCreatAuction,
} from '../FormCreateAuction/styled';
import ETHIcon from 'assets/icons/Network/ether-new.png';
import BNBIcon from 'assets/icons/Network/bnb-new.webp';
import DropDownIcon from 'assets/icons/icon-down-black.svg';
import TetherUST from 'assets/icons/tether-usdt-icon.svg';
import { DropdownWrapper } from 'components/CustomUI/FilterItemGroup/Common/styled';
import { ConatainerFieldInput, FieldRenderDropdown, OptionItem } from './styled';
import { TextArea } from 'components/CustomField/FieldTextArea/styled';
import FieldTextArea from 'components/CustomField/FieldTextArea';
import { useDispatch, useSelector } from 'react-redux';
import { selectListTokenPayment } from 'redux/slices/tokenPaymentSlice';
import { fetchListPaymentTokenByChainId } from 'redux/actions/tokenPaymentAction';
import { RootState } from 'redux/store';
import { toast } from 'react-toastify';
import { erc20function, parseUnits } from 'utils';
import { useDebounce } from 'hooks';
import { BigNumber } from 'ethers';

export interface IFormRequestIGOProps {
	onSubmit: SubmitHandler<IFormRequestIGOPropsValue>;
}

interface Selected {
	name: string;
}
const networkToken = [
	{
		name: 'ETH',
		logo: ETHIcon,
		chainId: 4,
		decimal: 18,
	},
	{
		name: 'BNB',
		logo: BNBIcon,
		chainId: 97,
		decimal: 18,
	},
];

const listPayment1 = [
	{
		name: 'USDT',
		logo: '',
		decimal: 18,
		tokenAddress97: '0x26f98c52bd5039a2341c2e907faa129b6da70ee3',
		tokenAddress4: '0x168b8404d8f14b0199323379a29eb975405f2c3a',
	},
	{
		name: 'BKN',
		logo: '',
		tokenAddress97: '0x7ebae9fdecebc75f1a10b028b07d204b7305d812',
		tokenAddress4: '0x996afe323cd425f3aba1d1c1c72ddfed7840275d',
	},
];

export interface IFormRequestIGOPropsValue {
	projectName: string;
	companyName: string;
	email: string;
	network: number;
	walletAddress: string;
	collectionAddress: string;
	projectDescription: string;
	note: string;
	projectWebsite: string;
	networkPaymentName: string;
	networkPaymentPrice: string;
	stableCoinPaymentPrice: string;
	nativeTokenPaymentPrice: string;
	startTime: number;
	endTime: number;
}
interface listPayment {
	name: string;
	price: number;
}

export default function FormRequestIGO({ onSubmit }: IFormRequestIGOProps) {
	const dispatch = useDispatch();

	const [date1, setDate1] = useState<Date>(new Date());
	const [date2, setDate2] = useState<Date>(new Date());
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [activeDropDown1, setActiveDropDown1] = useState<boolean>(false);
	const [selected, setSelected] = useState<Selected[]>([]);
	const [arrItemSelected, setArrItemSelected] = useState<any>([]);
	const [network, setNetwork] = useState<string>('ETH');
	const [network1, setNetwork1] = useState<string>('ETH');
	const [networkLogo, setNetworkLogo] = useState<string>(networkToken[0].logo);
	const [networkLogo1, setNetworkLogo1] = useState<string>(networkToken[0].logo);
	const [listPayment, setListPayment] = useState<any>([]);
	const [chooseChainId, setChooseChainId] = useState<number>(4);
	const [priceBKN, setPriceBKN] = useState<any>();
	const [priceUSDT, setPriceUSDT] = useState<any>();
	const [priceNetwork, setPriceNetwork] = useState<any>();

	const debouncedPriceBKN = useDebounce<number>(priceBKN, 1000);
	const debouncedPriceUSDT = useDebounce<number>(priceUSDT, 1000);
	const debouncedPriceNetwork = useDebounce<number>(priceNetwork, 1000);

	const listTokenPaymentChainId = useSelector(selectListTokenPayment);

	const schema = yup
		.object({
			projectName: yup.string().required(),
			companyName: yup.string().required(),
			email: yup.string().required(),
			network: yup.number().required(),
			walletAddress: yup.string().required(),
			collectionAddress: yup.string().required(),
			projectDescription: yup.string().required(),
			projectWebsite: yup.string().required(),
			note: yup.string(),
			networkPaymentName: yup.string().required(),
			networkPaymentPrice: yup.string().required(),
			stableCoinPaymentPrice: yup.string().required(),
			nativeTokenPaymentPrice: yup.string().required(),
			startTime: yup.number().required(),
			endTime: yup.number().required(),
		})
		.required();

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<IFormRequestIGOPropsValue>({
		resolver: yupResolver(schema),
	});
	// console.log('erorr', errors);

	// useEffect
	// useEffect(() => {
	// 	window.scrollTo({ top: 0, behavior: 'smooth' });
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	useEffect(() => {
		if (chooseChainId) {
			dispatch(
				fetchListPaymentTokenByChainId(chooseChainId, executeAfterFetchListTokenPayment)
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chooseChainId]);

	const executeAfterFetchListTokenPayment = (globalStateNewest: RootState) => {
		const { tokenPayment } = globalStateNewest;
		if (!tokenPayment.isSuccess) {
			toast.error('Can not fetch list token payment!');
		}
	};

	useEffect(() => {
		const newValue1 = Number(moment(date1).format('X'));
		const newValue2 = Number(moment(date2).format('X'));
		setValue('startTime', newValue1);
		setValue('endTime', newValue2);
		setValue('networkPaymentName', network);
		setValue('network', chooseChainId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date1, date2, chooseChainId, network]);

	// useEffect
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderButtonContent = () => {
		return (
			<ConatainerFieldInput>
				<FieldRenderDropdown>
					<Box sx={{ width: '24px' }}>
						<img src={networkLogo} alt={network} />
					</Box>
					<Typography>{network}</Typography>
				</FieldRenderDropdown>
				<Box>
					<img src={DropDownIcon} alt="Drop down" />
				</Box>
			</ConatainerFieldInput>
		);
	};

	// handleChange BKN
	const handleOnChangeBKN = (e: any) => {
		setPriceBKN(e.value);
	};

	const renderButtonContent1 = () => {
		return (
			<ConatainerFieldInput>
				<FieldRenderDropdown>
					<Box sx={{ width: '24px' }}>
						<img src={networkLogo} alt={network} />
					</Box>
					<Typography>{network}</Typography>
				</FieldRenderDropdown>
				<Box>
					<img src={DropDownIcon} alt="Drop down" />
				</Box>
			</ConatainerFieldInput>
		);
	};

	useEffect(() => {
		if (!listTokenPaymentChainId || listTokenPaymentChainId === undefined) return;
		const dataUSDT: any = listTokenPaymentChainId.find(({ symbol }) => symbol === 'USDT');
		const dataBKN: any = listTokenPaymentChainId.find(({ symbol }) => symbol === 'BKN');
		// console.log('network', network);
		// console.log('debouncedPriceNetwork', debouncedPriceNetwork);
		if (
			debouncedPriceNetwork === undefined ||
			debouncedPriceUSDT === undefined ||
			debouncedPriceBKN === undefined
		)
			return;
		(async () => {
			try {
				const weiNetwork = parseUnits(debouncedPriceNetwork.toString(), 18);

				const weiUST: BigNumber = await erc20function().changeTokenToWei(
					dataUSDT.address,
					debouncedPriceUSDT
				);
				const weiBKN: BigNumber = await erc20function().changeTokenToWei(
					dataBKN.address,
					debouncedPriceBKN
				);
				setValue('networkPaymentPrice', weiNetwork.toString());
				setValue('stableCoinPaymentPrice', weiBKN.toString());
				setValue('nativeTokenPaymentPrice', weiUST.toString());
			} catch (error) {
				console.log(error);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chooseChainId, debouncedPriceNetwork, debouncedPriceUSDT, debouncedPriceBKN]);

	// Handle click option
	const handleClickOption = (name: string, logo: string, chainId: number) => {
		setNetwork(name);
		setNetworkLogo(logo);
		setActiveDropDown(false);
		setChooseChainId(chainId);
	};
	const handleClickOption1 = (name: string, logo: string, chainId: number) => {
		setNetwork1(name);
		setNetworkLogo1(logo);
		setActiveDropDown1(false);
		setChooseChainId(chainId);
	};

	// Render Dropdown Item NetWork Payment
	const renderDropdownContent = () => {
		return (
			<Box sx={{ width: '100%', right: '0' }}>
				<ListOption sx={{ mt: 0.5 }}>
					{networkToken.map((item: any, idx: number) => {
						const isItemSelected =
							selected.find(
								(itemSelected: Selected) => itemSelected.name === item.name
							) !== undefined;
						return (
							<OptionItem
								key={idx}
								onClick={() => {
									handleClickOption(item.name, item.logo, item.chainId);
								}}
								sx={{ marginTop: '8px' }}
							>
								<Stack
									direction="row"
									alignItems="center"
									gap={1}
									sx={{
										background: '#0a2e4b',
										height: '48px',
										borderRadius: '8px',
										borderBottom: '2px solid blue',
										width: '100%',
									}}
								>
									<Box sx={{ width: '24px' }}>
										<img src={item.logo} alt={item.name} />
									</Box>
									<Typography>{item.name}</Typography>
								</Stack>

								{isItemSelected && (
									<CheckIconWrapperInCreateAution>
										<CheckIcon sx={{ width: '100%', height: '100%' }} />
									</CheckIconWrapperInCreateAution>
								)}
							</OptionItem>
						);
					})}
				</ListOption>
			</Box>
		);
	};

	// Render Dropdown Item NetWork
	const renderDropdownContent1 = () => {
		return (
			<Box sx={{ width: '100%', right: '0' }}>
				<ListOption sx={{ mt: 0.5 }}>
					{networkToken.map((item: any, idx: number) => {
						const isItemSelected =
							selected.find(
								(itemSelected: Selected) => itemSelected.name === item.name
							) !== undefined;
						return (
							<OptionItem
								key={idx}
								onClick={() => {
									handleClickOption1(item.name, item.logo, item.chainId);
								}}
								sx={{ marginTop: '8px' }}
							>
								<Stack
									direction="row"
									alignItems="center"
									gap={1}
									sx={{
										background: '#0a2e4b',
										height: '48px',
										borderRadius: '8px',
										borderBottom: '2px solid blue',
										width: '100%',
									}}
								>
									<Box sx={{ width: '24px' }}>
										<img src={item.logo} alt={item.name} />
									</Box>
									<Typography>{item.name}</Typography>
								</Stack>

								{isItemSelected && (
									<CheckIconWrapperInCreateAution>
										<CheckIcon sx={{ width: '100%', height: '100%' }} />
									</CheckIconWrapperInCreateAution>
								)}
							</OptionItem>
						);
					})}
				</ListOption>
			</Box>
		);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			style={{
				maxWidth: '1200px',
				margin: '0px auto',
				padding: '8px',
			}}
		>
			<Box>
				<PageTitle sx={{ textAlign: 'left', fontWeight: '400' }}>
					SEND REQUEST CREATE IGO
				</PageTitle>
				<Box sx={{ marginTop: 4 }}>
					<FieldTitleName>
						Project Name <Asterisk />
					</FieldTitleName>
					<FieldInput
						type="text"
						placeholder="Project Name"
						registerHookForm={{ ...register('projectName') }}
					/>
					{errors.projectName?.message && (
						<ErrorMessage>{errors.projectName?.message}</ErrorMessage>
					)}
				</Box>
				<Box sx={{ marginTop: 4 }}>
					<FieldTitleName>
						Company Name <Asterisk />
					</FieldTitleName>
					<FieldInput
						type="text"
						placeholder="Name Company"
						registerHookForm={{ ...register('companyName') }}
					/>
					{errors.companyName?.message && (
						<ErrorMessage>{errors.companyName?.message}</ErrorMessage>
					)}
				</Box>
				<Box sx={{ marginTop: 4 }}>
					<FieldTitleName>
						Your Email
						<Asterisk />
					</FieldTitleName>
					<FieldInput
						type="email"
						placeholder="Your Email"
						registerHookForm={{ ...register('email') }}
					/>
					{errors.email?.message && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
				</Box>
				{/* <Box sx={{ marginTop: 4 }}>
					<FieldTitleName>
						Network <Asterisk />
					</FieldTitleName>
					<DropDown
						sx={{ left: '0px', right: '0px' }}
						activeDropDown={activeDropDown1}
						setActiveDropDown={setActiveDropDown1}
						buttonContent={renderButtonContent1()}
						dropdownContent={renderDropdownContent1()}
					/>
					{errors.network?.message && (
						<ErrorMessage>{errors.network?.message}</ErrorMessage>
					)}
				</Box> */}

				<Box sx={{ marginTop: 4 }}>
					<FieldTitleName>
						Wallet Address <Asterisk />
					</FieldTitleName>
					<FieldInput
						type="text"
						placeholder="Wallet Address"
						registerHookForm={{ ...register('walletAddress') }}
					/>
					{errors.walletAddress?.message && (
						<ErrorMessage>{errors.walletAddress?.message}</ErrorMessage>
					)}
				</Box>
				<Box sx={{ marginTop: 4 }}>
					<FieldTitleName>
						Collection Address <Asterisk />
					</FieldTitleName>
					<FieldInput
						type="text"
						placeholder="Collection Address"
						registerHookForm={{ ...register('collectionAddress') }}
					/>
					{errors.collectionAddress?.message && (
						<ErrorMessage>{errors.collectionAddress?.message}</ErrorMessage>
					)}
				</Box>
				<Box sx={{ marginTop: 4 }}>
					<FieldTitleName>
						Project Website <Asterisk />
					</FieldTitleName>
					<FieldInput
						type="text"
						placeholder="Project Website"
						registerHookForm={{ ...register('projectWebsite') }}
					/>
					{errors.projectWebsite?.message && (
						<ErrorMessage>{errors.projectWebsite?.message}</ErrorMessage>
					)}
				</Box>

				<Box sx={{ marginTop: 4 }}>
					<FieldTitleName>
						Choose Network Token Payment <Asterisk />
					</FieldTitleName>
					<Stack direction="row" gap={2} mt={2}>
						<DropDown
							sx={{ left: '0px', right: '0px' }}
							activeDropDown={activeDropDown}
							setActiveDropDown={setActiveDropDown}
							buttonContent={renderButtonContent()}
							dropdownContent={renderDropdownContent()}
						/>
						<FieldInput
							type="number"
							placeholder="Amount"
							onChange={(e: any) => {
								setPriceNetwork(e.target.value);
							}}
						/>
					</Stack>

					{errors.projectDescription?.message && (
						<ErrorMessage>{errors.projectDescription?.message}</ErrorMessage>
					)}
				</Box>
				<Box sx={{ marginTop: 4 }}>
					<FieldTitleName>
						Price <Asterisk />
					</FieldTitleName>
					<Stack direction="row" gap={2} flex="1">
						<Stack direction="row" gap={2} mt={2} flex="1">
							<FieldRenderDropdown>
								<Box sx={{ width: '24px' }}>
									<img src={TetherUST} alt="tether" />
								</Box>
								<Typography>USDT</Typography>
							</FieldRenderDropdown>
							<FieldInput
								type="number"
								placeholder="Amount"
								onChange={(e: any) => {
									setPriceUSDT(e.target.value);
								}}
							/>
						</Stack>
						<Stack direction="row" gap={2} mt={2} flex="1">
							<FieldRenderDropdown>
								<Box sx={{ width: '24px' }}>
									<img src={TetherUST} alt="tether" />
								</Box>
								<Typography>BKN</Typography>
							</FieldRenderDropdown>
							<FieldInput
								type="number"
								placeholder="Amount"
								onChange={(e: any) => {
									setPriceBKN(e.target.value);
								}}
							/>
						</Stack>
					</Stack>

					{errors.projectDescription?.message && (
						<ErrorMessage>{errors.projectDescription?.message}</ErrorMessage>
					)}
				</Box>
				<Box sx={{ marginTop: 4 }}>
					<FieldTitleName>
						Start Time <Asterisk />
					</FieldTitleName>

					<DateTimePickerCustom dateTime={date1} setDateTime={setDate1} />
				</Box>
				<Box sx={{ marginTop: 4 }}>
					<FieldTitleName>
						End Time <Asterisk />
					</FieldTitleName>

					<DateTimePickerCustom dateTime={date2} setDateTime={setDate2} />
				</Box>

				<Box sx={{ marginTop: 4 }}>
					<FieldTitleName>
						Project Description <Asterisk />
					</FieldTitleName>
					<FieldTextArea
						rows={4}
						cols={4}
						placeholder="Project Description"
						registerHookForm={{ ...register('projectDescription') }}
					/>
					{errors.projectDescription?.message && (
						<ErrorMessage>{errors.projectDescription?.message}</ErrorMessage>
					)}
				</Box>

				<Stack direction="row" gap={0.5} alignItems="center" sx={{ marginTop: 1 }}>
					<Checkbox required />
					<Typography>By tick, i asdkamsd</Typography>
				</Stack>
				<Box sx={{ width: '250px', marginTop: '24px', textAlign: 'left' }}>
					<ButtonGradient type="submit">
						<Typography>Send</Typography>
					</ButtonGradient>
				</Box>
			</Box>
		</form>
	);
}
