import { Box, styled } from '@mui/material';

export const CardRef = styled(Box)(({ theme }) => ({
	backdropFilter: 'blur(2px)',
	height: '830px',
	padding: '20px',
	borderRadius: '20px',
	position: 'relative',
	[theme.breakpoints.down(1800)]: {
		height: '780px',
	},
	[theme.breakpoints.down(1500)]: {
		height: '675px',
	},
	[theme.breakpoints.down(1358)]: {
		height: '740px',
	},
	[theme.breakpoints.down(980)]: {
		height: '740px',
	},
	[theme.breakpoints.down(690)]: {
		height: '700px',
	},
	[theme.breakpoints.down(689)]: {
		height: '720px',
	},
	[theme.breakpoints.down(600)]: {
		height: '680px',
	},
	[theme.breakpoints.down(599)]: {
		height: '680px',
	},
	[theme.breakpoints.down(420)]: {
		height: '610px',
	},
	[theme.breakpoints.down(500)]: {
		padding: '16px',
	},
	// '@media (max-height: 900px) and (max-width: 1800px)': {
	// 	height: '670px',
	// },
	// '@media (max-height: 900px) and (min-width: 1800px)': {
	// 	height: '820px',
	// },
	// '@media (max-height: 800px) and (max-width: 500px)': {
	// 	height: '580px',
	// },
	...(theme.palette.mode === 'light'
		? {
				background: '#fff',
				boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.25)',
		  }
		: {
				background: 'rgba(177, 218, 255, 0.45)',
		  }),
}));

export const BoxModelWrapper = styled(Box)(({ theme }) => ({
	height: 556,
	zIndex: '100',
	position: 'relative',
	overflow: 'hidden',
	// background: 'rgba(157, 195, 230, 0.45)',
	borderRadius: '16px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	[theme.breakpoints.down(1800)]: {
		height: 500,
	},
	[theme.breakpoints.down(1500)]: {
		height: 435,
	},
	[theme.breakpoints.down(1358)]: {
		height: 500,
	},
	[theme.breakpoints.down(980)]: {
		height: 460,
	},
	[theme.breakpoints.down(690)]: {
		height: 440,
	},
	[theme.breakpoints.down(600)]: {
		height: 400,
	},
	[theme.breakpoints.down(546)]: {
		height: '420px',
	},
	[theme.breakpoints.down(420)]: {
		height: 350,
	},
	// '@media (max-height: 800px)': {
	// 	height: '430px',
	// },
	// '@media (max-height: 800px) and (max-width: 500px)': {
	// 	height: '360px',
	// },
}));
