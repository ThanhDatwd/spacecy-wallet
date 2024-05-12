/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Stack, Typography } from '@mui/material';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import React, { useContext } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { StackItem } from './styled';
import { openModalBuy } from '../../redux/slices/mintNftSlice';
import { TOKEN_PAYMENT } from '../../constants';
import { SizeContext } from 'contexts/SizeObserver';
interface Props {
	data: any;
	price: any;
	creater: string;
	chainId: number;
	isConnectWallet: any;
	feeMint: any;
}
const ItemDrop: React.FC<Props> = ({ data, creater, price, chainId, isConnectWallet, feeMint }) => {
	const dispatch = useAppDispatch();
	const { innerWidth } = useContext(SizeContext);
	return (
		<>
			<Stack
				direction="row"
				gap="32px"
				alignItems="center"
				sx={{
					'@media (max-width: 700px)': {
						flexDirection: 'column',
						gap: '16px',
						border: '1.5px solid #E7E8EC',
						borderRadius: '18px',
						boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.25)',
					},
				}}
			>
				<Box
					sx={{
						width: '50%',
						'@media (max-width: 700px)': {
							width: '100%',
						},
						img: {
							borderRadius: '18px',
							objectFit: 'cover',
							objectPosition: 'center',
							width: '100%',
						},
					}}
				>
					<img src={data.image} alt={data.name} />
				</Box>
				<Box
					sx={{
						'@media (max-width: 700px)': {
							width: '100%',
							px: 2,
							pb: 2,
						},
					}}
				>
					<Typography variant="h3" fontWeight="600">
						{data.itemName}
					</Typography>
					<Typography variant="h4" fontWeight="500">
						Cteated by {creater}
					</Typography>
					{innerWidth > 700 ? (
						<Stack direction="row" gap={5} mt={1}>
							<StackItem>
								<Typography variant="h6" textAlign="center">
									Available NFTs
								</Typography>
								<p>
									{data.availableItem} <span>/ {data.totalItem} </span>
								</p>
							</StackItem>
							<StackItem>
								<Typography variant="h6" textAlign="center">
									Price
								</Typography>
								<p>
									{price} <span>{TOKEN_PAYMENT[chainId][0].symbol}</span>
								</p>
							</StackItem>
						</Stack>
					) : (
						<Typography variant="h6">
							{data.availableItem} AVAILABLE - {price} ETH
						</Typography>
					)}

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
						<ButtonWhite
							onClick={() => {
								isConnectWallet(data.productId);
							}}
							disabled={
								data.availableItem === 0 || feeMint.feeMint === '0' ? true : false
							}
						>
							Mint Now
						</ButtonWhite>
					</Box>
				</Box>
			</Stack>
		</>
	);
};

export default ItemDrop;
