import { styled, Button } from '@mui/material';

export const ButtonStyled = styled(Button)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	width: '100%',
	cursor: 'pointer',
	borderRadius: '12px',
	outline: 'none',
	background: 'rgba(157, 195, 230, 0.6)',
	transition: '0.5s ease all',
	fontWeight: 600,
	fontStyle: 'italic',
	backdropFilter: 'filter(blur(4px))',
	marginBottom: '50px',

	'&:focus': {
		outline: 'none',
	},

	'&:hover': {
		transform: 'scale(1.1)',
		background: 'rgba(157, 195, 230, 0.6)',
	},

	'&:disabled': {
		backgroundImage: 'unset',
		color: 'black',
	},
	...(theme.palette.mode === 'light'
		? {
				color: 'black',
		  }
		: {
				color: 'white',
		  }),
}));
