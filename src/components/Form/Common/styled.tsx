import { styled, Typography, Box, Button, Slider, DialogContent, Dialog } from '@mui/material';

export const ErrorMessage = styled(Typography)(({ theme }) => ({
	color: 'red',
	fontStyle: 'italic',
	fontSize: 14,
	marginTop: 3,
	'&::before': {
		content: '"*"',
	},
}));

export const Asterisk = styled('span')(({ theme }) => ({
	color: 'red',
	'&::before': {
		content: '"*"',
		fontSize: 18,
	},
}));
export const FormWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	padding: '40px 20px',
	transition: 'all ease 0.5s',
	border: '1.8px solid #ffff',
	background: '#ffff',
	zIndex: '0',
	// cursor: 'pointer',
	borderRadius: '5px',
	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			background: theme.palette.primaryLight.lighter,
	// 			// boxShadow: theme.customShadows.cardLight,
	// 	  }
	// 	: {
	// 			border: '1px solid',
	// 			borderColor: theme.palette.primary.main,
	// 			background: theme.palette.gradients.fourth,
	// 			boxShadow: `0 7px 12px rgba(0, 0, 0, 0.2), 0 4px 4px rgba(0, 0, 0, 0.2)`,
	// 	  }),
}));
export const FormHeader = styled(Box)(({ theme }) => ({
	marginBottom: '10px',
}));
export const FormFooter = styled(Box)(({ theme }) => ({
	marginTop: '20px',
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
	fontSize: '16px',
	fontWeight: 500,
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
	cursor: 'pointer',
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
	fontStyle: 'italic',
	borderTopLeftRadius: '0',
	borderBottomLeftRadius: '0',
	// pointerEvents: 'none',
	'&:hover': {
		background: '#007AFF4D',
	},
}));
export const PrettoSlider = styled(Slider)({
	// color: '#52af77',
	height: 8,
	'& .MuiSlider-track': {
		border: 'none',
	},
	'& .MuiSlider-thumb': {
		height: 24,
		width: 24,
		backgroundColor: '#fff',
		// background:
		// 	'url("https://blogs.airdropalert.com/wp-content/uploads/2021/04/pancakeswap-guide-994x559.png")',
		border: '2px solid currentColor',
		'&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
			boxShadow: 'inherit',
		},
		'&:before': {
			display: 'none',
		},
	},
	'& .MuiSlider-valueLabel': {
		lineHeight: 1.2,
		fontSize: 12,
		background: 'unset',
		padding: 0,
		width: 32,
		height: 32,
		borderRadius: '50% 50% 50% 0',
		backgroundColor: '#52af37',
		transformOrigin: 'bottom left',
		transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
		'&:before': { display: 'none' },
		'&.MuiSlider-valueLabelOpen': {
			transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
		},
		'& > *': {
			transform: 'rotate(45deg)',
		},
	},
});
export const DialogStyle = styled(Dialog)(({ theme }) => ({
	'.css-1u16n06-MuiPaper-root-MuiDialog-paper.MuiPaper-rounded': {
		borderRadius: '24px',
	},
	'.MuiBackdrop-root.css-1m9bonx-MuiBackdrop-root-MuiDialog-backdrop': {
		background: 'rgba(0,0,0,0.1) !important',
		backdropFilter: 'blur(8px)',
	},
}));
export const DialogContentStyle = styled(DialogContent)(({ theme }) => ({
	width: '450px',
	maxWidth: '100%',
	borderRadius: '0px !important',
	position: 'relative',
	padding: '20px 20px 40px 20px',
}));
export const DialogHeaderStyle = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '20px',
	borderBottom: '1px solid #D9D9D9',
}));
export const DialogClose = styled(Box)({
	cursor: 'pointer',
	position: 'absolute',
	zIndex: 1001,
	top: '20px',
	right: '1rem',
	':hover': {
		opacity: 0.5,
	},
});
