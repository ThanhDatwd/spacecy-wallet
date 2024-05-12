import { styled, Box } from '@mui/material';

export const UserBackground = styled(Box)(({ theme }) => ({
	overflow: 'hidden',
	position: 'relative',
	// height: 250,

	// boxShadow: '0px 0px 6px 2px rgba(2, 28, 56)',
	boxShadow: '2px 2px 3px 0 rgba(0, 0 , 0, 0.2)',
	// [theme.breakpoints.down('lg')]: {
	// 	height: 200,
	// },
	// [theme.breakpoints.down('md')]: {
	// 	height: 150,
	// },
}));
