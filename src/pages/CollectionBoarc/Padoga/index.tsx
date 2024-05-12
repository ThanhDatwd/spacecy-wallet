import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import image6 from 'assets/Boarc/image6.png';
import image7 from 'assets/Boarc/image7.png';

export default function Padoga() {
	return (
		<Box py={4}>
			<Box sx={{ textAlign: 'center', mb: 2 }}>
				<Typography variant="h2" fontWeight="600">
					One Pillar Pagoda
				</Typography>
			</Box>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					columnGap: '40px',
				}}
			>
				<Stack sx={{ justifyContent: 'space-between' }}>
					<Box
						sx={{
							h6: {
								maxWidth: '500px',
							},
						}}
					>
						<Typography variant="h6" fontWeight={500}>
							Considered as an icon of Vietnamese religion, One Pillar Pagoda has an
							extremely unique architecture in every detail, bearing bold Vietnamese’s
							culture.{' '}
						</Typography>
					</Box>
					<img src={image6} alt="boarc" />
				</Stack>
				<Stack
					gap="24px"
					justifyContent="space-between"
					sx={{
						img: {
							width: '100%',
						},
					}}
				>
					<img src={image7} alt="boarc" />
					<Box>
						<Typography variant="h4" fontWeight="600" mb={2}>
							Specifications
						</Typography>
						<Typography variant="h6" fontWeight={500}>
							Scale: 1/100
						</Typography>
						<Typography variant="h6" fontWeight={500}>
							Size: 2.4m x 2.1m x 1m
						</Typography>
						<Typography variant="h6" fontWeight={500}>
							Number of sticks: 100.000 pieces
						</Typography>
						<Typography variant="h6" fontWeight={500}>
							Execution time: 6 months
						</Typography>
					</Box>
				</Stack>
			</Box>
		</Box>
	);
}
