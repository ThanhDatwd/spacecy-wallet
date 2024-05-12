import { styled, Box } from '@mui/material';

export const WrapperImage = styled(Box)(({ theme }) => ({
	position: 'relative',
	overflow: 'hidden',
	paddingTop: '100%',
	...(theme.palette.mode === 'light'
		? {
				borderColor: theme.palette.primaryLight.darker,
		  }
		: {
				borderColor: theme.palette.primary.main,
		  }),
}));
