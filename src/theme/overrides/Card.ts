import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default function Card(theme: Theme) {
	return {
		MuiCard: {
			styleOverrides: {
				root: {
					// boxShadow: theme.customShadows.z16,
					boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
					borderRadius: theme.shape.borderRadiusMd,
					position: 'relative',
					zIndex: 0, // Fix Safari overflow: hidden with border radius
				},
			},
		},
		MuiCardHeader: {
			defaultProps: {
				titleTypographyProps: { variant: 'h6' },
				subheaderTypographyProps: { variant: 'body2' },
			},
			styleOverrides: {
				root: {
					padding: theme.spacing(3, 3, 0),
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: theme.spacing(3),
				},
			},
		},
	};
}
