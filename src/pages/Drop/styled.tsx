import { Box, styled } from '@mui/material';

export const StackItem = styled(Box)(({ theme }) => ({
	p: {
		textAlign: 'center',
		fontWeight: 600,
		fontSize: '26px',
		span: {
			color: '#E7E8EC',
			fontSize: '14px',
		},
	},
}));
