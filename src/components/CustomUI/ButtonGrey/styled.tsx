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
	// color: 'white',
	background: 'rgba(50,50,50,0.25)',
	transition: '0.5s ease all',
	fontWeight: 400,
	backdropFilter: 'filter(blur(4px))',
	border: `1px solid ${theme.palette.primaryDark.border}`,
	opacity: '0.8',
	marginBottom: '50px',

	'&:focus': {
		outline: 'none',
	},

	'&:hover': {
		background: theme.palette.primaryDark.buttonBackgroundHover,
		opacity: '1',
	},

	'&:disabled': {
		backgroundImage: 'unset',
		background: theme.palette.action.disabled,
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
