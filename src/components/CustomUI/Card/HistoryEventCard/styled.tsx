import { Box, styled, Typography } from '@mui/material';

export const ItemMedia = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: 60,
	height: 60,
	borderRadius: theme.shape.borderRadiusSm,
	overflow: 'hidden',
	cursor: 'pointer',
	flexShrink: 0,

	'& video': {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		maxHeight: '100%',
		maxWidth: '100%',
	},

	'& img': {
		objectFit: 'cover',
		width: '100%',
		height: '100%',
	},
}));

export const StyledSpan = styled('span')(({ theme }) => ({
	fontWeight: 400,
	...(theme.palette.mode === 'light'
		? {
				color: 'rgba(10, 10, 10, 0.7)',
		  }
		: {
				color: 'rgba(255, 255, 255, 0.7)',
		  }),
}));
export const HistoryItemContent = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'stretch',
	flexDirection: 'column',
}));
export const HistoryItemTitle = styled(Typography)(({ theme }) => ({
	fontSize: '16px',
	fontWeight: 500,
	lineHeight: '24px',
	color: 'black !important',
}));
export const HistoryItemTime = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	fontWeight: 400,
	fontStyle: 'italic',
	lineHeight: '20px',
}));
