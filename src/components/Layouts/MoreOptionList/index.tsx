/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// styled
import {
	DropDownContent,
	DropdownList,
	IconDots,
	ListItem,
	SelectOptionBox,
	SmallNavigationRender,
	NavLinkBigScreen,
	DropdownMenu,
	DropdownMenuLink,
	NavigationItemBigScreen,
	WrapperListItem,
} from './styled';
// mui
import { Box, Link, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
// components
import DarkLight from '../DarkLight';
import DividerGradient from 'components/CustomUI/DividerGradient';
// path
import {
	PATH_AUCTION,
	PATH_EARN,
	PATH_IGO,
	PATH_PAGE,
	PATH_VIEWALL,
	PATH_MARKETPLACE,
	PATH_BOARC,
	PATH_DROP,
	PATH_BLOG,
	PATH_ABOUT,
	PATH_SOCIAL,
	PATH_EVENT,
	PATH_PREDICTION,
} from 'routes/path';
// img
import DownArrowWhite from 'assets/icons/down-arrow-white.svg';
import DownArrowBlack from 'assets/icons/down-arrow-black.svg';
// constants
import { RELATED_URLS } from '../../../constants';
import { useLocation } from 'react-router-dom';

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
import IconAution from 'assets/icons/NavBar/auction.svg';

import IconUtility from 'assets/icons/NavBar/Utility.svg';
import IconVirtualWorlds from 'assets/icons/NavBar/icon-virtual worlds.svg';
import IconVirtualEvent from 'assets/icons/NavBar/icon-virtual-event.svg';
import IconVirtualConcerts from 'assets/icons/NavBar/icon-virtual-concerts.svg';
import IconVirtualExhibition from 'assets/icons/NavBar/icon-virtual-exhibiton.svg';
import IconVirtualSport from 'assets/icons/NavBar/icon-virtual-sport.svg';
import IconVirtualArt from 'assets/icons/NavBar/icon-virtual-art.svg';
import IconXmas from 'assets/icons/NavBar/icon-xmas.svg';

import IconFashionLuxury from 'assets/icons/NavBar/icon-fashion.svg';
import IconMarsSpace from 'assets/icons/NavBar/icon-mars.svg';
//icon social
import tw from 'assets/icons/NavBar/iconMoreOptionList/tw.svg';
import twlight from 'assets/icons/NavBar/iconMoreOptionList/twlight.svg';
import dis from 'assets/icons/NavBar/iconMoreOptionList/dis.svg';
import dislight from 'assets/icons/NavBar/iconMoreOptionList/dislight.svg';
import tele from 'assets/icons/NavBar/iconMoreOptionList/tele.svg';
import telelight from 'assets/icons/NavBar/iconMoreOptionList/telelight.svg';
import youtube from 'assets/icons/NavBar/iconMoreOptionList/youtube.svg';
import youtubelight from 'assets/icons/NavBar/iconMoreOptionList/youtubelight.svg';
import ig from 'assets/icons/NavBar/iconMoreOptionList/instagram.svg';
import iglight from 'assets/icons/NavBar/iconMoreOptionList/instagramlight.svg';
import medium from 'assets/icons/NavBar/iconMoreOptionList/medium.svg';
import mediumlight from 'assets/icons/NavBar/iconMoreOptionList/mediumlight.svg';
import facebook from 'assets/icons/NavBar/iconMoreOptionList/facebook.svg';
import facebooklight from 'assets/icons/NavBar/iconMoreOptionList/facelight.svg';
//icon title
import about from 'assets/icons/NavBar/iconMoreOptionList/about.svg';
import aboutlight from 'assets/icons/NavBar/iconMoreOptionList/aboutlight.svg';
import legal from 'assets/icons/NavBar/iconMoreOptionList/legal.svg';
import legallight from 'assets/icons/NavBar/iconMoreOptionList/legallight.svg';
import docs from 'assets/icons/NavBar/iconMoreOptionList/docs.svg';
import docslight from 'assets/icons/NavBar/iconMoreOptionList/docslight.svg';
import blog from 'assets/icons/NavBar/iconMoreOptionList/blog.svg';
import bloglight from 'assets/icons/NavBar/iconMoreOptionList/bloglight.svg';
import faq from 'assets/icons/NavBar/iconMoreOptionList/faq.svg';
import faqlight from 'assets/icons/NavBar/iconMoreOptionList/faqlight.svg';

//
import SpaceSuit from 'assets/icons/NavBar/space-suit.svg';
import JezeroCity from 'assets/icons/NavBar/jezero-city.svg';
import OdysseyCity from 'assets/icons/NavBar/odyssey-city.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PATH_VIRTUAL_WORLD } from 'routes/path';
// const listNavigation = [
// 	{ name: 'Home', url: '/', target: '_self' },
// 	{ name: 'Marketplace', url: `#${PATH_MARKETPLACE.root}`, target: '_self' },
// 	{ name: 'Drops', url: `#`, target: '_self' },
// 	{ name: 'Metaverse', url: `#`, target: '_self' },
// 	{ name: 'Builder', url: `#`, target: '_self' },
// 	{ name: 'Mars Space', url: `#`, target: '_self' },
// 	// { name: 'IGO', url: `${PATH_IGO.root}`, target: '_self' },
// 	// { name: 'Auction', url: `#${PATH_AUCTION.root}`, target: '_self' },
// 	// { name: 'Earn', url: `#${PATH_EARN.assets}`, target: '_self' },
// 	// { name: 'Boarc', url: RELATED_URLS.boarcHomePage, target: '_blank' },
// ];
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
		link: `#`,
		icon: IconAution,
	},
];

