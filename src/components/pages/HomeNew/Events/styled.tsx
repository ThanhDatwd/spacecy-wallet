import { Box, styled } from '@mui/material';

export const SwiperWrapper = styled(Box)(({ theme }) => ({
	position: 'absolute',
	borderRadius: '20px',
	top: '100px',
	left: '50%',
	height: '60vh',
	width: '80%',
	transform: 'translateX(-50%)',
	zIndex: '999999',
	[theme.breakpoints.down(768)]: {
		width: '95%',
	},
	[theme.breakpoints.down(480)]: {
		top: '70px',
	},

	// img: {
	// 	display: 'block',
	// 	width: '100%',
	// 	height: '100%',
	// 	objectFit: 'cover',
	// },

	// 'div:nth-child(2)': {
	// 	'.img1': {
	// 		animationDelay: '12s',
	// 	},
	// 	'.img2': {
	// 		animationDelay: '16s',
	// 	},
	// },

	// 'div:nth-child(4)': {
	// 	'.img1': {
	// 		animationDelay: '36s',
	// 	},
	// 	'.img2': {
	// 		animationDelay: '40s',
	// 	},
	// },
	// 'div:nth-child(5)': {
	// 	'.img1': {
	// 		animationDelay: '48s',
	// 	},
	// 	'.img2': {
	// 		animationDelay: '52s',
	// 	},
	// },
	// 'div:nth-child(6)': {
	// 	'.img1': {
	// 		animationDelay: '60s',
	// 	},
	// 	'.img2': {
	// 		animationDelay: '64s',
	// 	},
	// },
	// 'div:nth-child7)': {
	// 	'.img1': {
	// 		animationDelay: '72s',
	// 	},
	// 	'.img2': {
	// 		animationDelay: '76s',
	// 	},
	// },
	// 'div:nth-child(8)': {
	// 	'.img1': {
	// 		animationDelay: '84s',
	// 	},
	// 	'.img2': {
	// 		animationDelay: '88s',
	// 	},
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
			// backgroundColor: 'rgba(255,255,255,0.1)',
			// border: '1px solid #E7E8EC',
			transition: 'all 0.4s',

			...(theme.palette.mode === 'light'
				? {
						// backgroundColor: theme.palette.primaryLight.dark,
				  }
				: {
						// backgroundColor: theme.palette.primary.main,
						// backgroundColor: theme.palette.primaryLight.dark,
				  }),

			'&::after': {
				fontSize: '20px',
				// color: theme.palette.text.primary,
				opacity: 0.9,
				fontWeight: 700,
				fontStyle: 'normal',
				color: '#fff',
			},

			'&:hover': {
				background: 'rgba(157, 195, 230, 0.6)',
				borderColor: 'transparent',
			},
		},
		'.swiper-button-prev': {
			left: -45,
		},
		'.swiper-button-next': {
			right: -45,
		},

		'.swiper-slide': {
			height: '60vh',
			'@media (max-height: 900px)': {
				height: '50vh',
			},
			'&.swiper-slide-active': {
				'.img1': {
					animation: 'Img1 8s linear forwards',
				},
				'.img2': {
					animation: 'Img2 8s linear infinite alternate',
				},
			},
		},
	},
}));

export const SwiperSlideItem = styled(Box)(({ theme }) => ({
	padding: '12px',
	transition: 'all 0.6s ease',
	display: 'flex',
	justifyContent: 'center',
}));
