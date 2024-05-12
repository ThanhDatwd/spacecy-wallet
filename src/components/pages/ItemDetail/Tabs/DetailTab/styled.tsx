import { Box, styled, Stack, Link } from '@mui/material';

export const TabWrapper = styled(Box)(({ theme }) => ({
	padding: 20,
	// borderTop: 'none',
	// borderBottomLeftRadius: theme.shape.borderRadius,
	// borderEndEndRadius: theme.shape.borderRadius,
	borderRadius: '12px',
	background: theme.palette.primaryLight.lighter,
	border: '1.5px solid #E7E8EC',

	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			backgroundColor: '#fff',
	// 			borderColor: '#5A5D79',
	// 	  }
	// 	: {
	// 			backgroundColor: '#021630a3',
	// 			borderColor: theme.palette.primary.main,
	// 	  }),
}));

export const DetailTitle = styled(Stack)(({ theme }) => ({
	minWidth: 150,
	color: theme.palette.text.secondary,
}));

export const ContractAddress = styled(Link)(({ theme }) => ({
	color: '#1d1d1f',
}));
