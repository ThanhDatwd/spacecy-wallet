import { styled, Box, Typography } from '@mui/material';
export const PDWrapperH = styled(Box)(({ theme }) => ({
	position: 'relative',
	padding: '16px 24px',
	zIndex: '0',
	cursor: 'pointer',
	borderRadius: '12px',
	transition: 'all ease 0.5s',
	border: '1.8px solid #E7E8EC',
	overflow: 'hidden',
	...(theme.palette.mode === 'light'
		? {
				background: theme.palette.primaryLight.lighter,
				// boxShadow: theme.customShadows.cardLight,
		  }
		: {
				border: '1px solid',
				borderColor: theme.palette.primary.main,
				background: theme.palette.gradients.fourth,
				boxShadow: `0 7px 12px rgba(0, 0, 0, 0.2), 0 4px 4px rgba(0, 0, 0, 0.2)`,
		  }),
}));
export const HistoryListItem = styled(Box)(({ theme }) => ({
	height: '100%',
	overflow: 'auto',
	padding: '0 10px',
	'&::-webkit-scrollbar': {
		width: '2px',
		background: '#007aff',
		borderRadius: '8px',
		innerHeigh: '10px',
	},
	'&::-webkit-scrollbar-thumb': {
		background: '#5ac8fa',
	},
}));
export const HistoryItem = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '10px 0',
}));
export const HistoryItemContent = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: '16px',
}));

export const HistoryItemName = styled(Typography)(({ theme }) => ({
	fontSize: '16px',
	fontWeight: 500,
	lineHeight: '24px',
}));
export const HistoryItemTime = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	fontWeight: 400,
	fontStyle: 'italic',
	lineHeight: '20px',
}));

// export const HistoryItemImage = {
// 	width: '44px',
// 	height: '44px',
// 	borderRadius: '4px',
// };
export const HistoryItemImage = styled(Box)(({ theme }) => ({
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
