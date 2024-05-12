/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, Stack, Typography, useTheme } from '@mui/material';
import React, { Fragment, useEffect, useState, useRef, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { BoarcItem, ItemImg, ItemContent, ContentAuction } from './styled';
import { SizeContext } from 'contexts/SizeObserver';

// Image
import gallery1 from 'assets/Boarc/gallery1.webp';
import gallery2 from 'assets/Boarc/gallery2.webp';
import gallery3 from 'assets/Boarc/gallery3.webp';
import item1 from 'assets/Boarc/item1.webp';
import item2 from 'assets/Boarc/item2.webp';
import item3 from 'assets/Boarc/item3.webp';
import item4 from 'assets/Boarc/item4.webp';
import item5 from 'assets/Boarc/item5.webp';
import item6 from 'assets/Boarc/item6.webp';
import item7 from 'assets/Boarc/item7.webp';
import item8 from 'assets/Boarc/item8.webp';
import item9 from 'assets/Boarc/item9.webp';
import item10 from 'assets/Boarc/item10.webp';
import item11 from 'assets/Boarc/item11.webp';
import item12 from 'assets/Boarc/item12.webp';
import item13 from 'assets/Boarc/item13.webp';
import BrandPartner from 'components/pages/HomeNew/BrandPartner';
import ThemePrimaryColor from 'components/Theme/ThemePrimaryColor';
import boarc1 from 'assets/Boarc/1.webp';
import boarc2 from 'assets/Boarc/2.webp';

import image8 from 'assets/Boarc/image8.png';
import image10 from 'assets/Boarc/image10.png';
import image9 from 'assets/Boarc/image9.png';
import image11 from 'assets/Boarc/image11.png';
import image12 from 'assets/Boarc/image12.png';
import image13 from 'assets/Boarc/image13.png';
import image14 from 'assets/Boarc/image14.png';
import image15 from 'assets/Boarc/image15.png';
import image16 from 'assets/Boarc/image16.png';
import image17 from 'assets/Boarc/image17.png';
import image18 from 'assets/Boarc/image18.png';
import image19 from 'assets/Boarc/image19.png';
import image20 from 'assets/Boarc/image20.png';
import image21 from 'assets/Boarc/image21.png';
import image22 from 'assets/Boarc/image22.png';
import image23 from 'assets/Boarc/image23.png';
import image24 from 'assets/Boarc/image24.png';
import image25 from 'assets/Boarc/image25.png';
import image26 from 'assets/Boarc/image26.png';
import image27 from 'assets/Boarc/image27.png';
import image28 from 'assets/Boarc/image28.png';
import image29 from 'assets/Boarc/image29.png';
import image30 from 'assets/Boarc/image30.png';
import image31 from 'assets/Boarc/image31.png';
import image34 from 'assets/Boarc/image34.png';
import image32 from 'assets/Boarc/image32.png';
import image33 from 'assets/Boarc/image33.png';
import image35 from 'assets/Boarc/image35.png';
import image36 from 'assets/Boarc/image36.png';
import image37 from 'assets/Boarc/image37.png';
import image38 from 'assets/Boarc/image38.png';
import image39 from 'assets/Boarc/image39.png';
import image40 from 'assets/Boarc/image40.png';
import image41 from 'assets/Boarc/image41.png';
import image42 from 'assets/Boarc/image42.png';
import bglight from 'assets/Home/BG1.webp';

import ButtonWhite from 'components/CustomUI/ButtonWhite';
import SlideBoarc from './SlideBoarc/SlideBoarc';
import Mandala from './Mandala';
import Padoga from './Padoga';

const CollectionBoarcMobile: React.FC = () => {
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const theme = useTheme();
	return (
		<Fragment>
			<Box
				sx={{
					marginTop: '98px',
					width: '100vw',

					img: {
						width: '100%',
						height: 'calc(100vh - 98px)',
						objectFit: 'cover',
						objectPosition: 'center center',
					},
				}}
			>
				<img src={gallery1} alt="gallery" />
			</Box>
			<Box
				sx={{
					background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
				}}
			>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
					px={4}
				>
					<Mandala />
				</Box>
			</Box>
			<Box sx={{ background: '#fff' }}>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
					px={4}
				>
					<Padoga />
					<Box pb={4} sx={{ img: { width: '100%' } }}>
						<img src={image8} alt="boarc" />
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
				}}
			>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
					px={4}
				>
					<Box sx={{ py: 4 }}>
						<Box
							sx={{
								marginBottom: '16px',
								textAlign: 'center',
								h6: {
									maxWidth: '900px',
									mx: 'auto',
								},
							}}
						>
							<Typography variant="h2" mb={1} fontWeight={600}>
								Temple Of Literature
							</Typography>
							<Typography variant="h6" fontWeight="500">
								Khue Van Cac is located in Van Mieu - Quoc Tu Giam, Which is
								considered the first university of the Vietnamese
							</Typography>
							<Box mt={2}>
								<Typography variant="h4" fontWeight="600" mb={2}>
									Specifications
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Scale: 1/100
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Size: 30 x 30 x 35 (cm)
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Number of sticks: 10.000 pieces
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Execution time: 1 months
								</Typography>
							</Box>
						</Box>
						<Stack alignItems="center" justifyContent="center" gap="8px">
							<Box
								sx={{
									width: '50%',
									img: {
										width: '100%',
									},
								}}
							>
								<img src={image9} alt="boarc" />
							</Box>
							<Box
								sx={{
									width: '80%',
									img: {
										width: '100%',
									},
								}}
							>
								<img src={image10} alt="boarc" />
							</Box>
						</Stack>
					</Box>
				</Box>
			</Box>
			<Box sx={{ background: '#fff' }}>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
					px={4}
				>
					<Box sx={{ py: 4 }}>
						<Box
							sx={{
								marginBottom: '16px',
								textAlign: 'center',
								h6: {
									maxWidth: '900px',
									mx: 'auto',
								},
							}}
						>
							<Typography variant="h2" mb={1} fontWeight={600}>
								Vietnam Geographic Map
							</Typography>
							<Typography variant="h6" fontWeight="500">
								Vietnam map showcases the charming beauty of the Vietnam’s
								landscape. This artwork received international recognition and
								well-acclaimed at the exhibitions in London and in the USA.
							</Typography>
							<Box
								mt={2}
								sx={{
									width: '100%',
									img: {
										width: '100%',
									},
								}}
							>
								<img src={image11} alt="boarc" />
							</Box>
							<Box my={2}>
								<Typography variant="h4" fontWeight="600" mb={1}>
									Specifications
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Scale: 1/100
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Size: 60 x 90 x10 (cm)
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Number of sticks: 25.000 pieces
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Execution time: 40 months
								</Typography>
							</Box>
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="space-between"
							>
								<Box
									sx={{
										width: '49%',
										img: {
											width: '100%',
										},
									}}
								>
									<img src={image40} alt="boarc" />
								</Box>
								<Box
									sx={{
										width: '49%',
										img: {
											width: '100%',
										},
									}}
								>
									<img src={image12} alt="boarc" />
								</Box>
							</Stack>
						</Box>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
				}}
			>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
					px={4}
				>
					<Box sx={{ py: 4 }}>
						<Box
							sx={{
								marginBottom: '16px',
								textAlign: 'center',
								h6: {
									maxWidth: '900px',
									mx: 'auto',
								},
							}}
						>
							<Typography variant="h2" mb={1} fontWeight={600}>
								White House
							</Typography>
							<Box mt={2}>
								<Typography variant="h4" fontWeight="600" mb={1}>
									Specifications
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Scale: 1/100
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Size: 2.1 x 1.1 x 0.5 (m)
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Number of sticks: 180.000 pieces
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Execution time: 5 months
								</Typography>
							</Box>
						</Box>
						<Stack justifyContent="center" alignItems="center" gap={1}>
							<Box
								sx={{
									width: '80%',
									img: {
										width: '100%',
									},
								}}
							>
								<img src={image13} alt="boarc" />
							</Box>
							<Box
								sx={{
									width: '50%',
									img: {
										width: '100%',
									},
								}}
							>
								<img src={image14} alt="boarc" />
							</Box>
						</Stack>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					background: '#fff',
				}}
			>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
					px={4}
				>
					<Box sx={{ py: 4 }}>
						<Box
							sx={{
								marginBottom: '16px',
								textAlign: 'center',
								h6: {
									maxWidth: '900px',
									mx: 'auto',
								},
							}}
						>
							<Typography variant="h2" mb={1} fontWeight={600}>
								The US Capitol
							</Typography>
							<Typography variant="h6" fontWeight="500">
								Starting from the DOME part of the building, BOARC tried its first
								domed architecture with bamboo sticks.
							</Typography>
							<Typography variant="h6" fontWeight="500">
								In completing this art work, museum representative of Ripley’s
								Believe It or Not Museum contacted BOARC for a first-hand view and
								ordered BOARC to perform the entire project to exhibit at the
								museum.{' '}
							</Typography>
							<Typography variant="h6" fontWeight="500">
								US CAPITOL is currently on display at the museum Ripley’s Believe It
								or Not! at Dubai - UAE{' '}
							</Typography>
						</Box>{' '}
						<Stack justifyContent="space-between" alignItems="center">
							<Box sx={{ textAlign: 'center', pt: 2 }}>
								<Typography variant="h4" fontWeight="600" mb={2}>
									Specifications
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Scale: 1/100
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Size: 2.8 x 2.1 x 1.1 (m)
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Number of sticks: 250.000 pieces
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Execution time: 7 months
								</Typography>
							</Box>
							<Box
								sx={{
									width: '100%',
									img: {
										width: '100%',
									},
								}}
							>
								<img src={image41} alt="boarc" />
							</Box>
						</Stack>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
				}}
			>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
					px={4}
				>
					<Box sx={{ py: 4 }}>
						<Box
							sx={{
								marginBottom: '16px',
								textAlign: 'center',
								h6: {
									maxWidth: '900px',
									mx: 'auto',
								},
							}}
						>
							<Typography variant="h2" mb={1} fontWeight={600}>
								Bigben
							</Typography>
							<Typography variant="h6" fontWeight="500">
								“The ancient beauty of Big Ben bronze tower – the symbol of England
								has fascinated me since childhood. When started working on the
								project, I fell in love with the intricate details of this mid-
								eighteenth-century masterpiece. ”
							</Typography>
							<Typography variant="h6" fontWeight="500">
								Master, architect Hoang Tuan Long
							</Typography>
						</Box>
						<Stack justifyContent="center" alignItems="center">
							<Box
								sx={{
									img: {
										width: '70%',
										mx: 'auto',
									},
								}}
							>
								<img src={image17} alt="boarc" />
								<Box my={2} textAlign="center">
									<Typography variant="h4" fontWeight="600" mb={2}>
										Specifications
									</Typography>
									<Typography variant="h6" fontWeight="500">
										Scale: 1/100
									</Typography>
									<Typography variant="h6" fontWeight="500">
										Size: 0.6 x 0.6 x 2.4 (m)
									</Typography>
									<Typography variant="h6" fontWeight="500">
										Number of sticks: 40.000 pieces
									</Typography>
									<Typography variant="h6" fontWeight="500">
										Execution time: 4 months
									</Typography>
								</Box>
							</Box>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									img: {
										width: '49%',
										objectFit: 'cover',
										objectPosition: 'center',
									},
								}}
							>
								<img src={image18} alt="boarc" />
								<img src={image19} alt="boarc" />
							</Box>
						</Stack>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					background: '#fff',
				}}
			>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
					px={4}
				>
					<Box sx={{ py: 4 }}>
						<Box
							sx={{
								marginBottom: '16px',
								textAlign: 'center',
								h6: {
									maxWidth: '900px',
									mx: 'auto',
								},
							}}
						>
							<Typography variant="h2" mb={1} fontWeight={600}>
								Taj Mahal
							</Typography>
							<Typography variant="h6" fontWeight="500">
								The artwork especially inspired BOARC not only by the features of
								Islamic art nearly 400 years ago, but also because of the love story
								of Emperor Mogul Shãh Jahãn for his dearest wife.
							</Typography>
							<Box mt={2}>
								<Typography variant="h4" fontWeight="600" mb={1}>
									Specifications
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Scale: 1/100
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Size: 0.6 x 0.6 x 0.55 (m)
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Number of sticks: 18.000 pieces
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Execution time: 3 months
								</Typography>
							</Box>
						</Box>
						<Stack direction="row" justifyContent="space-between" alignItems="center">
							<Box
								sx={{
									width: '100%',
									img: {
										width: '100%',
									},
								}}
							>
								<img src={image20} alt="boarc" />
							</Box>
						</Stack>
						<Stack direction="row" justifyContent="space-between" alignItems="center">
							<Box
								sx={{
									width: '100%',
									img: {
										width: '100%',
									},
								}}
							>
								<img src={image21} alt="boarc" />
							</Box>
						</Stack>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
				}}
			>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
					px={4}
				>
					<Box pt={4}>
						<Box sx={{ textAlign: 'center', mb: 2 }}>
							<Typography variant="h2" mb={1} fontWeight="600">
								All Saint Church
							</Typography>
							<Typography variant="h6" fontWeight="500">
								The Church of All Saints is one of the most beautiful Orthodox
								churches in Minsk. It was built in memory of innocent soldiers,
								killed in the battles of three wars, were buried in the crypt of the
								church.
							</Typography>
							<Box my={2}>
								<Typography variant="h4" fontWeight="600" mb={1}>
									Specifications
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Scale: 1/100
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Size: 2.8 x 2.1 x 1.1 (m)
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Number of sticks: 200.000 pieces
								</Typography>
								<Typography variant="h6" fontWeight="500">
									Execution time: 4 months
								</Typography>
							</Box>
						</Box>
						<Box
							sx={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr',
								columnGap: '8px',
							}}
						>
							<Stack
								sx={{
									img: {
										width: '100%',
									},
								}}
							>
								<img src={image22} alt="boarc" />
							</Stack>
							<Stack
								sx={{
									img: {
										width: '100%',
										objectFit: 'cover',
										objectPosition: 'center',
										height: '100%',
										borderRadius: '8px',
									},
								}}
							>
								<img src={image23} alt="boarc" />
							</Stack>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					background: '#fff',
				}}
			>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
					px={4}
				>
					<Box pt={1} pb={4} sx={{ img: { width: '100%' } }}>
						<img src={image24} alt="boarc" />
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
				}}
			>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
					px={4}
				>
					<Box sx={{ py: 4 }}>
						<Box
							sx={{
								marginBottom: '16px',
								textAlign: 'center',
								h6: {
									maxWidth: '900px',
									mx: 'auto',
								},
							}}
						>
							<Typography variant="h2" mb={1} fontWeight={600}>
								Senerity/Tranquility
							</Typography>
							<Typography variant="h6" fontWeight="500">
								The design of the Avalokiteśvara Bodhisattva sits in the middle of
								the Lotus, with the attendance of the Seven Buddha is set in the
								front, represents the tranquility and peacefulness to the world.
							</Typography>
						</Box>
						<Stack direction="row" justifyContent="space-between" alignItems="flex-end">
							<Box
								sx={{
									width: '49%',
									img: {
										width: '100%',
									},
								}}
							>
								<img src={image25} alt="boarc" />
							</Box>
							<Box
								sx={{
									width: '49%',
									img: {
										width: '100%',
									},
								}}
							>
								<img src={image26} alt="boarc" />
							</Box>
						</Stack>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
				}}
			>
				<Box
					sx={{
						pt: 4,
						pb: 3,
					}}
				>
					<SlideBoarc />
				</Box>
			</Box>
			<Box
				sx={{
					background: '#fff',
				}}
			>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
					px={4}
				>
					<Box sx={{ py: 4 }}>
						<Box
							sx={{
								marginBottom: '16px',
								textAlign: 'center',
								h6: {
									maxWidth: '900px',
									mx: 'auto',
								},
							}}
						>
							<Typography variant="h2" mb={1} fontWeight={600}>
								Clock
							</Typography>
							<Typography variant="h6" fontWeight="500">
								BOARC’s unique timepieces are inspired by details on famous works in
								Vietnam and around the world.
							</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								gap: '8px',
								alignItems: 'center',
								img: {
									width: '100%',
									height: 'fit-content',
									display: 'inline',
								},
							}}
						>
							<Box sx={{ width: '69%' }}>
								<Box>
									<img src={image35} alt="boarc" style={{ height: 'auto' }} />
								</Box>

								<Box>
									<img src={image42} alt="boarc" style={{ height: 'auto' }} />
								</Box>
							</Box>

							<Box
								sx={{
									width: '31%',
									img: {
										borderRadius: '8px',
									},
								}}
							>
								<img src={image36} alt="boarc" />
								<img src={image37} alt="boarc" style={{ margin: '8px 0' }} />
								<img src={image38} alt="boarc" />
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
				}}
			>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
					px={4}
				>
					<Box sx={{ py: 4 }}>
						<Box
							sx={{
								marginBottom: '16px',
								textAlign: 'center',
								h6: {
									maxWidth: '900px',
									mx: 'auto',
								},
							}}
						>
							<Typography variant="h2" mb={1} fontWeight={600}>
								Cross
							</Typography>
							<Typography variant="h6" fontWeight="500">
								The cross symbol is the most loved design by The cross symbol is the
								most loved design by of curvy curves and beautiful 3D shapes creates
								a very unique product.
							</Typography>
						</Box>
						<Box
							sx={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr 1fr',
								columnGap: '8px',
								img: {
									width: '100%',
								},
							}}
						>
							<img src={image27} alt="boarc" />
							<img src={image28} alt="boarc" />
							<img src={image29} alt="boarc" />
						</Box>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					background: '#fff',
				}}
			>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						[theme.breakpoints.down(768)]: {
							px: 2,
						},
						[theme.breakpoints.down(480)]: {
							px: 1,
						},
					}}
					px={4}
				>
					<Box
						sx={{
							py: 4,
							// img: {
							// 	borderRadius: '12px',
							// },
						}}
					>
						<Box
							sx={{
								marginBottom: '16px',
								textAlign: 'center',
								h6: {
									maxWidth: '900px',
									mx: 'auto',
								},
							}}
						>
							<Typography variant="h2" mb={1} fontWeight={600}>
								Boarc Gallery
							</Typography>
						</Box>
						<Box
							sx={{
								// display: 'grid',
								// gridTemplateColumns: '1fr 1fr',
								// columnGap: '32px',
								display: 'flex',
								justifyContent: 'space-between',
								gap: '8px',
								overflow: 'hidden',
								img: {
									width: '100%',
									objectFit: 'cover',
									objectPosition: 'center',
									'&:first-child': {
										width: '60%',
									},
									'&:last-child': {
										width: '40%',
									},
								},
							}}
						>
							<img src={image30} alt="boarc" />
							<img src={image31} alt="boarc" />
						</Box>
						<Box
							my={1}
							sx={{
								// display: 'grid',
								// gridTemplateColumns: '1fr 1fr',
								// columnGap: '32px',
								display: 'flex',
								justifyContent: 'space-between',
								gap: '8px',

								overflow: 'hidden',
								img: {
									width: '100%',
									objectFit: 'cover',
									objectPosition: 'center',
									'&:first-child': {
										width: '40%',
									},
									'&:last-child': {
										width: '60%',
									},
								},
							}}
						>
							<img src={image32} alt="boarc" />
							<img src={image33} alt="boarc" />
						</Box>
						<Box
							sx={{
								img: {
									width: '100%',
								},
							}}
						>
							<img src={image34} alt="boarc" />
						</Box>
					</Box>
				</Box>
			</Box>
		</Fragment>
	);
};

export default React.memo(CollectionBoarcMobile);
