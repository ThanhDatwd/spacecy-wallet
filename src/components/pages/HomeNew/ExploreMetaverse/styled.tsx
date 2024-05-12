import { Box, styled } from '@mui/material';

export const BoxTitleWrapper = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '20px',
	right: '34px',
	// backdropFilter: 'blur(4px)',
	padding: '4px 8px',
	borderRadius: '8px',
	marginBottom: '12px',
	textShadow: '2px 2px 3px rgba(0,0,0,0.3)',
	zIndex: 1,
	...(theme.palette.mode === 'light'
		? {
				color: 'white',
		  }
		: {
				color: 'white',
		  }),
}));
