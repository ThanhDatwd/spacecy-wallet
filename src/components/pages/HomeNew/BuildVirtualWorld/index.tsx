import { Box, Typography, useTheme } from '@mui/material';
import { SizeContext } from 'contexts/SizeObserver';
import { useContext } from 'react';

import astro4 from 'assets/Home/astro4.webp';
import { BoxCoverItem } from '../styled';

export interface IBuildVirtualWorldProps {}

export default function BuildVirtualWorld(props: IBuildVirtualWorldProps) {
	const { innerWidth } = useContext(SizeContext);
	const theme = useTheme();
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	return (
		<div>
			<Box py={4}>
				<Box maxWidth={MaxWidth} mx="auto" px={1}>
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
								Astro Panda
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
								Astro Panda
							</Typography>
						</Box>
					)}
					<BoxCoverItem
						sx={{
							p: '100px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
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
						<img src={astro4} alt="astro" />
					</BoxCoverItem>
				</Box>
			</Box>
		</div>
	);
}
