/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// mui
import { Box, Stack, Typography, useTheme } from '@mui/material';
// components
import DropDown from '../../DropDown';
import SelectCustom from 'components/CustomField/SelectCustom';
import FieldInput from 'components/CustomField/FieldInput';
import AutoCompleteCustom2 from 'components/CustomField/AutoCompleteCustom2';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectListTokenPayment } from 'redux/slices/tokenPaymentSlice';
// styled
import {
	ButtonBadge,
	ButtonStyled,
	ButtonTitle,
	ButtonWrapper,
	DropdownButtonGroup,
	DropdownWrapper,
	IconStyled,
} from '../Common/styled';
// models
import { OptionSelectCustom, TokenPayment } from 'models';
// images
import iconPriceWhite from 'assets/icons/filter-price-white.webp';
import iconPriceBlack from 'assets/icons/icon-filter-price.svg';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import { relative } from 'path';

export interface IFormFilterPrice {
	minPrice: string;
	maxPrice: string;
}

const defaultButtonTitle = 'Pool';

export interface IFilterPriceProps {
	filter: object;
	setFilter: Function;
	resetAll: boolean;
}

export default function FilterPoolNews({ filter, setFilter, resetAll }: IFilterPriceProps) {
	const dispatch = useDispatch();
	const theme = useTheme();

	const isLightTheme = theme.palette.mode === 'light';

	// useState
	const [currentTokenPayment, setCurrentTokenPayment] = useState<
		OptionSelectCustom<string> | null | undefined
	>();
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [buttonTitle, setButtonTitle] = useState<string>(defaultButtonTitle);
	const [open, setOpen] = useState<boolean>(false);
	const ref: any = useRef(null);
	// useSelector
	const listTokenPayment: TokenPayment[] = useSelector(selectListTokenPayment);

	const listTokenPaymentTransformed: OptionSelectCustom<string>[] = listTokenPayment.map(
		(tokenPayment: TokenPayment) => ({
			name: tokenPayment.symbol,
			value: tokenPayment.address,
			image: tokenPayment.logoURI,
		})
	);

	// useEffect
	useEffect(() => {
		if (resetAll) {
			handleClear();
			setButtonTitle(defaultButtonTitle);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resetAll]);

	// functions
	const handleChangePaymentToken = (
		currentOption: OptionSelectCustom<string> | null | undefined
	) => {
		setCurrentTokenPayment(currentOption);
	};

	const handleClear = () => {
		reset();
	};

	const schema = yup
		.object({
			minPrice: yup.number(),
			maxPrice: yup.number(),
		})
		.required();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<IFormFilterPrice>({
		resolver: yupResolver(schema),
	});
	const handleApply = (data: IFormFilterPrice) => {
		let symbol: string = '';
		// data.minPrice = data.minPrice.trim();
		// data.maxPrice = data.maxPrice.trim();

		if (Number(data.minPrice) < 0 || Number(data.maxPrice) < 0) {
			toast.warning('Invalid price!');
			return;
		}

		if (
			data.minPrice !== '' &&
			data.maxPrice !== '' &&
			Number(data.minPrice) > Number(data.maxPrice)
		) {
			toast.warning('Max price cannot be less than min price!');
			return;
		}

		if (data.minPrice === '' && data.maxPrice === '') {
			symbol = '';
			setButtonTitle(defaultButtonTitle);
		} else {
			const minPrice: string = data.minPrice ? data.minPrice : 'min';
			const maxPrice: string = data.maxPrice ? data.maxPrice : 'max';

			setButtonTitle(minPrice + ' - ' + maxPrice + ' ' + symbol);
		}
		setActiveDropDown(false);
		const newFilter: object = {
			...filter,
			...data,
			tokenSymbol: symbol,
		};
		dispatch(setFilter(newFilter));
	};
	const openModal = () => {
		setOpen(true);
	};
	useEffect(() => {
		const onBodyClick = (event: any) => {
			event.stopPropagation();
			console.log('event ', event);

			if (ref.current && !ref.current.contains(event.target)) {
				setOpen(false);
			}
		};
		// Bind the event listener if dropdown is active
		if (open) document.body.addEventListener('click', onBodyClick, { passive: true });

		return () => {
			// Unbind the event listener on clean up
			document.body.removeEventListener('click', onBodyClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);
	return (
		<>
			{/* <DropDown
				activeDropDown={activeDropDown}
				setActiveDropDown={setActiveDropDown}
				buttonContent={renderButtonContent()}
				dropdownContent={renderDropdownContent()}
			/> */}
			<Box sx={{ position: 'relative' }}>
				<ButtonWrapper onClick={openModal}>
					{buttonTitle !== defaultButtonTitle && (
						<ButtonBadge>{defaultButtonTitle}</ButtonBadge>
					)}

					<ButtonStyled>
						<IconStyled sx={{ width: '14px' }}>
							{isLightTheme ? (
								<img src={iconPriceBlack} alt="icon price" />
							) : (
								<img src={iconPriceWhite} alt="icon price" />
							)}
						</IconStyled>
						<ButtonTitle>{defaultButtonTitle}</ButtonTitle>
					</ButtonStyled>
				</ButtonWrapper>
				{open && (
					<form
						onSubmit={handleSubmit(handleApply)}
						style={{ position: 'absolute', zIndex: 999, left: 0, top: '110%' }}
						ref={ref}
						onClick={openModal}
					>
						<DropdownWrapper sx={{ minWidth: '300px' }}>
							<Stack
								direction="row"
								alignItems="center"
								spacing={1}
								sx={{ mt: 1, width: '92%', mx: 'auto' }}
							>
								<Box>
									<Typography variant="body1">Min</Typography>
									<FieldInput
										id="min-price"
										type="number"
										placeholder="Min"
										registerHookForm={{ ...register('minPrice') }}
										sx={{
											borderWidth: '1px',
											borderRadius: '12px',
											padding: '12.5px 15px',
										}}
									/>
								</Box>
								<Box>
									<Typography variant="body1">Max</Typography>
									<FieldInput
										id="max-price"
										type="number"
										placeholder="Max"
										registerHookForm={{ ...register('maxPrice') }}
										sx={{
											borderWidth: '1px',
											borderRadius: '12px',
											padding: '12.5px 15px',
										}}
									/>
								</Box>
							</Stack>
							<DropdownButtonGroup>
								<ButtonWhite onClick={handleClear} sx={{ width: '130px' }}>
									Clear
								</ButtonWhite>
								<ButtonWhite type="submit" sx={{ width: '130px' }}>
									Apply
								</ButtonWhite>
							</DropdownButtonGroup>
						</DropdownWrapper>
					</form>
				)}
			</Box>
		</>
	);
}
