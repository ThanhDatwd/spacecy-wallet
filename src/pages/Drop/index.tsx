/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// mui
import { Box, Typography, useTheme } from '@mui/material';
// components

import TabCommon from 'components/CustomUI/Tab/TabCommon';
// models
import { OptionSelectCustom } from 'models';
import Upcoming from './Upcoming';
import Active from './Active';
import { SizeContext } from 'contexts/SizeObserver';
import { useDrop } from 'hooks/useDrop';
import { useAppSelector } from 'redux/hooks';
import { selectDropData } from 'redux/slices/dropSlice';
//contract
import { selectChainId } from 'redux/slices/web3InfoSlice';
import { getWeb3Contract } from '../../hooks/getWeb3Contract';
import BoarcDrop from 'abis/BoarcDrop.json';
import { CONTRACT } from '../../constants';

function Drop() {
	const theme = useTheme();
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const { getDataDrop } = useDrop();
	const tabsDetail = {
		items: [
			{
				title: 'Upcoming',
				isShow: true,
			},
			{
				title: 'Active',
				isShow: true,
			},
		],
		sections: [
			{
				Section: <Upcoming />,
				isShow: true,
			},
			{ Section: <Active />, isShow: true },
		],
	};

	return (
		<Box
			sx={{
				mt: '120px',
				maxWidth: MaxWidth,
				mx: 'auto',
				px: 4,
				[theme.breakpoints.down(768)]: {
					px: 2,
				},
				[theme.breakpoints.down(480)]: {
					px: '10px',
				},
			}}
		>
			<Typography textAlign="center" variant="h1" fontWeight={600} mb={2}>
				Drops
			</Typography>
			<TabCommon tabItems={tabsDetail.items} tabSections={tabsDetail.sections} />
		</Box>
	);
}

export default React.memo(Drop);
