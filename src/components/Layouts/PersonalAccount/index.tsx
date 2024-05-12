/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import { useWeb3React } from '@web3-react/core';
//redux
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserLogin } from 'redux/slices/web3InfoSlice';
import { logoutUser } from 'redux/actions/userAction';
import { selectAddress, selectBalance, selectChainId } from 'redux/slices/web3InfoSlice';
import { selectUser } from 'redux/slices/userSlice';
// styled
import {
	AccountContent,
	CloseButton,
	DrawerContent,
	DropDownContent,
	GradIcon,
	LinkItem,
	ListLink,
} from './styled';
//mui
import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//image

import FBSToken from 'assets/images/home/logo-fbs.webp';
import MSTToken from 'assets/icons/icon-meta.svg';
import AvatarWhite from 'assets/icons/icon-user-white1.svg';
import AvatarBlack from 'assets/icons/icon-user-black.svg';

//Img update
import IconUserWhite from 'assets/icons/NavBar/icon-user-white.svg';
import IconUserBlack from 'assets/icons/NavBar/icon-user-black.svg';
import IconHeartWhite from 'assets/icons/NavBar/icon-heart-white.svg';
import IconHeartBlack from 'assets/icons/NavBar/icon-heart-black.svg';
import IconEyeWhite from 'assets/icons/NavBar/icon-eye-white.svg';
import IconEyeBlack from 'assets/icons/NavBar/icon-eye-black.svg';
import IconCollectionWhite from 'assets/icons/NavBar/icon-collection-white.svg';
import IconCollectionBlack from 'assets/icons/NavBar/icon-collection-black.svg';
import IconSettingWhite from 'assets/icons/NavBar/icon-setting-white.svg';
import IconSettingBlack from 'assets/icons/NavBar/icon-setting-black.svg';
import IconLogoutWhite from 'assets/icons/NavBar/icon-logout-white.svg';
import IconLogoutBlack from 'assets/icons/NavBar/icon-logout-black.svg';

//model
import { User } from 'models';
//utils
import {
	erc20function,
	formatNumber,
	generateGrad,
	getInfoNetWorkByChainId,
	isSupportChainId,
	localStorageCustom,
} from 'utils';
//constants
import { CONTRACT, NULL_ADDRESS } from '../../../constants';
import { PATH_COLLECTION, PATH_PAGE } from 'routes/path';

//
const listOption = [
	{
		id: 1,
		title: 'Profile',
		iconWhite: IconUserWhite,
		iconBlack: IconUserBlack,
		link: `#${PATH_PAGE.user}`,
		iconHover: '',
		isClick: false,
		functionName: '',
	},
	{
		id: 2,
		title: 'Favorite',
		iconWhite: IconHeartWhite,
		iconBlack: IconHeartBlack,
		link: `#${PATH_PAGE.user}`,
		iconHover: '',
		isClick: false,
		functionName: '',
	},
	{
		id: 3,
		title: 'Watchlist',
		iconWhite: IconEyeWhite,
		iconBlack: IconEyeBlack,
		link: `#${PATH_PAGE.user}`,
		iconHover: '',
		isClick: false,
		functionName: '',
	},
	{
		id: 4,
		title: 'My Collections',
		iconWhite: IconCollectionWhite,
		iconBlack: IconCollectionBlack,
		link: `#${PATH_COLLECTION.myCollection}`,
		iconHover: '',
		isClick: false,
		functionName: '',
	},
	{
		id: 5,
		title: 'Settings',
		iconWhite: IconSettingWhite,
		iconBlack: IconSettingBlack,
		link: `#${PATH_PAGE.user}`,
		iconHover: '',
		isClick: false,
		functionName: '',
	},
];
interface Props1 {
	setTurnOfConnectWallet: React.Dispatch<React.SetStateAction<boolean>>;
	setTurnOfSwitchNetwork: React.Dispatch<React.SetStateAction<boolean>>;
}

