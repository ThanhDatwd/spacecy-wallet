import { styled, Typography, Box } from '@mui/material';

export const screenBreakpoint = 600;

export const FilterWrapper = styled(Box)(({ theme }) => ({
	'& .big-screen': {
		display: 'block',
	},

	'& .small-screen': {
		display: 'none',
	},

	[theme.breakpoints.down(screenBreakpoint)]: {
		'& .big-screen': {
			display: 'none',
		},

		'& .small-screen': {
			display: 'block',
		},
	},
}));

export const FilterBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '11px',
	marginRight: 10,
	borderRadius: '10px',
	cursor: 'pointer',
	border: '1px solid #E7E8EC',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.lighter,
		  }
		: {
				backgroundColor: theme.palette.primary.main,
		  }),
}));

export const DropdownContentStyled = styled(Box)(({ theme }) => ({
	fontStyle: 'italic',
	[theme.breakpoints.down(screenBreakpoint)]: {
		padding: 15,
		borderRadius: 10,
		border: '1px solid #E7E8EC',

		...(theme.palette.mode === 'light'
			? {
					background: theme.palette.primaryLight.dark,
			  }
			: {
					background: theme.palette.primary.dark,
					boxShadow: theme.customShadows.cardDark,
			  }),

		// ko de o day dc, vi bam vao cai nay thi no van tinh la bam trong dropdown
		// '&::after': {
		// 	content: '""',
		// 	position: 'fixed',
		// 	top: 0,
		// 	left: 0,
		// 	width: '100vw',
		// 	height: '100vh',
		// 	backgroundColor: 'black',
		// 	zIndex: -1,
		// },
	},
}));

export const FilterStack = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'start',

	'& > *': {
		marginRight: 15,
	},

	[theme.breakpoints.down(screenBreakpoint)]: {
		flexDirection: 'column',
		alignItems: 'start',

		'& > *': {
			marginBottom: 15,
		},
	},
}));

export const ButtonReset = styled(Typography)(({ theme }) => ({
	cursor: 'pointer',
	color: theme.palette.primary.light,

	'&:hover': {
		color: theme.palette.primary.lighter,
	},
}));