const ListSocialMedia = [
	{
		id: 1,
		title: 'Twitter',
		iconWhite: tw,
		iconBlack: twlight,
		link: `${PATH_SOCIAL.twitter}`,
	},
	{
		id: 2,
		title: 'Discord',
		iconWhite: dis,
		iconBlack: dislight,
		link: `${PATH_SOCIAL.discord}`,
	},
	{
		id: 3,
		title: 'Telegram',
		iconWhite: tele,
		iconBlack: telelight,
		link: `${PATH_SOCIAL.tele}`,
	},
	{
		id: 4,
		title: 'Youtube',
		iconWhite: youtube,
		iconBlack: youtubelight,
		link: `${PATH_SOCIAL.youtube}`,
	},
	{
		id: 5,
		title: 'instagram',
		iconWhite: ig,
		iconBlack: iglight,
		link: `${PATH_SOCIAL.instagram}`,
	},
	{
		id: 6,
		title: 'Midium',
		iconWhite: medium,
		iconBlack: mediumlight,
		link: `${PATH_SOCIAL.medium}`,
	},
	{
		id: 7,
		title: 'Facebook',
		iconWhite: facebook,
		iconBlack: facebooklight,
		link: `${PATH_SOCIAL.facebook}`,
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
		// link: `${PATH_VIRTUAL_WORLD.virtualConcert}`,
		link: '',
		icon: IconVirtualConcerts,
	},
	{
		id: 4,
		title: 'Virtual Exhibition',
		target: '_self',
		// link: `${PATH_VIRTUAL_WORLD.virtualExhibition}`,
		link: '',
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

const listMenu = [
	// { name: 'About', url: ``, target: '_self', icon: about, iconL: aboutlight },
	// { name: 'Legal', url: `#${PATH_ABOUT.root}`, target: '_self', icon: legal, iconL: legallight },
	{ name: 'Docs', url: RELATED_URLS.doc, target: '_blank', icon: docs, iconL: docslight },
	{ name: 'Blog', url: `#${PATH_BLOG.root}`, target: '_self', icon: blog, iconL: bloglight },
	{ name: 'FAQ', url: RELATED_URLS.faq, target: '_blank', icon: faq, iconL: faqlight },
];

const listVirtualLink = {
	landingPage: 'https://virtual.metaspacecy.com/',
};
export interface IMoreOptionListProps {
	placementDropdown: 'top' | 'bottom';
	setTurnOfConnectWallet: React.Dispatch<React.SetStateAction<boolean>>;
	setTurnOfSwitchNetwork: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoreOptionList = ({
	placementDropdown,
	setTurnOfConnectWallet,
	setTurnOfSwitchNetwork,
}: IMoreOptionListProps) => {
	const ref: any = useRef(null);
	const [activeSelectOption, setActiveSelectOption] = useState(false);
	const [activeSelectOption1, setActiveSelectOption1] = useState(false);
	const [activeSelectOption2, setActiveSelectOption2] = useState(false);
	const [activeSelectOption3, setActiveSelectOption3] = useState(false);
	const [activeSelectOption4, setActiveSelectOption4] = useState(false);
	//Path
	const { pathname } = useLocation();
	const isHomePage = pathname === '/';
	//theme
	const theme = useTheme();
	const isLight = theme.palette.mode === 'light';
	useEffect(() => {
		const onBodyClick = (event: any) => {
			event.stopPropagation();
			if (ref.current && !ref.current.contains(event.target)) {
				setActiveSelectOption(false);
				setActiveSelectOption1(false);
				setActiveSelectOption2(false);
				setActiveSelectOption3(false);
				setActiveSelectOption4(false);
			}
		};
		// Bind the event listener if dropdown is active
		if (activeSelectOption)
			document.body.addEventListener('click', onBodyClick, { passive: true });

		return () => {
			// Unbind the event listener on clean up
			document.body.removeEventListener('click', onBodyClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeSelectOption]);

	const showOptionBox = () => {
		setTurnOfConnectWallet(true);
		setTurnOfSwitchNetwork(true);
		if (!activeSelectOption) setActiveSelectOption(true);
	};
	const showActiveSelect = (e: any) => {
		switch (e.target.dataset.idx) {
			case '1':
				setActiveSelectOption1(!activeSelectOption1);
				setActiveSelectOption2(false);
				setActiveSelectOption3(false);
				setActiveSelectOption4(false);
				break;
			case '2':
				setActiveSelectOption2(!activeSelectOption2);
				setActiveSelectOption1(false);
				setActiveSelectOption3(false);
				setActiveSelectOption4(false);
				break;
			case '3':
				setActiveSelectOption3(!activeSelectOption3);
				setActiveSelectOption2(false);
				setActiveSelectOption1(false);
				setActiveSelectOption4(false);
				break;
			case '4':
				setActiveSelectOption4(!activeSelectOption4);
				setActiveSelectOption2(false);
				setActiveSelectOption3(false);
				setActiveSelectOption1(false);
				break;
			default:
				setActiveSelectOption4(false);
				setActiveSelectOption2(false);
				setActiveSelectOption3(false);
				setActiveSelectOption1(false);
				break;
		}
	};
	return (
		<SelectOptionBox onClick={showOptionBox}>
			<IconDots
				alignItems="center"
				justifyContent="center"
				className={activeSelectOption ? 'color' : ''}
			>
				<MoreHorizOutlinedIcon sx={{ width: '34px', position: 'absolute', top: '6px' }} />
			</IconDots>

			<DropDownContent
				ref={ref}
				sx={{
					...(placementDropdown === 'top'
						? {
								bottom: 0,
						  }
						: {
								top: 0,
						  }),
				}}
				className={activeSelectOption ? 'active' : ''}
			>
				<DropdownList>
					<Stack direction="row" alignItems="center" justifyContent="space-between">
						{/* <Typography
							variant="body1"
							fontStyle="italic"
							fontWeight="500"
							sx={{ padding: '5px 15px' }}
							noWrap
						>
							{isHomePage && 'Theme'}
						</Typography> */}
						<DarkLight />
					</Stack>
					<WrapperListItem>
						{listMenu.map((item: any, index: number) =>
							item.url === '#' ? (
								<Tooltip title="Coming soon" placement="left" key={index} arrow>
									<ListItem
										key={index}
										href={item.url}
										target={item.target}
										onClick={(e: any) => {
											e.preventDefault();
										}}
									>
										{/* <img src={isLight ? item.iconL : item.icon} alt="icon" /> */}
										<Typography
											variant="body1"
											fontStyle="italic"
											fontWeight="500"
											sx={{
												padding: '5px 15px',
											}}
											noWrap
										>
											{item.name}
										</Typography>
									</ListItem>
								</Tooltip>
							) : (
								<ListItem key={index} href={item.url} target={item.target}>
									{/* <img src={isLight ? item.iconL : item.icon} alt="icon" /> */}
									<Typography
										variant="body1"
										fontStyle="italic"
										fontWeight="500"
										sx={{
											padding: '5px 0',
											transition: 'all 0.4s',
											'&:hover': {
												color: theme.palette.primary.light,
											},
										}}
										noWrap
									>
										{item.name}
									</Typography>
								</ListItem>
							)
						)}
					</WrapperListItem>

					<SmallNavigationRender>
						<DividerGradient sx={{ m: '0.5rem 0' }} />
						<NavigationItemBigScreen>
							<NavLinkBigScreen
								className="navLink"
								// href={`/#${PATH_MARKETPLACE.root}`}
								href="/"
								target="_self"
								// onClick={(e: any) => {
								// 	e.preventDefault();
								// }}
							>
								<Typography
									variant="body1"
									fontStyle="italic"
									fontWeight="500"
									sx={{
										transition: 'all 0.4s',
										'&:hover': {
											color: theme.palette.primary.light,
										},
									}}
								>
									Home
								</Typography>
							</NavLinkBigScreen>
						</NavigationItemBigScreen>
						<NavigationItemBigScreen>
							<Stack direction="row" justifyContent="space-between" height="24px">
								<NavLinkBigScreen
									className="navLink"
									// href={`/#${PATH_MARKETPLACE.root}`}
									href={`#${PATH_MARKETPLACE.root}`}
									target="_self"
									// onClick={(e: any) => {
									// 	e.preventDefault();
									// }}
								>
									<Typography
										variant="body1"
										fontStyle="italic"
										fontWeight="500"
										sx={{
											transition: 'all 0.4s',
											'&:hover': {
												color: theme.palette.primary.light,
											},
										}}
									>
										Marketplace
									</Typography>
								</NavLinkBigScreen>
								<Box
									onClick={showActiveSelect}
									sx={{ cursor: 'pointer', transition: 'all 0.4s' }}
								>
									<KeyboardArrowDownIcon data-idx="1" />
								</Box>
							</Stack>

							<DropdownMenu
								className="dropdownMenu"
								sx={{
									...(activeSelectOption1 && {
										opacity: 1,
										display: 'block',
									}),
								}}
							>
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
															boxShadow:
																'2px 2px 2px 0 rgba(0,0,0,0.2)',
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
						{/* prediction */}
						<NavigationItemBigScreen>
							<Stack direction="row" justifyContent="space-between" height="24px">
								<NavLinkBigScreen
									className="navLink"
									href={`/#${PATH_PREDICTION.root}`}
									target="_self"
									// onClick={(e: any) => {
									// 	e.preventDefault();
									// 	window.open(`/#${PATH_PREDICTION.root}`, '_blank');
									// }}
								>
									<Typography
										variant="body1"
										fontStyle="italic"
										fontWeight="500"
										sx={{
											transition: 'all 0.4s',
											'&:hover': {
												color: theme.palette.primary.light,
											},
										}}
									>
										Prediction
									</Typography>
								</NavLinkBigScreen>
								<Box
									onClick={showActiveSelect}
									sx={{ cursor: 'pointer', transition: 'all 0.4s' }}
								>
									<KeyboardArrowDownIcon data-idx="4" />
								</Box>
							</Stack>
							<DropdownMenu
								className="dropdownMenu"
								sx={{
									...(activeSelectOption4 && {
										opacity: 1,
										display: 'block',
									}),
								}}
							>
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
															boxShadow:
																'2px 2px 2px 0 rgba(0,0,0,0.2)',
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
						<NavigationItemBigScreen>
							<Stack direction="row" justifyContent="space-between" height="24px">
								<NavLinkBigScreen
									className="navLink"
									href={`#${PATH_DROP.root}`}
									target="_self"
								>
									<Typography
										variant="body1"
										fontStyle="italic"
										fontWeight="500"
										sx={{
											transition: 'all 0.4s',
											'&:hover': {
												color: theme.palette.primary.light,
											},
										}}
									>
										Drops
									</Typography>
								</NavLinkBigScreen>
								<Box
									onClick={showActiveSelect}
									sx={{ cursor: 'pointer', transition: 'all 0.4s' }}
								>
									<KeyboardArrowDownIcon data-idx="2" />
								</Box>
							</Stack>

							<DropdownMenu
								className="dropdownMenu"
								sx={{
									...(activeSelectOption2 && {
										opacity: 1,
										display: 'block',
									}),
								}}
							>
								<Stack>
									{listMetaSpace.map((meta: any, index: number) =>
										meta.link === '#' ? (
											<Tooltip
												key={index}
												title="Coming soon"
												placement="left"
												arrow
											>
												<DropdownMenuLink
													href={meta.link}
													key={index}
													sx={{
														cursor:
															meta.link === '#'
																? 'default'
																: 'pointer',
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
						<NavigationItemBigScreen>
							<Stack direction="row" justifyContent="space-between" height="24px">
								<NavLinkBigScreen
									className="navLink"
									href={``}
									target="_self"
									onClick={(e: any) => {
										e.preventDefault();
										window.open(`${PATH_VIRTUAL_WORLD.root}`, '_blank');
									}}
								>
									<Typography
										variant="body1"
										fontStyle="italic"
										fontWeight="500"
										sx={{
											transition: 'all 0.4s',
											'&:hover': {
												color: theme.palette.primary.light,
											},
										}}
									>
										Avatar Space
									</Typography>
								</NavLinkBigScreen>
							</Stack>
						</NavigationItemBigScreen>

						{/* Virtual links */}
						<NavigationItemBigScreen>
							<Stack direction="row" justifyContent="space-between" height="24px">
								<NavLinkBigScreen
									className="navLink"
									href="#"
									target="_self"
									onClick={(e: any) => {
										e.preventDefault();
										window.open(`${PATH_VIRTUAL_WORLD.root}`, '_blank');
									}}
								>
									<Typography
										variant="body1"
										fontStyle="italic"
										fontWeight="500"
										sx={{
											transition: 'all 0.4s',
											'&:hover': {
												color: theme.palette.primary.light,
											},
										}}
									>
										Virtual Space
									</Typography>
								</NavLinkBigScreen>
								<Box
									onClick={showActiveSelect}
									sx={{ cursor: 'pointer', transition: 'all 0.4s' }}
								>
									<KeyboardArrowDownIcon data-idx="3" />
								</Box>
							</Stack>

							<DropdownMenu
								className="dropdownMenu"
								sx={{
									...(activeSelectOption3 && {
										opacity: 1,
										display: 'block',
									}),
								}}
							>
								<Stack
									sx={{
										'&:last-child': {
											img: {
												width: '100%',
											},
										},
									}}
								>
									{listMetaverse.map((meta: any, index: number) =>
										meta.link === '#' ? (
											<Tooltip
												key={index}
												title="Coming soon"
												placement="left"
												arrow
											>
												<DropdownMenuLink
													href={meta.link}
													key={index}
													sx={{
														cursor:
															meta.link === '#'
																? 'default'
																: 'pointer',
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
													<Box width="30px">
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
						{/* Metaverse */}
						<NavigationItemBigScreen>
							<Stack direction="row" justifyContent="space-between" height="24px">
								<NavLinkBigScreen
									className="navLink"
									href={`#`}
									target="_self"
									// onClick={(e: any) => {
									// 	e.preventDefault();
									// }}
								>
									<Typography
										variant="body1"
										fontStyle="italic"
										fontWeight="500"
										sx={{
											transition: 'all 0.4s',
											'&:hover': {
												color: theme.palette.primary.light,
											},
										}}
									>
										Metaverse
									</Typography>
								</NavLinkBigScreen>
							</Stack>
						</NavigationItemBigScreen>
						{/* Mars Space */}
						{/* <NavigationItemBigScreen>
							<Stack direction="row" justifyContent="space-between">
								<NavLinkBigScreen
									className="navLink"
									href="#"
									target="_self"
									onClick={(e: any) => {
										e.preventDefault();
									}}
								>
									<Typography
										variant="body1"
										fontStyle="italic"
										fontWeight="500"
										height="24px"
									>
										Mars Space
									</Typography>
								</NavLinkBigScreen>
								<Box onClick={showActiveSelect}>
									<KeyboardArrowDownIcon data-idx="4" />
								</Box>
							</Stack>
							<DropdownMenu
								className="dropdownMenu"
								sx={{
									...(activeSelectOption4 && {
										opacity: 1,
										display: 'block',
									}),
								}}
							>
								<Stack>
									{listMarsSpace.map((meta: any, index: number) =>
										meta.link === '#' ? (
											<Tooltip
												key={index}
												title="Coming soon"
												placement="left"
												arrow
											>
												<DropdownMenuLink
													href={meta.link}
													key={index}
													sx={{
														cursor:
															meta.link === '#'
																? 'default'
																: 'pointer',
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
					</SmallNavigationRender>

					{/* <Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexWrap: 'wrap',
							gap: '16px',
							margin: '20px auto',
						}}
					>
						{ListSocialMedia.map((item) => {
							return (
								<Box key={item.id} sx={{ img: { height: '17px', width: 'auto' } }}>
									<Link href={item.link} target="_blank">
										<img
											src={isLight ? item.iconBlack : item.iconWhite}
											alt="social"
										/>
									</Link>
								</Box>
							);
						})}
					</Box> */}
				</DropdownList>
			</DropDownContent>
		</SelectOptionBox>
	);
};

export default React.memo(MoreOptionList);
