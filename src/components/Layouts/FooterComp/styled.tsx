import { Box, styled } from '@mui/material';
import background from 'assets/background-footer.webp';
import backgroundtablet from 'assets/background-footer-tablet.webp';

export const BigContainer = styled(Box)(({ theme }) => ({
	padding: '0 0rem 6rem 0rem',
	maxWidth: '1600px',
	margin: '0 auto',
	// marginLeft: 'auto',
	'@media screen and (max-width: 900px)': { padding: '0 1rem 4rem' },
	'@media screen and (max-width: 600px)': { padding: '0 8px 8px 8px' },
}));
export const FooterWrap = styled('footer')(({ theme }) => ({
	// borderRadius: '12px',
	background: `url(${background})`,
	backgroundPosition: 'left bottom',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',

	'@media screen and (max-width: 1582px)': { backgroundPosition: 'center center' },
	...(theme.palette.mode === 'light' && {
		background: `linear-gradient(180deg, #E0F4FF 0%, #FFFFFF 100%)`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
	}),
	'@media screen and (max-width: 1017px)': {
		background: `url(${backgroundtablet})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center bottom',
		...(theme.palette.mode === 'light' && {
			background: `linear-gradient(180deg, #E0F4FF 0%, #FFFFFF 100%)`,
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center center',
		}),
	},
}));

export const GridContent = styled(Box)({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	flexWrap: 'nowrap',
	gap: '18px',

	'@media screen and (min-width: 768px)': {},
	'@media screen and (max-width: 1600px)': {
		flexWrap: 'wrap',
	},
});
export const BrandWrap = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	textAlign: 'left',
	width: '35%',
	marginTop: '32px',
	'@media screen and (max-width: 1800px)': { padding: '0 0 0 70px' },
	'@media screen and (max-width: 1600px)': {
		width: '100%',
		alignItems: 'center',
		padding: 0,
		textAlign: 'center',
	},
	'@media screen and (max-width: 600px)': {
		width: '100%',
		alignItems: 'center',
		padding: '0',
	},
});
export const LogoLink = styled('a')(({ theme }) => ({
	color: 'inherit',
	textDecoration: 'none',
	marginBottom: '1.5rem',
	display: 'inline-block',
	marginTop: '-12px',

	flexShrink: 0,
	'.logoMobile': {
		width: '200px',
	},
	'.logoPC': {
		width: '320px',
	},
	'@media screen and (max-width: 450px)': {
		'.logoMobile': {
			display: 'block',
		},
		'.logoPC': {
			display: 'none',
		},
	},
	'@media screen and (min-width: 450px)': {
		'.logoMobile': {
			display: 'none',
		},
		'.logoPC': {
			display: 'block',
		},
	},
}));
export const FooterText = styled('p')(({ theme }) => ({
	marginBottom: '2rem',
	marginRight: '1rem',
	'@media screen and (max-width: 768px)': {
		textAlign: 'center',
		marginRight: 'unset',
	},
}));
export const SocialWrap = styled('div')({
	display: 'flex',
});
export const SocialIconLink = styled('a')(({ theme }) => ({
	color: 'inherit',
	textDecoration: 'none',
	marginRight: '1.25rem',
	// width: '1.25rem',
	height: '1.25rem',
	transition: 'all 0.4s',
	img: {
		transition: 'all 0.4s',
	},
	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			'img:hover': {
	// 				filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(223deg) brightness(97%) contrast(107%)',
	// 			},
	// 	  }
	// 	: {
	// 			'img:hover': {
	// 				filter: 'invert(0%) sepia(100%) saturate(0%) hue-rotate(106deg) brightness(102%) contrast(103%)',
	// 			},
	// 	  }),
}));
export const DetailColumn = styled('div')({
	width: '160px',
	marginTop: '32px',

	// '@media screen and (min-width: 768px)': {
	// 	width: '160px',
	// },
	'@media screen and (max-width: 600px)': {
		width: '100%',
	},
});
export const DetailTitle = styled('h3')(({ theme }) => ({
	marginBottom: '1.5rem',
	fontSize: '.875rem',
	lineHeight: 'normal',
	...(theme.palette.mode === 'light'
		? {
				color: 'rgba(19, 23, 64, 1)',
		  }
		: {
				color: 'white',
		  }),
}));
export const DetailList = styled('ul')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	listStyle: 'none',
	...(theme.palette.mode === 'light'
		? {}
		: {
				color: 'rgba(90, 93, 121, 1)',
		  }),
}));
export const ListRow = styled('li')({});
export const DetailLink = styled('a')(({ theme }) => ({
	textDecoration: 'none',
	// fontWeight: '500',
	transition: 'all 0.4s',
	...(theme.palette.mode === 'light'
		? {
				color: 'rgba(90, 93, 121, 1)',
		  }
		: {
				color: 'white',
		  }),
	'&:hover': {
		color: theme.palette.primary.light,
	},
}));

export const DetailContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	// width: '60%',
	// marginLeft: '32px',
	flexWrap: 'wrap',
	gap: '20px',
	// flexGrow: '1',
	width: '100%',
	justifyContent: 'space-between',
	'@media screen and (max-width: 1600px)': {
		width: '100%',
		gap: '15px',
		justifyContent: 'space-evenly',
		textAlign: 'center',
	},
	'@media screen and (max-width: 900px)': {
		width: '100%',
		gap: '15px',
		display: 'grid',
		gridTemplateColumns: 'repeat(4,1fr)',
	},
	'@media screen and (max-width: 750px)': {
		justifyContent: 'space-between',
		display: 'grid',
		gridTemplateColumns: 'repeat(3,1fr)',
	},
	'@media screen and (max-width: 600px)': {
		width: '100%',
		gap: '8px',
		display: 'grid',
		gridTemplateColumns: 'repeat(2,1fr)',
	},
	'& div:nth-child(4)': {
		// width: '185px',
	},
}));
