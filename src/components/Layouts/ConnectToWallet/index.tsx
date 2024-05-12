/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, Fragment, useRef, Props, FC } from 'react';
// connect wallet

// lib
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
//
import { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect, useInactiveListener } from 'hooks/useConnector';
// redux
import { useDispatch, useSelector } from 'react-redux';
// slices
import { selectConnectModal, setConnectModal } from 'redux/slices/modalSlice';
import {
	setBalanceUser,
	setChainId,
	setUserLogin,
	selectAddress,
	selectBalance,
	selectChainId,
	setCurrentProvider,
} from 'redux/slices/web3InfoSlice';
import { selectLoading, selectSuceess, selectUser } from 'redux/slices/userSlice';
//constants
import {
	connectorsByName,
	listWallet,
	listWalletAvailable,
	RELATED_URLS,
} from '../../../constants';
// mui
import { Box, Stack, Typography, useTheme } from '@mui/material';

// styled
import {
	Initializing,
	ConnectWalletContainer,
	ConfirmBox,
	WalletItem,
	WalletName,
	WalletImage,
	DropDownContent,
} from './styled';
//model
import { User } from 'models';

//Image
import WalletWhite from 'assets/icons/icon-connect-white.svg';
import WalletBlack from 'assets/icons/icon-connect-black.svg';
import SwitchNetworkNew from '../SwitchNetworkNew';
import { LinkWrapper } from 'components/CustomUI/Card/NFTItemCard/styled';
import IconNextWhite from 'assets/icons/icon-next-white.svg';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import { loginUser } from 'redux/actions/userAction';
export interface WalletProps {
	name: string;
	image: string;
}
// export interface SetIsOpenWalletProps {
// 	setIsOpenWallet: any;
// }
declare let window: any;
interface Props0 {
	turnOfConnectWallet: boolean;
	setTurnOfConnectWallet: React.Dispatch<React.SetStateAction<boolean>>;
	setUserAddress: React.Dispatch<React.SetStateAction<string>>;
	turnOfSwitchNetwork: boolean;
	setTurnOfSwitchNetwork: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConnectToWallet: React.FC<Props0> = ({
	turnOfConnectWallet,
	setTurnOfConnectWallet,
	setUserAddress,
	setTurnOfSwitchNetwork,
	turnOfSwitchNetwork,
}) => {
	const ref: any = useRef(null);
	const ref1: any = useRef(null);
	const context = useWeb3React<Web3Provider>();
	const theme = useTheme();
	let { connector, library, activate, error, account } = context; // can not get "account, chainId" here because this lib not recognize every chainId
	let dispatch = useDispatch();
	const isLightTheme = theme.palette.mode === 'light';

	//state
	const [activatingConnector, setActivatingConnector] = useState<any>();
	const [modalInfoAddress, setModalInfoAddress] = useState(false);
	const [isOpenTooltipCopy, setIsOpenTooltipCopy] = useState(false);
	const [checked, setChecked] = useState<boolean>(true);
	const [confirm, setConfirm] = useState<boolean>(false);
	const [activating, setActivating] = useState(false);
	const [errorConnect, setErrorConnect] = useState<any>();
	const [wallet, setWallet] = useState<WalletProps>({
		name: 'Metamask',
		image: '/metamask.png',
	});
	//
	const web3 = new Web3(Web3.givenProvider);

	// Drawer

	const [openDrawer, setOpenDrawer] = useState(false);

	// selector
	const userAddress = useSelector(selectAddress);
	const balanceUser = useSelector(selectBalance);
	const chainIdState = useSelector(selectChainId);
	const onOpenConnectModal = useSelector(selectConnectModal);
	const userInfo: User | null = useSelector(selectUser);
	const isLoadingLogin = useSelector(selectLoading);
	const isSuccess = useSelector(selectSuceess);
	//
	const [openModalBack, setOpenModelBack] = useState<boolean>(false);
	///

	const [activeSelectOption1, setActiveSelectOption1] = useState(false);
	//

	// useEffect

	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined);
		}
	}, [activatingConnector, connector]);

	useEffect(() => {
		if (userAddress) {
			setActivating(false);
			dispatch(setConnectModal(false));
		}
	}, [dispatch, userAddress]);

	// check balance of account
	useEffect(() => {
		if (userAddress && library) {
			library.getBalance(userAddress).then((balance: any) => {
				dispatch(setBalanceUser(formatEther(balance.toString())));
			});
		}
	}, [userAddress, dispatch, library]);

	useEffect(() => {
		if (isOpenTooltipCopy) {
			let id = setTimeout(() => {
				setIsOpenTooltipCopy(false);
			}, 500);
			return () => clearTimeout(id);
		}
	}, [isOpenTooltipCopy]);

	// set errorConnect
	useEffect(() => {
		if (userInfo) autoHide();
		setErrorConnect(error);
	}, [activeSelectOption1, error]);

	// functions
	// handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
	const triedEager = useEagerConnect();

	// handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
	useInactiveListener(!triedEager || !!activatingConnector);

	// Connect wallet function
	const handleConnectWallet = async (name: string, image: string, connector: any) => {
		setWallet({
			name,
			image,
		});
		// toggleDrawer(false);
		dispatch(setConnectModal(false));
		setOpenModelBack(true);

		try {
			if (userAddress) {
				setActivating(false);
			} else {
				const userAddressArr: string[] = await web3.eth.getAccounts();
				const userAddress = userAddressArr[0];
				if (!userAddress) {
					setActivating(true);
					await activate(connector);

					// if (name === 'Metamask') {
					// 	// await window.ethereum.request({ method: 'eth_requestAccounts' });
					// } else {
					// 	await activate(connector);
					// }

					const userAddressArr: string[] = await web3.eth.getAccounts();
					const userAddress = userAddressArr[0];
					dispatch(setUserLogin(userAddress?.toLowerCase()));
					setOpenModelBack(false);
					// console.log('send user address to redux store', userAddress);
				} else {
					// console.log('send user address to redux store', userAddress);
					dispatch(setUserLogin(userAddress?.toLowerCase()));
				}
			}
		} catch (error) {
			setErrorConnect(undefined);
			console.log(error);
		}
	};

	const handleConnectAgain = async () => {
		setErrorConnect(undefined);
		const currentWallet = listWalletAvailable.find((w) => w.name === wallet.name);
		if (currentWallet)
			await handleConnectWallet(
				currentWallet?.name,
				currentWallet?.image,
				currentWallet?.connector
			);
	};

	// Modal handler
	const onCloseModalConnect = () => {
		dispatch(setConnectModal(false));

		setActivating(false);
		setConfirm(false);
	};

	const onCloseModalInitilizaing = () => {
		dispatch(setConnectModal(false));
		setActivating(false);
		setConfirm(false);
	};
	// Drawer

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		dispatch(setConnectModal(false));
		setOpenDrawer(open);
		setActivating(false);
		setConfirm(false);
	};

	const toggleDrawerBack = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		setOpenModelBack(false);
	};

	//Render
	const renderListWallet = () => {
		return listWalletAvailable.map((wallet: any, index: number) => {
			// const isMetamask = window.ethereum && window.ethereum.isMetaMask;
			// console.log('connector', wallet.connector);
			// check for mobile options
			// if (isMobile) {
			// 	//disable portis on mobile for now
			// 	if (wallet.name === 'Portis') {
			// 		return null;
			// 	}

			// 	return (
			// 		<WalletItem
			// 			key={index}
			// 			onClick={() =>
			// 				handleConnectWallet(wallet.name, wallet.image, wallet.connector)
			// 			}
			// 		>
			// 			<WalletImage>
			// 				<img src={wallet.image} alt={wallet.name} />
			// 			</WalletImage>

			// 			<WalletName>{wallet.name}</WalletName>
			// 		</WalletItem>
			// 	);
			// }

			if (wallet.connector === connectorsByName.Injected) {
				//check is metamask
				if (!(window.web3?.isMetaMask || window.ethereum?.isMetaMask)) {
					if (wallet.name === 'Metamask') {
						return (
							<WalletItem key={index}>
								<a
									href="https://metamask.io"
									target="_blank"
									rel="noreferrer noopener"
								>
									<WalletImage>
										<img src={wallet.image} alt={wallet.name} />
									</WalletImage>

									<WalletName>Install {wallet.name}</WalletName>
								</a>
							</WalletItem>
						);
					}
					// // don't return metamask if injected provider isn't metamask
					// else if (wallet.name === 'Metamask' && !isMetamask) {
					// 	return null;
					// }
					// // likewise for generic
					// else if (wallet.name === 'Injected' && isMetamask) {
					// 	return null;
					// }
				}
			} else if (wallet.connector === connectorsByName.Coinbase) {
				//don't show injected if there's no injected provider
				if (!window.ethereum?.overrideIsMetaMask) {
					if (wallet.name === 'Coinbase') {
						return (
							<WalletItem key={index}>
								<a
									href="https://www.coinbase.com/wallet/downloads"
									target="_blank"
									rel="noreferrer noopener"
								>
									<WalletImage>
										<img src={wallet.image} alt={wallet.name} />
									</WalletImage>
									<WalletName>Install {wallet.name}</WalletName>
								</a>
							</WalletItem>
						);
					}
					// } else {
					// 	return null; //dont want to return install twice
					// }
				}
			} else if (wallet.connector === connectorsByName.WalletConnect) {
				//don't show injected if there's no injected provider
				if (!window.ethereum?.isWalletConnect) {
					if (wallet.name === 'WalletConnect') {
						return (
							<WalletItem key={index}>
								<a
									href="https://explorer.walletconnect.com/?type=wallet"
									target="_blank"
									rel="noreferrer noopener"
								>
									<WalletImage>
										<img src={wallet.image} alt={wallet.name} />
									</WalletImage>
									<WalletName>Install {wallet.name}</WalletName>
								</a>
							</WalletItem>
						);
					} else {
						return null; //dont want to return install twice
					}
				}
			}

			// return rest of options
			return (
				<Box
					my={1}
					key={index}
					sx={{ cursor: 'pointer', userSelect: 'none' }}
					onClick={() => {
						handleConnectWallet(wallet.name, wallet.image, wallet.connector);
						showOptionBox1();
					}}
				>
					<Stack direction="row" justifyContent="space-between" alignItems="center">
						<Stack direction="row" gap={1} alignItems="center">
							<img
								style={{
									width: '48px',
									height: '48px',
								}}
								src={wallet.image}
								alt={wallet.name}
							/>

							<Typography fontStyle="italic">{wallet.name}</Typography>
						</Stack>
						<Box>
							<img src={IconNextWhite} alt="next" />
						</Box>
					</Stack>
				</Box>
			);
		});
	};

	const loadWeb3 = async () => {
		const provider = await detectEthereumProvider({ timeout: 1000 });
		if (provider === window.ethereum) {
			if (window.ethereum && window.ethereum.isMetaMask) {
				// console.log('123');
				dispatch(setCurrentProvider(new Web3(window.ethereum)));
			} else if (window.web3) {
				// console.log('456');
				dispatch(setCurrentProvider(new Web3(window.web3.currentProvider)));
			}
		} else {
			dispatch(setChainId(97));
		}
	};

	// Model

	useEffect(() => {
		const onBodyClick = (event: any) => {
			event.stopPropagation();
			if (ref1.current && !ref1.current.contains(event.target)) {
				setActiveSelectOption1(false);
			}
		};

		// Bind the event listener if dropdown is active
		if (activeSelectOption1 || onOpenConnectModal)
			document.body.addEventListener('click', onBodyClick, { passive: true });
		// handleWalletConnect(userAddress);

		return () => {
			// Unbind the event listener on clean up
			document.body.removeEventListener('click', onBodyClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeSelectOption1]);

	const showOptionBox = () => {
		setTurnOfConnectWallet(!turnOfConnectWallet);
	};

	const showOptionBox1 = () => {
		// setTurnOfConnectWallet(!turnOfConnectWallet);
		setTurnOfConnectWallet(true);
		if (!activeSelectOption1) setActiveSelectOption1(true);
	};
	const showSwitchNetworkBox = () => {
		setTurnOfSwitchNetwork(!turnOfSwitchNetwork);
	};
	const autoHide = () => {
		setActiveSelectOption1(false);
		setTurnOfConnectWallet(true);
	};
	return (
		<Fragment>
			<Box position="relative">
				{!userInfo ? (
					<ConnectWalletContainer
						onClick={() => {
							// loadWeb3();
							// dispatch(setConnectModal(true));
							showOptionBox();
						}}
					>
						<Box
							className={!turnOfConnectWallet || activeSelectOption1 ? 'color' : ''}
							sx={{
								bottom: '12px',
								width: '34px',
								height: '34px',
								cursor: 'pointer',
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								backdropFilter: 'blur(2px)',
								borderRadius: '50%',
								...(theme.palette.mode === 'light'
									? {
											background: theme.palette.primaryLight.lighter,
											boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
									  }
									: {
											background: theme.palette.primaryDark.backgroundCard,
									  }),
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
						>
							{/* {isLoadingLogin ? (
								<>
									<CircularProgress
										sx={{ color: isLightTheme ? 'black' : 'white' }}
										size={16}
									/>
								</>
							) : ( */}
							<Box
								sx={{
									img: {
										width: '14px',
										height: '100%',
									},
								}}
							>
								<img src={isLightTheme ? WalletBlack : WalletWhite} alt="Wallet" />
							</Box>
							{/* )} */}
						</Box>
					</ConnectWalletContainer>
				) : (
					// <ConnectWalletContainer onClick={() => setModalInfoAddress(true)}>
					// 	<Stack
					// 		direction="row"
					// 		justifyContent="center"
					// 		alignItems="center"
					// 		sx={{ padding: '6px 0' }}
					// 	>
					// 		<EthIconStyle
					// 			src={getInfoNetWorkByChainId(chainIdState)?.image}
					// 			alt={getInfoNetWorkByChainId(chainIdState)?.symbol}
					// 		/>

					// 		<BalanceTxt variant="body2">
					// 			{balanceUser && balanceUser.toString().substring(0, 5)}
					// 		</BalanceTxt>
					// 	</Stack>
					// </ConnectWalletContainer>
					// <Box>
					// 	{/* <Avatar
					// 			src={isLightTheme ? WalletBlack : WalletWhite}
					// 			sx={{ width: '34px', height: '34px' }}
					// 			alt="user avatar"
					// 		/> */}
					// </Box>
					<ConnectWalletContainer
						onClick={() => {
							// dispatch(setConnectModal(true));
							if (userInfo) {
								showSwitchNetworkBox();
							}
						}}
					>
						<Box
							className={!turnOfSwitchNetwork ? 'color' : ''}
							sx={{
								bottom: '12px',
								width: '34px',
								height: '34px',
								cursor: 'pointer',
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								backdropFilter: 'blur(2px)',
								borderRadius: '50%',
								...(theme.palette.mode === 'light'
									? {
											background: theme.palette.primaryLight.lighter,
											boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
									  }
									: {
											background: theme.palette.primaryDark.backgroundCard,
									  }),
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
						>
							<Box
								sx={{
									img: {
										width: '14px',
										height: '100%',
									},
								}}
							>
								<img src={isLightTheme ? WalletBlack : WalletWhite} alt="Wallet" />
							</Box>
							{/* )} */}
						</Box>
					</ConnectWalletContainer>
				)}
				<DropDownContent
					ref={ref}
					sx={{
						top: 0,
						right: '-42px',
						// [theme.breakpoints.down(400)]: {
						// 	right: '-80px',
						// },
					}}
					className={!turnOfConnectWallet || onOpenConnectModal ? 'active' : ''}
				>
					<Box sx={{ width: '280px' }} p={4}>
						<Box pb={2}>
							<Typography variant="h5" fontStyle="italic">
								Connect Wallet
							</Typography>
							<Typography variant="body2" fontStyle="italic">
								Use your crypto wallet to connect to Metaspacecy
							</Typography>
						</Box>
						<Box>
							<Stack>{renderListWallet()}</Stack>
						</Box>
						<Box pt={2}>
							<LinkWrapper
								href="https://metaspacecynfts.medium.com/installing-metamask-guideline-de31078734e5"
								target="_blank"
							>
								<Typography
									fontStyle="italic"
									sx={{
										':hover': {
											color: '#007aff',
										},
									}}
								>
									Installing wallet guideline
								</Typography>
							</LinkWrapper>
						</Box>
					</Box>
				</DropDownContent>
				<DropDownContent
					ref={ref1}
					sx={{
						top: 0,
						[theme.breakpoints.down(400)]: {
							right: '-80px',
						},
					}}
					className={activeSelectOption1 ? 'active' : ''}
				>
					{!userAddress ? (
						// <Box>
						// 	<ConfirmBox fontStyle="italic">
						// 		By connecting a wallet, you agree to <span>Metaspacecy’s</span>
						// 		<a
						// 			href="/#/terms-of-service"
						// 			rel="noreferrer noopener"
						// 			style={{ fontStyle: 'italic' }}
						// 		>
						// 			Terms of Service
						// 		</a>{' '}
						// 		and{' '}
						// 		<a
						// 			href="/#/privacy-policy"
						// 			rel="noreferrer noopener"
						// 			style={{ fontStyle: 'italic' }}
						// 		>
						// 			Privacy Policy
						// 		</a>
						// 		<Box>
						// 			<input
						// 				type="checkbox"
						// 				aria-checked="false"
						// 				checked={checked}
						// 				// value={checked}
						// 				onChange={() => setChecked(!checked)}
						// 				style={{ fontStyle: 'italic' }}
						// 			/>{' '}
						// 			I agree to the Terms of Service and Privacy Policy of
						// 			Metaspacecy
						// 		</Box>
						// 	</ConfirmBox>
						// </Box>
						<Initializing
							sx={{
								fontStyle: 'italic',
								flexDirection: 'column',

								mb: 0,
								border: 'none',
							}}
						>
							Error connecting
							<Box mt={2}>
								<ButtonWhite onClick={handleConnectAgain}>Try again</ButtonWhite>
							</Box>
						</Initializing>
					) : (
						<Box>
							{!errorConnect ? (
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										py: 2,
										flexDirection: 'column',
										alignItems: 'center',
									}}
								>
									<Box>
										<Typography fontSize={14} fontStyle="italic">
											Wallet Connected
										</Typography>
									</Box>
									<Box mt={1} mx="auto">
										<ButtonWhite
											onClick={autoHide}
											sx={{ width: '120px', mb: 0 }}
										>
											<Typography fontSize={14} fontStyle="italic">
												Close
											</Typography>
										</ButtonWhite>
									</Box>
								</Box>
							) : (
								<Initializing
									sx={{
										fontStyle: 'italic',
										flexDirection: 'column',

										mb: 0,
										border: 'none',
									}}
								>
									Error connecting
									<Box mt={2}>
										<ButtonWhite onClick={handleConnectAgain}>
											Try again
										</ButtonWhite>
									</Box>
								</Initializing>
							)}
						</Box>
					)}
				</DropDownContent>
				<DropDownContent
					sx={{
						top: 0,
						[theme.breakpoints.down(400)]: {
							right: '-80px',
						},
					}}
					className={!turnOfSwitchNetwork ? 'active' : ''}
				>
					<>
						<SwitchNetworkNew />
					</>
				</DropDownContent>
			</Box>
		</Fragment>
	);
};

export default React.memo(ConnectToWallet);

//dont know why so i keep it for css when need
// (
// 	<Box width={260}>
// 		<ConnectingBox>
// 			<Typography fontSize={16} fontStyle="italic">
// 				Somthing error, please try again
// 			</Typography>
// 			<ButtonGradient
// 				sx={{ width: '120px', marginTop: '12px' }}
// 				onClick={() => handleWalletConnect()}
// 			>
// 				<Typography fontSize={16} fontStyle="italic">
// 					Try again
// 				</Typography>
// 			</ButtonGradient>
// 		</ConnectingBox>
// 	</Box>
// )
