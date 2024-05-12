/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Web3 from 'web3';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectChainId } from 'redux/slices/web3InfoSlice';
// constants
import { NETWORKINFO } from 'constants/etherscan.constant';

import ButtonGradient from 'components/CustomUI/ButtonGradient';
// mui
import { Stack, Typography, useTheme, Box } from '@mui/material';
// styled
import { DropDownContent } from './styled';

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

	useEffect(() => {
		if (netWork) document.body.classList.add('stop-scroll');
		else document.body.classList.remove('stop-scroll');
	}, [netWork]);

	// Drawer

	const handleTogleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}
			setNetWork(false);
		};

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

	return (
		<Fragment>
			<ButtonGradient sx={{ width: 'fit-content' }} onClick={() => setNetWork(!netWork)}>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					className={netWork ? 'color' : ''}
					// sx={{
					// 	'&.color': {
					// 		...(theme.palette.mode === 'light'
					// 			? {
					// 					background: theme.palette.primaryLight.lighter,
					// 					boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
					// 			  }
					// 			: {
					// 					// backgroundColor: theme.palette.primary.main,
					// 					backgroundColor: '#89AED0',
					// 			  }),
					// 	},
					// }}
				>
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
			</ButtonGradient>
			<DropDownContent
				sx={{
					top: 0,
					[theme.breakpoints.down(400)]: {
						right: '-80px',
					},
				}}
			>
				<Box sx={{ width: '280px' }} p={4}>
					<Box pb={2}>
						<Typography variant="h5" fontStyle="italic">
							Connect wallet
						</Typography>
					</Box>
				</Box>
			</DropDownContent>
		</Fragment>
	);
};

export default React.memo(SwitchNetWork);
