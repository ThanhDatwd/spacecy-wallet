import { Box, Stack, styled, Typography } from '@mui/material';

export const ConnectWalletContainer = styled('div')(({ theme }) => ({
	position: 'relative',
	whiteSpace: 'nowrap',
	display: 'flex',
	borderRadius: '50%',
	overflow: 'hidden',
	// margin: '0 !important',

	'&::before': {
		content: '""',
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: -1,

		...(theme.palette.mode === 'light'
			? {
					backgroundColor: theme.palette.primaryLight.main,
			  }
			: {
					// backgroundColor: theme.palette.primary.main,
			  }),
	},
	...(theme.palette.mode === 'light'
		? {
				boxShadow: '2px 2px 2px rgb(0 0 0 / 20%)',
		  }
		: {}),
}));

export const EthIconStyle = styled('img')({
	width: '20px',
	height: '20px',
	margin: '0 6px 0 10px',
});

export const BalanceTxt = styled(Typography)({
	paddingRight: '10px',
	fontWeight: 400,
});

//Model account
export const InfoAddress = styled('div')({
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
});

export const InfoAddressTop = styled('div')({
	padding: '10px 0px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100%',
	p: {
		fontSize: '14px',
		fontWeight: '500',
		color: '#ffffff',
	},
});

export const InfoAddressTopChange = styled('div')({
	width: '70px',
});

export const InfoAddressMiddle = styled('div')({
	padding: '10px 0px',
	display: 'flex',
	width: '100%',
	flexDirection: 'column',
	alignItems: 'flexStart',
});

export const ViewAddress = styled('div')({
	cursor: 'pointer',
	paddingBottom: '10px',
	color: '#ffffff',
	fontWeight: 500,
	fontSize: '16px',
	marginBottom: '5px',
});

export const ViewEtherScan = styled('div')({
	color: '#ffffff',
	fontSize: '12px',
	a: {
		display: 'flex',
		alignItems: 'center',
		span: {
			color: '#ffffff',
			'&:hover': {
				textDecoration: 'underline !important',
			},
		},
		'&:hover': {
			textDecoration: 'underline !important',
		},
	},
});

export const InfoAddressBottom = styled('div')({
	position: 'relative',
	padding: '20px 0px',
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	color: '#ffffff',
	'&::after': {
		content: '""',
		position: 'absolute',
		width: '100%',
		top: 0,
		left: 0,
		backgroundImage:
			'linear-gradient(to right,rgba(7, 104, 255, 0),#0768ff 53%,rgba(7, 104, 255, 0))',
		height: '0.9px',
	},
});

// Modal wallet
export const ConfirmBox = styled(Box)(({ theme }) => ({
	width: '280px',
	margin: '0 auto',
	padding: '1rem',
	borderRadius: '12px',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.dark,
		  }
		: {
				backgroundColor: theme.palette.primaryDark.backgroundCard,
		  }),

	span: {
		fontStyle: 'italic',
		fontWeight: 550,
	},

	a: {
		margin: '0 3px',
		color: theme.palette.primary.light,
		':hover': {
			borderBottom: '1px solid',
			borderColor: theme.palette.primary.light,
		},
	},
	'@media screen and (max-width: 576px)': {
		fontSize: '12px',
	},
}));

export const ContentWalletConnect = styled(Box)({
	width: '100%',
	maxHeight: '65vh',
	overflowY: 'auto',
	'@media screen and (max-width: 1280px)': {
		maxHeight: '60vh',
	},
	'@media screen and (max-width: 960px)': {
		padding: '1rem',
	},
	'@media screen and (max-width: 768px)': {
		maxHeight: '50vh',
	},
	WebkitOverflowScrolling: 'touch',
	'&::-webkit-scrollbar': {
		display: 'block',
		width: 3,
		height: 10,
	},
	'&::-webkit-scrollbar-track': {
		display: 'block',
		marginLeft: 10,
		background: '#0c5599',
		borderRadius: 5,
	},
	'&::-webkit-scrollbar-thumb': {
		display: 'block',
		marginLeft: 10,
		background: '#65b8ff',
		borderRadius: 5,
	},
	'@media screen and (max-width: 1025px)': {
		width: '100%',
		margin: '0 auto',
		overflowX: 'auto',
		'&::-webkit-scrollbar': {
			height: 3,
		},
	},
});

export const WalletList = styled(Box)(({ theme }) => ({
	width: '100%',
	padding: '2rem',
	borderRadius: theme.shape.borderRadiusLg,
	display: 'flex',
	flexWrap: 'wrap',
	gap: '5px',
	justifyContent: 'space-evenly',
	'@media screen and (max-width: 960px)': {
		padding: '0',
		paddingBottom: '2rem',
	},
}));

export const WalletItem = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	WebkitBoxPack: 'center',
	borderRadius: '10px',
	cursor: 'pointer',
	justifyContent: 'space-between',
	alignItems: 'center',
	':hover': {
		backgroundColor: 'rgb(255, 255, 255, 0.1)',
	},
	a: {
		display: 'flex',
		flexDirection: 'row',
		WebkitBoxPack: 'center',
		justifyContent: 'center',
		color: 'white',
		alignItems: 'center',
		gap: '8px',
		// textDecoration: 'none',
		// ':hover': {
		// 	borderBottom: '1px solid',
		// 	borderColor: theme.palette.primary.light,
		// },
	},
	'@media screen and (max-width: 1024px)': {},
	'@media screen and (max-width: 576px)': {},
}));

export const WalletImage = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '8px',
	img: {
		width: '48px',
		height: '48px',
	},
});

export const WalletName = styled(Typography)(({ theme }) => ({
	fontSize: '12.5px',
	fontWeight: 500,
	color: theme.palette.primary.dark,
}));

export const Learnmore = styled(Box)(({ theme }) => ({
	width: '100%',
	textAlign: 'center',
	paddingBottom: '2rem',
	a: {
		margin: '0 3px',
		color: theme.palette.primary.light,
		':hover': {
			borderBottom: '1px solid',
			borderColor: theme.palette.primary.light,
		},
	},
	'@media screen and (max-width: 576px)': {
		fontSize: '12px',
	},
}));

export const ConnectingBox = styled(Box)(({ theme }) => ({
	padding: '2rem',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	width: '100%',
}));

export const Initializing = styled(Box)(({ theme }) => ({
	width: '100%',
	padding: '1rem',
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center',
	borderRadius: '12px',
	marginBottom: '20px',
	border: '1px solid',
	borderColor: theme.palette.primaryDark.border,
}));

export const CurrentWallet = styled(Box)({
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	img: {
		width: '50px',
		height: '50px',
	},
});

export const TryAgainBtn = styled('div')(({ theme }) => ({
	outline: 'none',
	fontSize: '12px',
	fontWeight: 600,
	borderRadius: '8px',
	color: 'white',
	marginLeft: '1rem',
	padding: '0.5rem',
	backgroundColor: theme.palette.primary.dark,
	transition: '0.5s all',
	cursor: 'pointer',
	'&:focus': {
		outline: 'none',
	},
	'&:hover': {
		transition: '0.5s all',
		backgroundColor: theme.palette.primary.darker,
	},
}));

export const DropDownContent = styled(Stack)(({ theme }) => ({
	display: 'none',
	position: 'absolute',
	marginTop: '2.5rem',
	right: 0,
	minWidth: 180,
	borderRadius: 12,
	zIndex: 100,
	animation: 'smoothAppear 0.5s',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.lighter,
				boxShadow: theme.customShadows.cardLightHover,
		  }
		: {
				background: '#89AED0',
		  }),

	'&.active': {
		display: 'block',
	},
}));
