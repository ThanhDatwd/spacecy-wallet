import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
// Import Swiper styles
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/effect-coverflow/effect-coverflow.min.css';
import 'swiper/swiper.min.css';
// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper';
import { SwiperSlideItem, SwiperWrapper } from './styled';

export type CustomSliderCoverflowProps = {
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

const CustomSliderCoverflow = ({
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
}: CustomSliderCoverflowProps) => {
	// console.log('renderItem', renderItem);

	const renderListItem = () =>
		renderItem.map((item: any, index: number) => (
			<SwiperSlide key={index}>
				<SwiperSlideItem sx={{ color: '#131740' }} className="slide-item">
					{item}
				</SwiperSlideItem>
			</SwiperSlide>
		));

	return (
		<SwiperWrapper>
			<Swiper
				effect={'coverflow'}
				grabCursor={true}
				coverflowEffect={{
					rotate: 25,
					stretch: 20,
					depth: 100,
					modifier: 1,
					slideShadows: true,
				}}
				pagination={true}
				slidesPerView={slidesPerView}
				spaceBetween={spaceBetween}
				loop={loop}
				// autoplay={
				// 	!delay
				// 		? false
				// 		: {
				// 				delay: delay,
				// 				disableOnInteraction: false,
				// 		  }
				// }
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				slidesPerGroup={slidesPerGroup}
				centeredSlides={centeredSlides}
				navigation={true}
				modules={[Autoplay, EffectCoverflow, Pagination]}
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
	);
};

export default CustomSliderCoverflow;
