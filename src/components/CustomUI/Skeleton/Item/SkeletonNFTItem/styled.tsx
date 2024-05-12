import { styled, Box, Skeleton } from '@mui/material';

export const CardWrapper = styled(Box)(({ theme }) => ({
	borderRadius: '12px',
	overflow: 'hidden',

	...(theme.palette.mode === 'light'
		? {
				boxShadow: theme.customShadows.cardLight,
				background: theme.palette.primaryLight.lighter,
		  }
		: {
				border: '1px solid',
				borderColor: theme.palette.primary.main,
				background: theme.palette.gradients.fourth,
		  }),
}));

export const SkeletonImage = styled(Skeleton)({
	borderRadius: '16px',
	height: 0,
	paddingBottom: '100%',
});

export const SkeletonContent = styled(Box)({});
