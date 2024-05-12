import { Box, styled } from '@mui/material';

export const SwiperWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	// img: {
	// 	display: 'block',
	// 	width: '100%',
	// 	height: '100%',
	// 	objectFit: 'cover',
	// },
	'.swiper': {
		position: 'static',
	},

	'.mySwiper': {
		'.swiper-button-prev, .swiper-button-next': {
			position: 'absolute',
			top: '50%',
			transform: 'translateY(10%)',
			width: 40,
			height: 40,
			borderRadius: '50%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			transiton: 'all 0.4s',

			...(theme.palette.mode === 'light'
				? {
						// backgroundColor: theme.palette.primaryLight.dark,
				  }
				: {
						// backgroundColor: theme.palette.primary.main,
						// backgroundColor: theme.palette.primaryLight.dark,
				  }),

			'&::after': {
				fontSize: '24px',
				color: theme.palette.text.primary,
				opacity: 0.5,
				fontWeight: 600,
				fontStyle: 'normal',
			},

			'&:hover': {
				...(theme.palette.mode === 'light'
					? {
							// backgroundColor: theme.palette.primaryLight.darker,
							backgroundColor: 'rgba(177, 218, 255, 0.45)',
					  }
					: {
							// backgroundColor: theme.palette.primary.light,
							// backgroundColor: theme.palette.primaryLight.dark,
							backgroundColor: 'rgba(177, 218, 255, 0.45)',
					  }),
			},
		},
		'.swiper-button-prev': {
			left: -30,
		},
		'.swiper-button-next': {
			right: -30,
		},

		'.swiper-slide': {
			// '&.swiper-slide-active': {
			// 	'.slide-item': {
			// 		background: 'blue',
			// 		transform: 'scale(1)' :,
			// 	},
			// },
		},
	},
}));

export const SwiperSlideItem = styled(Box)(({ theme }) => ({
	padding: 12,
	transition: 'all 0.6s ease',
}));
