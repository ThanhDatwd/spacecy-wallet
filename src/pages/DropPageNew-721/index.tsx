/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Stack, Typography, useTheme, Link, CircularProgress } from '@mui/material';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import React, { Fragment, useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'components/CustomUI/Modal';
import {
	DropContainer,
	DropTitle,
	DropContent,
	ContentLeft,
	ContentRight,
	StackItem,
	ContentButton,
	Item,
	SocialWrap,
	SocialIconLink,
	Creator,
	Avatar,
	Info,
	AddFr,
} from './styled';
import QandA from 'components/pages/HomeNew/QandA/QandA';
import { TwitterShareButton } from 'react-share';
import { SizeContext } from 'contexts/SizeObserver';
//path
import { PATH_BOARC, PATH_PAGE, PATH_SOCIAL } from 'routes/path';
import { PATH_DROP } from 'routes/path';
import { RELATED_URLS } from '../../constants';
// Image
import BannerDrop from 'assets/Boarc/image33.png';
import ButtonWhite from 'components/CustomUI/ButtonWhite';

// IMG
import TwitterWhite from 'assets/icons/twitter-white.svg';
import TwitterGray from 'assets/icons/twitter-gray.svg';
import DiscordrWhite from 'assets/icons/discord-white.svg';
import DiscordrGray from 'assets/icons/discord-gray.svg';
import TelegramWhite from 'assets/icons/telegram-white.svg';
import TelegramGray from 'assets/icons/telegram-gray.svg';
import FacebookWhite from 'assets/icons/facebook-white.svg';
import FacebookGray from 'assets/icons/facebook-gray.svg';
import YoutubeGray from 'assets/icons/youtubeicon.svg';
import MidiumGray from 'assets/icons/mediumicon.svg';
import Instagram from 'assets/icons/icon-instagram.svg';
import IconAdd from 'assets/icons/icon-addfr.svg';
import IconVerify from 'assets/icons/icon-check.svg';
import ShareIcon from 'assets/icons/share-black.webp';
import ListColection from 'components/pages/Home/ListCollection';
import drop4 from 'assets/Drop/drop8.webp';
import drop5 from 'assets/Drop/drop7.webp';
import drop6 from 'assets/Boarc/1.webp';

import { NETWORKINFO } from '../../constants';

//web3
import { getWeb3Contract } from 'hooks';
import BoarcDrop721 from 'abis/BoarcDrop721.json';
import { CONTRACT } from '../../constants';
import { BigNumber } from 'ethers';
import { sliceAddress } from 'utils';
import { formatUnits } from '@ethersproject/units';
//axios
import { API_ENDPOINT } from '../../constants';
//interface
import { NftMint } from 'models';
import { Collection } from 'models';
//path
import { PATH_COLLECTION } from 'routes/path';
//env
import { envCollectionIdToChainId } from '../../constants/env';
//token constant
import { TOKEN_PAYMENT } from '../../constants';
//axios
import axiosClient from 'apis/axiosClient';
//react toast
import { toast } from 'react-toastify';
//web3
import Web3 from 'web3';
import useMintNFT from 'hooks/useMintNFT';
//reudx
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
	selectOpenModal,
	openModalBuy,
	closeModalBuy,
	selectIdMint,
	selectAmount,
	selectStatus,
	selectDidMint,
} from 'redux/slices/mintNftSlice';
import { setConnectModal } from 'redux/slices/modalSlice';
import CountDown from 'components/CustomUI/Card/NFTItemCardInAuction/CountDown';
const ListSocialMedia = [
	{
		id: 1,
		title: 'Facebook',
		iconWhite: FacebookWhite,
		iconBlack: FacebookGray,
		link: `${PATH_SOCIAL.facebook}`,
	},
	{
		id: 2,
		title: 'Telegram',
		iconWhite: TelegramWhite,
		iconBlack: TelegramGray,
		link: `${PATH_SOCIAL.tele}`,
	},
	{
		id: 3,
		title: 'Twitter',
		iconWhite: TwitterWhite,
		iconBlack: TwitterGray,
		link: `${PATH_SOCIAL.twitter}`,
	},
	{
		id: 4,
		title: 'Midium',
		iconWhite: MidiumGray,
		iconBlack: MidiumGray,
		link: `${PATH_SOCIAL.medium}`,
	},
	{
		id: 5,
		title: 'Discord',
		iconWhite: DiscordrWhite,
		iconBlack: DiscordrGray,
		link: `${PATH_SOCIAL.discord}`,
	},
	{
		id: 6,
		title: 'Youtube',
		iconWhite: YoutubeGray,
		iconBlack: YoutubeGray,
		link: `${PATH_SOCIAL.youtube}`,
	},
	{
		id: 7,
		title: 'Instagram',
		iconWhite: Instagram,
		iconBlack: Instagram,
		link: `${PATH_SOCIAL.instagram}`,
	},
];

