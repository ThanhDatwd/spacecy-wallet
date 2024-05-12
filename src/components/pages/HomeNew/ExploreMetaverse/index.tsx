import { Box, Typography, useTheme } from '@mui/material';
import { LinkWrapper } from 'components/CustomUI/Card/NFTItemCard/styled';
import CustomSlider from 'components/CustomUI/CustomSlider';
import { SizeContext } from 'contexts/SizeObserver';
import { useContext } from 'react';
import { BoxTitleWrapper } from './styled';

import EX1 from 'assets/Home/Deanj1.webp';
import EX2 from 'assets/Home/Virtualmetting1.webp';
import EX3 from 'assets/Home/stage21.webp';
import EX4 from 'assets/Home/Boarc4.webp';
import EX5 from 'assets/Home/ins11.webp';

import bglight from 'assets/Home/BG1.webp';

export interface IExploreMetaverseProps {}

const ListExploreInfinity = [
	{
		id: 1,
		title: 'Art Gallery',
		background: EX1,
		link: '',
		class: '',
		content:
			'The Metaspacecy’s virtual art gallery is where you can find art NFT collections displayed in the most vivid 3D way, which has never been done before.',
	},
	{
		id: 2,
		title: 'Virtual Meeting',
		background: EX2,
		link: '',
		class: '',
		content:
			'Hybrid working and learning have been more common since the outbreak of COVID-19. Studying and working online in the virtual space of Metaspacecy are promising experiences as users can make use of 3D tools and technology to express and exchange ideas with each other in a more vivid and lively way.',
	},
	{
		id: 3,
		title: 'Virtual Concert',
		background: EX3,
		link: '',
		class: '',
		content:
			'Concert in the Metaverse has been a marvellous idea. In Metaspacecy’s virtual space, EDM performances will be held for everyone with NFT tickets to attend and enjoy.',
	},
];

const ListExploreInfinity2 = [
	{
		id: 4,
		title: 'Xmas',
		background: EX4,
		link: '',
		class: 'second-line',
		content:
			'Join Metaspacecy to enjoy virtual fashion and luxury shows of famous fashion brands all over the world.',
	},
	{
		id: 5,
		title: 'Virtual Exhibition',
		background: EX5,
		link: '',
		class: 'second-line',
		content:
			'Metaspacecy collaborates with famous brands to display their works as NFTs. You can enter and enjoy watching or offer to buy these items.',
	},
];

