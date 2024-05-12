/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useContext } from 'react';
import { LinkWrapper } from 'components/CustomUI/Card/NFTItemCard/styled';

// IMG Coverflow

import Cover1 from 'assets/Boarc/1.webp';
import Cover2 from 'assets/Boarc/2.webp';
import Cover3 from 'assets/Boarc/3.webp';
import Cover4 from 'assets/Boarc/4.webp';
import Cover5 from 'assets/Boarc/5.webp';
import Cover6 from 'assets/Boarc/6.webp';
import Cover7 from 'assets/Boarc/7.webp';
import Cover8 from 'assets/Boarc/8.webp';
import Cover9 from 'assets/Boarc/9.webp';
import Cover10 from 'assets/Boarc/10.webp';
import Cover11 from 'assets/Boarc/11.webp';
import Cover12 from 'assets/Boarc/12.webp';

// AVTAR Coverflow
import Ava1 from 'assets/Home/Coverflow/avatar-1.webp';
import Ava2 from 'assets/Home/Coverflow/avatar-2.webp';
// import Ava3 from 'assets/Home/Coverflow/avatar-3.webp';
import Ava4 from 'assets/Home/Coverflow/avatar-4.webp';
import Ava5 from 'assets/Home/Coverflow/avatar-5.webp';
import Ava6 from 'assets/Home/Coverflow/avatar-6.webp';
import Ava7 from 'assets/Home/Coverflow/avatar-7.webp';
import Ava8 from 'assets/Home/Coverflow/avatar-8.webp';
import { Box, Typography, useTheme } from '@mui/material';
import CustomSliderCoverflow from 'components/CustomUI/CustomSliderCoverflow';
import { SizeContext } from 'contexts/SizeObserver';
import bglight from 'assets/Home/BG1.webp';

export interface IDiscoverNFTsProps {}
const ListCoverFlow = [
	{
		id: 1,
		itemName: 'Boarc 1',
		itemImg: Cover1,
		avatar: Ava2,
		userName: 'Harry',
		link: '',
		class: '',
	},
	{
		id: 2,
		itemName: 'Boarc 2',
		itemImg: Cover2,
		avatar: Ava2,
		userName: 'Amsterdam',
		link: '',
		class: '',
	},
	{
		id: 3,
		itemName: 'Boarc 3',
		itemImg: Cover3,
		avatar: Ava5,
		userName: 'Los Angeles',
		link: '',
		class: '',
	},
	{
		id: 4,
		itemName: 'Boarc 4',
		itemImg: Cover4,
		avatar: Ava4,
		userName: ' Aldrin	Apollo 11',
		link: '',
		class: '',
	},
	{
		id: 5,
		itemName: 'Boarc 5',
		itemImg: Cover5,
		avatar: Ava5,
		userName: 'Soyuz 11',
		link: '',
		class: '',
	},
	{
		id: 6,
		itemName: 'Boarc 6',
		itemImg: Cover6,
		avatar: Ava6,
		userName: 'Alan Shepard',
		link: '',
		class: '',
	},
	{
		id: 7,
		itemName: 'Boarc 7',
		itemImg: Cover7,
		avatar: Ava7,
		userName: 'Gherman Titov',
		link: '',
		class: '',
	},
	{
		id: 8,
		itemName: 'Boarc 8',
		itemImg: Cover8,
		avatar: Ava8,
		userName: 'Aleksey Leonov',
		link: '',
		class: '',
	},
	{
		id: 9,
		itemName: 'Boarc 9',
		itemImg: Cover9,
		avatar: Ava6,
		userName: 'Taylor Swift',
		link: '',
		class: '',
	},
	{
		id: 10,
		itemName: 'Boarc 10',
		itemImg: Cover10,
		avatar: Ava4,
		userName: 'Katy Perry',
		link: '',
		class: '',
	},
	{
		id: 4,
		itemName: 'Boarc 11',
		itemImg: Cover11,
		avatar: Ava4,
		userName: ' Aldrin	Apollo 11',
		link: '',
		class: '',
	},
	{
		id: 5,
		itemName: 'Boarc 12',
		itemImg: Cover12,
		avatar: Ava5,
		userName: 'Soyuz 11',
		link: '',
		class: '',
	},
];
// const HeightCardCoverflow = '480px';
export default function SlideBoarc(props: IDiscoverNFTsProps) {
	// const { innerWidth } = useContext(SizeContext);
	const theme = useTheme();

	// const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';

	const RenderListCoverflow = () => {
		return ListCoverFlow.map((item: any, index: number) => (
			<LinkWrapper
				key={index}
				href={item.link}
				className={item.class === '' ? '' : item.class}
			>
				<Box
					sx={{
						background: '#fff',
						boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.25)',
						border: '1px solid #e7e8ec',
						overflow: 'hidden',
					}}
				>
					<Box
					// sx={{
					// 	height: '680px',
					// }}
					>
						<img
							src={item.itemImg}
							alt={item.itemName}
							style={{
								// borderRadius: '16px',
								objectFit: 'cover',
								width: '100%',
								height: '100%',
							}}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							padding: '20px',
							gap: '12px',
							[theme.breakpoints.down(950)]: {
								padding: '10px 20px',
							},
						}}
					>
						<Box
							sx={{
								borderRadius: '50%',
								width: '48px',
								height: '48px',
								overflow: 'hidden',
								display: 'block',
							}}
						>
							<img alt={item.itemName} src={item.avatar} />
						</Box>
						<Box maxWidth="75%">
							<Box
								sx={{
									textOverflow: 'ellipsis',
									overflow: 'hidden',
									display: 'block',
								}}
							>
								<Typography
									color="white"
									noWrap
									fontStyle="italic"
									sx={{
										fontWeight: 500,
										fontSize: '18px',
										...(theme.palette.mode === 'light' && {
											color: 'rgba(19, 23, 64, 1)',
										}),
									}}
								>
									{item.itemName}
								</Typography>
							</Box>
							<Box>
								<Typography
									color="white"
									fontSize="12px"
									fontWeight={500}
									noWrap
									fontStyle="italic"
									sx={{
										...(theme.palette.mode === 'light' && {
											color: 'rgba(19, 23, 64, 1)',
										}),
									}}
								>
									{item.userName}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</LinkWrapper>
		));
	};
	return (
		<div>
			<Box
				sx={{
					textAlign: 'center',
					h6: {
						maxWidth: '900px',
						mx: 'auto',
					},
				}}
			>
				<Typography variant="h2" fontWeight={600}>
					Zodiac
				</Typography>
				<Typography variant="h6" fontWeight={600}>
					The Zodiac Collection is also known as the “Wheel of Life”. Pure modern design,
					integrity as well as love and compassion all mean in 12 zodiac signs.{' '}
				</Typography>
			</Box>
			<Box
				px={1}
				// sx={{
				// 	...(theme.palette.mode === 'light' && {
				// 		background: theme.palette.primaryLight.lighter,
				// 	}),
				// }}
			>
				<Box mx="auto">
					<Box>
						<Box maxWidth={2200} mx="auto">
							<CustomSliderCoverflow
								slidesPerView={4}
								loop={true}
								spaceBetween={50}
								slidesPerGroup={1}
								centeredSlides={true}
								slidesToShowPoint1358={4}
								slidesToShowPoint1093={3}
								slidesToShowPoint828={2.5}
								slidesToShowPoint547={2}
								slidesToShowPoint320={1}
								slidesToShowPoint0={1}
								renderItem={RenderListCoverflow()}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</div>
	);
}
