import { Box, Link, Stack, Typography } from '@mui/material';
import CustomSliderNew from 'components/CustomUI/CustomSliderNew';
import { SizeContext } from 'contexts/SizeObserver';
import React, { Fragment, useContext } from 'react';

import xmas1 from 'assets/Home/xmas/xmas5.png';
import xmas2 from 'assets/Home/xmas/xmas6.png';
import xmas3 from 'assets/Home/xmas/xmas7.png';
import xmas4 from 'assets/Home/xmas/xmas8.png';

import Stadium1 from 'assets/Home/xmas/stadium1.png';
import StadiumThumb1 from 'assets/Home/xmas/stadium2.png';
import Stadium11 from 'assets/Home/xmas/stadium3.png';

import Stadium2 from 'assets/Home/xmas/stadium4.png';
import StadiumThumb2 from 'assets/Home/xmas/stadium5.png';
import Stadium22 from 'assets/Home/xmas/stadium6.png';

import ButtonWhite from 'components/CustomUI/ButtonWhite';
import { TwitterShareButton } from 'react-share';
import { RELATED_URLS } from '../../constants';
import { PATH_EVENT, PATH_VIRTUAL_WORLD } from 'routes/path';

import ShareIcon from '@mui/icons-material/Share';

const Events: React.FC = () => {
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';

	const listXmas = [
		{
			id: 1,
			name: '1',
			image: xmas1,
			isBackground3D: false,
			model3D: '',
		},
		{
			id: 2,
			name: '1',
			image: xmas2,
			isBackground3D: false,
			model3D: '',
		},
		{
			id: 3,
			name: '1',
			image: xmas3,
			isBackground3D: false,
			model3D: '',
		},
		{
			id: 4,
			name: '1',
			image: xmas4,
			isBackground3D: false,
			model3D: '',
		},
	];
	const listStadiumCol = [
		{
			id: 1,
			name: '1',
			image: Stadium1,
			isBackground3D: false,
			model3D: '',
		},
		{
			id: 2,
			name: '1',
			image: StadiumThumb1,
			isBackground3D: false,
			model3D: '',
		},
		{
			id: 3,
			name: '1',
			image: Stadium11,
			isBackground3D: false,
			model3D: '',
		},
		{
			id: 4,
			name: '1',
			image: Stadium2,
			isBackground3D: false,
			model3D: '',
		},
		{
			id: 5,
			name: '1',
			image: StadiumThumb2,
			isBackground3D: false,
			model3D: '',
		},
		{
			id: 6,
			name: '1',
			image: Stadium22,
			isBackground3D: false,
			model3D: '',
		},
	];

	const RenderListStadiumTablet = () => {
		return listStadiumCol.map((stadium: any, index: number) => (
			<Box
				key={stadium.id}
				sx={{
					width: '100%',
					position: 'relative',
					overflow: 'hidden',
					borderRadius: '16px',
					img: {
						width: '100%',
						borderRadius: '16px',
					},
				}}
			>
				<img src={stadium.image} alt={stadium.title} className="img3" />
			</Box>
		));
	};
	const RenderListXmas = () => {
		return listXmas.map((stadium: any, index: number) => (
			<Box
				key={stadium.id}
				sx={{
					width: '100%',
					position: 'relative',
					overflow: 'hidden',
					borderRadius: '16px',
					img: {
						width: '100%',
						borderRadius: '16px',
					},
				}}
			>
				<img src={stadium.image} alt={stadium.title} className="img3" />
			</Box>
		));
	};
	return (
		<Fragment>
			<Box>
				<Box
					sx={{
						maxWidth: MaxWidth,
						mx: 'auto',
						pt: '100px',
						px: 2,
						'@media (max-width: 480px)': {
							px: '0',
							pt: '80px',
						},
					}}
				>
					<Typography variant="h1" fontWeight="600" textAlign="center">
						Event
					</Typography>
					<Box py={4}>
						{innerWidth < 1440 ? (
							<Typography
								variant="h3"
								fontWeight="600"
								textAlign="center"
								sx={{
									'@media (max-width: 480px)': {
										px: '12px',
									},
								}}
							>
								XMAS - INTO THE METAVERSE
							</Typography>
						) : null}

						<Stack
							direction="row"
							gap="32px"
							sx={{
								'@media (max-width: 1024px)': {
									gap: 3,
								},
								'@media (max-width: 768px)': {
									flexDirection: 'column',
									gap: 0,
								},
							}}
						>
							<Box
								sx={{
									width: '50%',
									'@media (max-width: 768px)': {
										width: '100%',
										px: '12px',
									},
									'@media (max-width: 480px)': {
										px: 0,
									},
								}}
							>
								<CustomSliderNew
									spaceBetween={0}
									centeredSlides={true}
									renderItem={RenderListXmas()}
								/>
							</Box>
							<Stack
								justifyContent="space-between"
								gap={4}
								sx={{
									width: '50%',
									py: '12px',
									'@media (max-width: 768px)': {
										px: 3,
										width: '100%',
										py: 0,
										gap: 3,
									},
									'@media (max-width: 480px)': {
										px: '12px',
										gap: 2,
									},
								}}
							>
								<Stack
									gap="16px"
									sx={{
										'@media (max-width: 4768px)': {
											gap: 1,
										},
									}}
								>
									{innerWidth > 1440 ? (
										<Typography
											variant="h3"
											fontWeight="600"
											sx={{
												'@media (max-width: 480px)': {
													px: '12px',
												},
											}}
										>
											XMAS - INTO THE METAVERSE
										</Typography>
									) : null}
									<Typography variant="h6">
										Experience the Xmas village
									</Typography>
									<Typography variant="h6">
										Climb on the 99-floor Christmas tree
									</Typography>
									<Typography variant="h6">
										Grab Xmas gifts from the Christmas tree
									</Typography>
									<Typography variant="h6">
										Sightsee “Gassho Go Winter" village by train tour
									</Typography>
									<Typography variant="h6">
										Build snowmen as well as play snowball fights with friends
									</Typography>
								</Stack>
								<Stack direction="row" gap={2}>
									<Link
										href={`${PATH_VIRTUAL_WORLD.eventXmax}`}
										target="_blank"
										sx={{
											display: 'block',
											width: '100%',
											'&:hover': {
												textDecoration: 'none',
											},
										}}
									>
										<ButtonWhite>Join Now</ButtonWhite>
									</Link>
									<ButtonWhite
										sx={{
											width: 'fit-content',
											minWidth: '47px',
											padding: '0',
											height: '47px',
											'& button': {
												height: '24px',
											},
										}}
									>
										<TwitterShareButton
											url={`${RELATED_URLS.MetaSpacecyHomePage}/#${PATH_EVENT.root}`}
											title={`Look what I found! XMAS - INTO THE METAVERSE collectible`}
											hashtags={['Art', 'NFT']}
											via="Metaspacecy"
										>
											<ShareIcon />
										</TwitterShareButton>
									</ButtonWhite>
								</Stack>
							</Stack>
						</Stack>
					</Box>
					<Box py={4}>
						{innerWidth < 1440 ? (
							<Typography
								variant="h3"
								fontWeight="600"
								textAlign="center"
								sx={{
									'@media (max-width: 480px)': {
										px: '12px',
									},
								}}
							>
								FIFA WORLD CUP - INTO THE METAVERSE
							</Typography>
						) : null}

						<Stack
							direction="row"
							gap="32px"
							sx={{
								'@media (max-width: 1024px)': {
									gap: 3,
								},
								'@media (max-width: 768px)': {
									flexDirection: 'column',
									gap: 0,
								},
							}}
						>
							<Box
								sx={{
									width: '50%',
									'@media (max-width: 768px)': {
										width: '100%',
										px: '12px',
									},
									'@media (max-width: 480px)': {
										px: 0,
									},
								}}
							>
								<CustomSliderNew
									spaceBetween={0}
									centeredSlides={true}
									renderItem={RenderListStadiumTablet()}
								/>
							</Box>
							<Stack
								justifyContent="space-between"
								gap={4}
								sx={{
									width: '50%',
									py: '12px',
									'@media (max-width: 768px)': {
										px: 3,
										width: '100%',
										py: 0,
										gap: 3,
									},
									'@media (max-width: 480px)': {
										px: '12px',
										gap: 2,
									},
								}}
							>
								<Stack
									gap="16px"
									sx={{
										'@media (max-width: 768px)': {
											gap: 1,
										},
									}}
								>
									{innerWidth > 1440 ? (
										<Typography
											variant="h3"
											fontWeight="600"
											sx={{
												'@media (max-width: 480px)': {
													px: '12px',
												},
											}}
										>
											FIFA WORLD CUP - INTO THE METAVERSE
										</Typography>
									) : null}
									<Typography variant="h6">
										Attend the Voting to upgrade the NFT Tickets
									</Typography>
									<Typography variant="h6">
										Airdrop 999 NFT Tickets for World Cup 2022
									</Typography>
									<Typography variant="h6">
										Announce Leaderboard on the website - World Cup section
									</Typography>
									<Typography variant="h6">
										Experience live football matches at 8 Virtual Stadium models
									</Typography>
								</Stack>
								<Stack direction="row" gap={2}>
									<Link
										href={`${PATH_VIRTUAL_WORLD.virtualSport}`}
										target="_blank"
										sx={{
											display: 'block',
											width: '100%',
											'&:hover': {
												textDecoration: 'none',
											},
										}}
									>
										<ButtonWhite>Join Now</ButtonWhite>
									</Link>
									<ButtonWhite
										sx={{
											width: 'fit-content',
											minWidth: '47px',
											padding: '0',
											height: '47px',
											'& button': {
												height: '24px',
											},
										}}
									>
										<TwitterShareButton
											url={`${RELATED_URLS.MetaSpacecyHomePage}/#${PATH_EVENT.root}`}
											title={`Look what I found! FIFA WORLD CUP - INTO THE METAVERSE collectible`}
											hashtags={['Art', 'NFT']}
											via="Metaspacecy"
										>
											<ShareIcon />
										</TwitterShareButton>
									</ButtonWhite>
								</Stack>
							</Stack>
						</Stack>
					</Box>
				</Box>
			</Box>
		</Fragment>
	);
};
export default Events;
