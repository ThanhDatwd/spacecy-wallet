/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from 'react';
import '../../../CustomUI/CustomSliderNew/styled';
// IMG Stadium
import Stadium1 from 'assets/Home/Stadium/New/stadium-1.webp';
import StadiumThumb1 from 'assets/Home/Stadium/ALbayt/stadium-1.webp';
import Stadium11 from 'assets/Home/Stadium/ALbayt/stadium1.webp';

import Stadium2 from 'assets/Home/Stadium/New/stadium-2.webp';
import StadiumThumb2 from 'assets/Home/Stadium/ALRayyan/stadium-2.webp';
import Stadium22 from 'assets/Home/Stadium/ALRayyan/stadium2.webp';

import Stadium3 from 'assets/Home/Stadium/New/stadium-3.webp';
import StadiumThumb3 from 'assets/Home/Stadium/ALThumama/stadium-3.webp';
import Stadium33 from 'assets/Home/Stadium/ALThumama/stadium3.webp';

import Stadium4 from 'assets/Home/Stadium/New/stadium-4.webp';
import StadiumThumb4 from 'assets/Home/Stadium/ALWakarh/stadium-4.webp';
import Stadium44 from 'assets/Home/Stadium/ALWakarh/stadium4.webp';

import Stadium5 from 'assets/Home/Stadium/New/stadium-5.webp';
import StadiumThumb5 from 'assets/Home/Stadium/EduCity/stadium-5.webp';
import Stadium55 from 'assets/Home/Stadium/EduCity/stadium5.webp';

import Stadium6 from 'assets/Home/Stadium/New/stadium-6.webp';
import StadiumThumb6 from 'assets/Home/Stadium/Khalifa/stadium-6.webp';
import Stadium66 from 'assets/Home/Stadium/Khalifa/stadium6.webp';

import Stadium7 from 'assets/Home/Stadium/New/stadium-7.webp';
import StadiumThumb7 from 'assets/Home/Stadium/Lusail/stadium-7.webp';
import Stadium77 from 'assets/Home/Stadium/Lusail/stadium7.webp';

import Stadium8 from 'assets/Home/Stadium/New/stadium-8.webp';
import StadiumThumb8 from 'assets/Home/Stadium/Rasabu/stadium-8.webp';
import Stadium88 from 'assets/Home/Stadium/Rasabu/stadium8.webp';

import { Box, Typography, useTheme, Stack } from '@mui/material';
import { SizeContext } from 'contexts/SizeObserver';
import CustomSliderNew from 'components/CustomUI/CustomSliderNew';

