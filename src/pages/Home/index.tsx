/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
//mui
import { Box, Container, Grid, Stack, Typography, useTheme } from '@mui/material';
// styled
import {
	ButtonBlue,
	ButtonViewAll,
	ExploreCollection,
	FirstSectionHomePage,
	HeaderSection,
	HeaderSection1,
	HeaderVideoContainer,
	ImgCatchAFish,
	MainHeader,
	OpacityBackground,
	SubHeader,
	TitleWrapper,
	VideoHeader,
	BlurBackGround,
	BlurBackGround1,
	HotService,
	ServiceTitle,
	EmailSearch,
	SubTitle,
} from './styled';
// component
import ButtonLoadmore from 'components/CustomUI/ButtonLoadmore';
import InfinityAnimation from 'components/pages/Home/InfinityAnimation';
import AdvertiseSection from 'components/pages/Home/AdvertiseSection';
import ListTopCollection from 'components/pages/Home/ListTopCollection';
import NewTopArt from 'components/pages/Home/NewTopArt';
import GalleryItem from 'components/pages/Home/GalleryItem';
import CategoryCollection from 'components/pages/Home/CategoryCollection';
import OverviewSection from 'components/pages/Home/OverviewSection';
import ListNFT from 'components/pages/Home/ListNFT';
// images
import CatchFish from 'assets/images/home/catch-fish.webp';
import BackgroundLightTheme from 'assets/gradient_light.jpeg';

// Import PATH routes
import { PATH_EARN, PATH_IGO, PATH_ITEM, PATH_PAGE, PATH_VIEWALL } from '../../routes/path';
import Newsletter from 'components/pages/Home/NewsLetter';
import CategoryList from 'components/pages/Home/CategoryList';
// constants
import { RELATED_URLS } from '../../constants';
import { LinkWrapper } from 'components/CustomUI/Card/CollectionRankingCard/styled';
import ButtonMarket from 'components/CustomUI/ButtonMarket';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import ButtonGradient from 'components/CustomUI/ButtonGradient';

// IMG Coverflow

// import Cover1 from 'assets/Home/nft/nft1.webp';
// import Cover2 from 'assets/Home/nft/nft2.webp';
// import Cover3 from 'assets/Home/nft/nft3.webp';
// import Cover4 from 'assets/Home/nft/nft4.webp';
// import Cover5 from 'assets/Home/nft/nft5.webp';
// import Cover6 from 'assets/Home/nft/nft6.webp';
// import Cover7 from 'assets/Home/nft/nft7.webp';
// import Cover8 from 'assets/Home/nft/nft8.webp';
// import Cover9 from 'assets/Home/nft/nft9.webp';
// import Cover10 from 'assets/Home/nft/nft10.webp';
// import Cover11 from 'assets/Home/nft/nft11.webp';

import Cover1 from 'assets/Home/card1/Asset1.webp';
import Cover2 from 'assets/Home/card1/Asset2.webp';
import Cover3 from 'assets/Home/card1/Asset3.webp';
import Cover4 from 'assets/Home/card1/Asset4.webp';
import Cover5 from 'assets/Home/card1/Asset5.webp';
import Cover6 from 'assets/Home/card1/Asset6.webp';
import Cover7 from 'assets/Home/card1/Asset7.webp';
import Cover8 from 'assets/Home/card1/Asset8.webp';
import Cover9 from 'assets/Home/card1/Asset9.webp';
import Cover10 from 'assets/Home/card1/Asset10.webp';

// AVTAR Coverflow
import Ava1 from 'assets/Home/Coverflow/avatar-1.webp';
import Ava2 from 'assets/Home/Coverflow/avatar-2.webp';
import Ava3 from 'assets/Home/Coverflow/avatar-3.webp';
import Ava4 from 'assets/Home/Coverflow/avatar-4.webp';
import Ava5 from 'assets/Home/Coverflow/avatar-5.webp';
import Ava6 from 'assets/Home/Coverflow/avatar-6.webp';
import Ava7 from 'assets/Home/Coverflow/avatar-7.webp';
import Ava8 from 'assets/Home/Coverflow/avatar-8.webp';
import IconFire from 'assets/icons/icon-fire.svg';

