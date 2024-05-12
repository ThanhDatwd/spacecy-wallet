import { styled } from '@mui/material';

export const TextArea = styled('textarea')(({ theme }) => ({
	display: 'block',
	border: '1px solid #E7E8EC',
	outline: 'none',
	width: '100%',
	borderRadius: 5,
	padding: '15px',
	fontSize: 16,
	color: theme.palette.text.primary,
	background: '#fff',
	fontStyle: 'italic',
	fontFamily: 'Montserrat,sans-serif',

	'&::placeholder': {
		color: theme.palette.text.primary,
		fontSize: 16,
		fontWeight: 'normal',
		opacity: 0.5,
		fontStyle: 'italic',
		fontFamily: 'Montserrat,sans-serif',
	},
}));
