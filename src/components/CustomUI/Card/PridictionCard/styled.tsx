import { styled, Box, Typography } from '@mui/material';
export const PredictionCardWrapperNew = styled(Box)(({ theme }) => ({
	position: 'relative',
	padding: '16px',
	zIndex: '2',
	cursor: 'pointer',
	borderRadius: '12px',
	transition: 'all ease 0.5s',
	border: '1.8px solid #E7E8EC',
	...(theme.palette.mode === 'light'
		? {
				background: theme.palette.primaryLight.lighter,
				// boxShadow: theme.customShadows.cardLight,
				'&:hover': {
					boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.25)',
				},
		  }
		: {
				border: '1px solid',
				borderColor: theme.palette.primary.main,
				background: theme.palette.gradients.fourth,
				boxShadow: `0 7px 12px rgba(0, 0, 0, 0.2), 0 4px 4px rgba(0, 0, 0, 0.2)`,
				'&:hover': {
					background: theme.palette.gradients.third,
					boxShadow: theme.customShadows.cardDarkHover,
				},
		  }),
}));
export const PredictionCardHeader = styled(Box)(({ theme }) => ({
	display: 'flex',
	gap: '40px',
	alignItems: 'flex-start',
}));
export const PredictionCardTitle = styled(Typography)(({ theme }) => ({
	fontSize: '1rem',
	fontWeight: 700,
	marginBottom: '20px',
	marginTop: '10px',
}));
export const PredictionCardText = styled(Typography)(({ theme }) => ({
	fontSize: '12px',
	fontWeight: 400,
}));
export const PredictionCardTextEllips = styled(Typography)(({ theme }) => ({
	fontSize: '12px',
	fontWeight: 400,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
}));
export const PredictionImage = {
	width: '100%',
	height: '180px',
	// height: 'auto',
	borderRadius: '8px',
};
export const PredictionCardSubTitle = styled(Typography)(({ theme }) => ({
	fontSize: '12px',
	fontWeight: 700,
}));
export const PredictionCardGroupChart = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'flex-start',
	height: '110px',
	overflow: 'hidden',
	gap: '10px',
}));
export const PredictionListNote = styled(Box)(({ theme }) => ({
	width: '60%',
	height: '100%',
	padding: '0 8px',
	overflow: 'auto',
	'&::-webkit-scrollbar': {
		width: '2px',
		background: '#007aff',
		borderRadius: '8px',
	},
	'&::-webkit-scrollbar-thumb': {
		background: '#5ac8fa',
	},
}));
export const PredictionListNoteItem = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	lineHeight: '16px',
	justifyContent: 'space-between',
}));
export const Circle = styled(Box)(({ theme }) => ({
	height: '5px',
	width: '5px',
	padding: '4px',
	borderRadius: '50%',
	background: 'rgb(38 166 154)',
}));
