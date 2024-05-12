import { styled, Button } from '@mui/material';

export const ButtonStyled = styled(Button)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	width: '100%',
	cursor: 'pointer',
	borderRadius: '12px',
	fontStyle: 'italic',
	outline: 'none',
	color: 'black',
	transition: '0.5s all',
	fontWeight: 400,
	border: '1px solid rgba(157, 195, 230, 1)',
	padding: '16px 0',
	minWidth: '48px',
	background: '#fff',

	'&:focus': {
		outline: 'none',
	},

	'&:hover': {
		transition: '0.5s all',
		transform: 'scale(1.1)',
		background: '#fff',
	},

	'&:disabled': {
		backgroundImage: 'unset',
		background: theme.palette.action.disabled,
		color: 'black',
	},
	...(theme.palette.mode === 'light' ? {} : {}),
}));
