import { styled, Box, Typography } from '@mui/material';

export const ButtonStyled = styled(Box)(({ theme }) => ({
	padding: '10px 20px',
	cursor: 'pointer',
	transition: '0.1s all',
	border: '1px solid #E7E8EC',
	borderRadius: '8px',
	fontStyle: 'italic',
	width: 'max-content',
	color: theme.palette.text.primary,
	...(theme.palette.mode === 'light'
		? {
				backgroundColor: '#fff',
				// boxShadow: '2px 2px 2px 0 rgba(0,0,0,0.2)',
		  }
		: {
				backgroundColor: theme.palette.primary.main,
		  }),
}));

export const ButtonTitle = styled(Typography)(({ theme }) => ({
	maxWidth: 180,
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	fontWeight: '500',
}));

export const IconStyled = styled(Box)(({ theme }) => ({
	marginRight: 10,

	img: {
		width: '100%',
		height: '100%',
		objectFit: 'cover !important',
	},
}));
