import { styled, Box } from '@mui/material';
export const RedeemFormWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	padding: '10px 16px',
	zIndex: '0',
	cursor: 'pointer',
	borderRadius: '12px',
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
export const RedeemFormGroup = styled(Box)(({ theme }) => ({
	padding: '8px 0',
}));
export const RedeemFormLabel = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginBottom: '6px',
}));
export const RedeemFormGetBalance = styled(Box)(({ theme }) => ({
	width: 'fit-content',
	display: 'flex',
	alignItems: 'center',
	gap: '10px',
	padding: '4px',
	border: '1.5px solid #E7E8EC',
	borderRadius: '6px',
}));
export const RedeemFormGetBalanceItem = styled(Box)(({ theme }) => ({
	padding: '1px 4px',
	fontSize: '10px',
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
