import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/grid/grid.min.css';
// import required modules
import { Navigation, Autoplay, Grid } from 'swiper';
import { SwiperSlideItem, SwiperWrapper } from './styled';
import { Box } from '@mui/material';
// import IconPlayWhite from 'assets/icons/play.png';
// import IconPauseWhite from 'assets/icons/pause.png';

export type CustomSliderButtonProps = {
	delay?: number;
	slidesPerView: number;
	loop: boolean;
	spaceBetween: number;
	centeredSlides: boolean;
	slidesPerGroup: number;
	slidesToShowPoint1358?: number;
	slidesToShowPoint1093?: number;
	slidesToShowPoint828?: number;
	slidesToShowPoint547?: number;
	slidesToShowPoint320?: number;
	slidesToShowPoint0?: number;
	renderItem: any;
};

const CustomSliderButton = ({
	delay,
	slidesPerView,
	loop,
	spaceBetween,
	centeredSlides,
	slidesPerGroup,
	slidesToShowPoint1358,
	slidesToShowPoint1093,
	slidesToShowPoint828,
	slidesToShowPoint547,
	slidesToShowPoint320,
	slidesToShowPoint0,
	renderItem,
}: CustomSliderButtonProps) => {
	const swiperRef = useRef<any>(null);
	// const [play, setPlay] = useState(true);
	// const theme = useTheme();
	const renderListItem = () =>
		renderItem.map((item: any, index: number) => (
			<SwiperSlide key={index}>
				<SwiperSlideItem className="slide-item">{item}</SwiperSlideItem>
			</SwiperSlide>
		));

	// const handleStartStop = () => {
	// 	setPlay(!play);
	// 	if (play) {
	// 		swiperRef.current.swiper.autoplay.stop();
	// 		swiperRef.current.swiper.allowTouchMove = false;
	// 	} else {
	// 		swiperRef.current.swiper.autoplay.start();
	// 		swiperRef.current.swiper.allowTouchMove = true;
	// 	}
	// };

	return (
		<Box>
			<SwiperWrapper className="warapper-Slider">
				<Swiper
					//@ts-ignore
					ref={swiperRef}
					// allowTouchMove={play}
					slidesPerView={slidesPerView}
					spaceBetween={spaceBetween}
					loop={loop}
					autoplay={
						!delay
							? false
							: {
									delay: delay,
									disableOnInteraction: false,
							  }
					}
					slidesPerGroup={slidesPerGroup}
					centeredSlides={centeredSlides}
					navigation={true}
					modules={[Autoplay, Navigation, Grid]}
					className="mySwiper"
					breakpoints={{
						0: {
							slidesPerView: slidesToShowPoint0,
						},
						320: {
							slidesPerView: slidesToShowPoint320,
						},
						547: {
							slidesPerView: slidesToShowPoint547,
						},
						828: {
							slidesPerView: slidesToShowPoint828,
						},
						1093: {
							slidesPerView: slidesToShowPoint1093,
						},
						1358: {
							slidesPerView: slidesToShowPoint1358,
						},
					}}
				>
					{renderListItem()}
				</Swiper>
			</SwiperWrapper>
			{/* <Stack
				direction="column"
				justifyContent="center"
				alignItems="center"
				sx={{
					width: '32px',
					height: '32px',
					borderRadius: '50%',
					padding: '8px',
					border: '1px solid rgba(255,255,255,0.5)',
					transition: 'all ease 1s',
					marginLeft: 'auto',
					marginRight: '12px',
					opacity: '0.5',
					background: 'rgba(157, 195, 230, 0.45)',
					'&:hover': {
						opacity: '1',
					},
				}}
				onClick={handleStartStop}
			>
				<img
					style={{ width: '12px', height: '100%' }}
					src={play ? IconPauseWhite : IconPlayWhite}
					alt="play-icon"
				/>
			</Stack> */}
		</Box>
	);
};

export default CustomSliderButton;