const listStadiumCol = [
	{
		id: 1,
		name: '1',
		title: 'Al Thumama Stadium',
		subtitle: 'in Doha',
		info1: 'Being built in 2021, Al Thumama Stadium in Doha can admit 40,000 fans.',
		info2: 'Located 12 km south of central Doha, the Stadium is intended to be used for the 2022 FIFA World Cup. The dynamic and imaginative shape of the Stadium celebrates the local culture and traditions.',
		info3: 'Its bold and circular form is inspired by the traditional woven cap adorned by men across the Arab - the gahfiya.',
		preview: Stadium1,
		thumbnail: StadiumThumb3,
		image: Stadium33,
		images: [Stadium1, StadiumThumb3, Stadium33],
		isBackground3D: false,
		model3D: '',
	},
	{
		id: 2,
		name: '1',

		title: 'Al Bayt Stadium',
		subtitle: 'in Al Khor',
		info1: 'Being the second largest Stadium in Qatar after Lusail Stadium, Al Bayt Stadium in Al Khor has a capacity of 60,000.',
		info2: 'Owned by the Government of Qatar, Al Bayt Stadium is intended to be used for the Opening Match of the FIFA World Cup Qatar 2022.',
		info3: 'Located in Al Khor City, 35 km north of Doha, it is designed based on the bayt al sha’ar of Qatar’s nomadic people with a magnificent tent structure enveloping an ultra-modern football Stadium.',
		preview: Stadium2,
		thumbnail: StadiumThumb1,
		image: Stadium11,
		images: [Stadium2, StadiumThumb1, Stadium11],
		isBackground3D: false,
		model3D: '',
	},
	{
		id: 3,
		name: '1',

		title: 'Ahmad Bin Ali Stadium',
		subtitle: 'in Al Rayyan',
		info1: 'The new Ahmad Bin Ali Stadium in Al Rayyan, after being converted for the 2022 World Cup from the former one, has a seating capacity of 40.000.',
		info2: 'Ahmad Bin Ali Stadium is located right on the edge of a desert, 20km west of central Doha.',
		info3: 'Therefore, the intricate design of the Stadium’s facade as well as its geometric pattern is affected by the undulations of sand dunes and the beauty of the desert such as native flora and fauna.',
		preview: Stadium3,
		thumbnail: StadiumThumb2,
		image: Stadium22,
		images: [Stadium3, StadiumThumb2, Stadium22],
		isBackground3D: false,
		model3D: '',
	},
	{
		id: 4,
		name: '1',
		thumbnail: StadiumThumb4,
		title: 'Al Janoub Stadium',
		subtitle: 'in Al Wakrah',
		info1: 'Al Janoub Stadium in Al Wakrah was inaugurated in 2019 and renovated for the 2022 FIFA World Cup with a capacity of 40,000.',
		info2: 'The Stadium is 22 km south of central Doha. This is where matches for the Qatar Stars League will be held.',
		info3: 'The stadium’s prominent features a curvilinear postmodernist and neo-futurist design, reflecting the wind-filled sails tributing to Al Wakrah’s fishing and pearl diving in the past.',
		preview: Stadium4,
		image: Stadium44,
		images: [Stadium4, StadiumThumb4, Stadium44],
		isBackground3D: false,
		model3D: '',
	},
	{
		id: 5,
		name: '1',

		title: 'Education City Stadium',
		subtitle: 'in Al Rayyan',
		info1: 'The Education City Stadium in Al Rayyan was opened in 2020 with a capacity of 40,000 seats.',
		info2: 'Located 7km away from central Doha, Education City Stadium is a place for students and academics across the Arab to learn and for the upcoming 2022 World Cup matches to occur.',
		info3: 'It has been given the nickname "Diamond in the Desert". The Stadium is a combination of ultra-modern and traditional Islamic design.',
		preview: Stadium5,
		thumbnail: StadiumThumb5,
		image: Stadium55,
		images: [Stadium5, StadiumThumb5, Stadium55],
		isBackground3D: false,
		model3D: '',
	},
	{
		id: 6,
		name: '1',

		title: 'Khalifa International Stadium',
		subtitle: 'in Al Rayyan',
		info1: 'Owned by Qatar Football Association, Khalifa International Stadium in Al Rayyan can hold 40,000 people.',
		info2: 'Khalifa International Stadium is 5km away from central Doha. This is the first stadium to be completed among the eight stadiums that were converted for the 2022 World Cup.',
		info3: 'This is known as the host place of a long list of sporting events, particularly the final of the 2011 AFC Asian Cup.  The most prominent feature of the Stadium is always the magnificent dual arches.',
		preview: Stadium6,
		thumbnail: StadiumThumb6,
		image: Stadium66,
		images: [Stadium6, StadiumThumb6, Stadium66],
		isBackground3D: false,
		model3D: '',
	},
	{
		id: 7,
		name: '1',

		title: 'Lusail Iconic Stadium',
		subtitle: 'in Lusail',
		info1: 'Lusail Iconic Stadium in Lusail, inaugurated in 2022, has a seating capacity for over  80,000 spectators.',
		info2: 'The Stadium is owned by the Qatar Football Association and is known as the biggest Stadium in Qatar. Being one of eight Stadiums that are converted for the 2022 FIFA World Cup in Qatar, Lusail Stadium is where the Final Match will occur.',
		info3: 'Located 16km from the centre of Doha city, the Stadium’s design is inspired by the idea of combining light and darkness.',
		preview: Stadium7,
		thumbnail: StadiumThumb7,
		image: Stadium77,
		images: [Stadium7, StadiumThumb7, Stadium77],
		isBackground3D: false,
		model3D: '',
	},
	{
		id: 8,
		name: '1',

		title: 'Stadium 974',
		subtitle: 'in Doha',
		info1: 'Opened in 2021, Stadium 974  in Doha has a capacity of 40,000.',
		info2: 'The Stadium is located 10 km east of central Doha. It is demountable as constructed from 974 recycling shipping containers and modular steel.',
		info3: 'This is the first temporary venue in FIFA World Cup history, showing Qatar’s concern for cost-effectiveness and sustainability. The Stadium will be dismantled after the 2022 World Cup.',
		preview: Stadium8,
		thumbnail: StadiumThumb8,
		image: Stadium88,
		images: [Stadium8, StadiumThumb8, Stadium88],
		isBackground3D: false,
		model3D: '',
	},
];

