/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Web3 from 'web3';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectChainId, setChainId } from 'redux/slices/web3InfoSlice';
// constants
import { NETWORKINFO } from 'constants/etherscan.constant';
import {
	mainnetAvalanche,
	mainnetBinance,
	mainnetEthereum,
	mainnetPolygon,
} from 'constants/rpcUrl.constant';
// components
import Modal from 'components/CustomUI/Modal';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
// mui
import { Stack, Typography, Tooltip, useTheme, Avatar, Box, Drawer } from '@mui/material';
// styled
import {
	CollumnOne,
	CollumnTwo,
	NetworkSwitchBackground,
	NetworkSwitchContent,
	NetworkSwitchIcon,
	NetworkSwitchStyle,
} from './styled';
// images
import PolygonIcon from 'assets/images/network/polygon.webp';
import EthIcon from 'assets/images/network/eth.webp';
import BinanceIcon from 'assets/images/network/binance.webp';
import AvaxIcon from 'assets/images/network/avax.webp';
import WalletWhite from 'assets/icons/icon-wallet-white.svg';
import WalletBlack from 'assets/icons/icon-wallet-black.svg';

const getInfoNetWorkByChainId = (id: number) => {
	return NETWORKINFO[id];
};

declare let window: any;

const SwitchNetWork = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const [netWork, setNetWork] = useState(false);
	const chainIdState = useSelector(selectChainId);
	const isLightTheme = theme.palette.mode === 'light';
	const [openDrawer, setOpenDrawer] = useState(false);

	useEffect(() => {
		if (netWork) document.body.classList.add('stop-scroll');
		else document.body.classList.remove('stop-scroll');
	}, [netWork]);

	const changeNetwork = async (mainnet: any, newChainId: number) => {
		if (typeof window.ethereum !== 'undefined') {
			try {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: Web3.utils.toHex(newChainId) }],
				});

				toast.success('Switch network successfully');
			} catch (switchError: any) {
				// console.log('switch error');
				if (switchError.code !== 4001) {
					try {
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: mainnet,
						});

						toast.success('Switch network successfully');
					} catch (error) {
						toast.error('Switch network failed!');
					}
				}
			}
		}
		setNetWork(false);
	};

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

	// console.log('openDrawer', openDrawer);

	return (
		<Fragment>
			{/* <ButtonGradient sx={{ width: 'fit-content' }} onClick={() => setNetWork(!netWork)}>
				<Stack direction="row" justifyContent="center" alignItems="center">
					<img
						style={{ width: '20px', height: 'auto' }}
						src={getInfoNetWorkByChainId(chainIdState)?.image}
						alt={getInfoNetWorkByChainId(chainIdState)?.symbol}
						className="me-1"
					/>
					<Typography variant="body2" sx={{ ml: 1 }}>
						{getInfoNetWorkByChainId(chainIdState)?.name}&nbsp;
					</Typography>
				</Stack>
			</ButtonGradient> */}
			<Box
				sx={{
					borderRadius: '50%',
					cursor: 'pointer',
					...(theme.palette.mode === 'light'
						? {
								background: 'rgba(230,230,230,0.8)',
						  }
						: {
								background: 'rgba(250,250,250,0.2)',
						  }),
				}}
				onClick={() => setOpenDrawer(!openDrawer)}
			>
				<Avatar
					src={isLightTheme ? WalletBlack : WalletWhite}
					sx={{ width: '34px', height: '34px' }}
					alt="user avatar"
				/>
			</Box>
			<Drawer
				anchor="right"
				open={openDrawer}
				onClose={toggleDrawer(false)}
				PaperProps={{
					sx: {
						height: 'max-content',
						margin: '1rem',
						background: 'none',
					},
				}}
			>
				<NetworkSwitchStyle>
					<NetworkSwitchBackground>
						<NetworkSwitchContent>
							<CollumnOne>
								<NetworkSwitchIcon
									onClick={() => changeNetwork(mainnetPolygon, 137)}
								>
									<Tooltip title="Polygon" placement="left">
										<img
											className="icon-small"
											src={PolygonIcon}
											alt="polygon icon"
										/>
									</Tooltip>
								</NetworkSwitchIcon>
								<NetworkSwitchIcon
									onClick={() => changeNetwork(mainnetEthereum, 1)}
								>
									<Tooltip title="Ethereum" placement="left">
										<img className="icon-small" src={EthIcon} alt="eth icon" />
									</Tooltip>
								</NetworkSwitchIcon>
							</CollumnOne>
							<CollumnTwo>
								<NetworkSwitchIcon
									onClick={() => changeNetwork(mainnetBinance, 56)}
								>
									<Tooltip title="Binance" placement="right">
										<img
											className="icon-small"
											src={BinanceIcon}
											alt="bnb icon"
										/>
									</Tooltip>
								</NetworkSwitchIcon>
								<NetworkSwitchIcon
									onClick={() => changeNetwork(mainnetAvalanche, 43114)}
								>
									<Tooltip title="Avalanche" placement="right">
										<img
											className="icon-small"
											src={AvaxIcon}
											alt="avax icon"
										/>
									</Tooltip>
								</NetworkSwitchIcon>
							</CollumnTwo>
						</NetworkSwitchContent>
					</NetworkSwitchBackground>
				</NetworkSwitchStyle>
			</Drawer>
		</Fragment>
	);
};

export default React.memo(SwitchNetWork);
