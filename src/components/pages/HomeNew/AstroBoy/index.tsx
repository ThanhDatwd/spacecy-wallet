import { Box, Typography, useTheme } from '@mui/material';
import { SizeContext } from 'contexts/SizeObserver';
import { useContext } from 'react';
import astro2 from 'assets/Home/astro2.webp';
import astro3 from 'assets/Home/astro3.webp';
import bglight from 'assets/Home/BG1.webp';
import { BoxCoverItem } from '../styled';

export interface IBuildVirtualWorldProps {}

export default function AstroBoy(props: IBuildVirtualWorldProps) {
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
				<Box maxWidth={MaxWidth} mx="auto" px={1}>
					{theme.palette.mode === 'light' ? (
						<Box>
							<Typography
								color="rgba(19, 23, 64, 1)"
								variant="h2"
								textAlign="center"
								fontStyle="italic"
								fontWeight={600}
								mb={4}
							>
								Astro Boy
							</Typography>
							<BoxCoverItem
								sx={{
									p: '100px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									background: 'transparent',
									img: {
										width: '90%',
									},
									[theme.breakpoints.down(1024)]: {
										padding: '50px',
									},
									[theme.breakpoints.down(500)]: {
										padding: '2rem 1rem',
									},
								}}
							>
								<img src={astro3} alt="astro" />
							</BoxCoverItem>
						</Box>
					) : (
						<Box>
							<Typography
								color="white"
								variant="h2"
								textAlign="center"
								fontStyle="italic"
								fontWeight={600}
								mb={4}
							>
								Astro Boy
							</Typography>
							<BoxCoverItem
								sx={{
									p: '100px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									background: 'transparent',
									img: {
										width: '90%',
										height: '100%',
									},
									[theme.breakpoints.down(1024)]: {
										padding: '50px',
									},
									[theme.breakpoints.down(500)]: {
										padding: '2rem 1rem',
									},
								}}
							>
								<img src={astro2} alt="astro" />
							</BoxCoverItem>
						</Box>
					)}
				</Box>
			</Box>
		</div>
	);
}
