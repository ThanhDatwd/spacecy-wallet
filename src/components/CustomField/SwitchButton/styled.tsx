import { styled } from '@mui/material';

export const Switch = styled('label')(({ theme }) => ({
	position: 'relative',
	display: 'inline-block',
	width: 50,
	height: 24,

	'& input': {
		opacity: 0,
		width: 0,
		height: 0,
		'&:checked + .slider': {
			background: theme.palette.primary.light,
		},
		'&:focus + .slider': {
			boxShadow: '0 0 1px #2196F3',
		},
		'&:checked + .slider:before': {
			WebkitTransform: 'translateX(22px)',
			MsTransform: 'translateX(22px)',
			transform: 'translateX(22px)',
		},
	},

	'& .slider': {
		position: 'absolute',
		cursor: 'pointer',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,

		WebkitTransition: '0.4s',
		transition: '0.4s',

		...(theme.palette.mode === 'light'
			? {
					backgroundColor: '#E7E8EC',
			  }
			: {
					backgroundColor: theme.palette.primary.main,
			  }),

		'&::before': {
			// this is the circle
			position: 'absolute',
			content: '""',
			height: 16,
			width: 16,
			left: 6,
			bottom: 4,
			backgroundColor: 'white',
			WebkitTransition: '0.4s',
			transition: '0.4s',
		},

		'&.round': {
			borderRadius: 30,
		},
		'&.round:before': {
			borderRadius: '50%',
		},
	},
}));
