/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, lazy, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import { Box, Stack, Typography, Drawer, Tooltip, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// styled
import {
	DropdownMenu,
	NavBar,
	NavigationBarBigScreen,
	NavigationItemBigScreen,
	NavLinkBigScreen,
	DropdownMenuLink,
} from './styled';
import { CollectionCategory } from 'models';
import { CATEGORY_COLLECTION } from 'constants/common.constant';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCollectionCategory } from 'redux/slices/collectionCategorySlice';
// components
import GlobalSearch from '../GlobalSearch';
// path
import {
	PATH_AUCTION,
	PATH_EARN,
	PATH_IGO,
	PATH_PAGE,
	PATH_CATEGORY,
	PATH_VIEWALL,
	PATH_MARKETPLACE,
	PATH_BOARC,
	PATH_DROP,
	PATH_VIRTUAL_WORLD,
	PATH_EVENT,
	PATH_PREDICTION,
} from 'routes/path';
import { boolean } from 'yup';
import { useNavigateSearch } from 'hooks';
// Image
import IconNftspace from 'assets/icons/NavBar/icon-nftspace-gray.svg';

import IconColectibles from 'assets/icons/NavBar/icon-colectibles.svg';
import IconArt from 'assets/icons/NavBar/icon-art.svg';
import IconMusic from 'assets/icons/NavBar/icon-music.svg';
import IconSports from 'assets/icons/NavBar/icon-sports.svg';
import IconPhotography from 'assets/icons/NavBar/icon-domain.svg';
import IconTradingCards from 'assets/icons/NavBar/icon-trading.svg';
import IconEsports from 'assets/icons/NavBar/icon-esports.svg';
import IconEvent from 'assets/icons/NavBar/icon-event.svg';
import IconDrops from 'assets/icons/NavBar/icon-drops.svg';
import IconXmas from 'assets/icons/NavBar/icon-xmas.svg';
import IconAution from 'assets/icons/NavBar/auction.svg';

import IconUtility from 'assets/icons/NavBar/Utility.svg';
import IconVirtualWorlds from 'assets/icons/NavBar/icon-virtual worlds.svg';
import IconVirtualEvent from 'assets/icons/NavBar/icon-virtual-event.svg';
import IconVirtualConcerts from 'assets/icons/NavBar/icon-virtual-concerts.svg';
import IconVirtualExhibition from 'assets/icons/NavBar/icon-virtual-exhibiton.svg';
import IconVirtualSport from 'assets/icons/NavBar/icon-virtual-sport.svg';
import IconVirtualArt from 'assets/icons/NavBar/icon-virtual-art.svg';

import IconFashionLuxury from 'assets/icons/NavBar/icon-fashion.svg';

import SpaceSuit from 'assets/icons/NavBar/space-suit.svg';
import JezeroCity from 'assets/icons/NavBar/jezero-city.svg';
import OdysseyCity from 'assets/icons/NavBar/odyssey-city.svg';

