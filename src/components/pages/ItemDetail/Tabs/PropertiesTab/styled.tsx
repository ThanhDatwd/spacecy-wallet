import { Box, styled } from '@mui/material';

export const TabWrapperContainer = styled(Box)(({ theme }) => ({
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
export const ItemPropertiesTab = styled(Box)(({ theme }) => ({
	minWidth: '160px',
	minHeight: '80px',
	maxWidth: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	borderRadius: '6px',
	textAlign: 'center',
	padding: '12px',
	border: '1.5px solid #E7E8EC',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.dark,
		  }
		: {
				backgroundColor: theme.palette.primary.dark,
		  }),
}));
export const BoxGrid = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'center',
	gap: '10px',
}));
export const ItemGrid = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#101010' : '#fff',
	color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
	border: '1px solid',
	borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
	p: 1,
	borderRadius: '4px',
	textAlign: 'center',
	fontSize: '0.875rem',
	fontWeight: '700',
}));
