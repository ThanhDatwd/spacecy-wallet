import { Box, styled } from '@mui/material';

export const DropContainer = styled(Box)(({ theme }) => ({
	padding: '2rem 0',
	background: theme.palette.primaryLight.lighter,
	[theme.breakpoints.down(500)]: {
		padding: '32px 0',
	},
}));
export const DropTitle = styled(Box)(({ theme }) => ({
	p: {
		fontSize: '24px',
		fontWieght: 500,
	},
}));
export const DropContent = styled(Box)(({ theme }) => ({
	marginTop: '32px',
	display: 'flex',
	justifyContent: 'space-between',
	gap: '20px',
	[theme.breakpoints.down(950)]: {
		flexDirection: 'column',
		gap: 0,
	},
}));
export const ContentLeft = styled(Box)(({ theme }) => ({
	width: '65%',
	[theme.breakpoints.down(1150)]: {
		width: '60%',
	},
	[theme.breakpoints.down(950)]: {
		width: '100%',
	},
}));
export const ContentRight = styled(Box)(({ theme }) => ({
	width: '34%',
	display: 'flex',
	flexDirection: 'column',
	gap: '2rem	',
	[theme.breakpoints.down(1150)]: {
		width: '40%',
	},
	[theme.breakpoints.down(950)]: {
		width: '100%',
		marginTop: '2rem',
	},
}));
export const StackItem = styled(Box)(({ theme }) => ({
	p: {
		textAlign: 'center',
		fontWeight: 600,
		fontSize: '26px',
		span: {
			color: '#5A5D79',
			fontSize: '14px',
		},
	},
}));

export const ContentButton = styled(Box)(({ theme }) => ({
	display: 'flex',
	gap: '20px',
}));

export const Item = styled(Box)(({ theme }) => ({
	p: {
		[theme.breakpoints.down(500)]: {
			fontSize: '13px',
		},
	},
}));

export const SocialWrap = styled(Box)(({ theme }) => ({
	display: 'flex',
	// justifyContent: 'center',
	gap: '20px',
	marginTop: '16px',
	[theme.breakpoints.down(1050)]: {
		justifyContent: 'unset',
	},
}));
export const SocialIconLink = styled('a')({
	color: 'inherit',
	textDecoration: 'none',
	marginRight: '1.25rem',
	// width: '1.25rem',
	height: '1.25rem',
	'@media (max-width: 450px)': {
		marginRight: '4px',
	},
});

export const Creator = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginTop: '10px',
	[theme.breakpoints.down(1050)]: {
		maxWidth: '400px',
	},
}));
export const Avatar = styled(Box)(({ theme }) => ({
	display: 'flex',
	gap: '16px',
	'&>img': {
		width: '50px',
		height: '50px',
		objectFit: 'cover',
		objectPosition: 'center',
		borderRadius: '50%',
	},
}));
export const Info = styled(Box)(({ theme }) => ({}));
export const AddFr = styled(Box)(({ theme }) => ({
	cursor: 'pointer',
}));
