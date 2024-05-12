import { Stack, styled } from '@mui/material';
import backgroundImage from 'assets/images/network/switch-network.webp';

export const NetworkSwitchStyle = styled('div')({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-evenly',
	position: 'relative',
	padding: '1rem 1rem 2rem 1rem',
	overflow: 'hidden',
});

export const NetworkSwitchBackground = styled('div')({
	backgroundImage: `url(${backgroundImage})`,
	position: 'relative',
	backgroundSize: 'cover',
	width: '250px',
	height: '250px',
	animation: 'rotateAnimate 2s',
	'@keyframes rotateAnimate': {
		from: { transform: 'rotate(120deg)' },
		to: { transform: 'rotate(0deg)' },
	},
});

export const NetworkSwitchContent = styled('div')({
	width: '100px',
	height: '100px',
	transition: '0.5s all',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
	position: 'absolute',
});

export const ColumnStyle = styled('div')({
	position: 'absolute',
	top: '22px',
	width: '50px',
	height: '205px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
});

export const CollumnOne = styled(ColumnStyle)({
	left: '41px',
});

export const CollumnTwo = styled(ColumnStyle)({
	left: '161px',
});

export const NetworkSwitchIcon = styled('div')({
	'.icon-small': {
		padding: '5px',
		width: '50px !important',
		height: '50px !important',
		cursor: 'pointer',
	},
	'&:hover': {
		borderRadius: '50px',
		backgroundColor: 'rgba(12, 179, 201, 0.5)',
		transition: '0.5s all',
	},
});
export const DropDownContent = styled(Stack)(({ theme }) => ({
	display: 'none',
	position: 'absolute',
	marginTop: '2.5rem',
	right: 0,
	minWidth: 180,
	borderRadius: 12,
	zIndex: 100,
	animation: 'smoothAppear 0.5s',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.lighter,
				boxShadow: theme.customShadows.cardLightHover,
		  }
		: {
				backdropFilter: 'blur(25px)',
				background: '#89AED0',
		  }),

	'&.active': {
		display: 'block',
	},
}));
