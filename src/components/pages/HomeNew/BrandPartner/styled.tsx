import { Box, styled } from '@mui/material';

export const BrandWraper = styled(Box)(({ theme }) => ({
	padding: '20px 0',
	img: {
		width: '100%',
		height: 'auto',
	},
	marginRight: '60px',
	[theme.breakpoints.down(800)]: {
		marginRight: '30px',
	},
	[theme.breakpoints.down(500)]: {
		marginRight: '20px',
	},

	// display: 'flex',
	// justifyContent: 'end',
}));
