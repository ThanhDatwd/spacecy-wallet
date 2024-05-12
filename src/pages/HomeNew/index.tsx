/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState, useRef, useCallback, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//mui

import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
// styled
import { FirstSectionHomePage, HeaderVideoContainer, TitleWrapper, VideoHeader } from './styled';

// images
import BackgroundGalaxy from 'assets/background-galaxy.webp';
import discord from 'assets/images/footer/discord-gray.svg';

// Import PATH routes
import { PATH_ITEM, PATH_MARKETPLACE, PATH_PAGE, PATH_SOCIAL } from '../../routes/path';
import { LinkWrapper } from 'components/CustomUI/Card/CollectionRankingCard/styled';
import { useDispatch, useSelector } from 'react-redux';
// import { setConnectModal } from 'redux/slices/modalSlice';
import { selectAddress, setChainId, setCurrentProvider } from 'redux/slices/web3InfoSlice';
import { SizeContext } from 'contexts/SizeObserver';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
// Model 3D
// @ts-ignore
// import Ball from 'assets/Model/Ball/premier-ball/source/Premier Ball.glb';
// // @ts-ignore
// import AvatarRed from 'assets/Model/Avatar/New/Avatar_space.glb';
// // import AvatarRed from 'assets/Model/Avatar/Multi/Avatars_space.glb';
// // @ts-ignore
// import AvatarBlue from 'assets/Model/Avatar/Blue/avatar-space-blue.glb';
// // @ts-ignore
// import AvatarGreen from 'assets/Model/Avatar/Blue/Avatar charater green.glb';
// // @ts-ignore
// import Sport from 'assets/Model/Sport/sport.glb';
// import SportBack from 'assets/Model/Sport/sksport.jpeg';

// // @ts-ignore
// import Flyby3 from 'assets/Model/Flyby/flyby.glb';
// import FlybyBack from 'assets/Model/Flyby/skflyby.png';
// // @ts-ignore
// import Wormhole3 from 'assets/Model/Wormhole/wormhole.glb';
// import WormholeBack from 'assets/Model/Wormhole/skwormhole.jpeg';
// // @ts-ignore
// import Box3 from 'assets/Model/Box/box2.glb';
// import BoxBack from 'assets/Model/Box/back1.jpeg';
//
import { useSettings } from 'hooks';
import { localStorageCustom } from 'utils';
import Web3 from 'web3';
import CardHeader from 'components/pages/HomeNew/CardHeader';
import DiscoverNFTs from 'components/pages/HomeNew/DiscoverNFTs';
import DiscoverStadium from 'components/pages/HomeNew/DiscoverStadium';
import BuildVirtualWorld from 'components/pages/HomeNew/BuildVirtualWorld';
import HelperUseVirtualWorld from 'components/pages/HomeNew/HelperUseVirtualWorld';
import BoarcGallery from 'components/pages/HomeNew/BoarcGallery';
import InstantlyDisplayNFTs from 'components/pages/HomeNew/InstantlyDisplayNFTs';
import InfinitySpaceTours from 'components/pages/HomeNew/InfinitySpaceTours';
import ExploreMetaverse from 'components/pages/HomeNew/ExploreMetaverse';
import AstroBoy from 'components/pages/HomeNew/AstroBoy';
import AstroPanda from 'components/pages/HomeNew/AstroPanda';
import BrandPartner from 'components/pages/HomeNew/BrandPartner';
import QandA from 'components/pages/HomeNew/QandA/QandA';
import VirtualWorld from 'components/pages/HomeNew/VirtualWorld/VirtualWorld';

import { PATH_VIRTUAL_WORLD } from 'routes/path';
import ReactPlayer from 'react-player';
import Event from 'components/pages/HomeNew/Events';
import DiscoverXmas from 'components/pages/HomeNew/DiscoverXmas';

// Inter face Model viewer
declare global {
	namespace JSX {
		interface IntrinsicElements {
			'model-viewer': React.DetailedHTMLProps<any, HTMLElement>;
		}
	}
}
//

