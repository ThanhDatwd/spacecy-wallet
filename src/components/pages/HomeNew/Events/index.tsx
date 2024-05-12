import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/grid/grid.min.css';
// import required modules
import { Navigation, Autoplay } from 'swiper';
import { SwiperWrapper } from './styled';

import fifa from 'assets/Home/LOGOPartnersNew/backgroundwc.png';
import xmas from 'assets/Home/xmas.png';
import xmasText from 'assets/Home/xmas-text.svg';
import logowc from 'assets/Home/LOGOPartnersNew/logowc.svg';
import titlewc from 'assets/Home/LOGOPartnersNew/titlewc.svg';
import { PATH_VIRTUAL_WORLD } from 'routes/path';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import iconRight from 'assets/icons/right-new.svg';
import CloseIcon from '@mui/icons-material/Close';

export default function Event() {
	const theme = useTheme();
	const [ads, setAds] = useState(false);

	return (
		<SwiperWrapper
			sx={{
				...(ads === true && {
					// display: 'none',
					transition: 'all ease-in-out 0.8s',
					opacity: '0',
				}),
			}}
		>
			<Swiper
				navigation={true}
				spaceBetween={10}
				loop={true}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				modules={[Autoplay, Navigation]}
				className="mySwiper"
			>
				<SwiperSlide>
					<Box
						sx={{
							background: `url(${fifa}) center center / cover no-repeat`,
							width: '100%',
							height: '100%',
							borderRadius: '20px',
							...(ads === true && {
								// display: 'none',
								transition: 'all ease-in-out 0.8s',
								opacity: '0',
							}),
						}}
					>
						<Box
							sx={{
								position: 'absolute',
								top: '0',
								bottom: '0',
								left: '0',
								right: '0',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								p: 1,
							}}
						>
							<Box
								sx={{
									height: '310px',
									marginBottom: '15px',
									[theme.breakpoints.down(2000)]: {
										height: '320px',
									},
									[theme.breakpoints.down(1500)]: {
										height: '300px',
									},
									[theme.breakpoints.down(1000)]: {
										height: '280px',
									},
									[theme.breakpoints.down(768)]: {
										height: '250px',
									},
									[theme.breakpoints.down(480)]: {
										height: '220px',
									},
								}}
							>
								<img
									src={logowc}
									alt="logoworldcup"
									style={{ height: '100%', width: '100%' }}
								/>
							</Box>
							<Box
								sx={{
									width: '30%',
									display: 'flex',
									gap: '30px',
									position: 'relative',
									[theme.breakpoints.down(2000)]: {
										minWidth: '500px',
									},
									[theme.breakpoints.down(1500)]: {
										minWidth: '450px',
									},
									// [theme.breakpoints.down(1300)]: {
									// 	minWidth: '400px',
									// 	flexDirection: 'column',
									// 	gap: '15px',
									// },
									[theme.breakpoints.down(1160)]: {
										flexDirection: 'column',
										minWidth: '400px',
										gap: '15px',
									},
									[theme.breakpoints.down(500)]: {
										flexDirection: 'column',
										minWidth: '300px',
									},
								}}
							>
								<img
									src={titlewc}
									alt="titleworldcup"
									style={{ height: '100%', width: '100%' }}
								/>
								<Stack
									gap="20px"
									sx={{
										textDecoration: 'none !important',
										position: 'absolute',
										left: '110%',
										[theme.breakpoints.down(1300)]: {
											position: 'relative',
											left: '0%',
										},
										[theme.breakpoints.down(768)]: {
											position: 'relative',
											left: '0%',
										},
									}}
								>
									<Link
										href={`${PATH_VIRTUAL_WORLD.virtualSport}`}
										target="_blank"
										sx={{ textDecoration: 'none !important' }}
									>
										<ButtonWhite
											sx={{
												width: '12rem',
												mb: 0,
												background: 'rgba(255,255,255,0.1)',
												backdropFilter: 'blur(3px)',
												height: 'fit-content',
												margin: '0 auto',

												':hover': {
													background: 'rgba(157, 195, 230, 0.6)',
													borderColor: 'rgba(157, 195, 230, 0.6)',
												},
												img: {
													marginLeft: '10px',
													width: '20px',
												},
											}}
										>
											<Typography
												color="white"
												fontWeight="500"
												sx={{
													textDecoration: 'none  !important',
													[theme.breakpoints.down(500)]: {
														fontSize: '13px',
													},
												}}
											>
												Join Virtual
											</Typography>
											<img src={iconRight} alt="icon" />
										</ButtonWhite>
									</Link>
									<Link
										href={`${PATH_VIRTUAL_WORLD.eventFifa}`}
										target="_blank"
										sx={{ textDecoration: 'none !important' }}
									>
										<ButtonWhite
											sx={{
												width: '12rem',
												mb: 0,
												background: 'rgba(255,255,255,0.1)',
												backdropFilter: 'blur(3px)',
												height: 'fit-content',
												margin: '0 auto',

												':hover': {
													background: 'rgba(157, 195, 230, 0.6)',
													borderColor: 'rgba(157, 195, 230, 0.6)',
												},
												img: {
													marginLeft: '10px',
													width: '20px',
												},
											}}
										>
											<Typography
												color="white"
												fontWeight="500"
												sx={{
													textDecoration: 'none  !important',

													[theme.breakpoints.down(500)]: {
														fontSize: '13px',
													},
												}}
											>
												Join Voting
											</Typography>
											<img src={iconRight} alt="icon" />
										</ButtonWhite>
									</Link>
								</Stack>
							</Box>
						</Box>

						<CloseIcon
							sx={{ position: 'absolute', right: '1%', top: '2%', cursor: 'pointer' }}
							onClick={() => {
								setAds(true);
							}}
						/>
					</Box>
				</SwiperSlide>
				<SwiperSlide>
					<Box
						sx={{
							background: `url(${xmas}) center center / cover no-repeat`,
							width: '100%',
							height: '100%',
							position: 'relative',
							borderRadius: '20px',
							...(ads === true && {
								// display: 'none',
								transition: 'all ease-in-out 0.8s',
								opacity: '0',
							}),
						}}
					>
						<CloseIcon
							sx={{ position: 'absolute', right: '1%', top: '2%', cursor: 'pointer' }}
							onClick={() => {
								setAds(true);
							}}
						/>
						<Box
							sx={{
								position: 'absolute',
								left: '50%',
								bottom: '40px',
								transform: 'translateX(-50%)',
								width: '70%',
								'@media (max-width: 800px)': {
									width: '80%',
								},
								'@media (max-width: 500px)': {
									width: '90%',
								},
							}}
						>
							<Stack
								direction="row"
								gap="32px"
								alignItems="center"
								sx={{
									'@media (max-width: 1024px)': {
										flexDirection: 'column',
										gap: '20px',
									},
								}}
							>
								<Box
									mb={2}
									sx={
										{
											// width: '100%',
											// img: {
											// 	width: '100%',
											// },
										}
									}
								>
									<img src={xmasText} alt="xmas" />
								</Box>
								<Stack gap="16px">
									<Link
										href={`${PATH_VIRTUAL_WORLD.eventXmax}`}
										target="_blank"
										sx={{ textDecoration: 'none !important' }}
									>
										<ButtonWhite
											sx={{
												width: '15rem',
												mb: 0,
												background: 'rgba(255,255,255,0.1)',
												backdropFilter: 'blur(3px)',
												height: 'fit-content',
												margin: '0 auto',
												padding: '8px 24px',

												':hover': {
													background: 'rgba(157, 195, 230, 0.6)',
													borderColor: 'rgba(157, 195, 230, 0.6)',
												},
												img: {
													marginLeft: '10px',
													width: '20px',
												},
											}}
										>
											<Typography
												color="white"
												fontWeight="500"
												sx={{
													textDecoration: 'none  !important',

													[theme.breakpoints.down(500)]: {
														fontSize: '13px',
													},
												}}
											>
												Join Virtual Xmas
											</Typography>
											<img src={iconRight} alt="icon" />
										</ButtonWhite>
									</Link>
									<Link
										href="https://xmas.metaspacecy.com/"
										target="_blank"
										sx={{ textDecoration: 'none !important' }}
									>
										<ButtonWhite
											sx={{
												width: '15rem',
												mb: 0,
												background: 'rgba(255,255,255,0.1)',
												backdropFilter: 'blur(3px)',
												height: 'fit-content',
												margin: '0 auto',
												padding: '8px 24px',

												':hover': {
													background: 'rgba(157, 195, 230, 0.6)',
													borderColor: 'rgba(157, 195, 230, 0.6)',
												},
												img: {
													marginLeft: '10px',
													width: '20px',
												},
											}}
										>
											<Typography
												color="white"
												fontWeight="500"
												sx={{
													textDecoration: 'none  !important',

													[theme.breakpoints.down(500)]: {
														fontSize: '13px',
													},
												}}
											>
												Join Xmas
											</Typography>
											<img src={iconRight} alt="icon" />
										</ButtonWhite>
									</Link>
								</Stack>
							</Stack>
						</Box>
					</Box>
				</SwiperSlide>
			</Swiper>
		</SwiperWrapper>
	);
}
