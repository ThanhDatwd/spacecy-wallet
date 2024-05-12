/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';
// lib
import detectEthereumProvider from '@metamask/detect-provider';
import { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
// styled
import { MainStyle, RootStyle } from './styled';
// mui
import { Container, Typography, useTheme, Box } from '@mui/material';
// components
import Modal from 'components/CustomUI/Modal';
import Header from 'components/Layouts/Header';
import Footer from 'components/Layouts/Footer';
import LoadingPage from 'components/CustomUI/LoadingPage';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
	selectAddress,
	selectChainId,
	setChainId,
	setUserLogin,
	setCurrentProvider,
} from 'redux/slices/web3InfoSlice';
import { selectLoadingPage } from 'redux/slices/loadingSlice';
// utils
import { isSupportChainId, hexToDecimal, localStorageCustom } from 'utils';
import ButtonGradient from 'components/CustomUI/ButtonGradient';

import { loginUser } from 'redux/actions/userAction';
import { SocketContext } from 'contexts/SocketContext';
import FooterComp from 'components/Layouts/FooterComp';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import ButtonGrey from 'components/CustomUI/ButtonGrey';
import { log } from 'console';

declare let window: any;

function LayoutForbitNFTs() {
	const { pathname } = useLocation();
	const theme = useTheme();
	const ethereum: any = window.ethereum;
	const dispatch = useDispatch();
	const web3 = new Web3(Web3.givenProvider);
	const [trigger, setTrigger] = useState(false);
	// useSelector
	const userAddress = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);
	const isLoading = useSelector(selectLoadingPage);

	//state
	let [modalError, setModalError] = useState(false);

	//socket
	const { socketAuth } = useContext(SocketContext);

	const handleWalletConnect = (userAddress: string) => {
		if (userAddress) {
			dispatch(loginUser(userAddress, '', '')); // not need call back because "login and sign back"
			// socketAuth.connect();
			// socketAuth.emit('login', `${userAddress} connect`);
		}
	};

	// useEffect

	// get current provider
	useEffect(() => {
		// if (isHomePage) return;
		const loadWeb3 = async () => {
			const provider = await detectEthereumProvider({ timeout: 1000 });
			// console.log('provider', provider);
			// console.log('engine', window.ethereum._rpcEngine);
			// console.log(new Web3(window.ethereum._rpcEngine));
			if (provider === window.ethereum) {
				if (window.ethereum) {
					dispatch(setCurrentProvider(new Web3(window.ethereum._rpcEngine)));
				} else if (window.web3) {
					dispatch(setCurrentProvider(new Web3(window.web3.currentProvider)));
				}
			} else {
				dispatch(setChainId(97));
			}
		};
		// if (isHomePage) return;
		loadWeb3(); //get web3 provider when reload page
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		(async () => {
			let userAddress: string;
			// await web3.eth
			// 	.getAccounts()
			// 	.then((res) => {
			// 		console.log(res);
			// 		dispatch(setUserLogin(userAddress?.toLowerCase()));
			// 		handleWalletConnect(userAddress); //handle pass address after reload page to display userInfo
			// 	})
			// 	.catch((error) => {
			// 		console.log(error);
			// 	});
			// const getUserInterval = setInterval(() => {
			// 	console.log('còn');
			// 	console.log(userAddress);
			// 	if (userAddress !== undefined) {
			// 		console.log('hết');
			// 		clearInterval(getUserInterval);
			// 	}
			// }, 1000);
			// return () => {
			// 	clearInterval(getUserInterval);
			// };
		})();
	}, [ethereum]);
	useEffect(() => {
		(async () => {
			if (ethereum) {
				// get userAddress and chainId
				// console.log('qweqweqweqwe');
				let userAddress: string;
				await web3.eth
					.getAccounts()
					.then((res) => {
						userAddress = res[0];
						dispatch(setUserLogin(userAddress?.toLowerCase()));
						// handleWalletConnect(userAddress); //handle pass address after reload page to display userInfo
					})
					.catch((error) => {
						console.log(error);
					});
				// let userAddressArr = await web3.eth.getAccounts();
				// let userAddress0 = userAddressArr[0];
				// dispatch(setUserLogin(userAddress0?.toLowerCase()));
				// handleWalletConnect(userAddress0); //handle pass address after reload page to display userInfo
				let chainId: any = await web3.eth.net.getId();

				checkSupportedNetWork(chainId);
				// console.log(userAddress);
				// dispatch(setUserLogin(userAddress?.toLowerCase()));
				// functions on change userAddress and chainId
				ethereum.on('chainChanged', (chainId: string) => {
					// Handle the new chain.
					// Correctly handling chain changes can be complicated.
					// We recommend reloading the page unless you have good reason not to.
					checkSupportedNetWork(hexToDecimal(chainId));
				});
				// ethereum.on('accountsChanged', (accounts: string[]) => {
				// 	// Handle the new accounts, or lack thereof.
				// 	// "accounts" will always be an array, but it can be empty.
				// 	// console.log(accounts[0]);
				// 	// console.log(accounts[0]);
				// 	handleWalletConnect(accounts[0]);
				// 	dispatch(setUserLogin(accounts[0]?.toLowerCase())); //not run when use coinbase
				// });
			} else {
				dispatch(setChainId(undefined));
				dispatch(setUserLogin(undefined));
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, ethereum, trigger]);

	// useEffect(() => {
	// 	(async () => {
	// 		if (ethereum) {
	// 			let userAddress: string;
	// 			await web3.eth
	// 				.getAccounts()
	// 				.then((res) => {
	// 					console.log(res);
	// 					userAddress = res[0];
	// 					dispatch(setUserLogin(userAddress?.toLowerCase()));
	// 					handleWalletConnect(userAddress); //handle pass address after reload page to display userInfo
	// 				})
	// 				.catch((error) => {
	// 					console.log(error);
	// 				});
	// 		}
	// 	})();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [trigger]);

	useEffect(() => {
		(async () => {
			if (ethereum) {
				ethereum.on('accountsChanged', (accounts: string[]) => {
					window.location.reload();
					// handleWalletConnect(accounts[0]);
					// dispatch(setUserLogin(accounts[0]?.toLowerCase())); //not run when use coinbase
				});
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ethereum]);
	// functions
	const checkSupportedNetWork = (chainId: number | undefined) => {
		// if (isHomePage) return;
		if (chainId) {
			if (isSupportChainId(chainId)) {
				setModalError(false);
				dispatch(setChainId(chainId));
				setTrigger(true);
			} else {
				setModalError(false);
				dispatch(setChainId(97));
				changeNetwork(97);
			}
		} else {
			dispatch(setChainId(97));
			changeNetwork(97);
		}
	};

	const changeNetwork = async (chainId: number) => {
		// if (isHomePage) return;
		if (typeof window.ethereum !== 'undefined') {
			try {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: Web3.utils.toHex(chainId) }],
				});

				toast.success('Switch network successfully');
			} catch (error: any) {
				toast.error('Switch network failed!');
			}
		}
	};

	return (
		<RootStyle>
			<Header />
			{isLoading && <LoadingPage />}
			<Box>
				<MainStyle
					sx={{
						transition: theme.transitions.create('margin', {
							duration: theme.transitions.duration.complex,
						}),
					}}
				>
					<Outlet />
				</MainStyle>
			</Box>

			{modalError && (
				<Modal
					onOpen={modalError}
					mainHeader="Wrong network"
					allowClose={false}
					style={{ width: 500 }}
				>
					<Typography sx={{ textAlign: 'center', p: '2rem', pt: '1rem' }}>
						Wrong network! Currently, we only support BNB testnet and Rinkeby testnet,
						please switch to the right one.
					</Typography>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							alignItem: 'center',
							justifyContent: 'space-between',
							pb: '1.5rem',
							px: '2rem',
						}}
					>
						<Box sx={{ width: '40%' }}>
							<ButtonGrey
								onClick={() => {
									changeNetwork(4);
								}}
							>
								Switch to Rinkeby
							</ButtonGrey>
						</Box>

						<Box sx={{ width: '40%' }}>
							<ButtonGrey
								onClick={() => {
									changeNetwork(97);
								}}
							>
								Switch to BNB
							</ButtonGrey>
						</Box>
					</Box>
				</Modal>
			)}

			<FooterComp />
		</RootStyle>
	);
}

export default LayoutForbitNFTs;