import CustomSliderCoverflow from 'components/CustomUI/CustomSliderCoverflow';
import BrandPartner from 'components/pages/HomeNew/BrandPartner';
import ListColection from 'components/pages/Home/ListCollection';

import { useSettings } from '../../hooks';
import { localStorageCustom } from 'utils';
const Contents = [
	{
		id: 0,
		firstLineHeader: 'Discover, Create, Connect,',
		secondLineHeader: 'collect NFT',
		description: 'The best efficient P2P solution for NFT marketplace',
		nameFristButton: 'Collect',
		nameSecondButton: 'Explore',
		linkFristButton: `#${PATH_ITEM.createItem}`,
		linkSecondButton: `#${PATH_PAGE.viewAll}`,
	},
	{
		id: 1,
		firstLineHeader: 'Trade and earn',
		secondLineHeader: 'MS assets',
		description: 'Take profits from your activities in the ecosystem',
		nameFristButton: 'Trade',
		nameSecondButton: 'Explore',
		linkFristButton: `#${PATH_PAGE.viewAll}`,
		linkSecondButton: `#${PATH_EARN.assets}`,
	},
	{
		id: 2,
		firstLineHeader: 'Join INO',
		secondLineHeader: 'Initial offerring',
		description: 'Grab a chance of million years to buy NFT in the primary market',
		nameFristButton: 'explore',
		nameSecondButton: 'none',
		linkFristButton: `#${PATH_IGO.root}`,
		linkSecondButton: '',
	},
	{
		id: 3,
		firstLineHeader: 'BOARC',
		secondLineHeader: 'Art of Bamboo',
		description: "The world's wonderful artwork with great passion and inspiration",
		nameFristButton: 'explore',
		nameSecondButton: 'none',
		linkFristButton: RELATED_URLS.boarcHomePage,
		linkSecondButton: '',
	},
];

const ListCoverFlow = [
	{
		id: 1,
		itemName: 'NFT 1',
		itemImg: Cover1,
		avatar: Ava1,
		userName: 'Harry',
		link: '',
		class: '',
	},
	{
		id: 2,
		itemName: 'NFT 2',
		itemImg: Cover2,
		avatar: Ava2,
		userName: 'Amsterdam',
		link: '',
		class: '',
	},
	{
		id: 3,
		itemName: 'NFT 3',
		itemImg: Cover3,
		avatar: Ava3,
		userName: 'Los Angeles',
		link: '',
		class: '',
	},
	{
		id: 4,
		itemName: 'NFT 4',
		itemImg: Cover4,
		avatar: Ava5,
		userName: 'Soyuz 11',
		link: '',
		class: '',
	},
	{
		id: 5,
		itemName: 'NFT 5',
		itemImg: Cover5,
		avatar: Ava6,
		userName: 'Alan Shepard',
		link: '',
		class: '',
	},
	{
		id: 6,
		itemName: 'NFT 6',
		itemImg: Cover6,
		avatar: Ava7,
		userName: 'Gherman Titov',
		link: '',
		class: '',
	},
	{
		id: 7,
		itemName: 'NFT 7',
		itemImg: Cover7,
		avatar: Ava8,
		userName: 'Aleksey Leonov',
		link: '',
		class: '',
	},
	{
		id: 8,
		itemName: 'NFT 8',
		itemImg: Cover8,
		avatar: Ava6,
		userName: 'Taylor Swift',
		link: '',
		class: '',
	},
	{
		id: 9,
		itemName: 'NFT 9',
		itemImg: Cover9,
		avatar: Ava1,
		userName: 'Katy Perry',
		link: '',
		class: '',
	},
	{
		id: 10,
		itemName: 'NFT 10',
		itemImg: Cover10,
		avatar: Ava2,
		userName: 'Thomas',
		link: '',
		class: '',
	},
];