const listCategoryMarketplace = [
	// {
	// 	id: 0,
	// 	title: 'NFTs Space',
	// 	target: '_self',
	// 	link: `#${PATH_VIEWALL.root}`,
	// 	isFilter: false,
	// 	icon: IconNftspace,
	// },
	{
		id: 0,
		title: 'All',
		target: '_self',
		link: `#${PATH_VIEWALL.collections}`,
		isFilter: false,
		icon: IconColectibles,
	},
	{
		id: 1,
		title: 'Art',
		target: '_self',
		link: `#${PATH_VIEWALL.collections}`,
		isFilter: true,
		icon: IconArt,
	},
	{
		id: 2,
		title: 'Music',
		target: '_self',
		link: `#${PATH_VIEWALL.collections}`,
		isFilter: true,
		icon: IconMusic,
	},
	{
		id: 3,
		title: 'Photography',
		target: '_self',
		link: `#${PATH_VIEWALL.collections}`,
		isFilter: true,
		icon: IconPhotography,
	},
	{
		id: 4,
		title: 'Sport',
		target: '_self',
		link: `#${PATH_VIEWALL.collections}`,
		isFilter: true,
		icon: IconSports,
	},

	{
		id: 5,
		title: 'Card',
		target: '_self',
		link: `#${PATH_VIEWALL.collections}`,
		isFilter: true,
		icon: IconTradingCards,
	},
	{
		id: 6,
		title: 'Games',
		target: '_self',
		link: `#${PATH_VIEWALL.collections}`,
		isFilter: true,
		icon: IconEsports,
	},
];
const listInformation = [
	{
		id: 0,
		title: 'All',
		target: '_self',
		link: `/#${PATH_PREDICTION.root}`,
		isFilter: false,
		icon: IconColectibles,
	},
	{
		id: 1,
		title: 'Crypto',
		target: '_self',
		link: `/#${PATH_PREDICTION.root}`,
		isFilter: true,
		icon: IconArt,
	},
	{
		id: 2,
		title: 'Sport',
		target: '_self',
		link: `/#${PATH_PREDICTION.root}`,
		isFilter: true,
		icon: IconSports,
	},
	{
		id: 3,
		title: 'Esport',
		target: '_self',
		link: `/#${PATH_PREDICTION.root}`,
		isFilter: true,
		icon: IconPhotography,
	},
	{
		id: 4,
		title: 'Economics',
		target: '_self',
		link: `/#${PATH_PREDICTION.root}`,
		isFilter: true,
		icon: IconMusic,
	},

	{
		id: 5,
		title: 'Politics',
		target: '_self',
		link: `/#${PATH_PREDICTION.root}`,
		isFilter: true,
		icon: IconTradingCards,
	},
];

const listMetaSpace = [
	{
		id: 1,
		title: 'Mystery Box',
		target: '_self',
		link: `#`,
		icon: IconDrops,
	},
	{
		id: 2,
		title: 'Event',
		target: '_self',
		link: `#${PATH_EVENT.root}`,
		icon: IconEvent,
	},
	// {
	// 	id: 3,
	// 	title: 'Boarc',
	// 	target: '_self',
	// 	link: `#/drops/63b3ef1bd3994a9a7481cd6b`,
	// 	icon: IconVirtualArt,
	// },
	{
		id: 4,
		title: 'Auction',
		target: '_self',
		link: `#${PATH_AUCTION.root}`,
		icon: IconAution,
	},
];

const listMetaverse = [
	{
		id: 0,
		title: 'Utility',
		target: '_self',
		link: `${PATH_VIRTUAL_WORLD.root}`,
		icon: IconUtility,
	},
	{
		id: 1,
		title: 'Virtual Time Square',
		target: '_self',
		link: `${PATH_VIRTUAL_WORLD.virtualWorld}`,
		icon: IconVirtualWorlds,
	},
	{
		id: 2,
		title: 'Virtual Meeting',
		target: '_self',
		link: `${PATH_VIRTUAL_WORLD.virtualEvent}`,
		icon: IconVirtualEvent,
	},
	{
		id: 3,
		title: 'Virtual Concert',
		target: '_self',
		link: `#`,
		icon: IconVirtualConcerts,
	},
	{
		id: 4,
		title: 'Virtual Exhibition',
		target: '_self',
		link: `#`,
		icon: IconVirtualExhibition,
	},
	{
		id: 5,
		title: 'Virtual Sport',
		target: '_self',
		link: `${PATH_VIRTUAL_WORLD.virtualSport}`,
		icon: IconVirtualSport,
	},
	{
		id: 6,
		title: 'Virtual Museum',
		target: '_self',
		link: `${PATH_VIRTUAL_WORLD.virtualArt}`,
		icon: IconVirtualArt,
	},
	{
		id: 7,
		title: 'Virtual Xmas',
		target: '_self',
		link: `${PATH_VIRTUAL_WORLD.eventXmax}`,
		icon: IconXmas,
	},
];

