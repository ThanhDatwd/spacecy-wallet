/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled, Box, Stack, Typography } from '@mui/material';
import BackgroundImage from 'assets/images/home/bg-img.webp';
import style from 'styled-components';

export const FirstSectionHomePage = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	height: '100vh',
	zIndex: 3,
	[theme.breakpoints.down(600)]: {
		paddingTop: 70,
	},
	...(theme.palette.mode === 'light'
		? {
				background: theme.palette.background.pageBackground,
		  }
		: {
				backgroundImage: theme.palette.gradients.secondary,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'bottom',
		  }),
}));

export const OpacityBackground = styled(Box)(({ theme }) => ({
	// Temporarily remove img bg
	// position: 'absolute',
	// top: 0,
	// width: '100%',
	// height: '100%',
	// backgroundImage: `url('${BackgroundImage}')`,
	// opacity: 0.1,
	// zIndex: -2,
}));

export const HeaderSection = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	margin: '0 auto',
}));

export const MainHeader = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
}));

export const SubHeader = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
	maxWidth: 800,
	color: theme.palette.text.secondary,
}));

export const ButtonViewAll = styled('span')(({ theme }) => ({
	cursor: 'pointer',
	fontWeight: 400,
	opacity: 1,
	marginLeft: 10,
	color: theme.palette.text.special,

	'&:hover': {
		textDecoration: 'underline !important',
	},
}));

export const ImgCatchAFish = styled(Box)(({ theme }) => ({
	textAlign: 'center',
	width: 750,
	height: 600,
	margin: 'auto',
	img: {
		width: '100%',
		height: '100%',
	},
	'@media screen and (max-width:1500px)': {
		width: 700,
		height: 600,
	},
	'@media screen and (max-width:992px)': {
		width: 600,
		height: 500,
	},
	'@media screen and (max-width:683px)': {
		width: '80%',
		height: 'auto',
	},
}));

export const HeaderVideoContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	Direction: 'row',
	justifyContent: 'flex-end',
	alignItems: 'flex-end',
	gap: '1rem',
	padding: '4rem 0',
	zIndex: '10',
	marginRight: '3%',
	width: '100%',
	height: '100%',
	maxWidth: '1300px',
	marginLeft: 'auto',
	transition: 'all ease 0.5s',
	// [theme.breakpoints.down(1800)]: {
	// 	marginLeft: '35%',
	// },
	// [theme.breakpoints.down(1500)]: {
	// 	marginLeft: '25%',
	// },
	[theme.breakpoints.down(650)]: {
		padding: '4rem 1rem',
	},
	'@media screen and (max-height:900px)': {
		padding: '2rem 1rem 1rem',
	},
	'@media screen and (max-width:1300px)': {
		maxWidth: '870px',
	},
}));

export const VideoHeader = styled('video')(({ theme }) => ({
	position: 'absolute',
	top: '0',
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	opacity: 0.8,
	zIndex: '-1',
	...(theme.palette.mode === 'light'
		? {
				opacity: 1,
		  }
		: {}),
}));

export const ButtonBlue = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-around',
	width: '9rem',
	borderRadius: '12px',
	padding: '6px 8px',
	textAlign: 'center',
	background: 'rgb(0, 64, 120)',
	marginLeft: '0.5rem',
	color: 'white',
	cursor: 'pointer',

	'&.disabled': {
		background: theme.palette.action.disabled,
		color: 'black',
	},

	'&:not(.disabled):hover': {
		background: 'rgb(0, 64, 150)',
	},
}));

export const TitleWrapper = styled(Box)(({ theme }) => ({
	// marginBottom: '1rem',
	// fontStyle: 'italic',
	// [theme.breakpoints.down(1000)]: {
	// 	fontSize: '36px',
	// },
	[theme.breakpoints.down(1000)]: {
		width: '100%',
		padding: '0 10px',
	},
}));