const Contents = [
	{
		id: 0,
		firstLineHeader: 'NFTs Are The Key To Accessing',
		secondLineHeader: 'The Metaverse With True Ownership',
		description: 'NFTs Are The Key To Accessing The Metaverse With True Ownership',
		nameFristButton: 'Create',
		nameSecondButton: 'Explore',
		linkFristButton: `#${PATH_ITEM.createItem}`,
		// linkFristButton: '',
		linkSecondButton: `#${PATH_PAGE.viewAll}`,
		// linkSecondButton: '',
	},
	{
		id: 1,
		firstLineHeader: 'Build, Develop, Design, Tokenise',
		secondLineHeader: 'Your Own Space In The Metaverse',
		description: 'Build, Develop, Design, Tokenise Your Own Space In The Metaverse',
		nameFristButton: 'Discover',
		nameSecondButton: 'Explore',
		linkFristButton: `#${PATH_MARKETPLACE.root}`,
		linkSecondButton: `#${PATH_PAGE.viewAll}`,
		// linkFristButton: '',
		// linkSecondButton: '',
	},
	{
		id: 2,
		firstLineHeader: 'Discover, Create, Manage, Trade',
		secondLineHeader: 'Unique And Exclusive NFT Collections',
		description: 'Discover, Create, Manage, Trade Unique And Exclusive NFT Collections',
		nameFristButton: 'Upload',
		nameSecondButton: 'Explore',
		linkFristButton: `#${PATH_ITEM.createItem}`,
		linkSecondButton: `#${PATH_PAGE.viewAll}`,
	},
];

const ContentsQandA = [
	{
		id: 0,
		question: 'How do I create an NFT ?',
		answer: '',
		answer1: '',
	},
	{
		id: 1,
		question: 'How can I stay safe and protect my NFTs ?',
		answer: '',
		answer1: '',
	},
	{
		id: 2,
		question: 'What are the key terms to know in NFTs and Web3 ?',
		answer: '',
		answer1: '',
	},
	{
		id: 3,
		question: 'How do I sell an NFT ?',
		answer: '',
		answer1: '',
	},
	{
		id: 4,
		question: 'Smart Contract Upgrade: What You Need To Know',
		answer: '',
		answer1: '',
	},
];
const ContentsQandA1 = [
	{
		id: 0,
		question: 'What is the metaverse, exactly ?',
		answer: 'The metaverse is a rich, persistent, interactive experience featuring co-creation and fully functioning shared economies. As one type of shared immersive experience, the metaverse is an always-on digital environment where visitors can shop, socialize, train for their jobs, play games, take classes, attend meetings, have cultural experiences, and more.',
		answer1: '',
	},
	{
		id: 1,
		question: 'What is an immersive experience ?',
		answer: 'An immersive experience pulls you into a digitally created, often three-dimensional world where you can interact with other visitors, virtual objects, and your environment. Some bring visitors into a fully enveloping virtual reality experience, whereas others take an augmented reality approach, mixing virtual experiences with the physical world. Other immersive experiences may be delivered through the web and other platforms.',
		answer1:
			'The metaverse is one type of immersive experience. It is unique because it is an extensive, shared, interactive, always-on virtual world with a fully functioning economy that operates in real time.',
	},
	{
		id: 2,
		question: 'What does the metaverse have to do with business ?',
		answer: 'The metaverse and shared immersive experiences present important business opportunities, similar to the digital transformation that is moved much of commerce online over recent decades. The metaverse has the potential to improve customer experiences, build brand awareness, improve communications, and create new economies. Today, immersive content creation tools are already streamlining product design and digital asset creation.',
		answer1: '',
	},
	{
		id: 3,
		question: 'How can I get my brand metaverse-ready ?',
		answer: 'Brands can start by developing a clearly articulated strategy for how they want to engage in the metaverse, including the types of immersive experiences and content they want to create. Take your deep customer and market understanding and find ways to create value for your customers in this rapidly developing digital space.',
		answer1:
			'Brands can also start developing 3D and shared immersive content creation skill sets now to avoid playing catch-up later on. You can use these skill sets today to bring remarkable efficiency to product design and marketing workflows — and you will gain the technical proficiency you need to make the most of the metaverse as it becomes an everyday reality.',
	},
	{
		id: 4,
		question: 'What are the benefits of being metaverse-ready?',
		answer: 'Laying the groundwork now for participation in the metaverse and shared immersive experiences will help businesses make the most of the opportunities that will arise. Today, businesses are already using 3D technology to speed up product design and marketing asset development. These businesses will be at an advantage because they’ll have already developed the skills needed to participate in metaverse and immersive experiences — and they will have 3D assets on hand and ready to go when the time is right.',
		answer1: '',
	},
];
const HeighCardFirstLine = '300px';
const HeighCardSecondLine = '400px';
const HeightCardCoverflow = '550px';

