/* eslint-disable @typescript-eslint/no-unused-vars */

import { LinkWrapper } from 'components/CustomUI/Card/NFTItemCard/styled';

// IMG Coverflow

// import Cover1 from 'assets/Home/nft/nft1.webp';
// import Cover2 from 'assets/Home/nft/nft2.webp';
// import Cover3 from 'assets/Home/nft/nft3.webp';
// import Cover4 from 'assets/Home/nft/nft4.webp';
// import Cover5 from 'assets/Home/nft/nft5.webp';
// import Cover6 from 'assets/Home/nft/nft6.webp';
// import Cover7 from 'assets/Home/nft/nft7.webp';
// import Cover8 from 'assets/Home/nft/nft8.webp';
// import Cover9 from 'assets/Home/nft/nft9.webp';
// import Cover10 from 'assets/Home/nft/nft10.webp';
// import Cover11 from 'assets/Home/nft/nft11.webp';

import Cover1 from 'assets/Home/card1/Asset1.webp';
import Cover2 from 'assets/Home/card1/Asset2.webp';
import Cover3 from 'assets/Home/card1/Asset3.webp';
import Cover4 from 'assets/Home/card1/Asset4.webp';
import Cover5 from 'assets/Home/card1/Asset5.webp';
import Cover6 from 'assets/Home/card1/Asset6.webp';
import Cover7 from 'assets/Home/card1/Asset7.webp';
import Cover8 from 'assets/Home/card1/Asset8.webp';
import Cover9 from 'assets/Home/card1/Asset9.webp';
import Cover10 from 'assets/Home/card1/Asset10.webp';

// AVTAR Coverflow
import Ava1 from 'assets/Home/Coverflow/avatar-1.webp';
import Ava2 from 'assets/Home/Coverflow/avatar-2.webp';
import Ava3 from 'assets/Home/Coverflow/avatar-3.webp';
import Ava4 from 'assets/Home/Coverflow/avatar-4.webp';
import Ava5 from 'assets/Home/Coverflow/avatar-5.webp';
import Ava6 from 'assets/Home/Coverflow/avatar-6.webp';
import Ava7 from 'assets/Home/Coverflow/avatar-7.webp';
import Ava8 from 'assets/Home/Coverflow/avatar-8.webp';
import { Box, Typography, useTheme } from '@mui/material';
import CustomSliderCoverflow from 'components/CustomUI/CustomSliderCoverflow';
import bglight from 'assets/Home/BG1.webp';

