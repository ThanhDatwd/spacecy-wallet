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
import BannerDrop from 'assets/drop.webp';
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
import drop6 from 'assets/Drop/drop6.jpeg';
import drop7 from 'assets/Drop/drop7.jpeg';
import drop8 from 'assets/Drop/drop8.jpeg';
import drop9 from 'assets/Drop/drop9.jpeg';

import { NETWORKINFO } from '../../constants';
//reudx
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
//web3
import { getWeb3Contract } from 'hooks';
import BoarcDrop from 'abis/BoarcDrop.json';
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
import ItemDrop from './itemDrop';
import useMintNFT from 'hooks/useMintNFT';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
	selectOpenModal,
	closeModalBuy,
	selectIdMint,
	selectAmount,
	selectStatus,
	selectDidMint,
} from 'redux/slices/mintNftSlice';

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
const DropPage: React.FC<Props> = ({ data }) => {
	const navigate = useNavigate();
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const theme = useTheme();
	//redux
	const dispatch = useAppDispatch();
	const currentChainId = useSelector(selectChainId);
	const userAdd = useSelector(selectAddress);
	const openModal = useAppSelector(selectOpenModal);
	const amountBuy = useAppSelector(selectAmount);
	const currentIdMint = useAppSelector(selectIdMint);
	const buyNftStatus: any = useAppSelector(selectStatus);
	const didMint = useAppSelector(selectDidMint);
	//mintNFT hook
	const contractMetaSpacecyDrop = getWeb3Contract(
		BoarcDrop.abi,
		CONTRACT[currentChainId].BoarcDrop
	);
	const { mintNftItem, infoDrop, isConnectWallet, toggleModal } =
		useMintNFT(contractMetaSpacecyDrop);

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
						</Box>
						<Box>
							<DropContent>
								<ContentLeft>
									<Stack direction="row" gap="16px" alignItems="center" mb={3}>
										<Box
											sx={{
												img: {
													width: '60px',
													height: '60px',
													objectFit: 'cover',
													objectPosition: 'center',
													borderRadius: '10px',
													border: '1px solid #FFFFFF',
												},
											}}
										>
											<img src={drop6} alt="drop" />
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
												<span>
													{TOKEN_PAYMENT[currentChainId][0].symbol}
												</span>
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
												<span>
													{TOKEN_PAYMENT[currentChainId][0].symbol}
												</span>
											</p>
										</StackItem>
									</Stack>
									<Box
										sx={{
											margin: '32px 0',
											fontSize: '24px',
											[theme.breakpoints.down(1440)]: {
												fontSize: '20px',
											},
											[theme.breakpoints.down(1024)]: {
												fontSize: '16px',
											},
											[theme.breakpoints.down(500)]: {
												fontSize: '13px',
											},
										}}
									>
										Duis autem vel eum iriure dolor in hendrerit in vulputate
										velit esse molestie consequat, vel illum dolore eu feugiat
										nulla facilisis at vero eros et accumsan et iusto odio
									</Box>
									<Box
										sx={{
											fontSize: '24px',
											[theme.breakpoints.down(1440)]: {
												fontSize: '20px',
											},
											[theme.breakpoints.down(1024)]: {
												fontSize: '16px',
											},
											[theme.breakpoints.down(500)]: {
												fontSize: '13px',
											},
											ul: {
												pl: '32px',
											},
										}}
									>
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
										sed diam nonummy nibh euismod tincidunt ut laoreet dolore
										magna aliquam erat volutpat.
									</Box>
								</ContentLeft>
								<ContentRight>
									{/* <ContentButton sx={{ justifyContent: 'center' }}>
										<TwitterShareButton
											url={`${RELATED_URLS.MetaSpacecyHomePage}/#${PATH_DROP.root}`}
											title={`Look what I found! ${data.Collection.info.tittle} collectible`}
											hashtags={['Art', 'NFT']}
											via="MetaSpacecy"
										>
											<ButtonWhite sx={{ width: 'fit-content' }}>
												Share
											</ButtonWhite>
										</TwitterShareButton>
									</ContentButton> */}
									<Item>
										<Typography variant="h5" fontWeight="600">
											Early Access
										</Typography>
										<p>
											Oct 9, 3:00 AM - {data.Collection.info.price}
											{TOKEN_PAYMENT[currentChainId][0].symbol}{' '}
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
											{TOKEN_PAYMENT[currentChainId][0].symbol}
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
														// src={isLightTheme ? item.iconBlack : item.iconWhite}
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
					<Box>
						<Box
							maxWidth={MaxWidth}
							mx="auto"
							px={4}
							py={4}
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
							<Box mb={4}>
								<Typography variant="h2" fontWeight={600} textAlign="center">
									NFTs
								</Typography>
							</Box>
							<Stack gap="32px">
								{data.Collection.info.item.map((item: any) => {
									return (
										<>
											<ItemDrop
												data={item}
												chainId={currentChainId}
												price={data.Collection.info.price}
												creater={data.Collection.info.creator}
												key={item.id}
												isConnectWallet={isConnectWallet}
												feeMint={infoDrop}
											/>
										</>
									);
								})}
							</Stack>
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
									<Box sx={{ width: 'calc(100% - 120px)' }}>
										<Typography sx={{ color: '#131740', fontWeight: '600' }}>
											{data.Collection.info.tittle}
										</Typography>
										<Typography sx={{ color: '#0168FF' }}>
											Minted by {userAdd && sliceAddress(userAdd, 8, 5)}
										</Typography>
									</Box>
									<Box>
										<Box sx={{ display: 'flex', width: '105px' }}>
											<img
												src={`${NETWORKINFO[currentChainId].image}`}
												// src={iconEth}
												alt="iconETH"
												style={{
													width: '20px',
													height: '24px',
													marginRight: '5px',
												}}
											/>
											<Typography sx={{ color: '#131740', width: '85px' }}>
												{data.Collection.info.price}{' '}
												{TOKEN_PAYMENT[currentChainId][0].symbol}
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
										<Typography sx={{ color: '#131740', width: '80px' }}>
											{data.Collection.info.price}{' '}
											{TOKEN_PAYMENT[currentChainId][0].symbol}
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
												mintNftItem(currentIdMint, amountBuy, data);
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
									<Typography>Confirm</Typography>
								)}
							</ButtonWhite>
						</Box>
					</Modal>
				</Fragment>
			)}
		</>
	);
};

export default React.memo(DropPage);
