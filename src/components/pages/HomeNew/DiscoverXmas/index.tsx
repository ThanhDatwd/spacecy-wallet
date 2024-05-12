/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from 'react';
import '../../../CustomUI/CustomSliderNew/styled';
// IMG Stadium
import xmas1 from 'assets/Home/xmas/xmas1.webp';
import xmas2 from 'assets/Home/xmas/xmas2.webp';
import xmas3 from 'assets/Home/xmas/xmas3.webp';
import xmas4 from 'assets/Home/xmas/xmas4.webp';

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

		image: xmas1,
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

		image: xmas2,
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
		image: xmas3,
		isBackground3D: false,
		model3D: '',
	},
	{
		id: 4,
		name: '1',
		title: 'Al Janoub Stadium',
		subtitle: 'in Al Wakrah',
		info1: 'Al Janoub Stadium in Al Wakrah was inaugurated in 2019 and renovated for the 2022 FIFA World Cup with a capacity of 40,000.',
		info2: 'The Stadium is 22 km south of central Doha. This is where matches for the Qatar Stars League will be held.',
		info3: 'The stadium’s prominent features a curvilinear postmodernist and neo-futurist design, reflecting the wind-filled sails tributing to Al Wakrah’s fishing and pearl diving in the past.',

		image: xmas4,
		isBackground3D: false,
		model3D: '',
	},
];

export interface IDiscoverStadiumProps {}

export default function DiscoverXmas(props: IDiscoverStadiumProps) {
	const theme = useTheme();

	const { innerWidth } = useContext(SizeContext);

	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const AddButton = innerWidth < 800;
	const [stadiumImg, setStadiumImg] = useState(xmas1);

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
						width: '100%',
						position: 'relative',
						overflow: 'hidden',
						img: {
							borderRadius: '16px',
						},
					}}
				>
					{/* <img src={stadium.preview} alt={stadium.title} className="img1" />
					<img src={stadium.thumbnail} alt={stadium.title} className="img2" /> */}
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
				{/* <Box
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
				</Box> */}
				{/* {AddButton && (
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
				)} */}
			</Box>
		));
	};
	return (
		<div>
			<Box
				maxWidth={MaxWidth}
				sx={{
					margin: '0 auto',
					[theme.breakpoints.down(768)]: {
						py: '16px',
					},
					[theme.breakpoints.down(480)]: {
						py: '8px',
					},
				}}
				py={4}
			>
				{theme.palette.mode === 'light' ? (
					<Box
						pb={4}
						sx={{
							[theme.breakpoints.down(768)]: {
								pb: '24px',
							},
							[theme.breakpoints.down(480)]: {
								pb: '16px',
							},
						}}
					>
						<Typography
							color="rgba(19, 23, 64, 1)"
							variant="h2"
							textAlign="center"
							fontStyle="italic"
							fontWeight={600}
						>
							Discover Virtual Xmas
						</Typography>
					</Box>
				) : (
					<Box
						pb={4}
						sx={{
							[theme.breakpoints.down(768)]: {
								pb: '6px',
							},
							[theme.breakpoints.down(480)]: {
								pb: '0px',
							},
						}}
					>
						<Typography
							color="white"
							variant="h2"
							textAlign="center"
							fontStyle="italic"
							fontWeight={600}
						>
							Discover Virtual Xmas
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
