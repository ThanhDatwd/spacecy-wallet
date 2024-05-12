import { Box, styled } from '@mui/material';

export const TabWrapperContainer = styled(Box)(({ theme }) => ({
	borderRadius: theme.shape.borderRadius,
	padding: '4px',
	boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.25)',
	...(theme.palette.mode === 'light'
		? {
				backgroundColor: '#fff',
				borderColor: '#5A5D79',
		  }
		: {
				backgroundColor: '#021630a3',
				borderColor: theme.palette.primary.main,
		  }),
}));
