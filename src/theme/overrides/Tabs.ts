import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default function Tabs(theme: Theme) {
	return {
		MuiTab: {
			styleOverrides: {
				root: {
					padding: '12px 28px',
					fontWeight: theme.typography.fontWeightMedium,
					borderTopLeftRadius: theme.shape.borderRadius,
					borderTopRightRadius: theme.shape.borderRadius,
					'&.Mui-selected': {
						color: theme.palette.text.primary,
					},
					'&:not(:last-child)': {
						// marginRight: theme.spacing(5),
					},
					'@media (min-width: 600px)': {
						minWidth: 48,
					},
				},
				labelIcon: {
					minHeight: 48,
					flexDirection: 'row',
					'& > *:first-child': {
						marginBottom: 0,
						marginRight: theme.spacing(1),
					},
				},
				wrapper: {
					flexDirection: 'row',
					whiteSpace: 'nowrap',
				},
				textColorInherit: {
					opacity: 1,
					color: theme.palette.text.secondary,
				},
			},
		},
		MuiTabPanel: {
			styleOverrides: {
				root: {
					padding: 0,
				},
			},
		},
		MuiTabScrollButton: {
			styleOverrides: {
				root: {
					width: 48,
					borderRadius: '50%',
				},
			},
		},
	};
}
