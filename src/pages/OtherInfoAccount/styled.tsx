import { styled, Box } from '@mui/material';

export const UserBackground = styled(Box)(({ theme }) => ({
	overflow: 'hidden',
	position: 'relative',
	height: 250,
	// boxShadow: '0px 0px 6px 2px rgba(66,66,66,0.81)',
	boxShadow: '2px 2px 3px rgba(0,0,0,0.2)',
	borderRadius: 10,
	[theme.breakpoints.down('lg')]: {
		height: 200,
	},
	[theme.breakpoints.down('md')]: {
		height: 150,
	},
}));