export default function ExploreMetaverse(props: IExploreMetaverseProps) {
	const { innerWidth } = useContext(SizeContext);
	const theme = useTheme();
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const RenderListExploreInfinity = () => {
		return ListExploreInfinity.map((item: any, index: number) => (
			<LinkWrapper
				key={index}
				href={item.link}
				className={item.class === '' ? '' : item.class}
			>
				<Box
					sx={{
						borderRadius: '20px',
						backdropFilter: 'blur(2px)',
						padding: '20px',
						position: 'relative',
						...(theme.palette.mode === 'light'
							? {
									background: 'rgba(177, 218, 255, 0.45)',
							  }
							: {
									background: 'rgba(177, 218, 255, 0.45)',
							  }),
						[theme.breakpoints.down(500)]: {
							padding: '16px',
						},
					}}
				>
					<BoxTitleWrapper>
						<Typography
							textAlign="center"
							fontStyle="italic"
							fontWeight="600"
							fontSize="24px"
						>
							{item.title}
						</Typography>
					</BoxTitleWrapper>
					<Box
						sx={{
							height: '300px',
							'&:hover .content': {
								display: 'block',
								// transform: 'translateY(0%)',
								transition: 'all 0.5s ease-out',
								borderBottomRightRadius: '16px',
								borderBottomLeftRadius: '16px',
								opacity: '1',
								zIndex: '1',
								padding: '15px',
								bottom: '0',
							},
							'@media (max-height: 800px)': {
								height: '235px',
							},
						}}
					>
						<Box
							sx={{
								height: '300px',
								overflow: 'hidden',
								borderRadius: '16px',
								position: 'relative',
								'@media (max-height: 800px)': {
									height: '235px',
								},
							}}
						>
							<img
								src={item.background}
								alt={item.title}
								style={{
									objectFit: 'cover',
									width: '100%',
									height: '100%',
									borderRadius: '16px',
								}}
							/>
							<Box
								className="content"
								sx={{
									position: 'absolute',
									// top: '0',
									right: '0',
									left: '0',
									bottom: '-5%',
									height: 'fit-content',
									padding: '15px',
									background: 'rgba(0, 0, 0, 0.3)',
									backdropFilter: 'blur(2px)',
									borderBottomRightRadius: '16px',
									borderBottomLeftRadius: '16px',
									transition: 'all 0.5s ease-out',
									// transform: 'translateY(10%)',
									opacity: '0',
									zIndex: '-1',
								}}
							>
								<Typography sx={{ fontSize: '17px', fontWeight: '500' }}>
									{item.content}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</LinkWrapper>
		));
	};
	const RenderListExploreInfinity2 = () => {
		return ListExploreInfinity2.map((item: any, index: number) => (
			<LinkWrapper
				key={index}
				href={item.link}
				className={item.class === '' ? '' : item.class}
			>
				<Box
					sx={{
						borderRadius: '20px',
						backdropFilter: 'blur(2px)',
						padding: '20px',
						...(theme.palette.mode === 'light'
							? {
									background: 'rgba(177, 218, 255, 0.45)',
							  }
							: {
									background: 'rgba(177, 218, 255, 0.45)',
							  }),
						[theme.breakpoints.down(500)]: {
							padding: '16px',
						},
					}}
				>
					<BoxTitleWrapper>
						<Typography
							textAlign="center"
							fontStyle="italic"
							fontWeight="600"
							fontSize="24px"
						>
							{item.title}
						</Typography>
					</BoxTitleWrapper>
					<Box
						sx={{
							height: '400px',
							position: 'relative',
							'&:hover .content': {
								display: 'block',
								// transform: 'translateY(0%)',
								transition: 'all 0.5s ease-out',
								borderBottomRightRadius: '16px',
								borderBottomLeftRadius: '16px',
								opacity: '1',
								zIndex: '1',
								padding: '15px',
								bottom: '0',
							},
							'@media (max-height: 800px)': {
								height: '335px',
							},
						}}
					>
						<Box
							sx={{
								height: '400px',
								overflow: 'hidden',
								borderRadius: '16px',
								position: 'relative',
								'@media (max-height: 800px)': {
									height: '335px',
								},
							}}
						>
							<img
								src={item.background}
								alt={item.title}
								style={{
									borderRadius: '16px',
									objectFit: 'cover',
									width: '100%',
									height: '100%',
								}}
							/>
							<Box
								className="content"
								sx={{
									position: 'absolute',
									// top: '0',
									right: '0',
									left: '0',
									bottom: '-5%',
									height: 'fit-content',
									padding: '15px',
									background: 'rgba(0, 0, 0, 0.3)',
									backdropFilter: 'blur(2px)',
									borderBottomRightRadius: '16px',
									borderBottomLeftRadius: '16px',
									transition: 'all 0.5s ease-out',
									// transform: 'translateY(10%)',
									opacity: '0',
									zIndex: '-1',
								}}
							>
								<Typography sx={{ fontSize: '17px', fontWeight: '500' }}>
									{item.content}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</LinkWrapper>
		));
	};
	return (
		<div
			style={{
				...(theme.palette.mode === 'light' && {
					background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
				}),
			}}
		>
			<Box maxWidth={MaxWidth} mx="auto" py={4} px={1}>
				{theme.palette.mode === 'light' ? (
					<Box mb={3}>
						<Typography
							color="rgba(19, 23, 64, 1)"
							variant="h2"
							textAlign="center"
							fontStyle="italic"
							fontWeight={600}
						>
							Explore Infinity Space in the Metaverse
						</Typography>
					</Box>
				) : (
					<Box mb={3}>
						<Typography
							color="white"
							variant="h2"
							textAlign="center"
							fontStyle="italic"
							fontWeight={600}
						>
							Explore Infinity Space in the Metaverse
						</Typography>
					</Box>
				)}

				{innerWidth < 1200 ? (
					<Box px={3.5}>
						<CustomSlider
							slidesPerView={3}
							loop={true}
							spaceBetween={0}
							slidesPerGroup={1}
							centeredSlides={false}
							slidesToShowPoint1358={3}
							slidesToShowPoint1093={2}
							slidesToShowPoint828={2}
							slidesToShowPoint547={1}
							slidesToShowPoint320={1}
							slidesToShowPoint0={1}
							renderItem={RenderListExploreInfinity()}
						/>
					</Box>
				) : (
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: 'repeat(3, 1fr)',
							gap: '16px',
						}}
					>
						{RenderListExploreInfinity()}
					</Box>
				)}
				{innerWidth < 1000 ? (
					<Box mt={4} px={3.5}>
						<CustomSlider
							slidesPerView={3}
							loop={true}
							spaceBetween={0}
							slidesPerGroup={1}
							centeredSlides={false}
							slidesToShowPoint1358={3}
							slidesToShowPoint1093={2}
							slidesToShowPoint828={1}
							slidesToShowPoint547={1}
							slidesToShowPoint320={1}
							slidesToShowPoint0={1}
							renderItem={RenderListExploreInfinity2()}
						/>
					</Box>
				) : (
					<Box
						mt={4}
						sx={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							gap: '16px',
							'@media (max-height: 800px)': {
								mt: 2,
							},
						}}
					>
						{RenderListExploreInfinity2()}
					</Box>
				)}
			</Box>
		</div>
	);
}
