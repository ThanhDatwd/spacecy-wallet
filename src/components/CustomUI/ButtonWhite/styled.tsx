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
	background: theme.palette.primaryLight.lighter,
	transition: '0.5s ease all',
	fontSize: 16,
	fontWeight: 500,
	fontStyle: 'italic',
	backdropFilter: 'filter(blur(4px))',
	border: '1.5px solid #E7E8EC',
	padding: '8px 32px',
	color: '#5A5D79',
	'&:focus': {
		outline: 'none',
	},

	'&:hover': {
		background: theme.palette.primary.light,
		color: theme.palette.primaryLight.lighter,
		boxShadow: '0px 3px 6px rgba(13, 16, 45, 0.3)',
		borderColor: theme.palette.primary.light,
	},

	'&:disabled': {
		backgroundImage: 'unset',
		background: theme.palette.action.disabled,
		borderColor: theme.palette.action.disabled,
		color: 'black',
	},
	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			color: 'black',
	// 	  }
	// 	: {
	// 			color: 'white',
	// 	  }),
}));
