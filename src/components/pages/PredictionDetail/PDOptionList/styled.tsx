import { styled, Box, Typography } from '@mui/material';
export const OptionListTitle = styled(Typography)(({ theme }) => ({
	fontSize: '20px',
	fontWeight: 700,
}));
export const OptionList = styled(Box)(({ theme }) => ({
	height: '100%',
	overflow: 'auto',
	paddingTop: '10px',
	paddingRight: '8px',
	paddingBottom: '40px',
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

export const OptionItem = styled(Box)(({ theme }) => ({
	display: 'flex',
	fontSize: '14px',
	fontWeight: 400,
	padding: '10px 0',
}));
