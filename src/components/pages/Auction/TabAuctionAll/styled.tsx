import { styled, Typography } from '@mui/material';

export const TypographyStyled = styled(Typography)(({ theme }) => ({
	fontSize: '1.25rem',
	fontWeight: '500',
	[theme.breakpoints.down('md')]: {
		fontSize: '1rem',
	},
	[theme.breakpoints.down('sm')]: {
		fontSize: '0.8rem',
	},
}));
