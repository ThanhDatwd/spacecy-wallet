import { Box, Typography } from '@mui/material';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import { LinkWrapper } from 'components/CustomUI/Card/NFTItemCard/styled';
import React from 'react';

export default function NotFound() {
	return (
		<Box
			sx={{
				height: '100vh',
				width: '100%',
				marginTop: '15%',
				textAlign: 'center',
				fontStyle: 'italic',
			}}
		>
			<Typography
				fontSize="8rem"
				color="white"
				sx={{
					textShadow:
						'0px 4px 6px rgba(13, 16, 45, 0.1), 0px 2px 4px rgba(13, 16, 45, 0.1)',
				}}
			>
				404
			</Typography>
			<Box>
				<Box>
					<Typography variant="h1" fontWeight={600}>
						Page Not Found!
					</Typography>
				</Box>
				<Box mt={2}>
					<Typography variant="h6">
						Oops! The page you are looking for does not exist.
					</Typography>
				</Box>
				<Box>
					<Typography variant="h6">It might have been moved or deleted.</Typography>
				</Box>
			</Box>
			<Box>
				<LinkWrapper href="#">
					<ButtonWhite
						sx={{
							width: 'fit-content',
							height: '48px',
							margin: '0 auto',
							marginTop: '1%',
							mb: 0,
						}}
					>
						<Typography>Navigate Back Home</Typography>
					</ButtonWhite>
				</LinkWrapper>
			</Box>
		</Box>
	);
}
