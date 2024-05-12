import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Skeleton(theme: Theme) {
	return {
		MuiSkeleton: {
			defaultProps: {
				animation: 'wave',
			},

			styleOverrides: {
				root: {
					// backgroundColor: theme.palette.background.neutral,
					backgroundColor: 'rgba(145, 158, 171, 0.2)',
				},
			},
		},
	};
}
