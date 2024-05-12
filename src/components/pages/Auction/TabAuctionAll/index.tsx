/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
// redux

// components

import { Box, Tab, Tabs } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { TypographyStyled } from './styled';
import { PATH_AUCTION } from 'routes/path';
import TabCommon from 'components/CustomUI/Tab/TabCommon';
import LiveOnTab from '../Tabs/LiveOn';
import UpcomingTab from '../Tabs/UpComing';

export interface IAuctionProps {}
function TabAuctionAll() {
	const [value, setValue] = React.useState(0);
	const { pathname } = useLocation();

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	useEffect(() => {
		const checkRoute = (pathname: any): void => {
			switch (pathname) {
				case `${PATH_AUCTION.liveOn}`: {
					setValue(0);
					break;
				}
				case `${PATH_AUCTION.upComming}`: {
					setValue(1);
					break;
				}
				default: {
					setValue(0);
				}
			}
		};
		checkRoute(pathname);
		return;
		// eslint-disable-next-line
	}, [pathname]);
	const tabsDetail = {
		items: [
			{
				title: 'Live Auction',
				isShow: true,
			},
			{
				title: 'Upcoming',
				isShow: true,
			},
		],
		sections: [
			{
				Section: <LiveOnTab />,
				isShow: true,
			},
			{ Section: <UpcomingTab />, isShow: true },
		],
	};
	return (
		<>
			<TabCommon tabItems={tabsDetail.items} tabSections={tabsDetail.sections} />
		</>
	);
}
export default React.memo(TabAuctionAll);
