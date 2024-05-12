import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useContext } from 'react';

import { SizeContext } from 'contexts/SizeObserver';

import bgFounder from 'assets/About/bg-studio.png';
import Asset13 from 'assets/About/Asset12.png';
import Asset12 from 'assets/About/Asset13.png';
import Asset14 from 'assets/About/Asset14.png';
import Asset15 from 'assets/About/Asset15.png';
import Asset16 from 'assets/About/Asset16.png';

export default function Studio() {
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1800px' : '1800px';
	const theme = useTheme();
	return (
		<Box
			sx={{
				background: `url(${bgFounder})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
				height: '100vh',
				'@media (max-width: 1100px)': {
					py: 4,
					height: '100%',
				},
			}}
		>
			<Stack
				maxWidth={MaxWidth}
				mx="auto"
				px={4}
				textAlign="center"
				sx={{
					[theme.breakpoints.down(768)]: {
						px: 2,
					},
					[theme.breakpoints.down(480)]: {
						px: 1,
					},
				}}
			>
				<Typography
					variant="h1"
					fontWeight={600}
					mt={10}
					mb={20}
					sx={{
						[theme.breakpoints.down(1100)]: {
							my: 4,
						},
						'@media (max-height: 1050px)': {
							mb: 10,
						},
						'@media (max-height: 990px)': {
							my: 6,
						},
						'@media (max-height: 810px)': {
							my: 3,
						},
					}}
				>
					Studio Team
				</Typography>
				<Box sx={{ position: 'relative', width: '100%' }}>
					<Box
						sx={{
							position: 'absolute',
							left: '50%',
							transform: 'translateX(-50%)',
							[theme.breakpoints.down(1100)]: {
								position: 'unset',
								transform: 'unset',
							},
						}}
					>
						<Stack alignItems="center">
							<Box
								sx={{
									height: '340px',

									img: {
										height: '100%',
									},
									'@media (max-width: 1300px)': {
										height: '280px',
									},
									'@media (max-width: 480px)': {
										height: '200px',
									},
								}}
							>
								<img src={Asset14} alt="asset" />
							</Box>
							<Box
								mt={1}
								width="20vw"
								sx={{
									[theme.breakpoints.down(1100)]: {
										width: '450px',
									},
									[theme.breakpoints.down(4800)]: {
										width: '320px',
									},
								}}
							>
								<Typography variant="h5" fontWeight={600}>
									Hoang Tuan Long
								</Typography>
								<Typography variant="h6" fontWeight={500}>
									Architect <br /> World Kings <br /> World Record Holder
									Longhoang a master in Landscape Architecture
								</Typography>
							</Box>
						</Stack>
					</Box>

					<Box
						sx={{
							position: 'absolute',
							left: '50%',
							transform: 'translateX(-50%)',
							top: '150px',
							width: '100%',

							'@media (max-height: 990px)': {
								top: '100px',
							},
							'@media (max-height: 810px)': {
								top: '60px',
							},
							[theme.breakpoints.down(1100)]: {
								position: 'unset',
								transform: 'unset',
								my: 3,
							},
						}}
					>
						<Stack
							direction="row"
							gap="30%"
							justifyContent="center"
							sx={{
								[theme.breakpoints.down(1100)]: {
									gap: '10%',
								},
							}}
						>
							<Stack alignItems="center">
								<Box
									sx={{
										height: '340px',
										img: {
											height: '100%',
										},
										'@media (max-width: 1300px)': {
											height: '280px',
										},
										'@media (max-width: 480px)': {
											height: '200px',
										},
									}}
								>
									<img src={Asset12} alt="asset" />
								</Box>
								<Box mt={1}>
									<Typography variant="h5" fontWeight={600}>
										Artist
									</Typography>
									<Typography variant="h5" fontWeight={500}>
										MORIART
									</Typography>
								</Box>
							</Stack>
							<Stack alignItems="center">
								<Box
									sx={{
										height: '340px',
										img: {
											height: '100%',
										},
										'@media (max-width: 1300px)': {
											height: '280px',
										},
										'@media (max-width: 480px)': {
											height: '200px',
										},
									}}
								>
									<img src={Asset15} alt="asset" />
								</Box>
								<Box mt={1}>
									<Typography variant="h5" fontWeight={600}>
										3D Team
									</Typography>
								</Box>
							</Stack>
						</Stack>
					</Box>

					<Box
						sx={{
							position: 'absolute',
							left: '50%',
							transform: 'translateX(-50%)',
							top: '300px',
							width: '100%',
							'@media (max-height: 990px)': {
								top: '200px',
							},
							'@media (max-height: 810px)': {
								top: '120px',
							},
							[theme.breakpoints.down(1100)]: {
								position: 'unset',
								transform: 'unset',
							},
						}}
					>
						<Stack
							direction="row"
							gap="70%"
							justifyContent="center"
							sx={{
								[theme.breakpoints.down(1100)]: {
									gap: '50%',
								},
								[theme.breakpoints.down(650)]: {
									gap: '10%',
								},
							}}
						>
							<Stack alignItems="center">
								<Box
									sx={{
										height: '340px',
										img: {
											height: '100%',
										},
										'@media (max-width: 1300px)': {
											height: '280px',
										},
										'@media (max-width: 480px)': {
											height: '200px',
										},
									}}
								>
									<img src={Asset13} alt="asset" />
								</Box>
								<Box mt={1}>
									<Typography variant="h5" fontWeight={600}>
										Artist
									</Typography>
									<Typography variant="h5" fontWeight={500}>
										Sucy Izayoi
									</Typography>
								</Box>
							</Stack>
							<Stack alignItems="center">
								<Box
									sx={{
										height: '340px',
										img: {
											height: '100%',
										},
										'@media (max-width: 1300px)': {
											height: '280px',
										},
										'@media (max-width: 480px)': {
											height: '200px',
										},
									}}
								>
									<img src={Asset16} alt="asset" />
								</Box>
								<Box mt={1}>
									<Typography variant="h5" fontWeight={600}>
										Art Team
									</Typography>
								</Box>
							</Stack>
						</Stack>
					</Box>
				</Box>
			</Stack>
		</Box>
	);
}
