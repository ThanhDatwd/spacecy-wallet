/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
// components
import DropDown from '../DropDown';
// redux
import { useDispatch } from 'react-redux';
// styled
import {
	ButtonReset,
	DropdownContentStyled,
	FilterBox,
	FilterStack,
	FilterWrapper,
	screenBreakpoint,
} from './styled';
// mui
import { Box, Stack, useTheme } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import IconApp from 'assets/icons/icon-app.svg';
import IconTrend from 'assets/icons/icon-trend.svg';

export interface IFilterItemGroupProps {
	initialStateFilter: object;
	filter: object;
	setFilter: Function;
}

export default function FilterItemRanking({
	initialStateFilter,
	filter,
	setFilter,
}: IFilterItemGroupProps) {
	const dispatch = useDispatch();
	const theme = useTheme();
	// useState
	const [resetAll, setResetAll] = useState<boolean>(false);
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);

	const handleResetAll = () => {
		if (!resetAll) {
			setResetAll(true);
			dispatch(setFilter(initialStateFilter));

			setTimeout(() => {
				setResetAll(false);
			}, 500);
		}
	};

	const renderButtonContent = () => {
		return (
			<FilterBox sx={{ padding: '8px' }}>
				<FilterAltOutlinedIcon sx={{ width: '20px', height: '20px' }} />
			</FilterBox>
		);
	};

	const renderDropdownContent = () => {
		return (
			<DropdownContentStyled>
				<FilterStack>
					<Box
						sx={{
							display: 'flex',
							gap: '15px',
							[theme.breakpoints.down(600)]: {
								flexDirection: 'column',
								margin: 0,
							},
						}}
					>
						<Box
							sx={{
								display: 'flex',
								gap: '10px',
								alignItems: 'center',
								fontWeight: '500',
								padding: '6px 20px',
								border: '1px solid #E7E8EC',
								borderRadius: '12px',
								cursor: 'pointer',
								transition: 'all 0.4s',
								background: '#fff',
								minWidth: '180px',
								':hover': {
									transform: 'scale(0.95)',
								},
							}}
						>
							<img src={IconApp} alt="icon" />
							<p>All Categories</p>
						</Box>
						<Box
							sx={{
								display: 'flex',
								gap: '10px',
								alignItems: 'center',
								fontWeight: '500',
								padding: '6px 20px',
								border: '1px solid #E7E8EC',
								background: '#fff',
								borderRadius: '12px',
								cursor: 'pointer',
								transition: 'all 0.4s',
								minWidth: '180px',
								':hover': {
									transform: 'scale(0.95)',
								},
							}}
						>
							<img src={IconTrend} alt="icon" />
							<p>All Chains</p>
						</Box>
					</Box>
				</FilterStack>
			</DropdownContentStyled>
		);
	};

	return (
		<FilterWrapper>
			<Box className="big-screen">{renderDropdownContent()}</Box>

			<DropDown
				activeDropDown={activeDropDown}
				setActiveDropDown={setActiveDropDown}
				buttonContent={renderButtonContent()}
				dropdownContent={renderDropdownContent()}
				className="small-screen"
			/>
		</FilterWrapper>
	);
}
