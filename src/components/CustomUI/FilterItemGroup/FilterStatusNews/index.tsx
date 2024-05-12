import React, { useState, useEffect } from 'react';
// mui

import CheckIcon from '@mui/icons-material/Check';
// components
import DropDown from '../../DropDown';
import DividerGradient from 'components/CustomUI/DividerGradient';
// redux
import { useDispatch } from 'react-redux';
// styled
import {
	ButtonStyled,
	ButtonTitle,
	ButtonWrapper,
	CheckIconWrapper,
	DropdownButtonGroup,
	DropdownWrapper,
	IconStyled,
	ListOption,
	OptionItem,
	OptionItemText,
} from '../Common/styled';
// images
import iconStatusWhite from 'assets/icons/filter-status-white.webp';
import iconStatusBlack from 'assets/icons/icon-filter-status.svg';
// constants
import { EVENT_STATUS } from '../../../../constants';
// models
import { useTheme } from '@mui/material';
import ButtonWhite from 'components/CustomUI/ButtonWhite';

interface Status {
	id: number;
	name: string;
	value: number;
}

const listStatus: Status[] = [
	{ id: 0, name: 'Upcoming', value: EVENT_STATUS.UPCOMING },
	{ id: 1, name: 'Live', value: EVENT_STATUS.LIVE },
	{ id: 2, name: 'End', value: EVENT_STATUS.END },
];

const defaultButtonTitle = 'Status';

export interface IFilterStatusProps {
	filter: object;
	setFilter: Function;
	resetAll: boolean;
}

export default function FilterStatusNews({ filter, setFilter, resetAll }: IFilterStatusProps) {
	const dispatch = useDispatch();
	const theme = useTheme();

	const isLightTheme = theme.palette.mode === 'light';

	// useState
	const [selected, setSelected] = useState<number[]>([]);
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [buttonTitle, setButtonTitle] = useState<string>(defaultButtonTitle);

	// useEffect
	useEffect(() => {
		if (resetAll) {
			handleClear();
			setButtonTitle(defaultButtonTitle);
		}
	}, [resetAll]);

	// functions
	const handleClickOption = (id: number) => {
		const selectedIndex = selected.indexOf(id);

		if (selectedIndex === -1) {
			// option is not selected => select
			setSelected([...selected, id]);
		} else {
			// option is selected => remove
			setSelected(selected.filter((item: number) => item !== id));
		}
	};

	const handleClear = () => {
		setSelected([]);
		setButtonTitle(defaultButtonTitle);
	};

	const handleApply = () => {
		let arrStatusValue: number[] = [];
		let arrStatusName: string[] = [];

		if (selected.length !== 0) {
			selected.forEach((item: number) => {
				arrStatusValue.push(listStatus[item].value);
				arrStatusName.push(listStatus[item].name);
			});
		}

		// if (arrStatusName.length === 0) {
		// 	setButtonTitle(defaultButtonTitle);
		// } else {
		// 	setButtonTitle(arrStatusName.join(', '));
		// }

		setActiveDropDown(false);

		const newFilter: object = { ...filter, status: arrStatusValue };
		dispatch(setFilter(newFilter));
	};

	const renderButtonContent = () => {
		return (
			<ButtonWrapper>
				{/* {buttonTitle !== defaultButtonTitle && (
					<ButtonBadge>{defaultButtonTitle}</ButtonBadge>
				)} */}

				<ButtonStyled>
					<IconStyled sx={{ width: '14px', height: '14px' }}>
						{isLightTheme ? (
							<img src={iconStatusBlack} alt="icon status" />
						) : (
							<img src={iconStatusWhite} alt="icon status" />
						)}
					</IconStyled>
					<ButtonTitle>{buttonTitle}</ButtonTitle>
				</ButtonStyled>
			</ButtonWrapper>
		);
	};

	const renderDropdownContent = () => {
		return (
			<DropdownWrapper sx={{ minWidth: '300px' }}>
				<ListOption>
					{listStatus.map((item: Status, idx: number) => {
						const isItemSelected = selected.indexOf(item.id) !== -1;

						return (
							<OptionItem
								key={idx}
								onClick={() => {
									handleClickOption(item.id);
								}}
							>
								<OptionItemText>{item.name}</OptionItemText>

								{isItemSelected && (
									<CheckIconWrapper>
										<CheckIcon sx={{ width: '100%', height: '100%' }} />
									</CheckIconWrapper>
								)}
							</OptionItem>
						);
					})}
				</ListOption>

				<DividerGradient />

				<DropdownButtonGroup>
					<ButtonWhite onClick={handleClear} sx={{ width: '130px' }}>
						Clear
					</ButtonWhite>
					<ButtonWhite type="submit" onClick={handleApply} sx={{ width: '130px' }}>
						Apply
					</ButtonWhite>
				</DropdownButtonGroup>
			</DropdownWrapper>
		);
	};

	return (
		<DropDown
			activeDropDown={activeDropDown}
			setActiveDropDown={setActiveDropDown}
			buttonContent={renderButtonContent()}
			dropdownContent={renderDropdownContent()}
		/>
	);
}
