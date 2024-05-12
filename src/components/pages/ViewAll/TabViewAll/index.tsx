/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from 'react';
// mui
import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
// images
import iconAssetWhite from 'assets/icons/asset-white.webp';
import iconAssetBlack from 'assets/icons/marketplace-tab/Items.svg';
import iconAssetGray from 'assets/icons/marketplace-tab/Items-1.svg';

import iconCollectionWhite from 'assets/icons/filter-collection-white.webp';
import iconCollectionBlack from 'assets/icons/marketplace-tab/Collections.svg';
import iconCollectionGray from 'assets/icons/marketplace-tab/Collections-1.svg';

import iconUserWhite from 'assets/icons/marketplace-tab/User.svg';
import iconUserBlack from 'assets/icons/marketplace-tab/User.svg';
import iconUserGray from 'assets/icons/marketplace-tab/User-1.svg';
// redux
import { useDispatch } from 'react-redux';
import { resetAll as resetAllNfts } from 'redux/slices/allNftsSlice';
import { resetAll as resetAllCollections } from 'redux/slices/collectionSlice';
import { resetAll as resetAllUsers } from 'redux/slices/allUsersSlice';
// components
import TabCommonMarket from 'components/CustomUI/Tab/TabCommonMarket';
import ItemsTab from '../Tabs/ItemsTab';
import CollectionsTab from '../Tabs/CollectionsTab';
import UsersTab from '../Tabs/UsersTab';
import { TypographyStyled, StyleText } from './styled';
import { useLocation } from 'react-router-dom';
import { PATH_VIEWALL } from 'routes/path';

export interface IViewAllProps {
	query: string;
}

