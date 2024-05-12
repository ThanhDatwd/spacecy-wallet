import { styled, Box, Typography, Stack, Link } from '@mui/material';

export const InfoAccountUserWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	transform: 'translateY(-30%)',
	borderRadius: 25,
	padding: '20px 40px',
	margin: '0 100px',
	boxShadow: '0px 0px 5px rgba(20, 86, 163)',

	[theme.breakpoints.down('lg')]: {
		margin: '0 100px',
	},
	[theme.breakpoints.down('md')]: {
		boxShadow: 'unset',
		margin: 'unset',
		padding: 'unset',
		top: -70,
		transform: 'unset',
		backgroundColor: 'unset',
		textAlign: 'center',
	},

	...(theme.palette.mode === 'light'
		? {
				background: theme.palette.primaryLight.main,
		  }
		: {
				background: 'rgba(2, 28, 56, 0.7)',
		  }),
}));

export const MoreOptions = styled(Box)(({ theme }) => ({
	top: 20,
	right: 20,
	...(theme.palette.mode === 'light'
		? {
				borderColor: '#000',
		  }
		: {
				borderColor: '#fff',
		  }),

	[theme.breakpoints.down('md')]: {
		top: 80,
		right: 10,
		borderRadius: 10,
		padding: '5px 10px',
	},

	[theme.breakpoints.down('sm')]: {
		border: 'unset',
		padding: 0,
	},
}));

export const InfoStack = styled(Stack)(({ theme }) => ({}));

export const AvatarWrapper = styled(Box)(({ theme }) => ({
	borderRadius: '12px',
	// [theme.breakpoints.down('md')]: {
	// 	boxShadow: `0px 0px 5px ${theme.palette.grey['500']}`,
	// },
}));

export const UserInfo = styled(Stack)(({ theme }) => ({
	flexGrow: 1,
	marginLeft: '20px',

	[theme.breakpoints.down('md')]: {
		marginLeft: 0,
		alignItems: 'center',
	},
}));

export const Username = styled(Typography)(({ theme }) => ({}));

export const UserBio = styled(Typography)(({ theme }) => ({}));

export const UserAddress = styled(Typography)(({ theme }) => ({}));

export const GradIcon = styled(Box)({
	cursor: 'pointer',
	width: '100%',
	height: '100%',
	borderRadius: '50%',
});
export const StyledSpanSpecial = styled('span')(({ theme }) => ({
	color: 'rgba(157, 195, 230, 1)',
}));

export const DropDownWrapper = styled(Box)(({ theme }) => ({
	borderRadius: theme.shape.borderRadiusSm,
	minWidth: 160,
	padding: '8px 4px',

	...(theme.palette.mode === 'light'
		? {
				background: '#fff',
				boxShadow: '2px 2px 3px 0 rgba(0,0,0,0.2)',
		  }
		: {
				backgroundImage: theme.palette.gradients.modal,
		  }),
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

export const FeatureWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	border: '1px solid #E7E8EC',
	borderRadius: '12px',
	background: '#fff',
	cursor: 'pointer',
	height: '46px',
	width: '46px',
	alignItems: 'center',
	transition: 'all 0,4s',
	':hover': {
		boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
	},
}));
