/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { Fragment, useContext } from 'react';

import { SizeContext } from 'contexts/SizeObserver';
import searchIcon from 'assets/icons/icon-search-grey.svg';
import downIcon from 'assets/icons/icon-down.svg';
import { Asterisk } from 'components/Form/Common/styled';
import ButtonWhite from 'components/CustomUI/ButtonWhite';

import phone from 'assets/icons/icon-phone.svg';
import email from 'assets/icons/icon-email.svg';
import map from 'assets/icons/icon-map.svg';

const list = [
	{
		icon: phone,
		title: 'Phone',
		content: '(123) 123-456',
	},
	{
		icon: map,
		title: 'Address',
		content: '08 W 36th St, New YorkNY 10001',
	},
	{
		icon: email,
		title: 'Email',
		content: 'office@xhibiter.com',
	},
];

const renderList = () => {
	return list.map((tag, index) => {
		return (
			<Box key={index} sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
				<Box>
					<img src={tag.icon} alt={tag.title} />
				</Box>
				<Box>
					<Typography variant="h6" fontWeight="500">
						{tag.title}
					</Typography>
					<p>{tag.content}</p>
				</Box>
			</Box>
		);
	});
};

const Contact: React.FC = () => {
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const theme = useTheme();

	return (
		<Fragment>
			<Box sx={{ background: '#9DC3E6', mt: '98px', textAlign: 'center', py: 10, px: 1 }}>
				<Typography variant="h1" color="white" fontWeight="600">
					Get in touch
				</Typography>
			</Box>
			<Box sx={{ maxWidth: MaxWidth, mx: 'auto' }}>
				<Stack direction="row" my={6} gap={6}>
					<Box
						sx={{ width: '70%', display: 'flex', flexDirection: 'column', gap: '24px' }}
					>
						<Typography variant="h5" fontWeight="500">
							Contact Us
						</Typography>
						<Typography variant="h6">
							Have a question? Need help? Don't hesitate, drop us a line
						</Typography>
						<Stack direction="row" gap={4}>
							<Box sx={{ width: '50%' }}>
								<Box>
									Name <Asterisk />
								</Box>
								<Box
									sx={{
										input: {
											outline: 'none',
											border: '1px solid #E7E8EC',
											borderRadius: '10px',
											padding: '10px 16px',
											fontSize: '16px',
											width: '100%',
										},
									}}
								>
									<input type="text" />
								</Box>
							</Box>
							<Box sx={{ width: '50%' }}>
								<Box>
									Email <Asterisk />
								</Box>
								<Box
									sx={{
										input: {
											outline: 'none',
											border: '1px solid #E7E8EC',
											borderRadius: '10px',
											padding: '10px 16px',
											fontSize: '16px',
											width: '100%',
										},
									}}
								>
									<input type="text" />
								</Box>
							</Box>
						</Stack>
						<Box>
							<Box>
								Message <Asterisk />
							</Box>
							<Box
								sx={{
									textarea: {
										width: '100%',
										outline: 'none',
										border: '1px solid #E7E8EC',
										borderRadius: '10px',
										padding: '10px 16px',
										fontSize: '16px',
									},
								}}
							>
								<textarea rows={10}></textarea>
							</Box>
						</Box>
						<Stack direction="row" gap="10px">
							<input type="checkbox" />
							<p>
								I agree to the{' '}
								<span style={{ color: theme.palette.primary.light }}>
									Terms of Service
								</span>
							</p>
						</Stack>
						<ButtonWhite sx={{ width: 'fit-content', height: 'fit-content' }}>
							Submit
						</ButtonWhite>
					</Box>
					<Box sx={{ width: '30%' }}>
						<Typography variant="h5" fontWeight="500">
							Prediction
						</Typography>
						<Typography variant="h6" style={{ margin: '24px 0' }}>
							Don't hesitate, drop us a line Collaboratively administrate channels
							whereas virtual. Objectively seize scalable metrics whereas proactive
							e-services.
						</Typography>
						<Box
							sx={{
								border: '1px solid #E7E8EC',
								padding: '2rem',
								borderRadius: '16px',
								display: 'flex',
								flexDirection: 'column',
								gap: '24px',
								background: '#fff',
							}}
						>
							{renderList()}
						</Box>
					</Box>
				</Stack>
			</Box>
		</Fragment>
	);
};

export default React.memo(Contact);
