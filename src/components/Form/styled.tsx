import { styled, Box, Button } from '@mui/material';
export const FormWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	padding: '44px 20px',
	zIndex: '0',
	cursor: 'pointer',
	borderRadius: '5px',
	transition: 'all ease 0.5s',
	border: '1.8px solid #ffff',
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
export const FormHeader = styled(Box)(({ theme }) => ({
	marginBottom: '20px',
}));
export const FormGroup = styled(Box)(({ theme }) => ({
	padding: '8px 0',
}));
export const FormFlex = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
}));
export const FormLabe = styled(Box)(({ theme }) => ({
	fontSize: '20px',
	fontWeight: 600,
	fontStyle: 'italic',
}));
export const FormTitle = styled(Box)(({ theme }) => ({
	fontSize: '24px',
	fontWeight: 600,
	fontStyle: 'italic',
}));
export const FormTypographySm = styled(Box)(({ theme }) => ({
	fontSize: '14px',
	fontWeight: 400,
	fontStyle: 'italic',
}));
export const FormLabelTxt = styled(Box)(({ theme }) => ({
	fontSize: '20px',
}));

export const FormGetBalance = styled(Box)(({ theme }) => ({
	width: 'fit-content',
	display: 'flex',
	alignItems: 'center',
	gap: '10px',
	padding: '4px',
	border: '1.5px solid #E7E8EC',
	borderRadius: '6px',
}));
export const FormGetBalanceItem = styled(Box)(({ theme }) => ({
	padding: '1px 4px',
	fontSize: '12px',
	display: 'inline',
	borderRadius: '3px',
	'&:focus': {
		outline: 'none',
	},

	'&:hover': {
		background: theme.palette.primary.light,
		color: theme.palette.primaryLight.lighter,
		borderColor: theme.palette.primary.light,
	},
}));
export const TimeStyle = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '10px 16px',
	background: '#007AFF',
	borderRadius: '5px',
	fontSize: '20px',
	fontWeight: 500,
	color: '#ffff',
	marginBottom: '6px',
}));
export const ListItemCustom = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '8px',
	borderBottom: '1px solid #E7E8EC',
}));
export const ButtonStyle = styled(Button)(({ theme }) => ({
	background: '#007AFF4D',
	color: '#007AFF',
	fontSize: '16px',
	fontWeight: '700',
	borderTopLeftRadius: '0',
	borderBottomLeftRadius: '0',
	pointerEvents: 'none',
	'&:hover': {
		background: '#007AFF4D',
	},
}));
