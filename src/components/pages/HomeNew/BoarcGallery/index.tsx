import { Box, Typography, useTheme } from '@mui/material';
import { SizeContext } from 'contexts/SizeObserver';
import { useContext } from 'react';
import { GalleryItemLeft, GalleryItemRight, GalleryList, Item } from './styled';

// img big project
import Category2 from 'assets/Boarc/2.webp';
import Category4 from 'assets/Home/category4.webp';
import Category5 from 'assets/Home/category5.webp';
import Category6 from 'assets/Home/category6.webp';
import Category7 from 'assets/Boarc/1.webp';
import Category9 from 'assets/Home/category10.webp';

export interface IBoarcGalleryProps {}

export default function BoarcGallery(props: IBoarcGalleryProps) {
	const theme = useTheme();
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	return (
		<div>
			<Box>
				<Box
					maxWidth={MaxWidth}
					sx={{
						margin: '0 auto',
						[theme.breakpoints.down(768)]: {
							py: 2,
						},
						[theme.breakpoints.down(480)]: {
							py: 1,
						},
					}}
					py={4}
					px="10px"
				>
					{theme.palette.mode === 'light' ? (
						<Box pb={4}>
							<Typography
								color="rgba(19, 23, 64, 1)"
								variant="h2"
								textAlign="center"
								fontStyle="italic"
								fontWeight={600}
							>
								Boarc Gallery
							</Typography>
						</Box>
					) : (
						<Box
							pb={4}
							sx={{
								[theme.breakpoints.down(768)]: {
									pb: 2,
								},
								// [theme.breakpoints.down(480)]: {
								// 	pb: 1,
								// },
							}}
						>
							<Typography
								color="white"
								variant="h2"
								textAlign="center"
								fontStyle="italic"
								fontWeight={600}
							>
								Boarc Gallery
							</Typography>
						</Box>
					)}

					<Box>
						<GalleryList>
							<GalleryItemLeft>
								{/* <ItemLeftAbove>
									<img src={Category8} alt="category 1" />
								</ItemLeftAbove>
								<ItemLeftBottom>
									<div>
										<img src={Category2} alt="category 1" />
									</div>
									<div>
										<img src={Category7} alt="category 1" />
									</div>
								</ItemLeftBottom> */}
								<div className="item">
									<img src={Category9} alt="category 1" />
								</div>
								<div>
									<img src={Category2} alt="category 1" />
								</div>
								<div>
									<img src={Category7} alt="category 1" />
								</div>
							</GalleryItemLeft>
							<GalleryItemRight>
								{/* <ItemRightLeft
									style={{
										display: 'flex',
										flexDirection: 'column',
										height: '100%',
										gap: '20px',
									}}
								>
									<div>
										<img src={Category4} alt="category 1" />
									</div>
									<div>
										<img src={Category5} alt="category 1" />
									</div>
								</ItemRightLeft>
								<ItemRightRight>
									<img src={Category6} alt="category 1" />
								</ItemRightRight> */}

								<Item>
									<img src={Category4} alt="category 1" />
								</Item>
								<Item className="item">
									<img src={Category6} alt="category 1" />
								</Item>
								<Item>
									<img src={Category5} alt="category 1" />
								</Item>
							</GalleryItemRight>
						</GalleryList>
					</Box>
				</Box>
			</Box>
		</div>
	);
}
