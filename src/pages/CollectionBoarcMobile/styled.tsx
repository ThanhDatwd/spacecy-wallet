import { Box, styled } from '@mui/material';

export const BoarcItem = styled(Box)(({ theme }) => ({
	maxWidth: '400px',
	textAlign: 'center',
	border: '1.5px solid #D9D9D9',
	borderRadius: '20px',
	background: theme.palette.primaryLight.lighter,
	boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
	fontWeight: 500,
}));
export const ItemImg = styled(Box)(({ theme }) => ({
	img: {
		borderRadius: '18px 18px 0 0',
	},
}));
export const ItemContent = styled(Box)(({ theme }) => ({
	padding: '30px 0',
}));
export const ContentAuction = styled(Box)(({ theme }) => ({
	width: 'fit-content',
	margin: '0 auto 8px',
	background: theme.palette.primary.light,
	color: theme.palette.primaryLight.lighter,
	padding: '5px 12px',
	borderRadius: '10px',
}));
