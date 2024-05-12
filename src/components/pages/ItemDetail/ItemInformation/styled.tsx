import { Box, Link, styled, Typography } from '@mui/material';

export const FeatureWrapper = styled(Box)(({ theme }) => ({
	borderColor: 'grey',
	display: 'flex',
	justifyContent: 'center',
	background: '#fff',
	border: '1px solid #E7E8EC',
	borderRadius: theme.shape.borderRadiusSm,
}));

export const DropDownWrapper = styled(Box)(({ theme }) => ({
	borderRadius: theme.shape.borderRadiusSm,
	background: '#fff',
	minWidth: 160,
	padding: '8px 4px',
	border: '1px solid #E7E8EC',
}));

export const DropDownOption = styled(Link)(({ theme }) => ({
	display: 'block',
	borderRadius: theme.shape.borderRadiusSm,
	padding: '8px 20px',
	color: theme.palette.text.primary,
	cursor: 'pointer',
	transition: 'all 0.2s',
	whiteSpace: 'nowrap',
	fontWeight: 'bold',

	'&:hover': {
		...(theme.palette.mode === 'light'
			? {
					background: theme.palette.primaryLight.light,
			  }
			: {
					background: theme.palette.primary.main,
			  }),
	},
}));

export const CollectionName = styled(Typography)(({ theme }) => ({
	fontWeight: 600,
	color: theme.palette.primary.light,
	cursor: 'pointer',
}));

export const ItemDescription = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
}));

export const CheckIconWrapper = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	right: 10,
	transform: 'translateY(-50%)',
	width: 20,
	height: 20,
}));
