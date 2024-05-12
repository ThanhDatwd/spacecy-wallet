/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Link, Typography, useTheme } from '@mui/material';
import React, { Fragment, useContext, useEffect } from 'react';

// import {} from './styled';

import { SizeContext } from 'contexts/SizeObserver';

// Image
import new1 from 'assets/News/new1.png';
import new2 from 'assets/News/new2.png';
import new3 from 'assets/News/new3.png';
import new4 from 'assets/News/new4.png';
import new5 from 'assets/News/new5.png';
import new6 from 'assets/News/new6.png';
import new7 from 'assets/News/new7.png';
import ButtonWhite from 'components/CustomUI/ButtonWhite';

const listNew = [
	{
		image: new2,
		title: 'Mint your  own Ethereum collections',
		description: 'Since we launched Ethereum at the end of 2021, many awesome creators...',
		author: 'Sandy Leigh',
		category: 'NFT’s  DIGITAL ART',
		created: '5 Feb',
		readingTime: '3 min read',
		link: '',
	},
	{
		image: new3,
		title: 'List your collection  for secondary saless',
		description: 'Since we launched Ethereum at the end of 2021, many awesome creators...',
		author: 'Sandy Leigh',
		category: 'NFT’s  DIGITAL ART',
		created: '5 Feb',
		readingTime: '3 min read',
		link: '',
	},
	{
		image: new4,
		title: 'The biggest moves in NFTs, Bitcoin, crypto rules',
		description: 'Since we launched Ethereum at the end of 2021, many awesome creators... ',
		author: 'Deothemes',
		category: 'CRYPTOCURRENCY',
		created: '18 Jan',
		readingTime: '3 min read',
		link: '',
	},
	{
		image: new5,
		title: 'Incredible Amount of Developer Energy in Web3',
		description: 'Since we launched Ethereum at the end of 2021, many awesome creators...',
		author: 'Deothemes',
		category: 'MARKETING',
		created: '15 Jan',
		readingTime: '3 min read',
		link: '',
	},
	{
		image: new6,
		title: 'Inflation is up, it matters: High prices plague Biden’s',
		description: 'The US consumer price index rose by 7.5 per cent last month compared...',
		author: 'Sandy Leigh',
		category: 'MARKETING',
		created: '23 Dec',
		readingTime: '3 min read',
		link: '',
	},
	{
		image: new7,
		title: 'What to do when the market is going everywhere',
		description: 'The current period of monetary tightening and FII flows...',
		author: 'Sandy Leigh',
		category: 'NFT’s  DIGITAL ART',
		created: '15 Dec',
		readingTime: '3 min read',
		link: '',
	},
];

