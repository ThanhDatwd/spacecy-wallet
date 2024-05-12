import { Box, styled } from '@mui/material';

export const OfferCard = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '15px 30px',
	borderBottom: '1px solid #E7E8EC',
	cursor: 'pointer',

	[theme.breakpoints.down(500)]: {
		display: 'flex',
	},

	// '&:hover': {
	// 	...(theme.palette.mode === 'light'
	// 		? { backgroundColor: theme.palette.primaryLight.main }
	// 		: {
	// 				backgroundColor: theme.palette.primary.main,
	// 		  }),
	// },
}));
