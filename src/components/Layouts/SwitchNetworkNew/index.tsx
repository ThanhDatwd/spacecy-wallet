import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import {
	// mainnetAvalanche,
	mainnetBinance,
	mainnetEthereum,
	// mainnetPolygon,
} from 'constants/rpcUrl.constant';
// import { NETWORKINFO } from 'constants/etherscan.constant';
// import PolygonIcon from 'assets/images/network/polygon.webp';
import EthIcon from 'assets/images/network/eth.webp';
import BinanceIcon from 'assets/images/network/binance.webp';
import AptosIcon from 'assets/images/network/aptos.png';
// import AvaxIcon from 'assets/images/network/avax.webp';
import { useDispatch, useSelector } from 'react-redux';
import { setChainId, selectChainId } from 'redux/slices/web3InfoSlice';
import Web3 from 'web3';
import { toast } from 'react-toastify';

declare let window: any;

// const getInfoNetWorkByChainId = (id: number) => {
// 	return NETWORKINFO[id];
// };

const SwitchNetworkNew = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	// const [isEther, setIsEther] = useState(true);
	const chainId = useSelector(selectChainId);
	// const isLightTheme = theme.palette.mode === 'light';

	const changeNetwork = async (mainnet: any, newChainId: number) => {
		if (typeof window.ethereum !== 'undefined') {
			try {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: Web3.utils.toHex(newChainId) }],
				});
				dispatch(setChainId(newChainId));
				toast.success('Switch network successfully');
			} catch (switchError: any) {
				console.log(switchError);
				toast.error('Switch network failed!');
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
	};

	return (
		<Box
			sx={{
				borderRadius: '12px',
				position: 'absolute',
				right: '-84px',
				top: '0',
				width: '60vw',
				maxWidth: '250px',
				padding: '1.5rem 0 2.8rem',
				fontStyle: 'italic',
				...(theme.palette.mode === 'light'
					? {
							background: '#fff',
							boxShadow: '0 0 5px 0 rgba(0,0,0,0.4)',
							color: '#000',
					  }
					: {
							backdropFilter: 'blur(25px)',
							background: '#89AED0',
							color: '#fff',
					  }),
				[theme.breakpoints.down(400)]: {
					right: '-4px',
				},
			}}
		>
			<Box mb={2}>
				{/* <Typography variant="h5" fontWeight="500">
					Current Network
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
					<img
						width="20px"
						src={getInfoNetWorkByChainId(chainIdState)?.image}
						alt={getInfoNetWorkByChainId(chainIdState)?.symbol}
						className="me-1"
					/>
					<Typography variant="body2" sx={{ ml: 1 }}>
						{getInfoNetWorkByChainId(chainIdState)?.name}&nbsp;
					</Typography>
				</Box> */}
			</Box>
			<Box mb={2} sx={{ textAlign: 'center' }}>
				<Typography variant="h5" fontWeight="500">
					Switch Network
				</Typography>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					pl: 6,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						gap: '10px',
						alignItems: 'center',
						py: 1,
						cursor: 'pointer',
						width: 'fit-content',
						padding: '8px 8px',
						...(chainId === 1 && {
							background: '#9dc3e689',
							borderRadius: '6px',
							padding: '8px 8px',
							transition: 'background ease 0.5s',
						}),
					}}
					onClick={() => changeNetwork(mainnetEthereum, 1)}
				>
					<img src={EthIcon} alt="etherum" style={{ maxWidth: '30px' }} />
					<p>Ethereum</p>
				</Box>
				<Box
					sx={{
						display: 'flex',
						gap: '10px',
						alignItems: 'center',
						py: 1,
						cursor: 'pointer',
						width: 'fit-content',
						padding: '8px 8px',
						...(chainId === 56 && {
							background: '#9dc3e689',
							borderRadius: '6px',
							padding: '8px 8px',
							transition: 'background ease 0.5s',
						}),
					}}
					onClick={() => changeNetwork(mainnetBinance, 56)}
				>
					<img src={BinanceIcon} alt="BNB" style={{ maxWidth: '30px' }} />
					<p>BNB Chain</p>
				</Box>
				<Box
					sx={{
						display: 'flex',
						gap: '10px',
						alignItems: 'center',
						py: 1,
						cursor: 'pointer',
						width: 'fit-content',
						padding: '8px 8px',
						textDecoration: 'none',
					}}
					onClick={() => {
						window.open('http://aptos.metaspacecy.com/', '_blank');
					}}
				>
					<img src={AptosIcon} alt="BNB" style={{ maxWidth: '30px' }} />
					<p>Aptos Network</p>
				</Box>
				{/* <Box
					sx={{
						display: 'flex',
						gap: '10px',
						alignItems: 'center',
						py: 1,
						cursor: 'pointer',
					}}
					onClick={() => changeNetwork(mainnetEthereum, 4)}
				>
					<img src={EthIcon} alt="EthIcon" style={{ maxWidth: '30px' }} />
					<p>Polygon</p>
				</Box> */}
				{/* <Box
					sx={{
						display: 'flex',
						gap: '10px',
						alignItems: 'center',
						py: 1,
						cursor: 'pointer',
					}}
					onClick={() => changeNetwork(mainnetAvalanche, 43114)}
				>
					<img src={AvaxIcon} alt="Ava" style={{ maxWidth: '30px' }} />
					<p>Avalanche</p>
				</Box> */}
			</Box>
		</Box>
	);
};

export default React.memo(SwitchNetworkNew);
