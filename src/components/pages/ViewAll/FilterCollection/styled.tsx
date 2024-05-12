import { Box, styled, Typography } from '@mui/material';

export const FilterButton = styled(Box)(({ theme }) => ({
	display: 'flex',
	padding: '10px 20px',
	border: '1px solid',
	borderColor: '#E7E8EC',
	borderRadius: theme.shape.borderRadiusSm,
	cursor: 'pointer',
	transition: 'all 0.4s',
	background: theme.palette.primaryLight.lighter,

	'&:hover': {
		// ...(theme.palette.mode === 'light'
		// 	? {
		// 			backgroundColor: theme.palette.primaryLight.dark,
		// 	  }
		// 	: { backgroundColor: theme.palette.primary.main }),

		transform: 'scale(0.95)',
		borderColor: theme.palette.primary.light,
		color: theme.palette.primaryLight.lighter,
		background: theme.palette.primary.light,
		boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.25)',
	},

	'&.active': {
		borderColor: theme.palette.primary.light,
		background: theme.palette.primary.light,
		color: theme.palette.primaryLight.lighter,
		boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.25)',
		// ...(theme.palette.mode === 'light'
		// 	? {
		// 			backgroundColor: theme.palette.primaryLight.dark,
		// 	  }
		// 	: { backgroundColor: theme.palette.primary.main }),
	},
}));

export const ButtonShow = styled(Typography)(({ theme }) => ({
	cursor: 'pointer',
	color: theme.palette.primary.light,

	'&:hover': {
		color: theme.palette.primary.lighter,
	},
}));