const listMarsSpace = [
	{
		id: 1,
		title: 'Space Suit',
		target: '_self',
		link: `#`,
		icon: SpaceSuit,
	},
	{
		id: 2,
		title: 'Jezero City',
		target: '_self',
		link: `#`,
		icon: JezeroCity,
	},
	{
		id: 3,
		title: 'Odyssey City',
		target: '_self',
		link: `#`,
		icon: OdysseyCity,
	},
];
const listVirtualLink = {
	landingPage: 'https://virtual.metaspacecy.com/',
};
interface MainNavBarProps {
	isBackground?: boolean;
}
const MainNavBar = ({ isBackground }: MainNavBarProps) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// hooks
	const navigateSearchParams = useNavigateSearch();

	// useRef
	const ref = useRef<HTMLDivElement>(null);

	// useState
	const [isOpenSmallScreenMenu, setIsOpenSmallScreenMenu] = useState(false);

	// useSelector
	const listCategory: CollectionCategory[] = useSelector(selectCollectionCategory);

	//Get list submenu header for navigation
	// useEffect(() => {
	// 	dispatch(fetchListCollectionCategory());
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		setIsOpenSmallScreenMenu(open);
	};

	const renderCategory = (category: number) => {
		return CATEGORY_COLLECTION[category];
	};

	const RenderMenuHeaderBigScreen = () => {
		return (
			<>
				<NavigationBarBigScreen>
					{/* Home */}
					{/* <NavigationItemBigScreen>
						<NavLinkBigScreen className="navLink" href="#" target="_self">
							<Typography variant="body1" fontStyle="italic">
								Home
							</Typography>
						</NavLinkBigScreen>
					</NavigationItemBigScreen> */}
					{/* Market place links */}
					<NavigationItemBigScreen sx={{ width: '165px' }}>
						<NavLinkBigScreen
							className="navLink"
							href={`/#${PATH_MARKETPLACE.root}`}
							target="_self"
							// onClick={(e: any) => {
							// 	e.preventDefault();
							// }}
						>
							<Typography variant="body1" fontStyle="italic" fontWeight="500">
								Marketplace
							</Typography>
						</NavLinkBigScreen>

						<DropdownMenu className="dropdownMenu" sx={{ minWidth: '165px' }}>
							<Stack>
								{listCategoryMarketplace.map((category: any, index: number) => (
									<DropdownMenuLink
										href={
											category.isFilter
												? category.link + '?category=' + category.title
												: category.link
										}
										key={index}
									>
										<Stack direction="row" alignItems="center">
											<Box width="30px">
												<img
													style={{
														width: '100%',
														height: '100%',
														boxShadow: '2px 2px 2px 0 rgba(0,0,0,0.2)',
														borderRadius: '50%',
													}}
													src={category.icon}
													alt={category.title}
												/>
											</Box>
											<Typography
												variant="body2"
												sx={{ padding: '0 0 0 8px' }}
												textAlign="center"
												noWrap
												fontStyle="italic"
											>
												{category.title}
											</Typography>
										</Stack>
									</DropdownMenuLink>
								))}
							</Stack>
						</DropdownMenu>
					</NavigationItemBigScreen>
					{/* Infomation */}
					<NavigationItemBigScreen sx={{ width: '165px' }}>
						<NavLinkBigScreen
							className="navLink"
							href={`/#${PATH_PREDICTION.root}`}
							target="_self"
							// onClick={(e: any) => {
							// 	e.preventDefault();
							// }}
						>
							<Typography variant="body1" fontStyle="italic" fontWeight="500">
								Prediction
							</Typography>
						</NavLinkBigScreen>

						<DropdownMenu className="dropdownMenu" sx={{ minWidth: '165px' }}>
							<Stack>
								{listInformation.map((category: any, index: number) => (
									<DropdownMenuLink
										href={
											category.isFilter
												? category.link + '?category=' + category.title
												: category.link
										}
										key={index}
									>
										<Stack direction="row" alignItems="center">
											<Box width="30px">
												<img
													style={{
														width: '100%',
														height: '100%',
														boxShadow: '2px 2px 2px 0 rgba(0,0,0,0.2)',
														borderRadius: '50%',
													}}
													src={category.icon}
													alt={category.title}
												/>
											</Box>
											<Typography
												variant="body2"
												sx={{ padding: '0 0 0 8px' }}
												textAlign="center"
												noWrap
												fontStyle="italic"
											>
												{category.title}
											</Typography>
										</Stack>
									</DropdownMenuLink>
								))}
							</Stack>
						</DropdownMenu>
					</NavigationItemBigScreen>
					{/* Mystery Box */}
					<NavigationItemBigScreen>
						<NavLinkBigScreen
							className="navLink"
							href={`/#${PATH_DROP.root}`}
							target="_self"
							// onClick={(e: any) => {
							// 	e.preventDefault();
							// }}
						>
							<Typography variant="body1" fontStyle="italic" fontWeight="500">
								Drops
							</Typography>
						</NavLinkBigScreen>

						<DropdownMenu className="dropdownMenu">
							<Stack>
								{listMetaSpace.map((meta: any, index: number) =>
									meta.link === '#' ? (
										<Tooltip
											key={index}
											title="Coming soon"
											placement="right"
											arrow
										>
											<DropdownMenuLink
												href={meta.link}
												key={index}
												sx={{
													cursor:
														meta.link === '#' ? 'default' : 'pointer',
												}}
												onClick={(e: any) => {
													if (meta.link === '#') e.preventDefault();
												}}
											>
												<Stack direction="row" alignItems="center">
													<Box width="30px">
														<img
															src={meta.icon}
															alt={meta.title}
															style={{
																width: '100%',
																height: '100%',
																boxShadow:
																	'2px 2px 2px 0 rgba(0,0,0,0.2)',
																borderRadius: '50%',
															}}
														/>
													</Box>
													<Typography
														variant="body2"
														sx={{ padding: '0 0 0 8px' }}
														textAlign="center"
														noWrap
														fontStyle="italic"
													>
														{meta.title}
													</Typography>
												</Stack>
											</DropdownMenuLink>
										</Tooltip>
									) : (
										<DropdownMenuLink href={meta.link} key={index}>
											<Stack direction="row" alignItems="center">
												<Box width="30px">
													<img
														src={meta.icon}
														style={{
															width: '100%',
															height: '100%',
															boxShadow:
																'2px 2px 2px 0 rgba(0,0,0,0.2)',
															borderRadius: '50%',
														}}
														alt={meta.title}
													/>
												</Box>
												<Typography
													variant="body2"
													sx={{ padding: '0 0 0 8px' }}
													textAlign="center"
													noWrap
													fontStyle="italic"
												>
													{meta.title}
												</Typography>
											</Stack>
										</DropdownMenuLink>
									)
								)}
							</Stack>
						</DropdownMenu>
					</NavigationItemBigScreen>
					{/* avatar space */}
					<NavigationItemBigScreen>
						<NavLinkBigScreen
							className="navLink"
							href={`${PATH_VIRTUAL_WORLD.root}`}
							target="_blank"
							// onClick={(e: any) => {
							// 	e.preventDefault();
							// }}
						>
							<Typography variant="body1" fontStyle="italic" fontWeight="500">
								Avatar Space
							</Typography>
						</NavLinkBigScreen>
					</NavigationItemBigScreen>
					{/* virtual space */}
					<NavigationItemBigScreen sx={{ width: '199px' }}>
						<NavLinkBigScreen
							className="navLink"
							href={`${PATH_VIRTUAL_WORLD.root}`}
							target="_blank"
							// onClick={(e: any) => {
							// 	e.preventDefault();
							// }}
						>
							<Typography variant="body1" fontStyle="italic" fontWeight="500">
								Virtual Space
							</Typography>
						</NavLinkBigScreen>
						<DropdownMenu className="dropdownMenu" sx={{ minWidth: '199px' }}>
							<Stack>
								{listMetaverse.map((meta: any, index: number) =>
									meta.link === '#' ? (
										<Tooltip
											key={index}
											title="Coming soon"
											placement="right"
											arrow
										>
											<DropdownMenuLink
												href={meta.link}
												key={index}
												sx={{
													cursor:
														meta.link === '#' ? 'default' : 'pointer',
												}}
												onClick={(e: any) => {
													if (meta.link === '#') e.preventDefault();
												}}
											>
												<Stack direction="row" alignItems="center">
													<Box width="30px">
														<img
															style={{
																width: '100%',
																height: '100%',
																boxShadow:
																	'2px 2px 2px 0 rgba(0,0,0,0.2)',
																borderRadius: '50%',
															}}
															src={meta.icon}
															alt={meta.title}
														/>
													</Box>
													<Typography
														variant="body2"
														sx={{ padding: '0 0 0 8px' }}
														textAlign="center"
														noWrap
														fontStyle="italic"
													>
														{meta.title}
													</Typography>
												</Stack>
											</DropdownMenuLink>
										</Tooltip>
									) : (
										<DropdownMenuLink
											href={meta.link}
											target="_blank"
											key={index}
										>
											<Stack direction="row" alignItems="center">
												<Box
													sx={{
														img: {
															width: '100%',
															height: '100%',
															boxShadow:
																'2px 2px 2px 0 rgba(0,0,0,0.2)',
															borderRadius: '50%',
														},
													}}
													width="30px"
												>
													<img src={meta.icon} alt={meta.title} />
												</Box>
												<Typography
													variant="body2"
													sx={{ padding: '0 0 0 8px' }}
													textAlign="center"
													noWrap
													fontStyle="italic"
												>
													{meta.title}
												</Typography>
											</Stack>
										</DropdownMenuLink>
									)
								)}
							</Stack>
						</DropdownMenu>
					</NavigationItemBigScreen>
					{/* Metaverse links */}
					<NavigationItemBigScreen>
						<NavLinkBigScreen
							className="navLink"
							href="#"
							target="_self"
							// onClick={(e: any) => {
							// 	e.preventDefault();
							// 	window.open(`${listVirtualLink.landingPage}`, '_blank');
							// }}
						>
							<Typography variant="body1" fontStyle="italic" fontWeight="500">
								Metaverse
							</Typography>
						</NavLinkBigScreen>
					</NavigationItemBigScreen>

					{/* Mars Space */}
					{/* <NavigationItemBigScreen>
						<NavLinkBigScreen
							className="navLink"
							href="#"
							target="_self"
							onClick={(e: any) => {
								e.preventDefault();
							}}
						>
							<Typography variant="body1" fontStyle="italic" fontWeight="500">
								Mars Space
							</Typography>
						</NavLinkBigScreen>

						<DropdownMenu className="dropdownMenu">
							<Stack>
								{listMarsSpace.map((meta: any, index: number) =>
									meta.link === '#' ? (
										<Tooltip
											key={index}
											title="Coming soon"
											placement="right"
											arrow
										>
											<DropdownMenuLink
												href={meta.link}
												key={index}
												sx={{
													cursor:
														meta.link === '#' ? 'default' : 'pointer',
												}}
												onClick={(e: any) => {
													if (meta.link === '#') e.preventDefault();
												}}
											>
												<Stack direction="row" alignItems="center">
													<Box width="30px">
														<img
															style={{
																width: '100%',
																height: '100%',
																boxShadow:
																	'2px 2px 2px 0 rgba(0,0,0,0.2)',
																borderRadius: '50%',
															}}
															src={meta.icon}
															alt={meta.title}
														/>
													</Box>
													<Typography
														variant="body2"
														sx={{ padding: '0 0 0 8px' }}
														textAlign="center"
														noWrap
														fontStyle="italic"
													>
														{meta.title}
													</Typography>
												</Stack>
											</DropdownMenuLink>
										</Tooltip>
									) : (
										<DropdownMenuLink href={meta.link} key={index}>
											<Stack direction="row" alignItems="center">
												<Box width="30px">
													<img
														style={{ width: '100%' }}
														src={meta.icon}
														alt={meta.title}
													/>
												</Box>
												<Typography
													variant="body2"
													sx={{ padding: '0 0 0 8px' }}
													textAlign="center"
													noWrap
													fontStyle="italic"
												>
													{meta.title}
												</Typography>
											</Stack>
										</DropdownMenuLink>
									)
								)}
							</Stack>
						</DropdownMenu>
					</NavigationItemBigScreen> */}
					{/* Order links */}
				</NavigationBarBigScreen>
			</>
		);
	};

	return (
		<NavBar ref={ref}>
			<Stack direction="row" alignItems="center" sx={{ position: 'relative', mx: 1 }}>
				{/* <Box className="menuSmallScreen">{RenderMenuHeaderSmallScreen()}</Box> */}
				<Box
					sx={{
						flexBasis: '25%',
						ml: '5%',
						[theme.breakpoints.between(1380, 1900)]: {
							ml: '10px',
						},
						[theme.breakpoints.between(600, 1800)]: {
							flexBasis: '100%',
							maxWidth: '500px',
						},
					}}
				>
					<GlobalSearch />
				</Box>
				<Box sx={{ height: '100%', width: '1px', opacity: 0 }}>text</Box>

				<Box className="menuBigScreen" sx={{ flexGrow: 1 }}>
					{RenderMenuHeaderBigScreen()}
				</Box>
			</Stack>
		</NavBar>
	);
};

export default React.memo(MainNavBar);
