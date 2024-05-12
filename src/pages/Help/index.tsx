/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { Fragment, useContext } from 'react';

import { SizeContext } from 'contexts/SizeObserver';
import searchIcon from 'assets/icons/icon-search-grey.svg';
import downIcon from 'assets/icons/icon-down.svg';

const list = [
	{
		title: 'Getting started',
		content: 'Learn how to create an account, set up your wallet, and what you can do.',
	},
	{
		title: 'Buying',
		content:
			"Learn how to purchase your first NFT and understand gas fees and what's gas free.",
	},
	{
		title: 'Selling',
		content: 'Learn how list your NFTs for sale and understand the different ways to list.',
	},
	{
		title: 'Creating',
		content: 'Learn how to create your very first NFT and how to create your NFT collections.',
	},
	{
		title: 'User Safety',
		content: 'Learn more about anti-fraud and user safety processes on OpenSea.',
	},
	{
		title: 'Partners',
		content: 'Learn how you can partner with us to showcase your NFT drops.',
	},
];

const listQuestion = [
	{
		content: 'How do I create an NFT?',
	},
	{
		content: 'How can I stay safe and protect my NFTs ?',
	},
	{
		content: 'What are the key terms to know in NFTs and Web3 ?',
	},
	{
		content: 'How do I sell an NFT ?',
	},
	{
		content: 'Smart Contract Upgrade: What You Need to Know',
	},
];

const ListCategory = () => {
	return list.map((tag: any, index: number) => (
		<Box
			key={index}
			sx={{
				border: '1.8px solid #E7E8EC',
				background: '#fff',
				cursor: 'pointer',
				p: 4,
				borderRadius: '10px',
				transition: 'all 0.4s',
				textAlign: 'center',
				':hover': {
					boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.25)',
				},
			}}
		>
			<Typography variant="h5" mb={2} fontWeight="500">
				{tag.title}
			</Typography>
			<Typography color="#5A5D79" variant="h6">
				{tag.content}
			</Typography>
		</Box>
	));
};

const ListQuestions = () => {
	return listQuestion.map((tag: any, index: number) => (
		<Box
			key={index}
			sx={{
				border: '1.8px solid #E7E8EC',
				background: '#fff',
				cursor: 'pointer',
				padding: 2,
				borderRadius: '10px',
				transition: 'all 0.4s',
				mb: 2,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				gap: '10px',
				p: {
					fontWeight: '500',
				},
				':hover': {
					boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.25)',
				},
				'@media (max-width: 500px)': {
					p: {
						fontSize: '13px',
					},
				},
			}}
		>
			<p color="#5A5D79">{tag.content}</p>
			<Box
				sx={{
					minWidth: '12px',
					img: {
						width: '100%',
					},
				}}
			>
				<img src={downIcon} alt="down" />
			</Box>
		</Box>
	));
};

const Help: React.FC = () => {
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const theme = useTheme();

	return (
		<Fragment>
			<Box sx={{ background: '#9DC3E6', mt: '98px', textAlign: 'center', py: 10, px: 1 }}>
				<Typography variant="h1" color="white" fontWeight="600">
					How can I help you?
				</Typography>
				<Stack
					direction="row"
					alignItems="center"
					gap="12px"
					sx={{
						mx: 'auto',
						border: '1px solid #E7E8EC',
						p: 2,
						maxWidth: '600px',
						borderRadius: 16,
						mt: 2,
						background: '#fff',
						'@media (max-width: 616px)': {
							p: 1.5,
						},
					}}
				>
					<Box sx={{ img: { width: '20px' } }}>
						<img src={searchIcon} alt="search icon" />
					</Box>
					<Box
						sx={{
							width: '100%',
							input: {
								border: 0,
								outline: 'none',
								background: 'transparent',
								fontSize: '16px',
								fontWeight: '500',
								color: '#5A5D79',
								width: '100%',
								fontStyle: 'italic',
							},
							'input::placeholder': {
								color: '#5A5D7980',
								fontSize: '16px',
								fontWeight: '500',
								fontStyle: 'italic',
							},
						}}
					>
						<input type="text" placeholder="Search" />
					</Box>
				</Stack>
			</Box>
			<Box maxWidth={MaxWidth} mx="auto" py={6}>
				<Typography variant="h3" textAlign="center" fontWeight="500">
					Or browse a categories
				</Typography>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr',
						columnGap: '2rem',
						rowGap: '2rem',
						mt: 4,
						px: 1,
						'@media (max-width: 1024px)': {
							gridTemplateColumns: '1fr 1fr',
						},
						'@media (max-width: 500px)': {
							gridTemplateColumns: '1fr',
						},
					}}
				>
					{ListCategory()}
				</Box>
			</Box>
			<Box sx={{ background: '#fff', py: 4 }}>
				<Box
					sx={{
						maxWidth: '580px',
						mx: 'auto',
						px: 1,
					}}
				>
					<Typography variant="h3" textAlign="center" fontWeight="500">
						Frequently asked questions
					</Typography>
					<Typography variant="h5" textAlign="center">
						Join our community now to get free updates and also alot of freebies are
						waiting for you or <br />{' '}
						<span
							style={{
								color: theme.palette.primary.light,
								cursor: 'pointer',
								fontWeight: '600',
							}}
						>
							Contact Support
						</span>
					</Typography>
					<Box mt={2}>{ListQuestions()}</Box>
				</Box>
			</Box>
		</Fragment>
	);
};

export default React.memo(Help);