export interface IDiscoverNFTsProps {}
const ListCoverFlow = [
	{
		id: 1,
		itemName: 'NFT 1',
		itemImg: Cover1,
		avatar: Ava1,
		userName: 'Harry',
		link: '',
		class: '',
	},
	{
		id: 2,
		itemName: 'NFT 2',
		itemImg: Cover2,
		avatar: Ava2,
		userName: 'Amsterdam',
		link: '',
		class: '',
	},
	{
		id: 3,
		itemName: 'NFT 3',
		itemImg: Cover3,
		avatar: Ava3,
		userName: 'Los Angeles',
		link: '',
		class: '',
	},
	{
		id: 4,
		itemName: 'NFT 4',
		itemImg: Cover4,
		avatar: Ava5,
		userName: 'Soyuz 11',
		link: '',
		class: '',
	},
	{
		id: 5,
		itemName: 'NFT 5',
		itemImg: Cover5,
		avatar: Ava6,
		userName: 'Alan Shepard',
		link: '',
		class: '',
	},
	{
		id: 6,
		itemName: 'NFT 6',
		itemImg: Cover6,
		avatar: Ava7,
		userName: 'Gherman Titov',
		link: '',
		class: '',
	},
	{
		id: 7,
		itemName: 'NFT 7',
		itemImg: Cover7,
		avatar: Ava8,
		userName: 'Aleksey Leonov',
		link: '',
		class: '',
	},
	{
		id: 8,
		itemName: 'NFT 8',
		itemImg: Cover8,
		avatar: Ava6,
		userName: 'Taylor Swift',
		link: '',
		class: '',
	},
	{
		id: 9,
		itemName: 'NFT 9',
		itemImg: Cover9,
		avatar: Ava4,
		userName: 'Katy Perry',
		link: '',
		class: '',
	},
	{
		id: 10,
		itemName: 'NFT 10',
		itemImg: Cover10,
		avatar: Ava4,
		userName: 'Thomas',
		link: '',
		class: '',
	},
];
// const HeightCardCoverflow = '480px';
export default function DiscoverNFTs(props: IDiscoverNFTsProps) {
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
						boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.25)',
						borderRadius: '20px',
						overflow: 'hidden',
						...(theme.palette.mode === 'light'
							? {
									background: '#fff',
							  }
							: {
									background: 'rgba(157, 195, 230, 0.6)',
							  }),
					}}
				>
					<Box
						sx={{
							// height: '680px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							overflow: 'hidden',
							// [theme.breakpoints.down(2300)]: {
							// 	height: '650px',
							// },
							// [theme.breakpoints.down(2000)]: {
							// 	height: '560px',
							// },
							// [theme.breakpoints.down(1800)]: {
							// 	height: '480px',
							// },
							// [theme.breakpoints.down(1500)]: {
							// 	height: '440px',
							// },
							// [theme.breakpoints.down(1357)]: {
							// 	height: '480px',
							// },
							// [theme.breakpoints.down(950)]: {
							// 	height: '400px',
							// },
							// [theme.breakpoints.down(828)]: {
							// 	height: '500px',
							// },
							// [theme.breakpoints.down(650)]: {
							// 	height: '450px',
							// },
							// [theme.breakpoints.down(546)]: {
							// 	height: '560px',
							// },
							// [theme.breakpoints.down(450)]: {
							// 	height: '450px',
							// },
						}}
					>
						<img
							src={item.itemImg}
							alt={item.itemName}
							style={{
								// borderRadius: '16px',
								// objectFit: 'cover',
								width: '100%',
								// height: '100%',
							}}
						/>
					</Box>
					{/* <Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							padding: '16px 20px',
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
								img: {
									width: '100%',
									height: '100%',
								},
							}}
						>
							<img src={item.avatar} alt="nft" />
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
					</Box> */}
				</Box>
			</LinkWrapper>
		));
	};
	return (
		<div>
			<Box
				py={4}
				px="10px"
				sx={{
					...(theme.palette.mode === 'light' && {
						background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center center',
					}),
					[theme.breakpoints.down(768)]: {
						py: 3,
					},
					[theme.breakpoints.down(480)]: {
						pt: 2,
					},
				}}
			>
				<Box mx="auto">
					{theme.palette.mode === 'light' ? (
						<Box
							mb={3}
							sx={{
								[theme.breakpoints.down(768)]: {
									mb: 3,
								},
								[theme.breakpoints.down(480)]: {
									mb: 2,
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
								Discover, Collect & Sell Creative NFTs Marketplace
							</Typography>
						</Box>
					) : (
						<Box
							mb={3}
							sx={{
								[theme.breakpoints.down(768)]: {
									mb: 3,
								},
								[theme.breakpoints.down(480)]: {
									mb: 2,
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
								Discover, Collect & Sell Creative NFTs Marketplace
							</Typography>
						</Box>
					)}

					<Box>
						<Box
							maxWidth={2200}
							mx="auto"
							sx={{
								[theme.breakpoints.down(546)]: {
									maxWidth: '380px',
								},
							}}
						>
							<CustomSliderCoverflow
								delay={15000}
								slidesPerView={4}
								loop={true}
								spaceBetween={50}
								slidesPerGroup={1}
								centeredSlides={true}
								slidesToShowPoint1358={4}
								slidesToShowPoint1093={3}
								slidesToShowPoint828={2.5}
								slidesToShowPoint547={1.75}
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
