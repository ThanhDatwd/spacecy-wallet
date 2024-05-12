import { styled, Box, Typography } from '@mui/material';
export const EventCardWrapperNew = styled(Box)(({ theme }) => ({
	// position: 'relative',
	padding: '16px',
	zIndex: '2',
	cursor: 'pointer',
	borderRadius: '12px',
	transition: 'all ease 0.5s',
	border: '1.8px solid #E7E8EC',
	color: '#131740',
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
export const EventCardHeader = styled(Box)(({ theme }) => ({
	display: 'flex',
	gap: '10px',
	alignItems: 'center',
}));
export const EventCardTitle = styled(Typography)(({ theme }) => ({
	fontSize: '16px',
	fontWeight: 700,
	marginBottom: '20px',
	marginTop: '10px',
}));
export const EventCardText = styled(Typography)(({ theme }) => ({
	fontSize: '12px',
	fontWeight: 500,
}));
export const EventCardTextEllips = styled(Typography)(({ theme }) => ({
	fontSize: '12px',
	fontWeight: 500,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
}));
export const EventCardGroupImage = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	height: '100%',
	'@media screen and (max-width:1000px)': {
		aspectRatio: '1/1',
	},
}));
export const EventCardImage = {
	position: 'absolute',
	width: '100%',
	height: '100%',
	// height: 'auto',
	// height: '200px',
	borderRadius: '8px',
};
export const EventCardSubTitle = styled(Typography)(({ theme }) => ({
	fontSize: '9px',
	fontWeight: 500,
}));
export const EventCardGroupChart = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'flex-start',
	height: '110px',
	overflow: 'hidden',
	gap: '10px',
}));
export const EventCardListNote = styled(Box)(({ theme }) => ({
	width: '60%',
	height: '100%',
	padding: '0 8px',
	overflow: 'auto',
	overflowX: 'hidden',
	'&::-webkit-scrollbar': {
		width: '2px',
		background: '#007aff',
		borderRadius: '8px',
	},
	'&::-webkit-scrollbar-thumb': {
		background: '#5ac8fa',
	},
}));
export const EventCardListNoteItem = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	lineHeight: '16px',
}));
export const Circle = styled(Box)(({ theme }) => ({
	height: '5px',
	width: '5px',
	padding: '4px',
	borderRadius: '50%',
	background: 'rgb(38 166 154)',
}));
export const styleButtonDisabled = {
	backgroundImage: 'unset',
	background: '#E1E1E1',
	borderColor: '#D9D9D9',
	color: '#A1A2B3',
	'&:hover': {
		backgroundImage: 'unset',
		background: '#E1E1E1',
		borderColor: '#D9D9D9',
		color: '#A1A2B3',
	},
};