export const ExploreCollection = styled(Box)(({ theme }) => ({
	position: 'relative',
	padding: ' 48px 0',
	...(theme.palette.mode === 'light'
		? {
				background:
					'linear-gradient(121.92deg, #FFF4FB 0%, rgba(219, 251, 255, 0.515625) 46.73%, #F3FFF9 100.81%, #F3FFF9 100.81%)',
		  }
		: {}),
}));

export const Category = styled(Box)(({ theme }) => ({
	...(theme.palette.mode === 'light'
		? {
				background:
					'linear-gradient(121.92deg, #F3FFF9 0%, rgba(219, 251, 255, 0.515625) 49.66%, #FFF4FB 100.81%)',
		  }
		: {}),
}));
export const BlurBackGround = styled(Box)(({ theme }) => ({
	zIndex: '11',
	height: '140px',
	width: '140px',
	position: 'absolute',
	top: '25%',
	right: '25%',
	// backdropFilter: 'blur(80px)',
	filter: 'blur(160px)',
	borderRadius: '50%',
	transition: 'all ease 2s',
	animation: 'blurMotion 5s infinite',
	'@keyframes blurMotion': {
		'0%': {
			opacity: '0.6',
		},
		'50%': {
			opacity: '0.4',
		},
		'100%': {
			opacity: '0.6',
		},
	},

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: 'blue',
		  }
		: {}),
}));

export const BlurBackGround1 = styled(Box)(({ theme }) => ({
	display: 'none',
	zIndex: '11',
	height: '140px',
	width: '140px',
	position: 'absolute',
	left: '25%',
	bottom: '25%',
	// backdropFilter: 'blur(80px)',
	filter: 'blur(160px)',
	borderRadius: '50%',
	transition: 'all ease 2s',
	animation: 'blurMotion 3s infinite',
	'@keyframes blurMotion': {
		'0%': {
			opacity: '0.8',
		},
		'50%': {
			opacity: '0.6',
		},
		'100%': {
			opacity: '0.8',
		},
	},

	...(theme.palette.mode === 'light'
		? {
				display: 'block',
				backgroundColor: 'green',
		  }
		: {}),
}));

// HomeNew
export const CardRef = styled(Box)(({ theme }) => ({
	backdropFilter: 'blur(2px)',
	height: '850px',
	padding: '24px',
	borderRadius: '24px',
	position: 'relative',

	[theme.breakpoints.down(500)]: {
		height: '720px',
	},
	...(theme.palette.mode === 'light'
		? {
				background: theme.palette.primaryLight.dark,
		  }
		: {
				background: 'rgba(177, 218, 255, 0.45)',
		  }),
}));

export const BoxTitleWrapper = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '28px',
	right: '28px',
	// backdropFilter: 'blur(4px)',
	padding: '4px 8px',
	borderRadius: '8px',
	...(theme.palette.mode === 'light'
		? {
				// background: theme.palette.primaryLight.dark,
		  }
		: {
				// background: 'rgba(177, 218, 255, 0.45)',
		  }),
}));

export const GalleryList = style.div`
	padding: 2rem;
	border-radius: 24px;
	background: rgba(177, 218, 255, 0.45);
	display: flex;
	gap: 8px;
	@media (max-width: 992px) {
		padding: 16px;
	}
	@media (max-width: 683px) {
		flex-direction: column;
	}
`;
export const GalleryItemLeft = style.div`
	width: 50%;
	& div:first-child {
		// margin-bottom: 8px;
	}
	& div:last-child { 
		display: flex;
		gap: 8px;
	}
	@media (max-width: 683px) {
		width: 100%;
	}
`;
export const GalleryItemRight = style.div`
	width: 50%;
	display: flex;
	gap: 8px;
	& div img:first-child { 
		margin-bottom: 8px;
	}
	@media (max-width: 683px) {
		width: 100%;
	}
`;

export const BrandWraper = styled(Box)(({ theme }) => ({
	[theme.breakpoints.down(1300)]: {
		img: {
			maxWidth: '80%',
		},
	},
}));
