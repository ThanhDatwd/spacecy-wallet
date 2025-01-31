import { styled, Card, Typography, Box, Button } from '@mui/material';

export const ItemCardStyle = styled(Card)(({ theme }) => ({
	// transition: 'all .3s cubic-bezier(0,0,.5,1)',
	WebkitTransition: '0.2s all ease-out',
	MozTransition: '0.2s all ease-out',
	OTransition: '0.2s all ease-out',
	transition: '0.2s all ease-out',
	maxWidth: 320,

	...(theme.palette.mode === 'light'
		? {
				boxShadow: theme.customShadows.cardLight,
		  }
		: {
				// border: '2px solid',
				borderColor: theme.palette.primary.main,
				background: theme.palette.gradients.fourth,
		  }),

	'&:hover': {
		...(theme.palette.mode === 'light'
			? {
					boxShadow: theme.customShadows.cardLightHover,
					transform: 'scale(1.01)',
			  }
			: {
					transform: 'scale(1.01)',
					background: theme.palette.gradients.third,
					// transition: 'background 2s ease',
			  }),
	},
}));

export const ItemImage = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	paddingTop: '100%',
	borderRadius: '10px',
	overflow: 'hidden',

	img: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		maxHeight: '100%',
	},
}));

export const PriceStyle = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.primary,
}));

export const PriceChangeStyle = styled(Typography)(({ theme }) => ({
	fontStyle: 'italic',
}));

export const ImageBlockchain = styled(Box)(({ theme }) => ({
	width: 20,
	height: 20,
	borderRadius: '50%',
	overflow: 'hidden',

	img: {
		width: '100%',
		height: '100%',
	},
}));

export const ItemFooter = styled(Box)(({ theme }) => ({
	borderRadius: theme.shape.borderRadiusSm,
	overflow: 'hidden',
	position: 'relative',
	marginTop: 2,

	'&::before': {
		content: '""',
		position: 'absolute',
		height: '100%',
		width: '100%',
		opacity: 0.2,
		zIndex: -1,

		...(theme.palette.mode === 'light'
			? {
					backgroundColor: theme.palette.primaryLight.darker,
			  }
			: {
					backgroundColor: theme.palette.primary.light,
			  }),
	},
}));

export const AvatarIcon = styled(Box)(({ theme }) => ({
	transition: 'all 0.6s ease',
	cursor: 'pointer',
	':hover': {
		zIndex: 3,
		transform: 'translateY(-5px)',
	},
}));

export const GradIcon = styled(Box)({
	borderRadius: '50%',
	width: 25,
	height: 25,
});

export const MediaWrapperAuction = styled(Box)({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxHeight: '100%',
	maxWidth: '100%',

	video: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		maxHeight: '100%',
		maxWidth: '100%',
	},
});

export const PlayBtn = styled(Box)(({ theme }) => ({
	position: 'absolute',
	bottom: 0,
	left: 0,
	zIndex: 2,
	borderRadius: '50%',
	width: 32,
	height: 32,

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: '#D8D8D8',
				'&:hover': {
					backgroundColor: '#BBBBBB',
				},
		  }
		: {
				backgroundColor: 'rgb(53, 56, 64)',
				'&:hover': {
					backgroundColor: '#595B64',
				},
		  }),
}));

export const MediaErrorContent = styled(Box)({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 10,
	textAlign: 'center',
});

export const ErrorContent = styled(Box)({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 10,
	textAlign: 'center',
});

export const CoverHidenBox = styled(Box)({
	background: 'none',
	paddingTop: '30px',
	position: 'relative',
});
export const BoxCountDown = styled(Box)(({ theme }) => ({
	position: 'absolute',
	height: '2.5rem',
	width: '60%',
	zIndex: '2',
	left: 'calc(25% - 8px)',
	padding: '0.5rem',
	'&::after': {
		content: '""',
		position: 'absolute',
		top: '0',
		left: 0,
		width: '100%',
		height: '100%',
		backdropFilter: 'blur(3px) brightness(160%)',
		background: 'rgba(255,255,255,0.2)',
		zIndex: '-1',
		borderRadius: '8px',
	},
}));

export const ButtonWhiteBlur = styled(Button)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	textAlign: 'center',
	height: '2.5rem',
	width: '80%',
	cursor: 'pointer',
	outline: 'none',
	border: 'none',
	transition: '0.5s all',
	fontWeight: 400,
	margin: '0 auto',
	color: theme.palette.mode === 'light' ? 'black' : 'white',
	'&::after': {
		content: '""',
		position: 'absolute',
		top: '0',
		left: 0,
		width: '100%',
		height: '100%',
		backdropFilter: 'blur(3px) brightness(100%)',
		background: 'rgba(255,255,255,0.07)',
		zIndex: '-1',
		borderRadius: '12px',
		boxShadow: '0px 0px 4px 1px rgba(0,0,0,0.1)',
	},
	'&:hover': {
		width: '90%',
		transform: 'scale(1.01)',
		borderRadius: '12px',
		backgroundImage: theme.palette.gradients.main,
	},
}));

export const Cover = styled(Box)({
	borderRadius: '50%',
	width: 25,
	height: 25,
});

export const ButtonStyled = styled(Button)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	width: '100%',
	cursor: 'pointer',
	borderRadius: '12px',
	outline: 'none',
	color: 'white',
	backgroundImage: theme.palette.gradients.main,
	border: 'none',
	transition: '0.5s all',
	fontWeight: 400,

	'&:focus': {
		outline: 'none',
	},
	'&:hover': {
		transition: '0.5s all',
		backgroundSize: '200%',
		backgroundPosition: 'right center',
		boxShadow: 'none',
	},
}));
