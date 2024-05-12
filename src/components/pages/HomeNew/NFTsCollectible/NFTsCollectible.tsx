import { Box, Typography, useTheme } from '@mui/material';
import { SizeContext } from 'contexts/SizeObserver';
import React, { useContext } from 'react';

import NFTs from 'assets/Home/NFTsCollectible.png';
import bglight from 'assets/Home/BG1.webp';
import { BoxCoverItem } from '../styled';

export interface IBuildVirtualWorldProps {}

export default function NFTsCollectible(props: IBuildVirtualWorldProps) {
	const { innerWidth } = useContext(SizeContext);
	const theme = useTheme();
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	return (
		<div>
			<Box
				py={4}
				sx={{
					...(theme.palette.mode === 'light' && {
						background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center center',
					}),
				}}
			>
				<Box maxWidth={MaxWidth} mx="auto">
					{theme.palette.mode === 'light' ? (
						<Box mb={4}>
							<Typography
								color="rgba(19, 23, 64, 1)"
								variant="h2"
								textAlign="center"
								fontStyle="italic"
								fontWeight={600}
								sx={{
									...(theme.palette.mode === 'light' && {
										color: 'rgba(19, 23, 64, 1)',
									}),
								}}
							>
								NFTs Collectible
							</Typography>
						</Box>
					) : (
						<Box mb={4}>
							<Typography
								color="white"
								variant="h2"
								textAlign="center"
								fontStyle="italic"
								fontWeight={600}
							>
								NFTs Collectible
							</Typography>
						</Box>
					)}

					<Box p={1}>
						<BoxCoverItem
							sx={{
								padding: '20px',
								borderRadius: '20px',
								width: '100%',
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'row',
								gap: 4,
								justifyContent: 'space-around',
								[theme.breakpoints.down(500)]: {
									flexDirection: 'column',
								},
							}}
						>
							<Box
								sx={{
									filter: 'drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.25))',
									img: {
										width: '100%',
										borderRadius: '20px',
										height: '834px',
										objectFit: 'cover',
										objectPosition: 'center center',
									},
									[theme.breakpoints.down(1800)]: {
										width: '44%',
										img: {
											height: 'auto',
										},
									},
									[theme.breakpoints.down(500)]: {
										width: '100%',
									},
								}}
							>
								<img src={NFTs} alt="The Martian Space squad" />
							</Box>
							<Box flex={1}>
								<Box ml={2}>
									<Box color="white" my={1}>
										<Typography
											fontWeight="600"
											fontStyle="italic"
											textTransform="capitalize"
											fontSize="48px"
											sx={{
												textAlign: 'center',
												...(theme.palette.mode === 'light' && {
													color: 'rgba(19, 23, 64, 1)',
												}),
												[theme.breakpoints.down(1240)]: {
													fontSize: '32px',
												},
												[theme.breakpoints.down(500)]: {
													fontSize: '24px',
												},
											}}
										>
											<p
												style={{
													paddingBottom: '50px',
												}}
											>
												Yggdrasill <br /> The axis of the universe
											</p>
											<p>
												9,999 <br /> The Norns collection
											</p>
										</Typography>
									</Box>
								</Box>
							</Box>
						</BoxCoverItem>
					</Box>
				</Box>
			</Box>
		</div>
	);
}
