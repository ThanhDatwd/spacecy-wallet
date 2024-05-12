/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
// mui
import { Stack, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
// components
import DropDown from '../../DropDown';
import DividerGradient from 'components/CustomUI/DividerGradient';
// redux
import { useDispatch } from 'react-redux';
// styled
import {
	ButtonApply,
	ButtonBadge,
	ButtonClear,
	ButtonStyled,
	ButtonTitle,
	ButtonWrapper,
	CheckIconWrapper,
	DropdownButtonGroup,
	DropdownWrapper,
	IconStyled,
	ListOption,
	OptionItem,
	OptionItemImage,
	OptionItemText,
} from '../Common/styled';
// images
import iconBlockChainWhite from 'assets/icons/filter-blockchain-white.webp';
import iconBlockChainBlack from 'assets/icons/icon-filter-blockchain.svg';
// constants
import { NETWORKINFO } from '../../../../constants';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import ButtonGradient from 'components/CustomUI/ButtonGradient';

interface BlockChain {
	id: number;
	chainId: number;
	name: string;
	chainImage: string;
}

export const listBlockChain: BlockChain[] = [
	{ id: 0, chainId: 4, name: NETWORKINFO[1].name, chainImage: NETWORKINFO[4].image },
	{ id: 1, chainId: 97, name: NETWORKINFO[97].name, chainImage: NETWORKINFO[97].image },
	// { id: 2, chainId: 80001, name: NETWORKINFO[80001].name, chainImage: NETWORKINFO[80001].image },
	// { id: 3, chainId: 43113, name: NETWORKINFO[43113].name, chainImage: NETWORKINFO[43113].image },
];

const defaultButtonTitle = 'Blockchain';

export interface IFilterBlockChainProps {
	filter: object;
	setFilter: Function;
	resetAll: boolean;
}

export default function FilterBlockChain({ filter, setFilter, resetAll }: IFilterBlockChainProps) {
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
		let arrChainId: number[] = [];
		let arrChainName: string[] = [];

		if (selected.length !== 0) {
			selected.forEach((item: number) => {
				arrChainId.push(listBlockChain[item].chainId);
				arrChainName.push(listBlockChain[item].name);
			});
		}

		if (arrChainName.length === 0) {
			setButtonTitle(defaultButtonTitle);
		} else {
			setButtonTitle(arrChainName.join(', '));
		}
		setActiveDropDown(false);
		const newFilter: object = { ...filter, chainId: arrChainId };
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
							<img src={iconBlockChainBlack} alt="icon block chain" />
						) : (
							<img src={iconBlockChainWhite} alt="icon block chain" />
						)}
					</IconStyled>
					{/* <ButtonTitle>{buttonTitle}</ButtonTitle> */}
					<ButtonTitle>Blockchain</ButtonTitle>
				</ButtonStyled>
			</ButtonWrapper>
		);
	};

	const renderDropdownContent = () => {
		return (
			<DropdownWrapper sx={{ width: '320px' }}>
				<ListOption>
					{listBlockChain.map((item: BlockChain, idx: number) => {
						const isItemSelected = selected.indexOf(item.id) !== -1;

						return (
							<OptionItem
								key={idx}
								onClick={() => {
									handleClickOption(item.id);
								}}
							>
								<OptionItemImage sx={{ width: '25px', height: '25px' }}>
									<img src={item.chainImage} alt="icon chain" />
								</OptionItemImage>

								<OptionItemText style={{ textAlign: 'center' }}>
									{item.name}
								</OptionItemText>

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
					<ButtonWhite onClick={handleApply} sx={{ width: '130px' }}>
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