const Home: React.FC = () => {
	const theme = useTheme();
	const { themeMode, onChangeMode } = useSettings();
	const navigate = useNavigate();
	// useRef
	const sectionRef = useRef<any>(null);
	const isThemeLight = theme.palette.mode === 'light';
	// useState
	const [displayGallery, setDisplayGallery] = useState<boolean | object>(false);
	const [distance, setDistance] = useState<string>('0px');
	const [firstSectionHeight, setFirstSectionHeight] = useState<number>(0);
	const [renderSection, setRenderSection] = useState<boolean>(false);
	const [numCount, setNumCount] = useState<number>(0);

	const handleResize = useCallback(() => {
		if (sectionRef.current) {
			const height = sectionRef.current.clientHeight;
			setFirstSectionHeight(height);
		}
	}, []);

	const RenderListCoverflow = () => {
		return ListCoverFlow.map((item: any, index: number) => (
			<LinkWrapper
				key={index}
				href={item.link}
				className={item.class === '' ? '' : item.class}
			>
				<Box
					sx={{
						boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.25)',
						borderRadius: '20px',
						overflow: 'hidden',
					}}
				>
					<Box
						sx={
							{
								// height: '580px',
								// [theme.breakpoints.down(2000)]: {
								// 	height: '540px',
								// },
								// [theme.breakpoints.down(1800)]: {
								// 	height: '490px',
								// },
								// [theme.breakpoints.down(1357)]: {
								// 	height: '480px',
								// },
								// [theme.breakpoints.down(950)]: {
								// 	height: '450px',
								// },
								// [theme.breakpoints.down(650)]: {
								// 	height: '420px',
								// },
								// [theme.breakpoints.down(450)]: {
								// 	height: '350px',
								// },
							}
						}
					>
						<img
							src={item.itemImg}
							alt={item.title}
							style={{
								// borderRadius: '16px',
								objectFit: 'cover',
								width: '100%',
								height: '100%',
							}}
						/>
					</Box>
					{/* <Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							padding: '12px 20px',
							gap: '12px',
						}}
					>
						<Box
							sx={{
								borderRadius: '50%',
								width: '46px',
								height: '46px',
								overflow: 'hidden',
								display: 'block',
							}}
						>
							<img src={item.avatar} alt={item.itemName} />
						</Box>
						<Box maxWidth="75%">
							<Box
								sx={{
									textOverflow: 'ellipsis',
									overflow: 'hidden',
									display: 'block',
								}}
							>
								<Typography noWrap fontSize="18px" fontWeight={500}>
									{item.itemName}
								</Typography>
							</Box>
							<Box>
								<Typography fontSize="12px" fontWeight={500} noWrap>
									{item.userName}
								</Typography>
							</Box>
						</Box>
					</Box> */}
				</Box>
			</LinkWrapper>
		));
	};

	useEffect(() => {
		if (sectionRef.current) {
			const height = sectionRef.current.clientHeight;
			setFirstSectionHeight(height);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [renderSection]);

	// useEffect
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//Handle resize window event
	useEffect(() => {
		window.addEventListener('resize', handleResize, { passive: true });
		return () => {
			window.removeEventListener('resize', handleResize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [handleResize]);

	useEffect(() => {
		let a = 0;
		const timeout = setInterval(() => {
			if (a > 2) {
				a = 0;
				setNumCount(0);
			} else {
				a = a + 1;
				setNumCount(a);
			}
		}, 6000);
		return () => {
			clearInterval(timeout);
		};
	}, []);

	useEffect(() => {
		localStorageCustom.setThemeMode('light');
		onChangeMode('light');
	}, []);
	// console.log('count', numCount);
	return (
		<Fragment>
			<Box>
				<ExploreCollection
					sx={{
						paddingTop: '100px',
						[theme.breakpoints.down(800)]: {
							paddingTop: '70px',
						},
					}}
				>
					<Container maxWidth="xl">
						<Box>
							<HeaderSection sx={{ marginTop: '30px' }}>
								<MainHeader variant="h1" fontWeight="600" fontStyle="italic">
									Discover, Collect & Sell
								</MainHeader>
								<SubTitle variant="h1" fontWeight="600" fontStyle="italic">
									Creative NFTs
								</SubTitle>
							</HeaderSection>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									gap: '50px',
									my: '30px',
									[theme.breakpoints.down(400)]: {
										gap: '20px',
									},
								}}
							>
								<LinkWrapper href={`#${PATH_ITEM.createItem}`}>
									<ButtonWhite
										sx={{
											width: '140px',
										}}
									>
										Create
									</ButtonWhite>
								</LinkWrapper>

								<LinkWrapper href={`#${PATH_VIEWALL.collections}`}>
									<ButtonWhite
										sx={{
											width: '140px',
										}}
									>
										Explore
									</ButtonWhite>
								</LinkWrapper>
							</Box>
						</Box>
					</Container>
					<Box px={3}>
						<Box
							maxWidth={1800}
							mx="auto"
							fontStyle="italic"
							sx={{
								[theme.breakpoints.down(829)]: {
									maxWidth: 500,
								},
								[theme.breakpoints.down(548)]: {
									maxWidth: 350,
								},
							}}
						>
							<CustomSliderCoverflow
								slidesPerView={4}
								loop={true}
								spaceBetween={50}
								slidesPerGroup={1}
								centeredSlides={true}
								slidesToShowPoint1358={4}
								slidesToShowPoint1093={3}
								slidesToShowPoint828={2.5}
								slidesToShowPoint547={1.5}
								slidesToShowPoint320={1}
								slidesToShowPoint0={1}
								renderItem={RenderListCoverflow()}
							/>
						</Box>
					</Box>
				</ExploreCollection>
				<ExploreCollection sx={{ pt: 4 }}>
					<Box>
						<Container maxWidth="xl" sx={{ pt: 3, pb: 3 }}>
							<ListTopCollection
								renderSection={renderSection}
								setRenderSection={setRenderSection}
							/>
						</Container>
					</Box>
				</ExploreCollection>

				{/* sx={{ backgroundImage: `url(${BackgroundLightTheme})` }} */}
				{/* <ExploreCollection>
				<Container maxWidth="xl">
					<Box>
						<HeaderSection>
							<MainHeader variant="h2">Explore Collections</MainHeader>
							<SubHeader variant="h5">
								All the hottest NFT collections based on category
							</SubHeader>
						</HeaderSection>

						<CategoryCollection />
						<CategoryList />
					</Box>
				</Container>
				<BlurBackGround />
				<BlurBackGround1 />
			</ExploreCollection> */}
				<Box
					sx={{
						pb: 6,
					}}
				>
					<Container maxWidth="xl" sx={{}}>
						<Box sx={{ pt: 4, width: '100%' }}>
							<HeaderSection>
								<MainHeader variant="h2" fontWeight="600" fontStyle="italic">
									Explore NFTs
								</MainHeader>
								<SubHeader
									variant="h5"
									sx={{ display: 'inline' }}
									fontStyle="italic"
								>
									The world of digital assets in form of NFTs
									<LinkWrapper href={`#${PATH_PAGE.viewAll}`}>
										<ButtonViewAll
											sx={{ display: 'inline', fontStyle: 'italic' }}
										>
											View All
										</ButtonViewAll>
									</LinkWrapper>
								</SubHeader>
							</HeaderSection>

							<ListNFT />
						</Box>
					</Container>
				</Box>

				<ExploreCollection sx={{ pt: 4 }}>
					<Container maxWidth="xl" sx={{}}>
						<Box sx={{ mt: 0, mb: 4 }}>
							<HeaderSection>
								<MainHeader variant="h2" fontWeight="600" fontStyle="italic">
									Metaspacecy is the universal NFT marketplace
								</MainHeader>
							</HeaderSection>

							<Newsletter />
						</Box>
					</Container>
					<HotService>
						<ServiceTitle>
							Enter your email to stay in the loop with our latest feature releases,
							<br />
							NFT drops, and tips and tricks for navigating Metaspacecy
						</ServiceTitle>
						<EmailSearch
							sx={{
								input: {
									'::placeholder': {
										fontSize: '16px',
										fontStyle: 'italic',
									},
								},
							}}
						>
							<input type="text" placeholder="Email address" />
							<ButtonWhite sx={{ width: '140px', py: 0.5 }}>Subscribe</ButtonWhite>
						</EmailSearch>
					</HotService>
				</ExploreCollection>
				<Box>
					<Container maxWidth="xl" sx={{}}>
						<Box sx={{ pt: 6, pb: 4, width: '100%' }}>
							<HeaderSection1>
								{/* <img src={IconFire} alt="icon" /> */}
								<MainHeader variant="h2" fontWeight="600" fontStyle="italic">
									Featured Collections
								</MainHeader>
							</HeaderSection1>
						</Box>

						<ListColection />
					</Container>
				</Box>
			</Box>

			{/* <Box>
				<BrandPartner />
			</Box> */}
		</Fragment>
	);
};

export default React.memo(Home);
