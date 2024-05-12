import { Box, Link, Typography, useTheme } from '@mui/material';
import { SizeContext } from 'contexts/SizeObserver';
import { useContext } from 'react';

import NewYorkTimeSquare1 from 'assets/Home/newesttimesquare.webp';
import { useSelector } from 'react-redux';
import { selectAddress } from 'redux/slices/web3InfoSlice';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import { PATH_VIRTUAL_WORLD } from 'routes/path';
export interface IInfinitySpaceToursProps {}

export default function InfinitySpaceTours(props: IInfinitySpaceToursProps) {
	const theme = useTheme();
	const isThemeLight = theme.palette.mode === 'light';
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';

	const userAddress = useSelector(selectAddress);
	return (
		<div>
			<Box
				py={4}
				sx={{
					[theme.breakpoints.down(768)]: {
						py: 2,
					},
					[theme.breakpoints.down(480)]: {
						py: 1,
					},
				}}
			>
				<Box maxWidth={MaxWidth} mx="auto">
					{isThemeLight ? (
						<Box mb={4}>
							<Typography
								color="rgba(19, 23, 64, 1)"
								variant="h2"
								textAlign="center"
								fontStyle="italic"
								fontWeight={600}
							>
								Infinity Space Virtual Tours
							</Typography>
						</Box>
					) : (
						<Box
							mb={4}
							sx={{
								[theme.breakpoints.down(768)]: {
									mb: 2,
								},
								[theme.breakpoints.down(480)]: {
									mb: 1,
								},
							}}
						>
							<Typography
								color="white"
								variant="h2"
								textAlign="center"
								fontStyle="italic"
								fontWeight={600}
							>
								Infinity Space Virtual Tours
							</Typography>
						</Box>
					)}
					{/* <Box mb={4}>
						<Typography
							color="white"
							variant="h2"
							textAlign="center"
							fontStyle="italic"
							fontWeight={600}
						>
							Infinity Space Virtual Tours
						</Typography>
					</Box> */}
					<Box
						sx={{
							position: 'relative',
							img: {
								width: '100%',
								height: '100%',
								borderRadius: '20px',
								objectFit: 'cover',
								cursor: 'pointer',
								'@media (max-height: 800px)': {
									height: '85vh',
								},
								'@media (max-height: 800px) and (max-width: 500px)': {
									height: '100%',
								},
							},
						}}
						px={1}
					>
						<Link href={PATH_VIRTUAL_WORLD.root} target="_blank">
							<img src={NewYorkTimeSquare1} alt="New York" />
						</Link>

						{!userAddress && (
							<ButtonWhite
								sx={{
									display: 'flex',
									justifyContent: 'center',
									width: '200px',
									height: '40px',
									position: 'absolute',
									bottom: '60px',
									right: '50%',
									transform: 'translateX(50%)',
									borderColor: '#fff',
									background: 'rgba(255,255,255,0.1)',
									backdropFilter: 'blur(3px)',
									':hover': {
										background: 'rgba(157, 195, 230, 0.6)',
										borderColor: 'rgba(157, 195, 230, 0.6)',
									},
								}}
							>
								<Link
									href={PATH_VIRTUAL_WORLD.root}
									target="_blank"
									color="white"
									textAlign="center"
									fontStyle="italic"
									fontWeight="500"
									sx={{ '&:hover': { textDecoration: 'none' } }}
								>
									Connect Wallet
								</Link>
							</ButtonWhite>
						)}
					</Box>
				</Box>
			</Box>
		</div>
	);
}
