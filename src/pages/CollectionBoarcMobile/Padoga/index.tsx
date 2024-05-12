import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import image6 from 'assets/Boarc/image6.png';
import image7 from 'assets/Boarc/image7.png';

export default function Padoga() {
	return (
		<Box pt={2} pb={1}>
			<Box sx={{ textAlign: 'center', mb: 2 }}>
				<Typography variant="h2" mb={1} fontWeight="600">
					One Pillar Pagoda
				</Typography>
				<Typography variant="h6" fontWeight={500}>
					Considered as an icon of Vietnamese religion, One Pillar Pagoda has an extremely
					unique architecture in every detail, bearing bold Vietnamese’s culture.{' '}
				</Typography>
				<Box mt={2}>
					<Typography variant="h4" fontWeight="600" mb={1}>
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
			</Box>
			<Stack
				direction="row"
				alignItems="flex-end"
				sx={{
					justifyContent: 'space-between',
					img: {
						width: '49%',
					},
				}}
			>
				<img src={image6} alt="boarc" />
				<img src={image7} alt="boarc" />
			</Stack>
		</Box>
	);
}
