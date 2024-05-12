/* eslint-disable @typescript-eslint/no-unused-vars */

import {
	Box,
	Container,
	Skeleton,
	Stack,
	Step,
	StepConnector,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import { CoverHeaderImgIGO, SliderCoverItemIGO, StepperCoverIGO } from './styled';
import { SizeContext } from 'contexts/SizeObserver';
import { sliceString } from 'utils';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import HeaderImg from 'assets/Test/header.jpeg';
import { IGOPreview } from 'models/IGO';

export interface ICreateIGOProps {
	data: IGOPreview;
}

const steps = [
	{
		id: 0,
		title: 'Prepare',
		day: 'July 14, 2022',
		time: '10:55',
	},
	{
		id: 1,
		title: 'Start',
		day: 'July 14, 2022',
		time: '10:55',
	},
	{
		id: 2,
		title: 'End',
		day: 'July 15, 2022',
		time: '10:55',
	},
];
// const Database = {};

const exampTypography = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

export default function CreateIGO({ data }: ICreateIGOProps) {
	const { innerWidth } = useContext(SizeContext);
	const [stepActive, setStepActive] = useState<number>(2);

	const renderHeaderSlider = () => {
		return new Array(2).fill('a').map((item, idx) => {
			return (
				<SwiperSlide key={idx}>
					<SliderCoverItemIGO>
						<CoverHeaderImgIGO>
							<Skeleton
								variant="rectangular"
								width="100%"
								height="500px"
								// borderRadius="8px"
								sx={{ borderRadius: '8px' }}
							/>
						</CoverHeaderImgIGO>
						<Stack width="100%">
							<Typography variant="h3" sx={{ fontStyle: 'italic' }}>
								<Skeleton variant="text" width="30%" sx={{ fontSize: '2rem' }} />
							</Typography>
							<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
							<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
							<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
							<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
							<StepperCoverIGO mt={4}>
								<Skeleton
									variant="text"
									width="50%"
									sx={{ fontSize: '3rem', margin: '0 auto' }}
								/>
							</StepperCoverIGO>
							<Box sx={{ width: ' 180px', height: '40px', marginTop: '18px' }}>
								<Skeleton variant="text" sx={{ fontSize: '3.5rem' }} />
							</Box>
						</Stack>
					</SliderCoverItemIGO>
				</SwiperSlide>
			);
		});
	};

	return (
		<div>
			<Box mt={8}>
				<Swiper
					spaceBetween={30}
					centeredSlides={true}
					autoplay={{
						delay: 15000,
						disableOnInteraction: true,
					}}
					pagination={{
						clickable: true,
					}}
					modules={[Autoplay, Pagination]}
					className="mySwiper"
				>
					<SwiperSlide>
						<SliderCoverItemIGO>
							<CoverHeaderImgIGO>
								<img style={{ borderRadius: '8px' }} src={HeaderImg} alt="" />
							</CoverHeaderImgIGO>
							<Stack>
								<Typography variant="h3" sx={{ fontStyle: 'italic' }}>
									{data.requestINO.projectName}
								</Typography>
								{innerWidth > 1024 ? (
									<Typography mt={2}>
										{sliceString(data.requestINO.projectDescription, 1500)}
									</Typography>
								) : (
									<Typography mt={2}>{exampTypography}</Typography>
								)}
								<StepperCoverIGO mt={4}>
									<Stepper activeStep={1} alternativeLabel>
										{steps.map((label, index) => (
											<Step key={index}>
												<StepLabel>{label.title}</StepLabel>
												{stepActive === label.id && (
													<Box>
														<Stack
															direction="column"
															alignItems="center"
														>
															<Typography>{label.day}</Typography>
															<Typography>{label.time}</Typography>
														</Stack>
													</Box>
												)}
											</Step>
										))}
									</Stepper>
								</StepperCoverIGO>
								<Box sx={{ width: ' 180px', height: '40px', marginTop: '18px' }}>
									<ButtonGradient>View more</ButtonGradient>
								</Box>
							</Stack>
						</SliderCoverItemIGO>
					</SwiperSlide>
					{renderHeaderSlider()}
				</Swiper>
			</Box>
		</div>
	);
}
