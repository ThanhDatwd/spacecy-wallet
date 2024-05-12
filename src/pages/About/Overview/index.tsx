import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useContext } from 'react';

import { SizeContext } from 'contexts/SizeObserver';

import bgFounder from 'assets/About/bg-overview.png';
import Asset7 from 'assets/About/Asset6.png';
import Asset6 from 'assets/About/Asset7.png';
import Asset8 from 'assets/About/Asset8.png';
import Asset9 from 'assets/About/Asset9.png';
import Asset10 from 'assets/About/Asset10.png';
import Asset11 from 'assets/About/Asset11.png';

const listFounder = [
	{
		id: 6,
		image: Asset6,
		name: 'Head Marketing',
		position: '',
	},
	{
		id: 7,
		image: Asset7,
		name: 'Linda Ho',
		position: 'Head BD',
	},
	{
		id: 8,
		image: Asset8,
		name: 'Steve Ho',
		position: 'CPO',
	},
	{
		id: 9,
		image: Asset9,
		name: 'Junes Le',
		position: 'CMO',
	},
	{
		id: 10,
		image: Asset10,
		name: 'Tu',
		position: 'CFO',
	},
	{
		id: 11,
		image: Asset11,
		name: 'Ai Co',
		position: 'COO',
	},
];

const renderListFounder = () => {
	return listFounder.map((item) => {
		return (
			<Stack
				width="20%"
				alignItems="center"
				key={item.id}
				sx={{
					'@media (max-width: 1300px)': {
						width: '30%',
					},
					'@media (max-width: 768px)': {
						width: '46%',
					},
					'@media (max-width: 500px)': {
						width: '42%',
					},
				}}
			>
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
					<img src={item.image} alt="asset" />
				</Box>
				<Box mt={1}>
					<Typography variant="h4" fontWeight={600}>
						{item.name}
					</Typography>
					<Typography variant="h5" fontWeight={500}>
						{item.position}
					</Typography>
				</Box>
			</Stack>
		);
	});
};

export default function Overview() {
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
				'@media (max-width: 1300px)': {
					height: '100%',
					py: 4,
				},
			}}
		>
			<Stack
				justifyContent="center"
				alignItems="center"
				maxWidth={MaxWidth}
				mx="auto"
				px={4}
				textAlign="center"
				height="100%"
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
					mb={20}
					sx={{
						'@media (max-height: 720px)': {
							mb: 4,
						},
						[theme.breakpoints.down(1300)]: {
							mb: 4,
						},
					}}
				>
					Overview
				</Typography>
				<Stack
					direction="row"
					gap="32px"
					justifyContent="space-between"
					width="100%"
					sx={{
						'@media (max-width: 1440px)': {
							gap: '16px',
						},
						'@media (max-width: 1300px)': {
							flexWrap: 'wrap',
							justifyContent: 'center',
							gap: '32px',
						},
					}}
				>
					{renderListFounder()}
				</Stack>
			</Stack>
		</Box>
	);
}