export interface StepStatus {
	// isChecking: boolean;
	isExecuting: boolean;
	isCompleted: boolean;
}

const initialStepStatus: StepStatus = {
	// isChecking: false,
	isExecuting: false,
	isCompleted: false,
};
interface Props {
	data: any;
}
declare let window: any;
const DropPageNew: React.FC<Props> = ({ data }) => {
	const navigate = useNavigate();
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const theme = useTheme();
	//redux
	const dispatch = useAppDispatch();
	const openModal = useAppSelector(selectOpenModal);
	const buyNftStatus: any = useAppSelector(selectStatus);
	const userAdd = useAppSelector(selectAddress);
	const currentChainId = useAppSelector(selectChainId);
	const didMint = useAppSelector(selectDidMint);
	//mintNFT hook
	const contractMetaSpacecyDrop = getWeb3Contract(
		BoarcDrop721.abi,
		CONTRACT[currentChainId].BoarcDrop721
	);
	const { mintNftItem721, infoDrop, isConnectWallet, toggleModal } =
		useMintNFT(contractMetaSpacecyDrop);
	//
	const today = new Date().getTime();
	return (
		<>
			{data && (
				<Fragment>
					<Box
						maxWidth={MaxWidth}
						mx="auto"
						py={4}
						px={4}
						fontStyle="italic"
						sx={{
							[theme.breakpoints.down(768)]: {
								px: 2,
							},
							[theme.breakpoints.down(480)]: {
								px: '10px',
							},
						}}
					>
						<Box
							sx={{
								mt: '98px',
								mb: 4,
								height: '500px',
								position: 'relative',

								img: {
									height: '100%',
									objectFit: 'cover',
									objectPosition: 'center',
									borderRadius: '16px',
									width: '100%',
								},
								[theme.breakpoints.down(500)]: {
									mb: 0,
								},
							}}
						>
							<img src={data.Collection.info.image} alt="banner" />
							<Box sx={{ position: 'absolute', right: '32px', bottom: '32px' }}>
								<Stack
									direction="row"
									sx={{
										borderRadius: '12px',
										padding: '10px 24px',
										background: theme.palette.primary.light,
										color: '#fff',
										fontWeight: '500',

										width: '320px',
										[theme.breakpoints.down(650)]: {
											width: '260px',
										},
									}}
								>
									<Typography
										variant="body1"
										fontWeight="500"
										width="104px"
										sx={{
											marginRight: '5px',
											[theme.breakpoints.down(650)]: {
												fontSize: '13px',
												width: 84,
											},
										}}
									>
										{today < data.Collection.info.startTime * 1000
											? ' Start in '
											: '	End in '}
									</Typography>
									<CountDown
										className="countDown"
										timeStart={data.Collection.info.startTime * 1000}
										timeEnd={data.Collection.info.endTime * 1000}
										executeOne={() => {}}
										executeZero={() => {}}
									/>
								</Stack>
							</Box>
						</Box>
						<Box>
							<DropContent>
								<ContentLeft>
									<Typography variant="h5" fontWeight={600} mb={2}>
										About this collection
									</Typography>
									<Stack direction="row" gap="16px" alignItems="center" mb={3}>
										<Box
											sx={{
												img: {
													width: '60px',
													height: '60px',
													objectFit: 'cover',
													objectPosition: 'center',
													border: '1px solid #FFFFFF',
												},
											}}
										>
											<img src={data.Collection.info.logo} alt="drop" />
										</Box>
										<DropTitle>
											<Typography
												variant="h3"
												fontWeight={600}
												onClick={() => {
													navigate(
														`${PATH_COLLECTION.detail}/${data.Collection.info.collectionId}`
													);
												}}
												sx={{ cursor: 'pointer' }}
											>
												{data.Collection.info.tittle}
											</Typography>
											<Box
												sx={{
													fontSize: '24px',
													[theme.breakpoints.down(1050)]: {
														fontSize: '18px',
													},
												}}
											>
												Created by {data.Collection.info.creator}
											</Box>
										</DropTitle>
									</Stack>
									<Stack direction="row" gap="32px" flexWrap="wrap">
										<StackItem>
											<Typography
												variant="h6"
												color="#5A5D79"
												textAlign="center"
											>
												Available NFTs
											</Typography>
											<p>
												{data.Collection.info.availableNFT}{' '}
												<span>/{data.Collection.info.totalNFT}</span>
											</p>
										</StackItem>
										<StackItem>
											<Typography
												variant="h6"
												color="#5A5D79"
												textAlign="center"
											>
												Price
											</Typography>
											<p>
												{data.Collection.info.price}{' '}
												<span>{data.Collection.info.symbolPrice}</span>
											</p>
										</StackItem>
										<StackItem>
											<Typography
												variant="h6"
												color="#5A5D79"
												textAlign="center"
											>
												Owners
											</Typography>
											<p>{data.Collection.info.owner}</p>
										</StackItem>
										<StackItem>
											<Typography
												variant="h6"
												color="#5A5D79"
												textAlign="center"
											>
												Total sales
											</Typography>
											<p>
												{data.Collection.info.totalSales}{' '}
												<span>{data.Collection.info.symbolPrice}</span>
											</p>
										</StackItem>
									</Stack>

									{/* <Box
										sx={{
											margin: '32px 0',
											fontSize: '24px',
											[theme.breakpoints.down(1050)]: {
												fontSize: '18px',
											},
											[theme.breakpoints.down(500)]: {
												fontSize: '13px',
											},
										}}
									>
										{data.Collection.info.content.conten1}
										<br />
										{data.Collection.info.content.content2}
									</Box> */}

									<Box
										sx={{
											margin: '32px 0 16px',
											fontSize: '24px',
											[theme.breakpoints.down(1050)]: {
												fontSize: '18px',
											},
											[theme.breakpoints.down(500)]: {
												fontSize: '13px',
											},
										}}
									>
										Holder benefits:
										{data.Collection.info.benefits.map((be: any) => {
											return (
												<>
													<br />
													{be}
												</>
											);
										})}
									</Box>
								</ContentLeft>
								<ContentRight>
									<ContentButton>
										<ButtonWhite
											sx={{
												width: 'fit-content',
												'@media (max-width: 400px)': {
													padding: '8px 16px',
												},
											}}
											disabled={
												data.Collection.info.availableNFT === 0 ||
												data.Collection.info.active === false ||
												infoDrop.feeMint === '0'
													? true
													: false
											}
											onClick={() => {
												isConnectWallet('');
											}}
										>
											Mint for {data.Collection.info.price}{' '}
											{data.Collection.info.symbolPrice}
										</ButtonWhite>
									</ContentButton>
									<Item>
										<Typography variant="h5" fontWeight="600">
											Early Access
										</Typography>
										<p>
											Oct 9, 3:00 AM - {data.Collection.info.price}
											{data.Collection.info.symbolPrice}{' '}
										</p>
									</Item>
									<Item>
										<Typography variant="h5" fontWeight="600">
											Mef Friends & Family
										</Typography>
										<p>Nov 6, 9:00 AM - OBNB</p>
									</Item>
									<Item>
										<Typography variant="h5" fontWeight="600">
											Public Sale
										</Typography>
										<p>
											Dec 3 , 12 :00 AM - {data.Collection.info.price}{' '}
											{data.Collection.info.symbolPrice}
										</p>
									</Item>
									<Item>
										<Typography
											variant="h5"
											fontWeight="600"
											sx={{
												img: {
													width: '20px',
													ml: 2,
													[theme.breakpoints.down(600)]: {
														width: '14px',
														ml: 1.2,
													},
												},
											}}
										>
											Links
											<TwitterShareButton
												url={`${RELATED_URLS.MetaSpacecyHomePage}/#${PATH_DROP.root}`}
												title={`Look what I found!  ${data.Collection.info.tittle}  collectible`}
												hashtags={['Art', 'NFT']}
												via="Metaspacecy"
											>
												<img src={ShareIcon} alt="icon share" />
											</TwitterShareButton>
										</Typography>

										<SocialWrap>
											{ListSocialMedia.map((item: any, index: number) => (
												<SocialIconLink
													href={`${item.link}`}
													key={index}
													target="_blank"
												>
													<img
														style={{ width: '100%', height: '100%' }}
														src={item.iconBlack}
														alt={item.title}
													/>
												</SocialIconLink>
											))}
										</SocialWrap>
									</Item>
									<Item>
										<Typography variant="h5" fontWeight="600">
											Creators
										</Typography>
										<Creator>
											<Avatar>
												<img
													src={data.Collection.createrInfo.avatar}
													alt="avatar"
												/>
												<Info>
													<Link
														href={`#${PATH_PAGE.otherUser}/${data.Collection.createrInfo.userAddress}`}
													>
														<Typography
															fontSize="16px"
															fontWeight="700"
														>
															{data.Collection.info.creator}
														</Typography>
													</Link>
													<Box sx={{ display: 'flex', gap: '5px' }}>
														@artofbamboo{' '}
														<img src={IconVerify} alt="icon add" />
													</Box>
													<p>2k followers</p>
												</Info>
											</Avatar>
										</Creator>
									</Item>
								</ContentRight>
							</DropContent>
						</Box>
					</Box>
					<Box sx={{}}>
						<Box
							maxWidth={MaxWidth}
							mx="auto"
							px={4}
							fontStyle="italic"
							sx={{
								[theme.breakpoints.down(768)]: {
									px: 2,
								},
								[theme.breakpoints.down(480)]: {
									px: '10px',
								},
							}}
						>
							<DropContainer>
								<Stack
									direction="row"
									alignItems="center"
									justifyContent="space-between"
									gap="32px"
									sx={{
										'@media (max-width: 700px)': {
											flexDirection: 'column-reverse',
											gap: '24px',
										},
									}}
								>
									<Box
										sx={{
											width: '45%',
											'@media (max-width: 700px)': {
												width: '100%',
											},
										}}
									>
										<Typography variant="h5" fontWeight={600}>
											{data.Collection.info.content[0].title}
										</Typography>
										<Typography variant="h6">
											{data.Collection.info.content[0].content}
										</Typography>
									</Box>
									<Box
										sx={{
											width: '55%',
											img: {
												borderRadius: '10px',
											},
											'@media (max-width: 700px)': {
												width: '100%',
											},
										}}
									>
										<img
											src={data.Collection.info.content[0].banner}
											alt="drop"
										/>
									</Box>
								</Stack>
								<Stack
									direction="row"
									alignItems="center"
									justifyContent="space-between"
									gap="32px"
									mt={3}
									sx={{
										'@media (max-width: 700px)': {
											flexDirection: 'column',
											gap: '24px',
										},
									}}
								>
									<Box
										sx={{
											width: '55%',
											img: {
												borderRadius: '10px',
											},
											'@media (max-width: 700px)': {
												width: '100%',
											},
										}}
									>
										<img
											src={data.Collection.info.content[1].banner}
											alt="drop"
										/>
									</Box>
									<Box
										sx={{
											width: '45%',
											'@media (max-width: 700px)': {
												width: '100%',
											},
										}}
									>
										<Typography variant="h5" fontWeight={600}>
											{data.Collection.info.content[1].title}
										</Typography>
										<Typography variant="h6">
											{data.Collection.info.content[1].content}
										</Typography>
									</Box>
								</Stack>
							</DropContainer>
						</Box>
					</Box>

					<Modal
						onOpen={openModal}
						allowClose={true}
						onClose={() => {
							dispatch(closeModalBuy());
						}}
						mainHeader="Confirm Checkout"
						style={{ maxWidth: '470px', height: 'fit-content', padding: '20px 0px' }}
					>
						<Box
							sx={{
								padding: '0px 30px',
								'@media (max-width: 450px)': {
									padding: '0',
								},
							}}
						>
							<Box
								sx={{
									padding: '40px 0px',
								}}
							>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										paddingBottom: '5px',
										borderBottom: '1px solid #E7E8EC',
									}}
								>
									<Typography sx={{ color: '#5A5D79' }}>Item</Typography>
									<Typography sx={{ color: '#5A5D79' }}>Price</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										margin: '40px 0px',
									}}
								>
									<Box>
										<Typography sx={{ color: '#131740', fontWeight: '600' }}>
											{data.Collection.info.tittle}
										</Typography>
										<Typography sx={{ color: theme.palette.primary.light }}>
											Minted by {userAdd && sliceAddress(userAdd, 8, 5)}
										</Typography>
									</Box>
									<Box>
										<Box sx={{ display: 'flex', width: '97px' }}>
											<img
												src={`${NETWORKINFO[currentChainId].image}`}
												// src={iconEth}
												alt="iconETH"
												style={{
													width: '20px',
													height: 'auto',
													marginRight: '5px',
												}}
											/>
											<Typography sx={{ color: '#131740' }}>
												{data.Collection.info.price}{' '}
												{data.Collection.info.symbolPrice}
											</Typography>
										</Box>
									</Box>
								</Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',

										padding: '15px 0px',
										borderBottom: '1px solid #E7E8EC',
										borderTop: '1px solid #E7E8EC',
									}}
								>
									<Typography sx={{ color: '#5A5D79' }}>Total</Typography>
									<Box sx={{ display: 'flex' }}>
										<img
											src={`${NETWORKINFO[currentChainId].image}`}
											// src={iconEth}
											alt="iconETH"
											style={{
												width: '20px',
												height: 'auto',
												marginRight: '5px',
											}}
										/>{' '}
										<Typography sx={{ color: '#131740' }}>
											{data.Collection.info.price}{' '}
											{data.Collection.info.symbolPrice}
										</Typography>
									</Box>
								</Box>
							</Box>

							<ButtonWhite
								sx={{ margin: '20px auto', width: '50%' }}
								onClick={
									didMint
										? () => toggleModal('')
										: () => {
												mintNftItem721(data);
										  }
								}
							>
								{buyNftStatus.isLoading ? (
									<CircularProgress sx={{ color: 'black', mr: 1 }} size={16} />
								) : buyNftStatus.isSuccess ? (
									<Typography sx={{ color: '#131740' }}>
										Congratulation
									</Typography>
								) : buyNftStatus.isError ? (
									<Typography sx={{ color: '#131740' }}>Error</Typography>
								) : (
									<Typography sx={{ color: '#131740' }}>Confirm</Typography>
								)}
							</ButtonWhite>
						</Box>
					</Modal>
				</Fragment>
			)}
		</>
	);
};

export default React.memo(DropPageNew);
