import { styled, Stack, Link, Box } from '@mui/material';

export const SelectOptionBox = styled(Box)(({ theme }) => ({
	position: 'relative',
}));

export const IconDots = styled(Box)(({ theme }) => ({
	cursor: 'pointer',
	borderRadius: '50%',
	position: 'relative',
	width: '34px',
	height: '34px',
	// padding: '5px 5px 5px 2px',
	...(theme.palette.mode === 'light'
		? {
				background: theme.palette.primaryLight.lighter,
				boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
		  }
		: {
				// backgroundColor: theme.palette.primary.main,
				backgroundColor: theme.palette.primaryDark.backgroundCard,
		  }),
	'&.color': {
		...(theme.palette.mode === 'light'
			? {
					background: theme.palette.primaryLight.lighter,
					boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
			  }
			: {
					// backgroundColor: theme.palette.primary.main,
					backgroundColor: '#89AED0',
			  }),
	},
}));

export const DropDownContent = styled(Stack)(({ theme }) => ({
	display: 'none',
	position: 'absolute',
	marginTop: '2.5rem',
	right: 0,
	minWidth: 180,
	borderRadius: 10,
	zIndex: 100,
	animation: 'smoothAppear 0.5s',
	'@media (max-width: 1440px)': {
		minWidth: 260,
	},
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

export const DropdownList = styled(Box)({
	padding: '8px 12px',
	borderRadius: '8px',
	listStyleType: 'none',
	li: {
		padding: '5px 15px',
		a: {
			fontWeight: 250,
			fontSize: '1rem',
			textDecoration: 'none',
			whiteSpace: 'nowrap',
		},
	},
});

export const WrapperListItem = styled(Box)(({ theme }) => ({
	width: 'fit-content',
	// margin: '0 auto',
	padding: '0 15px',
}));
export const ListItem = styled(Link)(({ theme }) => ({
	display: 'flex',
	margin: '0 auto',
	color: theme.palette.text.primary,
	textDecoration: 'none !important',
	// '&:hover': {
	// 	color: '#fff',
	// },
}));

export const NavigationItemBigScreen = styled('li')(({ theme }) => ({
	position: 'relative',
	listStyleType: 'none',
	transition: 'all 0.1s',
	padding: '12px',
	borderRadius: '12px 12px 0 0',
	width: '234px',
	display: 'flex',
	flexDirection: 'column',

	// '&:hover .navLink': {
	// 	color: '#fff',
	// },

	// '&:hover .dropdownMenu': {
	// 	opacity: 1,
	// 	visibility: 'visible',
	// },

	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			'&:hover': {
	// 				background: theme.palette.primaryLight.lighter,
	// 				// boxShadow: theme.customShadows.cardLight,
	// 				backdropFilter: 'blur(8px)',
	// 			},
	// 	  }
	// 	: {
	// 			'&:hover': {
	// 				background: theme.palette.primaryDark.backgroundCard,
	// 				backdropFilter: 'blur(8px)',
	// 			},
	// 	  }),
}));

export const NavLinkBigScreen = styled(Link)(({ theme }) => ({
	color: theme.palette.text.primary,
	borderRadius: '16px',
	textDecoration: 'none !important',

	// '&:hover': {
	// 	color: '#fff',
	// },
}));

export const SmallNavigationRender = styled('div')({
	width: '100%',
	display: 'none',
	'@media screen and (max-width: 1400px)': {
		display: 'block',
	},
});

export const DropdownMenu = styled('div')(({ theme }) => ({
	opacity: 0,
	display: 'none',
	transition: 'all 0.1s',
	zIndex: 100,
	maxHeight: '190px',
	overflowY: 'scroll',
	width: '100%',

	'&::-webkit-scrollbar': {
		display: 'block',
		width: '0px',
		height: '4px',
	},
	'&::-webkit-scrollbar-track': {
		display: 'block',
		background: '#0c5599',
	},
	'&::-webkit-scrollbar-thumb': {
		display: 'block',
		background: '#65b8ff',
		borderRadius: '5px',
	},

	...(theme.palette.mode === 'light'
		? {
				background: theme.palette.primaryLight.lighter,
				// boxShadow: theme.customShadows.cardLight,
		  }
		: {
				background: 'transparent',
		  }),
}));

export const DropdownMenuLink = styled('a')(({ theme }) => ({
	// position: 'relative',
	padding: '12px 10px',
	color: theme.palette.text.primary,
	cursor: 'pointer',
	transition: 'all ease 0.4s',
	textDecoration: 'none !important',

	'&:not(:last-child):after': {
		content: '""',
		position: 'absolute',
		top: '100%',
		left: 0,
		width: '100%',
		height: '0.9px',
		background: theme.palette.gradients.line,
	},

	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			'&:hover': {
	// 				color: theme.palette.primary.light,
	// 			},
	// 	  }
	// 	: {
	// 			'&:hover': {
	// 				color: theme.palette.primary.light,
	// 			},
	// 	  }),
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
