import { Box, Link, styled } from '@mui/material';

// export const mainNavBarBreakpoint = '1200';

export const NavBar = styled(Box)({
	'@media screen and (max-width: 1400px)': {
		'.menuSmallScreen': {
			display: 'block',
		},
		'.menuBigScreen': {
			display: 'none',
		},
	},
	// '@media screen and (max-width: 1900px)': {
	// 	'.menuSmallScreen': {
	// 		display: 'none',
	// 	},
	// 	'.menuBigScreen': {
	// 		display: 'block',
	// 	},
	// },
});

// -----------------------------BIG SCREEN --------------------------------

export const NavigationBarBigScreen = styled('ul')({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	gap: '2px',
	padding: '0 5px',
	width: '80%',
	'@media screen and (max-width: 2450px)': {
		width: '90%',
	},
	'@media screen and (max-width: 2350px)': {
		width: '100%',
	},
});

export const NavigationItemBigScreen = styled('li')(({ theme }) => ({
	position: 'relative',
	listStyleType: 'none',
	transition: 'all 0.1s',
	textAlign: 'center',
	padding: '12px',
	borderRadius: '12px 12px 0 0',
	width: '160px',

	// '&:hover .navLink': {
	// 	color: '#fff',
	// },

	'&:hover .dropdownMenu': {
		opacity: 1,
		visibility: 'visible',
	},

	'&:nth-child(4):hover': {
		borderRadius: '12px',
	},

	'&:nth-child(6):hover': {
		borderRadius: '12px',
	},

	...(theme.palette.mode === 'light'
		? {
				'&:hover': {
					background: theme.palette.primaryLight.lighter,
					// boxShadow: theme.customShadows.cardLight,
					backdropFilter: 'blur(8px)',
				},
		  }
		: {
				'&:hover': {
					backdropFilter: 'blur(25px)',
					background: '#89AED0',
				},
		  }),
}));

export const NavLinkBigScreen = styled(Link)(({ theme }) => ({
	color: theme.palette.text.primary,
	borderRadius: '16px',
	textDecoration: 'none !important',

	// '&:hover': {
	// 	color: '#fff',
	// },
}));

export const DropdownMenu = styled('div')(({ theme }) => ({
	borderRadius: '0 0 12px 12px',
	opacity: 0,
	visibility: 'hidden',
	position: 'absolute',
	top: '100%',
	left: '50%',
	transform: 'translateX(-50%)',
	transition: 'all 0.1s',
	zIndex: 100,
	backdropFilter: 'blur(8px)',
	width: 'fit-content',
	overflow: 'hidden',

	...(theme.palette.mode === 'light'
		? {
				background: theme.palette.primaryLight.lighter,
				boxShadow: '0 10px 12px rgba(0,0,0,0.15)',
		  }
		: {
				backdropFilter: 'blur(25px)',
				background: '#89AED0',
		  }),
}));

export const DropdownMenuLink = styled('a')(({ theme }) => ({
	// position: 'relative',
	padding: '12px 10px',
	color: theme.palette.text.primary,
	cursor: 'pointer',
	transition: 'all ease 0.4s',
	minWidth: '160px',

	'&:not(:last-child):after': {
		content: '""',
		position: 'absolute',
		top: '100%',
		left: 0,
		width: '100%',
		height: '0.9px',
		background: theme.palette.gradients.line,
	},

	...(theme.palette.mode === 'light'
		? {
				'&:hover': {
					background: 'rgba(0, 0, 0, 0.1)',
				},
		  }
		: {
				'&:hover': {
					background: theme.palette.primaryDark.main,
				},
		  }),
}));

// -----------------------------SMALL SCREEN --------------------------------

export const ContentWrapper = styled(Box)(({ theme }) => ({
	width: '100%',
	height: '100%',
	backgroundImage: 'linear-gradient(90deg,rgba(0,40,75,.94902),rgba(2,10,26,.94902))',
	padding: '20px 40px 0 30px',
}));

export const NavigationBarSmallScreen = styled('ul')({});

export const NavigationItemSmallScreen = styled('li')({
	listStyleType: 'none',
	marginBottom: 20,
});

export const NavLinkSmallScreen = styled(Link)(({ theme }) => ({
	color: theme.palette.text.primary,
}));