const About: React.FC = () => {
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const theme = useTheme();
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const ListNews = () => {
		return listNew.map((tag: any, index: number) => (
			<Link
				key={index}
				sx={{
					borderRadius: '14px',
					border: '1.5px solid #E7E8EC',
					background: '#fff',
					transition: 'all 0.4s',
					textDecoration: 'none !important',
					':hover': {
						boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.1)',
					},
					'@media (max-width: 600px)': {
						width: 'auto',
						maxWidth: '330px',
						margin: '0 auto',
					},
				}}
				href={tag.link}
			>
				<Box
					sx={{
						width: '100%',
						img: {
							width: '100%',
							borderRadius: '12px 12px 0 0 ',
							objectFit: 'cover',
							objectPosition: 'center',
						},
					}}
				>
					<img src={tag.image} alt="new" />
				</Box>
				<Box
					sx={{
						color: '#1d1d1f',
						p: '2rem',
						display: 'flex',
						flexDirection: 'column',
						gap: '24px',
						'@media (max-width: 1024px)': {
							padding: '1rem',
							gap: '1rem',
						},
						'@media (max-width: 600px)': {
							p: {
								fontSize: '13px',
							},
						},
					}}
				>
					<p style={{ fontWeight: 500, fontSize: '14px' }}>
						{tag.author} in{' '}
						<span style={{ color: theme.palette.primary.light }}>{tag.category}</span>
					</p>
					<Typography
						variant="h4"
						fontWeight="600"
						sx={{
							display: '-webkit-box',
							WebkitBoxOrient: 'vertical',
							WebkitLineClamp: '2',
							overflow: 'hidden',
						}}
					>
						{tag.title}
					</Typography>
					<Typography
						variant="h6"
						sx={{
							display: '-webkit-box',
							WebkitBoxOrient: 'vertical',
							WebkitLineClamp: '2',
							overflow: 'hidden',
							color: '#5A5D79',
						}}
					>
						{tag.description}
					</Typography>
					<p
						style={{
							color: '#5A5D79',
						}}
					>
						{tag.created} - {tag.readingTime}
					</p>
				</Box>
			</Link>
		));
	};

	return (
		<Fragment>
			<Box maxWidth={MaxWidth} mx="auto" px={1} py={6} mt="98px">
				<Box
					mb={6}
					sx={{
						[theme.breakpoints.down(725)]: {
							mb: '24px',
						},
					}}
				>
					<Link
						sx={{
							borderRadius: '14px',
							border: '1.5px solid #E7E8EC',
							background: '#fff',
							transition: 'all 0.4s',
							textDecoration: 'none !important',
							display: 'flex',
							alignItems: 'center',
							':hover': {
								boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.1)',
							},
							[theme.breakpoints.down(725)]: {
								flexDirection: 'column',
								maxWidth: '330px',
								mx: 'auto',
							},
						}}
						href="#"
					>
						<Box
							sx={{
								width: '50%',
								img: {
									width: '100%',
									borderRadius: '12px 0 0 12px',
									objectFit: 'cover',
									objectPosition: 'center',
								},
								[theme.breakpoints.down(725)]: {
									width: '100%',
									img: {
										borderRadius: '12px 12px 0 0',
									},
								},
							}}
						>
							<img src={new1} alt="new" />
						</Box>
						<Box
							sx={{
								width: '50%',
								color: '#1d1d1f',
								p: '2rem',
								display: 'flex',
								flexDirection: 'column',
								gap: '24px',
								'@media (max-width: 1024px)': {
									padding: '1rem',
									gap: '1rem',
								},
								[theme.breakpoints.down(725)]: {
									width: '100%',
								},
								'@media (max-width: 600px)': {
									p: {
										fontSize: '13px !important',
									},
								},
							}}
						>
							<p style={{ fontWeight: 500, fontSize: '14px' }}>
								Metaspacecy in
								<span style={{ color: theme.palette.primary.light }}>
									{' '}
									NFT’s DIGITAL ART
								</span>
							</p>
							<Typography
								variant="h4"
								fontWeight="600"
								sx={{
									display: '-webkit-box',
									WebkitBoxOrient: 'vertical',
									WebkitLineClamp: '2',
									overflow: 'hidden',
								}}
							>
								List your collection for secondary sales
							</Typography>
							<Typography
								variant="h6"
								sx={{
									display: '-webkit-box',
									WebkitBoxOrient: 'vertical',
									WebkitLineClamp: '2',
									overflow: 'hidden',
									color: '#5A5D79',
								}}
							>
								Since we launched Ethereum at the end of 2022, many awesome
								creators...
							</Typography>
							<p
								style={{
									color: '#5A5D79',
								}}
							>
								5 Feb - 3 min read
							</p>
						</Box>
					</Link>
				</Box>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr',
						columnGap: '24px',
						rowGap: '24px',
						[theme.breakpoints.down(800)]: {
							gridTemplateColumns: '1fr 1fr',
						},
						[theme.breakpoints.down(600)]: {
							gridTemplateColumns: '1fr',
						},
					}}
				>
					{ListNews()}
				</Box>
				<Box pt={6}>
					<ButtonWhite sx={{ width: 'fit-content', mx: 'auto' }}>Load more</ButtonWhite>
				</Box>
			</Box>
		</Fragment>
	);
};

export default React.memo(About);
