import { Box, styled, Typography } from '@mui/material';

export const FilterButton = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '8px 8px',
	borderRadius: theme.shape.borderRadiusSm,
	background: '#fff',
	border: '1px solid #E7E8EC',
	cursor: 'pointer',
	transition: 'all 0.2s',
	width: 'fitContent',
	height: '40px',
	gap: '8px',

	'&:hover': {
		// ...(theme.palette.mode === 'light'
		// 	? {
		// 			backgroundColor: theme.palette.primaryDark.backgroundCard,
		// 	  }
		// 	: { backgroundColor: theme.palette.primary.main }),

		transform: 'scale(0.97)',
	},

	'&.active': {
		// ...(theme.palette.mode === 'light'
		// 	? {
		// 			backgroundColor: theme.palette.primaryDark.backgroundCard,
		// 	  }
		// 	: { backgroundColor: theme.palette.primary.main }),
		background: theme.palette.primary.light,
		borderColor: theme.palette.primary.light,
		color: theme.palette.primaryLight.lighter,
	},
}));

export const ButtonShow = styled(Typography)(({ theme }) => ({
	cursor: 'pointer',
	color: theme.palette.primary.light,

	'&:hover': {
		color: theme.palette.primary.lighter,
	},
}));
