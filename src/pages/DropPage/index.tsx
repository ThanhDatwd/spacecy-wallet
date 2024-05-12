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

const listActive = [
	{
		id: 1,
		image: drop7,
		title: 'BOARC | ART OF BAMBOO',
		creater: 'Hoang Long',
		totalNFT: '100',
		availableNFT: '99',
		price: '0,06',
		owner: '1000',
		totalSales: '110.85',
		status: true,
		linkDrop: `#${PATH_DROP.boarc}`,
	},
	{
		id: 2,
		image: drop8,
		title: 'Artstation ',
		creater: 'Lazy',
		totalNFT: '100',
		availableNFT: '99',
		price: '0,06',
		owner: '1000',
		totalSales: '110.85',
		status: true,
		linkDrop: '',
	},
	{
		id: 3,
		image: drop9,
		title: 'Dope Spacecy',
		creater: 'alyxbow',
		totalNFT: '100',
		availableNFT: '99',
		price: '0,06',
		owner: '1000',
		totalSales: '110.85',
		status: false,
		linkDrop: '',
	},
];

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
declare let window: any;
const DropPage: React.FC = () => {
	const navigate = useNavigate();
	const web3 = new Web3(Web3.givenProvider);
	const [step1, setStep1] = useState<StepStatus>(initialStepStatus);
	const [modalConfirm, setModalConfirm] = useState(false);
	const [collectionInfo, setCollectionInfo] = useState<Collection>();
	const [feeMintWei, setFeeMint] = useState('');
	const [feeMintToken, setFeeMintToken] = useState('');
	const [maxSupply, setMaxSupply] = useState(0);
	const [totalSupplied, setTotalSupplied] = useState(0);
	const [currentOwner, setCurrentOwner] = useState(0);
	const [didMinted, setDidMinted] = useState(false);
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const theme = useTheme();
	const userAdd = useSelector(selectAddress);
	const currentChainId = useSelector(selectChainId);
	let atomicMatchReceipt: any = {};
	let tracsactionHash: string;
	let itemTokenId: number;
	let nftData: NftMint;
	let dataUrl: string;
	const contractMetaSpacecyDrop = getWeb3Contract(
		BoarcDrop.abi,
		CONTRACT[currentChainId].BoarcDrop
	);
	const isFirstRender = useRef(true);
	const collectionUrl = `${API_ENDPOINT}collections/detail/collectionId/${envCollectionIdToChainId[currentChainId]}`; //test
	//function
	// console.log(envCollectionIdToChainId[currentChainId]);
	const isConnectWallet = async () => {
		// await web3.eth.accounts;
		await window.ethereum
			.request({ method: 'eth_accounts' })
			.then(async (accounts: any) => {
				if (accounts.length === 0) {
					await window.ethereum
						.request({ method: 'eth_requestAccounts' })
						.then((res: any) => {
							toast.success('wallet connect successfully');
							setModalConfirm(true);
						})
						.catch(async (error: any) => {
							if (error.code === 4001) {
								console.log('Please connect to MetaMask.');
								toast.warning('please connect your wallet to continue');
								await window.ethereum
									.request({ method: 'eth_requestAccounts' })
									.then((res: any) => {
										toast.success('wallet connect successfully');
										setModalConfirm(true);
									});
							} else {
								console.error(error);
								// toast.error('something when wrong!');
							}
						});
				} else {
					setModalConfirm(true);
					return;
				}
			})
			.catch((error: any) => {
				console.log(error);
			});
	};
	const getCollectionDropInfo = async () => {
		if (envCollectionIdToChainId[currentChainId]) {
			await axiosClient
				.get(collectionUrl)
				.then(({ data }: any) => {
					// console.log('fecth didiid');
					// console.log(data);
					setCollectionInfo(data);
				})
				.catch((error: any) => {
					console.log(error);
				});
		}
	};
	const getCurrentOwner = async () => {
		await contractMetaSpacecyDrop.methods
			.whiteList()
			.call()
			.then((res: any) => {
				setCurrentOwner(res.length);
			})
			.catch((error: any) => {
				console.log(error);
			});
	};
	const getMaxSupply = async () => {
		await contractMetaSpacecyDrop.methods
			.maxSupply()
			.call()
			.then((res: any) => {
				// console.log(res);
				setMaxSupply(res);
			})
			.catch((error: any) => {
				console.log(error);
			});
	};
	const getTotalSupplied = async () => {
		await contractMetaSpacecyDrop.methods
			.totalSupply()
			.call()
			.then((res: any) => {
				setTotalSupplied(res);
			})
			.catch((error: any) => {
				console.log(error);
			});
	};
	const getFeeMint = async () => {
		await contractMetaSpacecyDrop.methods
			.feeMint()
			.call()
			.then((res: any) => {
				setFeeMint(res);
			})
			.catch((error: any) => {
				console.log(error);
			});
	};
	const changeWeiToToken = async (price: string) => {
		const bigNumber: BigNumber = BigNumber.from(price);
		const result: string = formatUnits(bigNumber.toString(), 18);
		setFeeMintToken(result);
	};
	const mintNftItem = async () => {
		setStep1({ isCompleted: false, isExecuting: true });
		await contractMetaSpacecyDrop.methods
			.safeMint()
			.send({ from: userAdd, value: feeMintWei })
			.then((receipt: any) => {
				atomicMatchReceipt = receipt;
				tracsactionHash = atomicMatchReceipt.transactionHash;
				itemTokenId = atomicMatchReceipt.events.Minted.returnValues.tokenId;
			})
			.catch((error: any) => {
				console.log(error);
			});
		if (itemTokenId && tracsactionHash) {
			await contractMetaSpacecyDrop.methods
				.tokenURI(10)
				.call()
				.then((res: any) => {
					dataUrl = res;
				})
				.catch((error: any) => {
					console.log(error);
				});
			await axiosClient
				.get(dataUrl)
				.then((infoNft: any) => {
					if (collectionInfo) {
						nftData = {
							chainId: collectionInfo.chainId,
							collectionId: collectionInfo._id,
							price: feeMintWei,
							priceType: 'eth',
							external_url: '',
							quantity: 1,
							creator: collectionInfo.userAddress,
							itemTokenId: itemTokenId,
							itemName: infoNft.name,
							description: infoNft.description,
							itemMedia: infoNft.image,
							itemPreviewMedia: infoNft.image,
							itemOriginMedia: infoNft.image,
							properties: '',
							userAddress: userAdd,
							metadata: dataUrl,
							txHash: tracsactionHash,
							standard: 'TEST',
						};
					}
				})
				.catch((error: any) => {
					console.log(error);
				});
			await axiosClient
				.post(`${API_ENDPOINT}items/drop`, nftData)
				.then((res) => {
					// console.log(res);
					setStep1({ isCompleted: true, isExecuting: false });
					setDidMinted(true);
				})
				.catch((error: any) => {
					console.log('error ', error);
				});
		} else {
			return;
		}
	};
	const closeModal = () => {
		setModalConfirm(false);
	};
	//useEffect

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// console.log(collectionUrl);
		getCollectionDropInfo();
		getMaxSupply();
		getFeeMint();
		getTotalSupplied();
		getCurrentOwner();
	}, [envCollectionIdToChainId[currentChainId], userAdd]);
	useEffect(() => {
		if (feeMintWei) {
			changeWeiToToken(feeMintWei);
		}
	}, [feeMintWei]);
	return (
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
						px: 1,
					},
				}}
			>
				<Box
					sx={{
						mt: '98px',
						mb: 4,
						img: {
							width: '100%',
						},
						[theme.breakpoints.down(500)]: {
							mb: 0,
						},
					}}
				>
					<img src={BannerDrop} alt="banner" />
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
												`${PATH_COLLECTION.detail}/${envCollectionIdToChainId[currentChainId]}`
											);
										}}
										sx={{ cursor: 'pointer' }}
									>
										BOARC | ART OF BAMBOO
									</Typography>
									<Box
										sx={{
											fontSize: '24px',
											[theme.breakpoints.down(1050)]: {
												fontSize: '18px',
											},
										}}
									>
										Created by{' '}
										{collectionInfo && collectionInfo.ownerInfo.username}
									</Box>
								</DropTitle>
							</Stack>
							<Stack direction="row" gap="50px" flexWrap="wrap">
								<StackItem>
									<Typography variant="h6" color="#5A5D79" textAlign="center">
										Available NFTs
									</Typography>
									<p>
										{maxSupply - totalSupplied} <span>/{maxSupply}</span>
									</p>
								</StackItem>
								<StackItem>
									<Typography variant="h6" color="#5A5D79" textAlign="center">
										Price
									</Typography>
									<p>
										{feeMintToken}{' '}
										<span>{TOKEN_PAYMENT[currentChainId][0].symbol}</span>
									</p>
								</StackItem>
								<StackItem>
									<Typography variant="h6" color="#5A5D79" textAlign="center">
										Owners
									</Typography>
									<p>{currentOwner}</p>
								</StackItem>
								<StackItem>
									<Typography variant="h6" color="#5A5D79" textAlign="center">
										Total sales
									</Typography>
									<p>
										{(Number(feeMintToken) * 10 * totalSupplied * 10) / 100}{' '}
										<span>{TOKEN_PAYMENT[currentChainId][0].symbol}</span>
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
								Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
								molestie consequat, vel illum dolore eu feugiat nulla facilisis at
								vero eros et accumsan et iusto odio
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
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
								nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
								volutpat.
							</Box>
							{/* <Box
								sx={{
									width: 'fit-content',
									margin: '12px auto 0px auto',
									a: {
										'&:hover': {
											textDecoration: 'none',
										},
										button: {
											width: 'fit-content	',
											mx: 'auto',
										},
									},
								}}
							>
								<Link href={`#${PATH_BOARC.root}`}>
									<ButtonWhite>View Info</ButtonWhite>
								</Link>
							</Box> */}
						</ContentLeft>
						<ContentRight>
							<ContentButton sx={{ justifyContent: 'center' }}>
								<TwitterShareButton
									url={`${RELATED_URLS.MetaSpacecyHomePage}/#${PATH_DROP.root}`}
									title={
										collectionInfo &&
										`Look what I found! ${collectionInfo?.collectionName} collectible`
									}
									hashtags={['Art', 'NFT']}
									via="MetaSpacecy"
								>
									<ButtonWhite sx={{ width: 'fit-content' }}>Share</ButtonWhite>
								</TwitterShareButton>
							</ContentButton>
							<Item>
								<Typography variant="h5" fontWeight="600">
									Early Access
								</Typography>
								<p>
									Oct 9, 3:00 AM - {feeMintToken}
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
									Dec 3 , 12 :00 AM - {feeMintToken}{' '}
									{TOKEN_PAYMENT[currentChainId][0].symbol}
								</p>
							</Item>
							<Item>
								<Typography variant="h5" fontWeight="600">
									Links
								</Typography>
								<SocialWrap>
									{ListSocialMedia.map((item: any, index: number) => (
										<SocialIconLink
											href={`${item.link}`}
											key={index}
											target="_blank"
										>
											{/* <TwitterShareButton
												url={`${RELATED_URLS.MetaSpacecyHomePage}/#${PATH_DROP.root}`}
												title={
													collectionInfo &&
													`Look what I found! ${collectionInfo?.collectionName} collectible`
												}
												hashtags={['Art', 'NFT']}
												via="MetaSpacecy"
											>
												<img
													style={{ width: '100%', height: '100%' }}
													// src={isLightTheme ? item.iconBlack : item.iconWhite}
													src={item.iconBlack}
													alt={item.title}
												/>
											</TwitterShareButton> */}
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
											src={collectionInfo && collectionInfo.ownerInfo.avatar}
											alt="avatar"
										/>
										<Info>
											<Link
												href={
													collectionInfo &&
													`#${PATH_PAGE.otherUser}/${collectionInfo.ownerInfo.userAddress}`
												}
											>
												<Typography fontSize="16px" fontWeight="700">
													{collectionInfo &&
														collectionInfo.ownerInfo.username}
												</Typography>
											</Link>
											<Box sx={{ display: 'flex', gap: '5px' }}>
												@artofbamboo <img src={IconVerify} alt="icon add" />
											</Box>
											<p>2k followers</p>
										</Info>
									</Avatar>
									{/* <AddFr>
										<img src={IconAdd} alt="icon add" />
									</AddFr> */}
								</Creator>
							</Item>
						</ContentRight>
					</DropContent>
				</Box>
			</Box>
			<Box sx={{ background: '#fff' }}>
				<Box
					maxWidth={MaxWidth}
					mx="auto"
					px={4}
					py={4}
					fontStyle="italic"
					sx={{
						background: '#fff',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
				>
					<Box mb={4}>
						<Typography variant="h2" fontWeight={600} textAlign="center">
							NFTs
						</Typography>
					</Box>
					<Stack gap="32px">
						{listActive.map((item) => {
							return (
								<Stack key={item.id} direction="row" gap="32px" alignItems="center">
									<Box
										sx={{
											width: '50%',
											img: {
												borderRadius: '12px',
												minHeight: '400px',
												objectFit: 'cover',
												objectPosition: 'center',
											},
										}}
									>
										<img src={item.image} alt={item.title} />
									</Box>
									<Box sx={{ width: '50%' }}>
										<Typography variant="h3" fontWeight="600">
											{item.title}
										</Typography>
										<Typography variant="h4" fontWeight="500">
											Cteated by {item.creater}
										</Typography>
										<Stack direction="row" gap={5} mt={1}>
											<StackItem>
												<Typography variant="h6" textAlign="center">
													Available NFTs
												</Typography>
												<p>
													{item.availableNFT}{' '}
													<span>/ {item.totalNFT}</span>
												</p>
											</StackItem>
											<StackItem>
												<Typography variant="h6" textAlign="center">
													Price
												</Typography>
												<p>
													{item.price} <span>ETH</span>
												</p>
											</StackItem>
										</Stack>
										<Box
											sx={{
												mt: 2,
												width: '100%',
												button: {
													width: 'fit-content',
													mx: 'auto',
												},
											}}
										>
											<ButtonWhite>Mint Now</ButtonWhite>
										</Box>
									</Box>
								</Stack>
							);
						})}
					</Stack>
				</Box>
			</Box>

			<Modal
				onOpen={modalConfirm}
				allowClose={true}
				onClose={() => {
					setModalConfirm(false);
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
									{collectionInfo && collectionInfo?.collectionName}
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
										{feeMintToken} {TOKEN_PAYMENT[currentChainId][0].symbol}
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
									style={{ width: '20px', height: 'auto', marginRight: '5px' }}
								/>{' '}
								<Typography sx={{ color: '#131740' }}>
									{feeMintToken} {TOKEN_PAYMENT[currentChainId][0].symbol}
								</Typography>
							</Box>
						</Box>
					</Box>

					<ButtonWhite
						sx={{ margin: '20px auto', width: '50%' }}
						onClick={didMinted ? closeModal : mintNftItem}
					>
						{step1.isExecuting && !step1.isCompleted ? (
							<CircularProgress sx={{ color: 'black', mr: 1 }} size={16} />
						) : step1.isCompleted && !step1.isExecuting ? (
							<Typography sx={{ color: '#131740' }}>Congratulation</Typography>
						) : (
							!step1.isCompleted &&
							!step1.isExecuting && (
								<Typography sx={{ color: '#131740' }}>Confirm</Typography>
							)
						)}
					</ButtonWhite>
				</Box>
			</Modal>
		</Fragment>
	);
};

export default React.memo(DropPage);
