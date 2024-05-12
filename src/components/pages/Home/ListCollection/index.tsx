import React from 'react';
import {
	ContainerColections,
	ItemColection,
	ImageItem,
	ImageLeft,
	ImageRight,
	ContentItem,
	TitleItem,
	FooterItem,
	User,
	AvatarUser,
	NameUser,
	QualityItem,
} from './styled';

// Image
import item1 from 'assets/Home/Colections/item1.webp';
import item2 from 'assets/Home/Colections/item2.webp';
import item3 from 'assets/Home/Colections/item3.webp';
import item4 from 'assets/Home/Colections/item4.webp';
import item5 from 'assets/Home/Colections/item5.webp';
import item6 from 'assets/Home/Colections/item6.webp';
import item7 from 'assets/Home/Colections/item7.webp';
import item8 from 'assets/Home/Colections/item8.webp';
import item9 from 'assets/Home/Colections/item9.webp';
import item10 from 'assets/Home/Colections/item10.webp';
import item11 from 'assets/Home/Colections/item11.webp';
import item12 from 'assets/Home/Colections/item12.webp';
import item13 from 'assets/Home/Colections/item13.webp';
import item14 from 'assets/Home/Colections/item14.webp';
import item15 from 'assets/Home/Colections/item15.webp';
// import item16 from 'assets/Home/Colections/item7.webp';

import item21 from 'assets/Home/Colections/1.webp';
import item22 from 'assets/Home/Colections/2.webp';
import item23 from 'assets/Home/Colections/3.webp';
import item24 from 'assets/Home/Colections/4.webp';

import item25 from 'assets/Home/Colections/5.webp';
import item26 from 'assets/Home/Colections/6.webp';
import item27 from 'assets/Home/Colections/7.webp';
import item28 from 'assets/Home/Colections/8.webp';

import { Box } from '@mui/material';
import CustomSlider from 'components/CustomUI/CustomSlider';

const ListCollection = [
	{
		id: 0,
		collectionName: 'Space UFO',
		userName: 'Spaceman',
		userAva: '',
		item1: item1,
		item2: item2,
		item3: item3,
		item4: item4,
		itemsAmount: '238',
	},
	{
		id: 1,
		collectionName: 'Alien',
		userName: 'Jupiter',
		userAva: '',
		item1: item5,
		item2: item6,
		item3: item7,
		item4: item8,
		itemsAmount: '1.2k',
	},
	{
		id: 2,
		collectionName: 'Zodiac Sign',
		userName: 'Brenda',
		userAva: '',
		item1: item9,
		item2: item10,
		item3: item11,
		item4: item12,
		itemsAmount: '2k',
	},
	{
		id: 3,
		collectionName: 'Boarc',
		userName: 'Alex Hoang',
		userAva: '',
		item1: item13,
		item2: item14,
		item3: item15,
		item4: item13,
		itemsAmount: '902',
	},
	{
		id: 4,
		collectionName: "Menji's World",
		userName: 'Hellient',
		userAva: '',
		item1: item21,
		item2: item22,
		item3: item23,
		item4: item24,
		itemsAmount: '3k',
	},
	{
		id: 5,
		collectionName: 'Spaceman',
		userName: 'Dall',
		userAva: '',
		item1: item25,
		item2: item26,
		item3: item27,
		item4: item28,
		itemsAmount: '3k',
	},
];

export default function ListColection() {
	const renderListCollection = () => {
		return ListCollection.map((item: any, index: number) => (
			<ItemColection key={index}>
				<ImageItem>
					<ImageLeft>
						<img src={item.item1} alt="Item 1" />
					</ImageLeft>
					<ImageRight>
						<Box sx={{ width: 68, height: 74 }}>
							<img src={item.item2} alt="Item 2" />
						</Box>
						<Box sx={{ width: 68, height: 74 }}>
							<img src={item.item3} alt="Item 3" />
						</Box>
						<Box sx={{ width: 68, height: 74 }}>
							<img src={item.item4} alt="Item 4" />
						</Box>
					</ImageRight>
				</ImageItem>
				<ContentItem>
					<TitleItem>{item.collectionName}</TitleItem>
					<FooterItem style={{ fontStyle: 'italic' }}>
						<User>
							<AvatarUser>
								<img src={item.item3} alt="avatar" />
							</AvatarUser>
							<NameUser>
								by <span>{item.userName}</span>
							</NameUser>
						</User>
						<QualityItem>{item.itemsAmount} items</QualityItem>
					</FooterItem>
				</ContentItem>
			</ItemColection>
		));
	};
	return (
		<>
			<ContainerColections>
				<Box>
					<CustomSlider
						slidesPerView={4}
						loop={false}
						spaceBetween={0}
						slidesPerGroup={1}
						centeredSlides={false}
						slidesToShowPoint1358={4}
						slidesToShowPoint1093={3}
						slidesToShowPoint828={3}
						slidesToShowPoint547={2}
						slidesToShowPoint320={1}
						slidesToShowPoint0={1}
						renderItem={renderListCollection()}
					/>
				</Box>
			</ContainerColections>
		</>
	);
}
