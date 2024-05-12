import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { useContext } from 'react';

import { SizeContext } from 'contexts/SizeObserver';

import bgFounder from 'assets/About/bg-founder.png';
import Asset1 from 'assets/About/Asset1.png';
import Asset2 from 'assets/About/Asset2.png';
import Asset3 from 'assets/About/Asset3.png';
import Asset4 from 'assets/About/Asset4.png';
import Asset5 from 'assets/About/Asset5.png';

import inicon from 'assets/About/in.svg';
import twitter from 'assets/About/twitter.svg';

const listFounder = [
	{
		id: 1,
		image: Asset1,
		name: 'Baroda Hoang',
		position: 'Founder, CEO',
		content1: 'An expert in marketing, technology and market research',
		content2:
			'Involved in the digital asset ecosystem since 2016 with 6 years of research in the blockchain industry',
		content3:
			'He sees a huge demand for the blockchain space especially the decentralized financial market',
		linkTwitter: '',
		linkLinkin: '',
	},
	{
		id: 2,
		image: Asset2,
		name: 'Menardo QuiNosa',
		position: 'CO - Founder',
		content1:
			'An experienced, professional trader and fund manager in Forex as well as crypto market',
		content2: 'More than 9 years of experience in financial market',
		content3:
			'He also participated in multiple trading and cryptocurrency events in Dubai, Thailand, Vietnam, Singapore and Hong Kong',
		linkTwitter: '',
		linkLinkin: '',
	},
	{
		id: 3,
		image: Asset3,
		name: 'Joseph Miller',
		position: 'CPO _ Founder',
		content1:
			'More than 2 years working at an  IT company -  VIETRY CO., LTD; Frontend Lead at Waytech Ltd; Back End Developer at CNV Loyalty App Platform.',
		content2:
			'He is passionate about blockchain and believes metaverse will give opportunity for the innovations necessary to users and the future of the whole world as well.',
		content3: '',
		linkTwitter: '',
		linkLinkin: '',
	},
	{
		id: 4,
		image: Asset4,
		name: 'Beckhnam',
		position: 'CTO _ Founder',
		content1:
			'More than 2 years working at an  IT company -  VIETRY CO., LTD; Frontend Lead at Waytech Ltd; Back End Developer at CNV Loyalty App Platform.',
		content2:
			'He is passionate about blockchain and believes metaverse will give opportunity for the innovations necessary to users and the future of the whole world as well.',
		content3: '',
		linkTwitter: '',
		linkLinkin: '',
	},
	{
		id: 5,
		image: Asset5,
		name: 'Zikobin',
		position: 'CTO',
		content1: 'Zikobin is Unity 3D Game Development for more than two years.',
		content2: 'He has experience building a blockchain MMORPG Game with Unity.',
		content3: '',
		linkTwitter: '',
		linkLinkin: '',
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
					'@media (max-width: 1400px)': {
						width: '30%',
					},
					'@media (max-width: 768px)': {
						width: '46%',
					},
					'@media (max-width: 480px)': {
						width: '100%',
					},
				}}
			>
				<Box
					sx={{
						height: '340px',
						img: {
							height: '100%',
						},
						'@media (max-width: 768px)': {
							height: '280px',
						},
						'@media (max-width: 480px)': {
							height: '240px',
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
					<Stack
						direction="row"
						justifyContent="center"
						gap="10px"
						sx={{ img: { width: '30px' } }}
						mt={1}
					>
						<Link href={item.linkTwitter}>
							<img src={twitter} alt="link" />
						</Link>
						<Link href={item.linkLinkin}>
							<img src={inicon} alt="link" />
						</Link>
					</Stack>
				</Box>
				<Box mt={2} sx={{ textAlign: 'left', textIndent: '20px' }}>
					<Typography variant="body1">{item.content1}</Typography>
					<Typography variant="body1">{item.content2}</Typography>
					<Typography variant="body1">{item.content3}</Typography>
				</Box>
			</Stack>
		);
	});
};

export default function Founder() {
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1800px' : '1800px';
	const theme = useTheme();
	return (
		<Box
			sx={{
				background: `radial-gradient(35.36% 27.39% at 53.1% 43.75%, rgba(0, 0, 0, 0.66) 0%, rgba(0, 0, 0, 0) 100%),url(${bgFounder})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
				height: '100vh',
				'@media (max-height: 900px)': {
					height: '100%',
					py: 4,
				},
				'@media (max-width: 1400px)': {
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
				<Typography variant="h1" fontWeight={600} mb={4}>
					Founder Team
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
						'@media (max-width: 1400px)': {
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
