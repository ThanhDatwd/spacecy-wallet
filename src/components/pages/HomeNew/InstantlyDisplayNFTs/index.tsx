import { useContext } from 'react';
import IDYNFTs1 from 'assets/Home/ins21.webp';
import { Box, Typography, useTheme } from '@mui/material';
import { SizeContext } from 'contexts/SizeObserver';
import bglight from 'assets/Home/BG1.webp';

export interface IInstantlyDisplayNFTsProps {}

export default function InstantlyDisplayNFTs(props: IInstantlyDisplayNFTsProps) {
	const theme = useTheme();
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	return (
		<div
			style={{
				...(theme.palette.mode === 'light' && {
					background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
				}),
			}}
		>
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
					{theme.palette.mode === 'light' ? (
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
								color="rgba(19, 23, 64, 1)"
								variant="h2"
								textAlign="center"
								fontStyle="italic"
								fontWeight={600}
							>
								Instantly Display Your NFTs
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
								Instantly Display Your NFTs
							</Typography>
						</Box>
					)}
					<Box px={1}>
						<Box
							sx={{
								background: 'rgba(177, 218, 255, 0.45)',
								padding: '20px',
								borderRadius: '20px',
								[theme.breakpoints.down(500)]: {
									padding: '16px',
								},
								img: {
									borderRadius: '20px',
									width: '100%',
									height: '100%',
									objectFit: 'cover',
								},
								'@media (max-height: 800px)': {
									img: {
										height: '80vh',
									},
								},
								'@media (max-height: 800px) and (max-width: 500px)': {
									img: {
										height: '100%',
									},
								},
							}}
						>
							<img src={IDYNFTs1} alt="Instantly Display Your NFTs" />
						</Box>
					</Box>
				</Box>
			</Box>
		</div>
	);
}