export interface IDiscoverStadiumProps {}

export default function DiscoverStadium(props: IDiscoverStadiumProps) {
	const theme = useTheme();

	const { innerWidth } = useContext(SizeContext);

	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const AddButton = innerWidth < 800;
	const [stadiumImg, setStadiumImg] = useState(Stadium1);

	const [show, setShow] = useState(false);

	const handleChangeStadium = (name: string, image: string) => {
		setStadiumImg(image);
	};

	const handleAdd = () => {
		setShow(!show);
	};

	const RenderListStadiumTablet = () => {
		return listStadiumCol.map((stadium: any, index: number) => (
			<Box
				onClick={() => {
					handleChangeStadium(stadium.name, stadium.preview);
				}}
				key={index}
				sx={{
					background: theme.palette.primaryDark.backgroundCard,
					p: '20px',
					borderRadius: '20px',
					display: 'flex',
					alignItems: 'center',
					gap: '20px',
					[theme.breakpoints.down(800)]: {
						flexDirection: 'column',
					},
				}}
			>
				<Box
					sx={{
						width: '65%',
						height: '800px',
						position: 'relative',
						overflow: 'hidden',
						img: {
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							borderRadius: '20px',
							position: 'absolute',
							top: 0,
							left: 0,
						},
						'.img1': {
							zIndex: 5,
							// animation: 'Img1 8s linear forwards',
							// animationDelay: '5s',
						},
						'.img2': {
							zIndex: 4,
							// animation: 'Img1 8s linear infinite alternate',
							// animationDelay: '4s',
						},
						'.img3': {
							zIndex: 3,
						},
						[theme.breakpoints.down(1500)]: {
							height: '700px',
							width: '50%',
						},
						[theme.breakpoints.down(1400)]: {
							height: '650px',
						},
						[theme.breakpoints.down(800)]: {
							width: '100%',
							height: '500px',
						},
						[theme.breakpoints.down(600)]: {
							width: '100%',
							height: '350px',
						},
						'@media (max-height: 800px)': {
							height: '600px',
						},
						'@media (max-height: 800px) and (max-width: 600px)': {
							height: '320px',
						},
					}}
				>
					<img src={stadium.preview} alt={stadium.title} className="img1" />
					<img src={stadium.thumbnail} alt={stadium.title} className="img2" />
					<img src={stadium.image} alt={stadium.title} className="img3" />
					{/* <SwiperWrapper distance={0}>
						<Swiper
							spaceBetween={30}
							centeredSlides={true}
							autoplay={{
								delay: 5000,
								disableOnInteraction: false,
							}}
							pagination={{
								clickable: true,
							}}
							navigation={true}
							modules={[Autoplay, Pagination, Navigation]}
							className="mySwiper"
						>
							{stadium.images.map((image: any, index: number) => (
								<SwiperSlide key={index}>
									<SwiperSlideItem className="slide-item">
										<img src={image} key={index} alt="image" />
									</SwiperSlideItem>
								</SwiperSlide>
							))}
						</Swiper>
					</SwiperWrapper> */}
					{/* {stadium.images.map((image: any, index: number) => (
						<img src={image} key={index} alt="image" />
					))} */}
				</Box>
				<Box
					sx={{
						width: '35%',
						[theme.breakpoints.down(1500)]: {
							width: '50%',
						},
						[theme.breakpoints.down(800)]: {
							width: '100%',
							overflow: 'hidden',
						},
						'@media (max-width: 800px)': {
							height: '160px',
							'&.show-content': {
								height: 'auto',
							},
							// '&.hidden-content': {
							// 	height: '160px',
							// 	transition: 'all 2s ease-in-out',
							// },
						},
					}}
					className={show ? 'show-content' : ''}
				>
					<Box
						mb={4}
						sx={{
							[theme.breakpoints.down(800)]: {
								mb: '24px',
							},
						}}
					>
						<Typography variant="h3" textAlign="center" fontWeight="600">
							{stadium.title}
						</Typography>
						{/* <Typography variant="h6" fontStyle="center" fontWeight="500">
							{stadium.subtitle}
						</Typography> */}
					</Box>
					<Stack
						direction="column"
						gap={2}
						sx={{
							textIndent: '25px',
						}}
					>
						<Typography variant="h6" fontStyle="center" fontWeight="500">
							{stadium.info1}
						</Typography>
						<Typography variant="h6" fontStyle="center" fontWeight="500">
							{stadium.info2}
						</Typography>
						<Typography variant="h6" fontStyle="center" fontWeight="500">
							{stadium.info3}
						</Typography>
					</Stack>
				</Box>
				{AddButton && (
					<Box
						onClick={handleAdd}
						sx={{
							width: '120px',
							height: '40px',
							margin: 'auto',
							background: 'rgba(255,255,255,0.1)',
							backdropFilter: 'blur(3px)',
							borderRadius: '8px',
							padding: '8px',
							transition: 'all ease 0.5s',
							cursor: 'pointer',
							':hover': {
								background: 'rgba(157, 195, 230, 0.6)',
								borderColor: 'rgba(157, 195, 230, 0.6)',
							},
							...(theme.palette.mode === 'light'
								? {
										border: '1px solid rgba(19, 23, 64, 1)',
								  }
								: {
										border: '1px solid #fff',
								  }),
							[theme.breakpoints.down(828)]: {
								padding: '8px 0 0',
							},
						}}
					>
						<Box>
							<Typography
								sx={{
									userSelect: 'none',
									[theme.breakpoints.down(828)]: {
										fontSize: '14px',
									},
								}}
								textAlign="center"
								fontStyle="italic"
							>
								{show ? <>Show less</> : <>Show more</>}
							</Typography>
						</Box>
					</Box>
				)}
			</Box>
		));
	};
	return (
		<div>
			<Box maxWidth={MaxWidth} sx={{ margin: '0 auto' }} py={4}>
				{theme.palette.mode === 'light' ? (
					<Box pb={4}>
						<Typography
							color="rgba(19, 23, 64, 1)"
							variant="h2"
							textAlign="center"
							fontStyle="italic"
							fontWeight={600}
						>
							Discover Virtual Sport
						</Typography>
					</Box>
				) : (
					<Box pb={4}>
						<Typography
							color="white"
							variant="h2"
							textAlign="center"
							fontStyle="italic"
							fontWeight={600}
						>
							Discover Virtual Sport
						</Typography>
					</Box>
				)}

				<Box px={3.5}>
					<Box>
						<CustomSliderNew
							spaceBetween={0}
							centeredSlides={true}
							renderItem={RenderListStadiumTablet()}
						/>
					</Box>
				</Box>
			</Box>
		</div>
	);
}
