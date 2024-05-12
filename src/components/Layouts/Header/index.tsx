/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment, useRef } from 'react';
// mui
import { Box, Stack, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//components
import MoreOptionList from 'components/Layouts/MoreOptionList';
import MainNavBar from '../MainNavBar';
import SwitchNetwork from '../SwitchNetwork';
import PlatformToken from '../PlatformToken';
import ConnectToWallet from '../ConnectToWallet';
import PersonalAccount from '../PersonalAccount';
//redux
import { useSelector } from 'react-redux';
import { selectAddress, setUserLogin } from 'redux/slices/web3InfoSlice';
import { selectUser } from 'redux/slices/userSlice';
//styled
import {
	AppbarHeader,
	FixedBottomHeader,
	LogoLink,
	MainNavBarWrapper,
	ModalClose,
	NotiBox,
	PageLogo,
} from './styled';
//models
import { User } from 'models';
//image
import LogoWhite from 'assets/NewSpaceLogo/HeaderLogoWhite.png';
import LogoMSGray from 'assets/NewSpaceLogo/HeaderLogoDark.png';
import LogoMSGrayMoblie from 'assets/NewSpaceLogo/HeaderLogoDarkMobo.png';
//

import { useLocation } from 'react-router-dom';
import { dispatch } from 'redux/store';
import { loginUser } from 'redux/actions/userAction';

const Header: React.FC = () => {
	let ref: any = useRef();
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';
	// useState
	const [isOpenWallet, setIsOpenWallet] = useState<any>(false);
	let [open, setOpen] = useState(true);
	let [background, setBackground] = useState(false);
	let [turnOfConnectWallet, setTurnOfConnectWallet] = useState(true);
	let [turnOfSwitchNetwork, setTurnOfSwitchNetwork] = useState(true);
	let [userAddress, setUserAddress] = useState<string>('');
	//Path
	const { pathname } = useLocation();

	// useSelector
	const address = useSelector(selectAddress);
	const userInfo: User | null = useSelector(selectUser);

	useEffect(() => {
		if (address) {
			setUserAddress(address);
			dispatch(setUserLogin(address?.toLowerCase()));
			dispatch(loginUser(address, '', '')); // not need call back because "login and sign back"
		}
	}, [address]);
	useEffect(() => {
		const onBodyClick = (event: any) => {
			event.stopPropagation();
			if (ref.current && !ref.current.contains(event.target)) {
				if (!turnOfConnectWallet) {
					setTurnOfConnectWallet(true);
				}
				if (!turnOfSwitchNetwork) {
					setTurnOfSwitchNetwork(true);
				}
			}
		};
		// Bind the event listener if dropdown is active
		if (!turnOfConnectWallet) {
			// console.log('clciked');
			document.body.addEventListener('click', onBodyClick, { passive: true });
		}
		if (!turnOfSwitchNetwork) {
			document.body.addEventListener('click', onBodyClick, { passive: true });
		}
		return () => {
			document.body.removeEventListener('click', onBodyClick);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [turnOfConnectWallet, turnOfSwitchNetwork]);
	useEffect(() => {
		// Handler to call on window scroll
		const handleScroll = () => {
			if (window.pageYOffset > 25) {
				setBackground(true);
			} else {
				setBackground(false);
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => window.removeEventListener('scroll', handleScroll);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<AppbarHeader
				position="fixed"
				color="transparent"
				elevation={0}
				background={background}
				className={background ? 'flurBackground' : ''}
			>
				<Box ref={ref}>
					<Stack
						direction="row"
						sx={{ justifyContent: 'flex-start', alignItems: 'center' }}
					>
						<PageLogo>
							<LogoLink
								href="/"
								sx={{
									img: {
										height: 50,
										minWidth: '211.65px',
										[theme.breakpoints.down(451)]: {
											minWidth: 'unset',
										},
									},
								}}
							>
								{isLightTheme ? (
									<img
										className="logoMobile"
										src={LogoMSGrayMoblie}
										alt="page logo"
									/>
								) : (
									<img
										className="logoMobile"
										src={LogoMSGrayMoblie}
										alt="page logo"
									/>
								)}

								{isLightTheme ? (
									<img
										loading="lazy"
										src={LogoWhite}
										alt="page logo"
										className="logoPC"
									/>
								) : (
									<img
										loading="lazy"
										// src={LogoMSWhite}
										src={LogoMSGray}
										alt="page logo"
										className="logoPC"
									/>
								)}
							</LogoLink>
						</PageLogo>

						<MainNavBarWrapper>
							<MainNavBar />
						</MainNavBarWrapper>

						<Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
							{address && userInfo && (
								<Fragment>
									{/* <AppearWrapper>
										<SwitchNetwork />
									</AppearWrapper>
									<AppearWrapper>
										<PlatformToken />
									</AppearWrapper> */}
								</Fragment>
							)}
							<ConnectToWallet
								setTurnOfConnectWallet={setTurnOfConnectWallet}
								turnOfConnectWallet={turnOfConnectWallet}
								setUserAddress={setUserAddress}
								setTurnOfSwitchNetwork={setTurnOfSwitchNetwork}
								turnOfSwitchNetwork={turnOfSwitchNetwork}
							/>
							{/* {!isHomePage && <ConnectToWallet />} */}
							{userAddress && (
								<PersonalAccount
									setTurnOfConnectWallet={setTurnOfConnectWallet}
									setTurnOfSwitchNetwork={setTurnOfSwitchNetwork}
								/>
							)}
							<MoreOptionList
								placementDropdown="bottom"
								setTurnOfConnectWallet={setTurnOfConnectWallet}
								setTurnOfSwitchNetwork={setTurnOfSwitchNetwork}
							/>
						</Box>
					</Stack>

					{!open && (
						<NotiBox>
							<Typography variant="body2">
								Metaspacecy is currently in alpha release which is only supported on
								BNB testnet.
							</Typography>

							<ModalClose onClick={() => setOpen(false)}>
								<CloseIcon
									sx={{
										fontSize: '1.5rem',
										cursor: 'pointer',
									}}
								/>
							</ModalClose>
						</NotiBox>
					)}
				</Box>
				{/* Fixed Header */}
			</AppbarHeader>
			{/* {address && userInfo && ( */}
			{false && userInfo && (
				<FixedBottomHeader>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="flex-end"
						spacing={1}
					>
						<PlatformToken />
						<SwitchNetwork />
						{/* <MoreOptionListBottom placementDropdown="bottom" /> */}
					</Stack>
				</FixedBottomHeader>
			)}
		</>
	);
};
export default React.memo(Header);