function TabViewAll({ query }: IViewAllProps) {
	const theme = useTheme();
	const dispatch = useDispatch();
	const [value, setValue] = React.useState(0);
	const { pathname } = useLocation();

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	// useRef
	const arrOpenedTab = useRef<boolean[]>([]);

	// vars
	const isLightTheme = theme.palette.mode === 'light';

	// useEffect
	useEffect(() => {
		return () => {
			dispatch(resetAllNfts());
			dispatch(resetAllCollections());
			dispatch(resetAllUsers());
		};
	}, [dispatch, query]);

	useEffect(() => {
		const checkRoute = (pathname: any): void => {
			switch (pathname) {
				case `${PATH_VIEWALL.items}`: {
					setValue(0);
					break;
				}
				case `${PATH_VIEWALL.collections}`: {
					setValue(1);
					break;
				}
				case `${PATH_VIEWALL.user}`: {
					setValue(2);
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
				title: 'Items',
				icon: <img src={iconAssetGray} alt="favorite icon" width={22} height={20} />,
				iconSelected: (
					<img src={iconAssetBlack} alt="favorite icon" width={22} height={20} />
				),
				link: `#${PATH_VIEWALL.items}`,
				isShow: true,
			},
			{
				title: 'Collections',
				icon: <img src={iconCollectionGray} alt="favorite icon" width={22} height={20} />,
				iconSelected: (
					<img src={iconCollectionBlack} alt="favorite icon" width={22} height={20} />
				),
				link: `#${PATH_VIEWALL.collections}`,
				isShow: true,
			},
			{
				title: 'Users',
				icon: <img src={iconUserGray} alt="favorite icon" width={22} height={20} />,
				iconSelected: (
					<img src={iconUserBlack} alt="favorite icon" width={22} height={20} />
				),
				link: `#${PATH_VIEWALL.user}`,
				isShow: true,
			},
		],
		sections: [
			// {
			// 	Section: <ItemsTab />,
			// 	isShow: true,
			// },
		],
	};

	return (
		<TabCommonMarket tabItems={tabsDetail.items} tabSections={tabsDetail.sections} />
		// <>
		// 	<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
		// 		{/* <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
		// 			<Tab
		// 				href={`#${PATH_VIEWALL.items}`}
		// 				label={
		// 					<Stack direction="row" alignItems="center" spacing={1}>
		// 						<Box
		// 							sx={{
		// 								position: 'relative',
		// 							}}
		// 						>
		// 							{value === 0 ? (
		// 								isLightTheme ? (
		// 									<Stack direction="row" alignItems="center">
		// 										<img
		// 											src={iconAssetBlack}
		// 											alt="asset icon"
		// 											width={20}
		// 											height={20}
		// 										/>
		// 										<StyleText sx={{ color: theme.palette.primary.light }}>
		// 											Item
		// 										</StyleText>
		// 									</Stack>
		// 								) : (
		// 									<img
		// 										src={iconAssetWhite}
		// 										alt="asset icon"
		// 										width={20}
		// 										height={20}
		// 									/>
		// 								)
		// 							) : (
		// 								<Stack direction="row" alignItems="center">
		// 									<img
		// 										src={iconAssetGray}
		// 										alt="asset icon"
		// 										width={20}
		// 										height={20}
		// 									/>
		// 									<StyleText sx={{ color: '#1d1d1f' }}>Item</StyleText>
		// 								</Stack>
		// 							)}
		// 						</Box>
		// 					</Stack>
		// 				}
		// 			/>
		// 			<Tab
		// 				href={`#${PATH_VIEWALL.collections}`}
		// 				label={
		// 					<Stack direction="row" alignItems="center" spacing={1}>
		// 						<Box
		// 							sx={{
		// 								position: 'relative',
		// 							}}
		// 						>
		// 							{value === 1 ? (
		// 								isLightTheme ? (
		// 									<Stack direction="row" alignItems="center">
		// 										<img
		// 											src={iconCollectionBlack}
		// 											alt="Collection icon"
		// 											width={18}
		// 											height={18}
		// 										/>
		// 										<StyleText sx={{ color: theme.palette.primary.light }}>
		// 											Collections
		// 										</StyleText>
		// 									</Stack>
		// 								) : (
		// 									<img
		// 										src={iconCollectionWhite}
		// 										alt="Collection icon"
		// 										width={18}
		// 										height={18}
		// 									/>
		// 								)
		// 							) : (
		// 								<Stack direction="row" alignItems="center">
		// 									<img
		// 										src={iconCollectionGray}
		// 										alt="Collection icon"
		// 										width={18}
		// 										height={18}
		// 									/>
		// 									<StyleText sx={{ color: '#1d1d1f' }}>
		// 										Collections
		// 									</StyleText>
		// 								</Stack>
		// 							)}
		// 						</Box>
		// 					</Stack>
		// 				}
		// 			/>
		// 			<Tab
		// 				href={`#${PATH_VIEWALL.user}`}
		// 				label={
		// 					<Stack direction="row" alignItems="center" spacing={1}>
		// 						<Box
		// 							sx={{
		// 								position: 'relative',
		// 							}}
		// 						>
		// 							{value === 2 ? (
		// 								isLightTheme ? (
		// 									<Stack direction="row" alignItems="center">
		// 										<img
		// 											src={iconUserBlack}
		// 											alt="User icon"
		// 											width={20}
		// 											height={20}
		// 										/>
		// 										<StyleText sx={{ color: theme.palette.primary.light }}>
		// 											User
		// 										</StyleText>
		// 									</Stack>
		// 								) : (
		// 									<img
		// 										src={iconUserWhite}
		// 										alt="User icon"
		// 										width={20}
		// 										height={20}
		// 									/>
		// 								)
		// 							) : (
		// 								<Stack direction="row" alignItems="center">
		// 									<img
		// 										src={iconUserGray}
		// 										alt="User icon"
		// 										width={20}
		// 										height={20}
		// 									/>
		// 									<StyleText sx={{ color: '#1d1d1f' }}>User</StyleText>
		// 								</Stack>
		// 							)}
		// 						</Box>
		// 					</Stack>
		// 				}
		// 			/>
		// 		</Tabs> */}
		// 	</Box>
		// </>
	);
}

export default React.memo(TabViewAll);