const PersonalAccount: React.FC<Props1> = ({ setTurnOfConnectWallet, setTurnOfSwitchNetwork }) => {
	const ref: any = useRef(null);
	const theme = useTheme();
	const context = useWeb3React<Web3Provider>();
	const { deactivate } = context;
	let dispatch = useDispatch();
	const navigate = useNavigate();
	const isLightTheme = theme.palette.mode === 'light';

	//redux state
	const chainId = useSelector(selectChainId);
	const balance = useSelector(selectBalance);
	const address = useSelector(selectAddress);
	const userInfo: User | null = useSelector(selectUser);

	//state
	const [openDrawer, setOpenDrawer] = useState(false);
	const [platformBalance, setPlatformBalance] = useState<any>('0');
	const [mstBalance, setMstBalance] = useState<any>('0');
	const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);

	const [activeSelectOptionPer, setActiveSelectOptionPer] = useState(false);

	useEffect(() => {
		const onBodyClick = (event: any) => {
			event.stopPropagation();
			if (ref.current && !ref.current.contains(event.target)) {
				setActiveSelectOptionPer(false);
			}
		};
		// Bind the event listener if dropdown is active
		if (activeSelectOptionPer)
			document.body.addEventListener('click', onBodyClick, { passive: true });

		return () => {
			// Unbind the event listener on clean up
			document.body.removeEventListener('click', onBodyClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeSelectOptionPer]);

	const showOptionBoxPersional = () => {
		setTurnOfConnectWallet(true);
		setTurnOfSwitchNetwork(true);
		if (!activeSelectOptionPer) setActiveSelectOptionPer(true);
	};

	const isNotSupportNetwork = getInfoNetWorkByChainId(chainId)?.image === undefined;

	// useEffect
	// console.log('!isSupportChainId(chainId)', isSupportChainId(chainId));
	useEffect(() => {
		if (!chainId || !address) return;
		(async () => {
			try {
				if (!isSupportChainId(chainId)) {
					setPlatformBalance(0);
					return;
				} else {
					// flatFormCoin
					// const balanceWei = await erc20function().getBalanceOfUser(
					// 	address,
					// 	CONTRACT[chainId].FlatformCoin
					// );
					// const balanceToken = await erc20function().changeWeiToToken(
					// 	CONTRACT[chainId].FlatformCoin,
					// 	balanceWei
					// );
					// MST
					// const balanceWeiMST = await erc20function().getBalanceOfUser(
					// 	address,
					// 	CONTRACT[chainId].MetaSpacecyToken
					// );
					// const balanceMST = await erc20function().changeWeiToToken(
					// 	CONTRACT[chainId].MetaSpacecyToken,
					// 	balanceWeiMST
					// );
					// setPlatformBalance(formatNumber(balanceToken, 0, 3));
					// setMstBalance(balanceMST);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [address, chainId]);

	// function
	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		setOpenDrawer(open);
	};

	const handleLogout = () => {
		setIsLoadingLogout(true);
		dispatch(logoutUser(address!, executeAfterLogoutUser));
	};

	const executeAfterLogoutUser = (globalStateNewest: RootState) => {
		const { user } = globalStateNewest;
		if (!user.isSuccess) {
			toast.error('Logout failed! ' + user.errorMessage);
		} else {
			dispatch(removeUserLogin());
			deactivate();
			// Remove Local Storage
			if (address) localStorageCustom.removeAuthSignature(address);
			toast.success('You have been logged out successfully!');
			// navigate('/');
			toggleDrawer(false);
		}
		setIsLoadingLogout(false);
	};

	const handleChangePage = (page: string) => {
		navigate(page);
		setOpenDrawer(false);
	};

	const userAvatar = useMemo(() => {
		return (
			<GradIcon
				sx={{
					background: `${generateGrad(address ? address : NULL_ADDRESS)}`,
				}}
			/>
		);
	}, [address]);

	const renderListOption = () => {
		return listOption.map((section: any, index: number) => (
			<LinkItem
				key={index}
				href={section.link}
				onClick={(e: any) => {
					e.stopPropagation();
					setOpenDrawer(false);
				}}
			>
				<Box className="not-hovering">
					{isLightTheme ? (
						<img src={section.iconBlack} alt="icon user" width={18} height={18} />
					) : (
						<img src={section.iconWhite} alt="icon user" width={18} height={18} />
					)}
				</Box>

				{/* <Box className="hovering">
					<img src={IconUserBlue} alt="user icon" width={18} height={18} />
				</Box> */}

				<Typography fontStyle="italic" variant="body1">
					{section.title}
				</Typography>
			</LinkItem>
		));
	};

	return (
		<Fragment>
			{userInfo ? (
				<AccountContent>
					<Box
						sx={{
							borderRadius: '50%',
							cursor: 'pointer',
							...(theme.palette.mode === 'light'
								? {
										background: theme.palette.primaryLight.lighter,
										boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
								  }
								: {
										background: theme.palette.primaryDark.backgroundCard,
								  }),
						}}
						onClick={showOptionBoxPersional}
					>
						{/* {userInfo.avatar ? (
							userInfo.avatar ===
							'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' ? (
								// <Avatar
								// 	src="/astronaut.webp"
								// alt="astronaut"
								// 	sx={{ width: '30px', height: '30px' }}
								// />
								<Box sx={{ width: '30px', height: '30px' }}>{userAvatar}</Box>
							) : (
								<Avatar
									src={userInfo.avatar}
									sx={{ width: '30px', height: '30px' }}
									alt="user avatar"
								/>
							)
						) : (
							<Box sx={{ width: '30px', height: '30px' }}>{userAvatar}</Box>
						)} */}
						<Avatar
							src={isLightTheme ? AvatarBlack : AvatarWhite}
							sx={{
								width: '34px',
								height: '34px',
								img: {
									width: '12px',
									height: '16px',
								},
								'&.color': {
									...(theme.palette.mode === 'light'
										? {
												background: theme.palette.primaryLight.lighter,
												boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
										  }
										: {
												// backgroundColor: theme.palette.primary.main,
												backgroundColor: '#89AED0',
										  }),
								},
							}}
							className={activeSelectOptionPer ? 'color' : ''}
							alt="user avatar"
						/>
					</Box>

					<DropDownContent
						ref={ref}
						sx={{
							top: 0,
							[theme.breakpoints.down(400)]: {
								right: '-40px',
							},
						}}
						className={activeSelectOptionPer ? 'active' : ''}
					>
						<DrawerContent>
							{/* <CloseButton onClick={toggleDrawer(false)}>
								<CloseIcon />
							</CloseButton> */}

							<Box sx={{ height: '100%', position: 'relative' }}>
								<Stack spacing={2}>
									<Stack spacing={1} direction="row" alignItems="center">
										{userInfo.avatar ? (
											userInfo.avatar ===
											'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' ? (
												// <Avatar
												// 	src="/astronaut.webp"
												// alt = "astronaut"
												// 	sx={{ width: '50px', height: '50px' }}
												// />
												<Box sx={{ width: '50px', height: '50px' }}>
													{userAvatar}
												</Box>
											) : (
												<Avatar
													src={userInfo.avatar}
													sx={{ width: '50px', height: '50px' }}
													alt="user avatar"
												/>
											)
										) : (
											<Box sx={{ width: '50px', height: '50px' }}>
												{userAvatar}
											</Box>
										)}
										<Box>
											<Typography variant="body1" fontStyle="italic">
												{address?.substring(0, 10)} ...{' '}
												{address?.substring(37, address.length + 1)}{' '}
											</Typography>
										</Box>
									</Stack>

									{/* <DividerGradient /> */}

									<Stack sx={{ width: '100%' }} spacing={1}>
										<Typography
											fontStyle="italic"
											sx={{ fontWeight: 500, pb: 1 }}
										>
											Balance
										</Typography>
										{/* Native coin/hide not support network */}
										{isNotSupportNetwork ? (
											<></>
										) : (
											<Stack
												direction="row"
												alignItems="center"
												justifyContent="space-between"
											>
												<Stack
													direction="row"
													alignItems="center"
													spacing={1}
												>
													<img
														src={
															getInfoNetWorkByChainId(chainId)?.image
														}
														alt={
															getInfoNetWorkByChainId(chainId)?.symbol
														}
														width={22}
														height={22}
													/>
													<Typography fontStyle="italic">
														{getInfoNetWorkByChainId(chainId)?.symbol}
													</Typography>
												</Stack>

												<Typography fontStyle="italic">
													{balance.toString().substring(0, 5)}{' '}
													{getInfoNetWorkByChainId(chainId)?.symbol}
												</Typography>
											</Stack>
										)}

										{/* Platform */}
										{/* <Stack
											direction="row"
											alignItems="center"
											justifyContent="space-between"
										>
											<Stack direction="row" alignItems="center" spacing={1}>
												<img
													src={FBSToken}
													alt="fbs icon"
													width={22}
													height={22}
												/>
												<Typography fontStyle="italic">FBS</Typography>
											</Stack>

											<Typography fontStyle="italic">
												{formatNumber(String(platformBalance), 0, 3)} FBS
											</Typography>
										</Stack> */}
										{/* TESTNET TOKEN */}
										<Stack
											direction="row"
											alignItems="center"
											justifyContent="space-between"
											display="none"
										>
											<Stack direction="row" alignItems="center" spacing={1}>
												<img
													src={MSTToken}
													alt="MST"
													width={22}
													height={22}
												/>
												<Typography fontStyle="italic">MST</Typography>
											</Stack>

											<Typography fontStyle="italic">
												{formatNumber(String(mstBalance), 0, 3)} MST
											</Typography>
										</Stack>
									</Stack>

									{/* <DividerGradient /> */}
									{/* ASSETS AND ADD ITEMS */}
									{/* <Stack sx={{ width: '100%' }} spacing={1}>
										<Typography sx={{ fontWeight: 500, pb: 1 }}>
											Assets
										</Typography>
										<Stack
											direction="row"
											alignItems="center"
											justifyContent="space-between"
										>
											<Stack direction="row" alignItems="center" spacing={1}>
												<Typography>
													Total items: {userInfo.totalItems}
												</Typography>
											</Stack>

											<Box>
												<ButtonGrey
													onClick={() => {
														setOpenDrawer(false);
														navigate(PATH_ITEM.createItem);
													}}
												>
													<AddIcon></AddIcon>
												</ButtonGrey>
											</Box>
										</Stack>
									</Stack> */}

									{/* <DividerGradient /> */}

									<ListLink spacing={2} pl={2}>
										{renderListOption()}
										<LinkItem
											href="#"
											onClick={(e: any) => {
												handleLogout();
												e.preventDefault();
											}}
										>
											<Box className="not-hovering">
												{isLightTheme ? (
													<img
														src={IconLogoutBlack}
														alt="icon user"
														width={18}
														height={18}
													/>
												) : (
													<img
														src={IconLogoutWhite}
														alt="icon user"
														width={18}
														height={18}
													/>
												)}
											</Box>

											{/* <Box className="hovering">
												<img src={IconUserBlue} alt="user icon" width={18} height={18} />
											</Box> */}

											<Typography fontStyle="italic" variant="body1">
												Logout
											</Typography>
										</LinkItem>
									</ListLink>
								</Stack>
								{/* LOGOUT BUTTON */}
								{/* <Box sx={{ pt: 3 }}>
									<ButtonGrey onClick={handleLogout} disabled={isLoadingLogout}>
										{isLoadingLogout && (
											<CircularProgress sx={{ color: 'white' }} size={16} />
										)}
										<Typography variant="body1" sx={{ ml: 2 }} component="span">
											Logout
										</Typography>
									</ButtonGrey>
								</Box> */}
							</Box>
						</DrawerContent>
					</DropDownContent>
				</AccountContent>
			) : null}
		</Fragment>
	);
};

export default React.memo(PersonalAccount);
