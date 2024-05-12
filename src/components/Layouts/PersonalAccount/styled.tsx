import { Stack, styled, Box, Link } from '@mui/material';

const breakpointsShowCloseButton = 350;

export const DrawerContent = styled('div')(({ theme }) => ({
	position: 'relative',
	width: 300,
	padding: '1.5rem',
	// borderRadius: '10px',
	// backdropFilter: 'blur(4px)',

	[theme.breakpoints.down(450)]: {
		width: '80vw',
	},

	// [theme.breakpoints.down(breakpointsShowCloseButton)]: {
	// 	width: 'unset !important',
	// },

	...(theme.palette.mode === 'light'
		? {
				// background: theme.palette.primaryLight.main,
		  }
		: {
				// background: theme.palette.primaryDark.modal,
		  }),
}));

export const CloseButton = styled(Box)(({ theme }) => ({
	display: 'none',
	position: 'absolute',
	top: 10,
	right: 10,

	[theme.breakpoints.down(breakpointsShowCloseButton)]: {
		display: 'block',
	},
}));

export const AccountContent = styled('div')({
	position: 'relative',

	'&:hover .OutlineList': {
		opacity: 1,
		visibility: 'visible',
	},
});

export const LogoutButton = styled('div')({
	position: 'absolute',
	bottom: 0,
	width: '100%',
});

export const ListLink = styled(Stack)(({ theme }) => ({
	p: {
		cursor: 'pointer',
		transition: 'all 0.4s',
		'&:hover': {
			color: theme.palette.primary.light,
		},
	},
}));

export const LinkItem = styled(Link)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: 10,
	cursor: 'pointer',
	color: theme.palette.text.primary,
	textDecoration: 'none !important',

	p: { transition: 'all 0.2s' },
}));

export const GradIcon = styled(Box)({
	cursor: 'pointer',
	width: '100%',
	height: '100%',
	borderRadius: '50%',
});

export const DropDownContent = styled(Stack)(({ theme }) => ({
	display: 'none',
	position: 'absolute',
	marginTop: '2.5rem',
	right: '-42px',
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
				backdropFilter: 'blur(25px)',
				background: '#89AED0',
		  }),

	'&.active': {
		display: 'block',
	},
}));
