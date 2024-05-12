import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/grid/grid.min.css';
// import required modules
import { Navigation, Autoplay } from 'swiper';
import { SwiperSlideItem, SwiperWrapper } from './styled';

export type CustomSliderProps = {
	spaceBetween: number;
	centeredSlides: boolean;
	renderItem: any;
};

const CustomSliderStadium = ({ spaceBetween, centeredSlides, renderItem }: CustomSliderProps) => {
	// console.log('renderItem', renderItem);
	const renderListItem = () =>
		renderItem.map((item: any, index: number) => (
			<SwiperSlide key={index}>
				<SwiperSlideItem className="slide-item">{item}</SwiperSlideItem>
			</SwiperSlide>
		));

	return (
		<SwiperWrapper>
			<Swiper
				spaceBetween={spaceBetween}
				centeredSlides={centeredSlides}
				navigation={true}
				loop={true}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				modules={[Autoplay, Navigation]}
				className="mySwiper"
			>
				{renderListItem()}
			</Swiper>
		</SwiperWrapper>
	);
};

export default CustomSliderStadium;
