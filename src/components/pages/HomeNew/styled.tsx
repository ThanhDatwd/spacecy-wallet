import { Box, styled } from '@mui/material';

export const BoxCoverItem = styled(Box)(({ theme }) => ({
	padding: '20px 20px',
	borderRadius: '20px',
	background: theme.palette.primaryDark.backgroundCard,
	[theme.breakpoints.down(500)]: {
		padding: '1rem',
	},
}));
