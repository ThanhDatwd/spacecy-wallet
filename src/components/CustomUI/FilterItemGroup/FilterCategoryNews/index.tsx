import React, { useEffect, useState } from 'react';
// mui

import CheckIcon from '@mui/icons-material/Check';
// components
import DropDown from '../../DropDown';
// redux
import { useDispatch } from 'react-redux';
// styled
import {
	ButtonBadge,
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
import iconStatusBlack from 'assets/icons/filter-status-black.webp';
// models
import { useTheme } from '@mui/material';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
export interface CategoryNews {
	id: number;
	name: string;
	value: number;
}

export const listCategoryNews: CategoryNews[] = [
	{ id: 0, name: 'All', value: 0 },
	{ id: 1, name: 'Crypto', value: 1 },
	{ id: 2, name: 'Sport', value: 2 },
	{ id: 3, name: 'Esport', value: 3 },
	{ id: 4, name: 'Economics', value: 4 },
	{ id: 5, name: 'Politics', value: 5 },
];

const defaultButtonTitle = 'Category';

export interface IFilterCategoryProps {
	filter: object;
	setFilter: Function;
	resetAll: boolean;
}

export default function FilterCategoryNews({ filter, setFilter, resetAll }: IFilterCategoryProps) {
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
	};

	const handleApply = () => {
		let arrCategoryValue: number[] = [];
		let arrCategoryName: string[] = [];

		if (selected.length !== 0) {
			selected.forEach((item: number) => {
				arrCategoryValue.push(listCategoryNews[item].value);
				arrCategoryName.push(listCategoryNews[item].name);
			});
		}

		if (arrCategoryName.length === 0) {
			setButtonTitle(defaultButtonTitle);
		} else {
			setButtonTitle(arrCategoryName.join(', '));
		}

		const newFilter: object = { ...filter, collectionId: arrCategoryName };
		dispatch(setFilter(newFilter));
	};

	const renderButtonContent = () => {
		return (
			<ButtonWrapper>
				{buttonTitle !== defaultButtonTitle && (
					<ButtonBadge>{defaultButtonTitle}</ButtonBadge>
				)}

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
					{listCategoryNews.map((item: CategoryNews, idx: number) => {
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
				<DropdownButtonGroup>
					<ButtonWhite onClick={handleClear} sx={{ width: '130px' }}>
						Clear
					</ButtonWhite>
					<ButtonGradient onClick={handleApply} sx={{ width: '130px' }}>
						Apply
					</ButtonGradient>
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
