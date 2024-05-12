import { styled, Box, Button, Typography, Link, Stack, Paper } from '@mui/material';
export const PDWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	padding: '16px 24px',
	zIndex: '0',
	cursor: 'pointer',
	borderRadius: '5px',
	transition: 'all ease 0.5s',
	border: '1.8px solid #E7E8EC',
	overflow: 'hidden',
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
export const ButtonStyled = styled(Button)(({ theme }) => ({
	padding: '10px 20px',
	cursor: 'pointer',
	transition: '0.1s all',
	border: '1px solid #E7E8EC',
	color: theme.palette.text.primary,

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: '#fff',
				// boxShadow: '2px 2px 2px 0 rgba(0,0,0,0.2)',
		  }
		: {
				backgroundColor: theme.palette.primary.main,
		  }),
}));

export const ButtonTitle = styled(Typography)(({ theme }) => ({
	maxWidth: 180,
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	fontWeight: '500',
}));
//  CSS CHUNG CHO MODAL BUTTON
export const SelectOptionBox = styled(Box)(({ theme }) => ({
	position: 'relative',
}));

export const DropDownContent = styled(Stack)(({ theme }) => ({
	display: 'none',
	position: 'absolute',
	marginTop: '2.5rem',
	right: 0,
	minWidth: 280,
	borderRadius: 10,
	zIndex: 100,
	animation: 'smoothAppear 0.5s',
	'@media (max-width: 1440px)': {
		minWidth: 360,
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
export const DropDownContentInfo = styled(Stack)(({ theme }) => ({
	display: 'none',
	position: 'absolute',
	marginTop: '2.5rem',
	right: 0,
	minWidth: 380,
	maxWidth: '100%',
	borderRadius: 10,
	zIndex: 100,
	animation: 'smoothAppear 0.5s',
	'@media (max-width: 1440px)': {
		minWidth: 360,
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
	width: '100%',
	// margin: '0 auto',
	padding: '0 15px',
}));
export const WrapperItem = styled(Box)(({ theme }) => ({
	padding: '10px 0',
	display: 'flex',
	alignItems: 'center',
	gap: '10px',
	cursor: 'pointer',
	'&:hover': {
		color: theme.palette.primary.light,
	},
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

export const TootipChart = styled(Paper)(({ theme }) => ({
	// transform: 'translate(-50%, -50%)',
	background: '#ffff',
	boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.24), 0 12px 24px 0 rgba(145, 158, 171, 0.24)',
	padding: '5px',
	borderRadius: '3px',
	fontSize: '14px',
	zIndex: '9999',
}));
export const BoxFlex = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
}));
