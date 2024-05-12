import TabList from '@mui/lab/TabList';
import { styled, Tab } from '@mui/material';

export const TabListStyled = styled(TabList)(({ theme }) => ({}));

export const TabStyled = styled(Tab)(({ theme }) => ({
	color: theme.palette.text.primary,

	'& .selected': {
		display: 'none',
	},
	'& .unselected': {
		display: 'block',
	},

	'&:hover': {
		color: theme.palette.primary.light,
		opacity: 1,
		fontSize: 50,

		'& .selected': {
			display: 'block',
		},
		'& .unselected': {
			display: 'none',
		},
	},
	'&.Mui-selected': {
		color: theme.palette.primary.light,
		fontWeight: theme.typography.fontWeightMedium,

		'& .selected': {
			display: 'block',
		},
		'& .unselected': {
			display: 'none',
		},
	},
	'&.Mui-focusVisible': {
		backgroundColor: theme.palette.primary.light,
	},
}));
