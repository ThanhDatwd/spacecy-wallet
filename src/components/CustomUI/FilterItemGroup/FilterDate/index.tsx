/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// mui
import { Box, Stack, TextField, Typography, useTheme } from '@mui/material';
// components
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
import iconCalendarWhite from 'assets/icons/icon-calendar-white.svg';
import iconCalendarBlack from 'assets/icons/icon-calendar-black.svg';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import { relative } from 'path';
import moment from 'moment';

export interface IFormFilterPrice {
	startTime: number;
	endTime: number;
}

const defaultButtonTitle = 'Date';

export interface IFilterPriceProps {
	filter: object;
	setFilter: Function;
	resetAll: boolean;
}

export default function FilterDate({ filter, setFilter, resetAll }: IFilterPriceProps) {
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
			startTime: yup.number(),
			endTime: yup.number(),
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
		if (Number(data.startTime) > Number(data.endTime)) {
			toast.warning('End time cannot be less than start time!');
			return;
		}
		if (!data.startTime || !data.endTime) {
			toast.warning('Invalid time');
			return;
		}
		setActiveDropDown(false);
		const newFilter: object = {
			...filter,
			...data,
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
								<img src={iconCalendarBlack} alt="icon price" />
							) : (
								<img src={iconCalendarWhite} alt="icon price" />
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
							<Box sx={{ mt: 1, width: '92%', mx: 'auto' }}>
								<Typography variant="body1">Start Time</Typography>
								<TextField
									type="date"
									sx={{ width: '100%' }}
									onChange={(e: any) => {
										setValue(
											'startTime',
											moment(e.target.value).valueOf() / 1000
										);
									}}
								/>
							</Box>
							<Box sx={{ mt: 1, width: '92%', mx: 'auto' }}>
								<Typography variant="body1">End Time</Typography>
								<TextField
									sx={{ width: '100%' }}
									type="date"
									onChange={(e: any) => {
										setValue(
											'endTime',
											moment(e.target.value).valueOf() / 1000
										);
									}}
								/>
							</Box>
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