declare let window: any;

const Home: React.FC = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userAddress = useSelector(selectAddress);
	const { innerWidth } = useContext(SizeContext);

	//
	const ethereum: any = window.ethereum;
	const web3 = new Web3(Web3.givenProvider);
	//
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const WidthIMGStation = innerWidth < 1800 ? '' : '1600px';
	//UseState

	// useRef
	const sectionRef = useRef<any>(null);
	const isThemeLight = theme.palette.mode === 'light';
	// useState
	const [distance, setDistance] = useState<string>('0px');
	const [firstSectionHeight, setFirstSectionHeight] = useState<number>(0);
	const [renderSection, setRenderSection] = useState<boolean>(false);
	const [numCount, setNumCount] = useState<number>(0);
	const [ads, setAds] = useState(false);
	const { themeMode, onChangeMode } = useSettings();

	const { pathname } = useLocation();
	const isHomePage = pathname === '/';

	const handleResize = useCallback(() => {
		if (sectionRef.current) {
			const height = sectionRef.current.clientHeight;
			setFirstSectionHeight(height);
		}
	}, []);

	useEffect(() => {
		if (sectionRef.current) {
			const height = sectionRef.current.clientHeight;
			setFirstSectionHeight(height);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [renderSection]);

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
			if (a > 1) {
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
		const currentThemeMode: string | null = localStorageCustom.getThemeMode();

		if (isHomePage) {
			localStorageCustom.setThemeMode('dark');
			onChangeMode('dark');
		} else {
			localStorageCustom.setThemeMode('light');
			onChangeMode('light');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// console.log('count', numCount);
	return (
		<Fragment>
			<FirstSectionHomePage>
				<HeaderVideoContainer>
					<TitleWrapper>
						{innerWidth > 930 ? (
							<>
								<Typography
									fontSize={56}
									sx={{
										[theme.breakpoints.down(1500)]: {
											fontSize: '44px',
										},
										[theme.breakpoints.down(1000)]: {
											fontSize: '36px',
										},
										[theme.breakpoints.down(500)]: {
											fontSize: '28px',
										},
									}}
								>
									{Contents[numCount].firstLineHeader}
								</Typography>
								<Typography
									fontSize={56}
									sx={{
										[theme.breakpoints.down(1500)]: {
											fontSize: '44px',
										},
										[theme.breakpoints.down(1000)]: {
											fontSize: '36px',
										},
										[theme.breakpoints.down(500)]: {
											fontSize: '28px',
										},
									}}
								>
									{Contents[numCount].secondLineHeader}
								</Typography>
							</>
						) : (
							<Box width="100%">
								<Typography
									fontSize={44}
									mt={2}
									color="white"
									fontStyle="italic"
									sx={{
										[theme.breakpoints.down(1000)]: {
											fontSize: '36px',
										},
										[theme.breakpoints.down(500)]: {
											fontSize: '28px',
										},
									}}
								>
									{Contents[numCount].description}
								</Typography>
							</Box>
						)}

						<Stack
							direction="row"
							mt={2}
							gap={1.5}
							alignItems="center"
							justifyContent="center"
						>
							{Contents[numCount].nameFristButton !== 'none' && (
								<LinkWrapper href={Contents[numCount].linkFristButton}>
									<ButtonWhite
										sx={{
											width: '9rem',
											mb: 0,
											background: 'rgba(255,255,255,0.1)',
											backdropFilter: 'blur(3px)',

											[theme.breakpoints.down(400)]: {
												width: 0,
												minWidth: '86px',
											},
											':hover': {
												background: 'rgba(157, 195, 230, 0.6)',
												borderColor: 'rgba(157, 195, 230, 0.6)',
											},
										}}
									>
										<Typography color="white" fontWeight="500">
											{Contents[numCount].nameFristButton}
										</Typography>
									</ButtonWhite>
								</LinkWrapper>
							)}
							{Contents[numCount].nameSecondButton !== 'none' && (
								<LinkWrapper href={Contents[numCount].linkSecondButton}>
									<ButtonWhite
										sx={{
											width: '9rem',
											mb: 0,
											background: 'rgba(255,255,255,0.1)',
											backdropFilter: 'blur(3px)',

											[theme.breakpoints.down(400)]: {
												width: 0,
												minWidth: '86px',
											},
											':hover': {
												background: 'rgba(157, 195, 230, 0.6)',
												borderColor: 'rgba(157, 195, 230, 0.6)',
											},
										}}
									>
										<Typography color="white" fontWeight="500">
											{Contents[numCount].nameSecondButton}
										</Typography>
									</ButtonWhite>
								</LinkWrapper>
							)}
							<Link
								href={PATH_SOCIAL.discord}
								target="_blank"
								sx={{
									cursor: 'pointer',
									img: {
										width: '50px',
										height: '100%',
									},
									'@media (max-width: 600px)': {
										img: {
											width: '36px',
										},
									},
								}}
							>
								<img src={discord} alt="discord" />
							</Link>
						</Stack>
					</TitleWrapper>
				</HeaderVideoContainer>

				<Box
					sx={{
						width: '100vw',
						objectFit: 'cover',
						zIndex: '-1',
					}}
				>
					<VideoHeader autoPlay loop muted>
						<source
							type="video/mp4"
							src="https://res.cloudinary.com/dwd5vxi4e/video/upload/v1675164144/meta-asset/VIDEO_introduce2_oekr2l.mp4"
							// src="https://res.cloudinary.com/dyh2c5n8i/video/upload/v1658980640/metaspacecy/Mars_Metaspacecy_mlfycs.mp4"
							// src="https://firebasestorage.googleapis.com/v0/b/data-space-282e2.appspot.com/o/VIDEO_Teaser_1.mp4?alt=media&token=326d0ff2-0fda-4adf-802e-36379b55950f"
						/>
					</VideoHeader>
				</Box>
				{/* <Event /> */}
			</FirstSectionHomePage>
			{isThemeLight ? (
				<Box
					sx={{
						width: '100%',
						height: '100vh',
						background: 'white',
						// background: 'red',
						position: 'fixed',
						zIndex: '-1',
						top: '0%',
						left: '0',
						// transform: 'translate(50%, 50%)',
					}}
				>
					{' '}
				</Box>
			) : (
				<Box
					sx={{
						width: '100%',
						height: '100vh',
						background: `url('${BackgroundGalaxy}')`,
						// background: 'red',
						position: 'fixed',
						zIndex: '-1',
						top: '0%',
						left: '0',
						// transform: 'translate(50%, 50%)',
					}}
				>
					{' '}
				</Box>
			)}

			{/* First Section */}
			<CardHeader />
			<DiscoverNFTs />
			<BoarcGallery />

			<Box
				sx={{
					maxWidth: MaxWidth,
					margin: '32px auto',
					px: '10px',
					[theme.breakpoints.down(768)]: {
						margin: '24px auto',
					},
					[theme.breakpoints.down(480)]: {
						margin: '16px auto',
					},
				}}
			>
				<Typography
					color="white"
					variant="h2"
					textAlign="center"
					fontStyle="italic"
					fontWeight={600}
					mb={1}
				>
					Get Versed In The Metaverse
				</Typography>
				<Typography
					color="white"
					variant="h4"
					textAlign="center"
					fontStyle="italic"
					fontWeight={500}
					sx={{ maxWidth: '1240px', mx: 'auto' }}
				>
					Hyper-realistic digital worlds. Augmented reality shopping. Virtual travel in
					3D. Immersive digital experiences like these already exist. The Metaverse is the
					next step
				</Typography>
			</Box>
			<VirtualWorld />
			{/* <ExploreMetaverse /> */}
			<Box
				sx={{
					maxWidth: MaxWidth,
					margin: '32px auto',
					px: '10px',
					[theme.breakpoints.down(768)]: {
						margin: '24px auto',
					},
					[theme.breakpoints.down(480)]: {
						margin: '16px auto',
					},
				}}
			>
				<Typography
					color="white"
					variant="h2"
					textAlign="center"
					fontStyle="italic"
					fontWeight={600}
					mb={1}
				>
					Are You Metaverse - Ready?
				</Typography>
				<Typography
					color="white"
					variant="h4"
					textAlign="center"
					fontStyle="italic"
					fontWeight={500}
					sx={{ maxWidth: '1200px', mx: 'auto' }}
				>
					We're breaking boundaries with immersive experiences
				</Typography>
				<Typography
					color="white"
					variant="h4"
					textAlign="center"
					fontStyle="italic"
					fontWeight={500}
					sx={{ maxWidth: '1200px', mx: 'auto' }}
				>
					Find out how you can play a part
				</Typography>
			</Box>
			<DiscoverXmas />
			<InfinitySpaceTours />
			<Box
				sx={{
					maxWidth: MaxWidth,
					margin: '32px auto',
					px: '10px',
					[theme.breakpoints.down(768)]: {
						margin: '24px auto',
					},
					[theme.breakpoints.down(480)]: {
						margin: '16px auto',
					},
				}}
			>
				<Typography
					color="white"
					variant="h4"
					textAlign="center"
					fontStyle="italic"
					fontWeight={500}
					sx={{ maxWidth: '1300px', mx: 'auto' }}
				>
					An exciting new era of digital experience is coming — one that’s poised to
					radically change how we work, play, and connect
				</Typography>
			</Box>
			<InstantlyDisplayNFTs />
			{/* <QandA contents={ContentsQandA} header="Metaverse question ? We have answers." /> */}
			{/* <QandA
				contents={ContentsQandA}
				header=""
				style={{ width: '50%', margin: '0 auto', paddingTop: '230px' }}
				style1={{
					borderRadius: '15px',
					marginBottom: '24px',
					padding: '15px 35px',
					cursor: 'pointer',
					transition: 'all 0.3s ease-in-out',
					'&:hover': { backdropFilter: 'blur(10px)' },
				}}
			/> */}
			{/* <HelperUseVirtualWorld />
			<AstroBoy />
			<BuildVirtualWorld />
			<AstroPanda /> */}
			<BrandPartner />
			{/* <QandA
				contents={ContentsQandA1}
				header="Metaverse question ? We have answers."
				style={{
					width: '50%',
					margin: '0 auto',
					paddingTop: '115px',
					paddingBottom: '120px',
				}}
				style1={{
					borderRadius: '15px',
					marginBottom: '24px',
					padding: '15px 35px',
					cursor: 'pointer',
					transition: 'all 0.3s ease-in-out',
					'&:hover': { backdropFilter: 'blur(10px)' },
				}}
			/> */}
		</Fragment>
	);
};

export default React.memo(Home);
