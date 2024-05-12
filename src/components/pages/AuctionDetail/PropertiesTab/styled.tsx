import { Box, styled } from '@mui/material';

export const ItemPropertiesTab = styled(Box)(({ theme }) => ({
	minWidth: '140px',
	minHeight: '68px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	borderRadius: '8px',
	marginRight: '12px',
	textAlign: 'center',
	padding: '4px',
	border: '1.5px solid #E7E8EC',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.dark,
		  }
		: {
				backgroundColor: theme.palette.primary.dark,
		  }),
}));
