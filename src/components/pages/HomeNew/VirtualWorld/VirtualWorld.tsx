/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { alertTitleClasses, Box, Typography, Link, useTheme } from '@mui/material';
import styled from 'styled-components';
import museum from '../../../../assets/img-3d/pic1.png';
import exhibition from '../../../../assets/img-3d/pic2.png';
import fashion from '../../../../assets/img-3d/XMas.png';
import stadium from '../../../../assets/img-3d/pic4.png';
import concerts from '../../../../assets/img-3d/pic5.png';
import timesquare from '../../../../assets/img-3d/pic6.png';
import meeting from '../../../../assets/img-3d/pic7.png';
import { PATH_VIRTUAL_WORLD } from '../../../../routes/path';
declare let map: any;
const VirtualWorld: React.FC = (map) => {
	const [isHovered, setIsHovered] = useState('');
	const handleMoveWorld = (as: string) => {};
	const theme = useTheme();
	return (
		<>
			<Box
				sx={{
					width: '100%',
					mb: 6,
					border: 'none',
					px: '10px',
					[theme.breakpoints.down(768)]: {
						mb: 3,
					},
					[theme.breakpoints.down(480)]: {
						my: 2,
					},
				}}
			>
				<Box
					my={8}
					sx={{
						[theme.breakpoints.down(768)]: {
							my: 3,
						},
						// [theme.breakpoints.down(480)]: {
						// 	my: 2,
						// },
					}}
				>
					<Typography
						color="#fff"
						variant="h2"
						textAlign="center"
						fontStyle="italic"
						fontWeight={600}
					>
						Explore Infinity Space In The Metaverse
					</Typography>
				</Box>
				{/* <iframe
					id="virtual-world"
					title="virtual-world"
					width="100%"
					height="100%"
					src="http://192.168.10.128:3000"
					frameBorder="0"
				></iframe> */}
				<>
					<HomePageWrapper>
						<HomePageBackGround>
							{/* Logo */}
							{/* <HomePageLogo>
								<HomePageImage src={logo} />
							</HomePageLogo> */}
							{/* end Logo */}
							{/* *************************** */}

							{/* Title */}
							<HomePageTitle>
								<TitleHolder>
									<Typography variant="h2" fontWeight="600">
										Virtual Space
									</Typography>
								</TitleHolder>
							</HomePageTitle>
							{/* end Title */}
							{/* **************************** */}

							<MapContainer>
								<MapRow1>
									<MapColumnLeft>
										<MapHolder>
											<MapImageHolder>
												<Link
													href={PATH_VIRTUAL_WORLD.virtualSport}
													target="_blank"
												>
													<GoBtn
														className={
															isHovered === 'map2'
																? 'displayBtn'
																: 'hideBtn'
														}
														onMouseEnter={() => setIsHovered('map2')}
														onMouseLeave={() => setIsHovered('')}
														onClick={() =>
															handleMoveWorld('/stadium-lusail')
														}
													>
														Go
													</GoBtn>
												</Link>
												<MapImage
													src={stadium}
													onMouseEnter={() => setIsHovered('map2')}
													onMouseLeave={() => setIsHovered('')}
												/>
											</MapImageHolder>
											<MapNameHolder>
												<MapNameText>Virtual Sport</MapNameText>
											</MapNameHolder>
										</MapHolder>
									</MapColumnLeft>
									<MapColumnRight>
										<MapHolder>
											<MapImageHolder>
												<Link
													href={PATH_VIRTUAL_WORLD.eventXmax}
													target="_blank"
												>
													<GoBtn
														className={
															isHovered === 'map5'
																? 'displayBtn'
																: 'hideBtn'
														}
														// map={isHovered === 'map5' ? 'block' : 'none'}
														onMouseEnter={() => setIsHovered('map5')}
														onMouseLeave={() => setIsHovered('')}
														onClick={() =>
															handleMoveWorld('/fashion-luxury')
														}
													>
														Go
													</GoBtn>
												</Link>
												<MapImage
													src={fashion}
													onMouseEnter={() => setIsHovered('map5')}
													onMouseLeave={() => setIsHovered('')}
												/>
											</MapImageHolder>
											<MapNameHolder>
												<MapNameText>Virtual Xmas</MapNameText>
											</MapNameHolder>
										</MapHolder>
									</MapColumnRight>
								</MapRow1>
								<MapRow2>
									<MapColumnLeft>
										<MapHolder>
											<MapImageHolder>
												{/* <Link
													href={PATH_VIRTUAL_WORLD.virtualConcert}
													target="_blank"
												>
													<GoBtn
														className={
															isHovered === 'map3'
																? 'displayBtn'
																: 'hideBtn'
														}
														// map={isHovered === 'map3' ? 'block' : 'none'}
														onMouseEnter={() => setIsHovered('map3')}
														onMouseLeave={() => setIsHovered('')}
														onClick={() =>
															handleMoveWorld('/time-square')
														}
													>
														Go
													</GoBtn>
												</Link> */}
												<div className="coming">Coming Soon</div>
												<MapImage
													src={concerts}
													onMouseEnter={() => setIsHovered('map3')}
													onMouseLeave={() => setIsHovered('')}
												/>
											</MapImageHolder>
											<MapNameHolder>
												<MapNameText>Virtual Concert</MapNameText>
											</MapNameHolder>
										</MapHolder>
									</MapColumnLeft>

									<MapColumnRight>
										<MapHolder>
											<MapImageHolder>
												{/* <Link
													href={PATH_VIRTUAL_WORLD.virtualExhibition}
													target="_blank"
												>
													<GoBtn
														className={
															isHovered === 'map6'
																? 'displayBtn'
																: 'hideBtn'
														}
														// map={isHovered === 'map6' ? 'block' : 'none'}
														onMouseEnter={() => setIsHovered('map6')}
														onMouseLeave={() => setIsHovered('')}
														onClick={() =>
															handleMoveWorld('/virtual-exhibition')
														}
													>
														Go
													</GoBtn>
												</Link> */}
												<div className="coming">Coming Soon</div>
												<MapImage
													src={exhibition}
													onMouseEnter={() => setIsHovered('map6')}
													onMouseLeave={() => setIsHovered('')}
												/>
											</MapImageHolder>
											<MapNameHolder>
												<MapNameText>Virtual Exhibition</MapNameText>
											</MapNameHolder>
										</MapHolder>
									</MapColumnRight>
								</MapRow2>
								<MapRow3>
									<MapColumnLeft>
										<MapHolder>
											<MapImageHolder>
												<Link
													href={PATH_VIRTUAL_WORLD.virtualArt}
													target="_blank"
												>
													<GoBtn
														className={
															isHovered === 'map4'
																? 'displayBtn'
																: 'hideBtn'
														}
														// map={isHovered === 'map4' ? 'block' : 'none'}
														onMouseEnter={() => setIsHovered('map4')}
														onMouseLeave={() => setIsHovered('')}
														onClick={() =>
															handleMoveWorld('/boarc-gallery')
														}
													>
														Go
													</GoBtn>
												</Link>
												{/* <div className="coming">Coming Soon</div> */}
												<MapImage
													src={museum}
													onMouseEnter={() => setIsHovered('map4')}
													onMouseLeave={() => setIsHovered('')}
												/>
											</MapImageHolder>
											<MapNameHolder>
												<MapNameText>Virtual Museum</MapNameText>
											</MapNameHolder>
										</MapHolder>
									</MapColumnLeft>
									<MapColumnRight>
										<MapHolder>
											<MapImageHolder>
												<Link
													href={PATH_VIRTUAL_WORLD.virtualEvent}
													target="_blank"
												>
													<GoBtn
														className={
															isHovered === 'map7'
																? 'displayBtn'
																: 'hideBtn'
														}
														// map={isHovered === 'map7' ? 'block' : 'none'}
														onMouseEnter={() => setIsHovered('map7')}
														onMouseLeave={() => setIsHovered('')}
														onClick={() =>
															handleMoveWorld('/virtual-concert')
														}
													>
														Go
													</GoBtn>
												</Link>
												<MapImage
													src={meeting}
													onMouseEnter={() => setIsHovered('map7')}
													onMouseLeave={() => setIsHovered('')}
												/>
											</MapImageHolder>
											<MapNameHolder>
												<MapNameText>Virtual Meeting</MapNameText>
											</MapNameHolder>
										</MapHolder>
									</MapColumnRight>
								</MapRow3>
								<MapCenter>
									<MapHolder>
										<MapImageCenterHolder>
											<Link
												href={PATH_VIRTUAL_WORLD.virtualWorld}
												target="_blank"
											>
												<GoBtn
													className={
														isHovered === 'map1'
															? 'displayBtn'
															: 'hideBtn'
													}
													// map={isHovered === 'map1' ? 'block' : 'none'}
													onMouseEnter={() => setIsHovered('map1')}
													onMouseLeave={() => setIsHovered('')}
													onClick={() => handleMoveWorld('/time-square')}
												>
													Go
												</GoBtn>
											</Link>
											<MapImage
												src={timesquare}
												onMouseEnter={() => setIsHovered('map1')}
												onMouseLeave={() => setIsHovered('')}
											/>
										</MapImageCenterHolder>
										<MapNameHolder>
											<MapNameText>Virtual Time Square</MapNameText>
										</MapNameHolder>
									</MapHolder>
								</MapCenter>
								<MapRow4>
									<MapCenter1>
										<MapHolder>
											<MapImageCenterHolder>
												<Link
													href={PATH_VIRTUAL_WORLD.virtualWorld}
													target="_blank"
												>
													<GoBtn
														className={
															isHovered === 'map1'
																? 'displayBtn'
																: 'hideBtn'
														}
														// map={isHovered === 'map1' ? 'block' : 'none'}
														onMouseEnter={() => setIsHovered('map1')}
														onMouseLeave={() => setIsHovered('')}
														onClick={() =>
															handleMoveWorld('/time-square')
														}
													>
														Go
													</GoBtn>
												</Link>
												<MapImage
													src={timesquare}
													onMouseEnter={() => setIsHovered('map1')}
													onMouseLeave={() => setIsHovered('')}
												/>
											</MapImageCenterHolder>
											<MapNameHolder>
												<MapNameText>Virtual Time Square</MapNameText>
											</MapNameHolder>
										</MapHolder>
									</MapCenter1>
								</MapRow4>
							</MapContainer>
						</HomePageBackGround>
					</HomePageWrapper>
				</>
			</Box>
		</>
	);
};
const HomePageWrapper = styled.div`
	position: relative;
	width: 100%;
	/* height: 100%; */
	overflow: hidden;
`;
const HomePageBackGround = styled.div`
	position: relative;
	background-size: cover;
	background-position: 50% 40%;
	background-repeat: no-repeat;
	width: 100%;
	/* height: 100vh; */
	/* min-height: 100vh; */
	background-image: url('/bg-new.jpg');
	@media screen and (min-width: 200px) and (max-width: 1000px) {
		background-image: url('/800-600.png');
		background-position: center center;
	}
`;
// const HomePageLogo = styled.div`
// 	display: flex;
// 	flex-direction: row;
// 	padding: 10px 20px;
// 	max-width: 300px;
// 	width: 100%;
// 	&:hover {
// 		cursor: pointer;
// 	}
// 	@media screen and (min-width: 200px) and (max-width: 480px) {
// 		width: 200px;
// 	}
// `;

// const HomePageImage = styled.img`
// 	width: 100%;
// 	height: 100%;
// `;
const HomePageTitle = styled.div`
	width: 100%;
	top: 10%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	z-index: 999;
	margin-bottom: 20px;
	@media screen and (min-width: 200px) and (max-width: 480px) {
		margin-bottom: 15px;
	}
`;
const TitleHolder = styled.div`
	position: relative;
	background: transparent;
	text-align: center;
`;
const Title = styled.p`
	font-family: 'Montserrat';
	font-style: italic;
	font-weight: 600;
	font-size: 66px;
	line-height: 80px;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	color: #ffffff;
	text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);
	@media screen and (max-width: 1025px) {
		font-size: 36px !important;
		line-height: 42px;
	}
`;

const MapContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;
const MapRow = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
`;
const MapRow1 = styled(MapRow)`
	gap: 50%;
	justify-content: center;
	@media screen and (min-width: 200px) and (max-width: 1299px) {
		display: flex;
		flex-direction: row;
		gap: 30%;
	}
	@media (max-width: 768px) {
		gap: 0;
		justify-content: space-between;
	}
`;
const MapRow2 = styled(MapRow)`
	justify-content: center;
	align-items: center;
	gap: 35%;
	@media screen and (min-width: 200px) and (max-width: 1299px) {
		display: flex;
		flex-direction: row;
		gap: 20%;
	}
	@media (max-width: 768px) {
		gap: 0;
		justify-content: space-between;
	}
`;
const MapRow3 = styled(MapRow)`
	/* width: 80%; */
	gap: 8%;
	justify-content: center;
	@media (max-width: 768px) {
		gap: 0;
		justify-content: space-between;
	}
`;
const MapRow4 = styled(MapRow)`
	display: none;
	@media screen and (min-width: 200px) and (max-width: 1299px) {
		display: flex;
		flex-direction: row;
		/* gap: 0%; */
		justify-content: center;
	}
`;
const MapColumnLeft = styled.div`
	width: 18vw;

	@media (max-width: 1299px) {
		width: 30vw;
	}
	@media (max-width: 768px) {
		width: 35vw;
	}
	@media (max-width: 480px) {
		width: 40vw;
	}
`;
const MapColumnRight = styled(MapColumnLeft)``;
const MapCenter = styled.div`
	width: 26%;
	position: absolute;
	left: 50%;
	top: 100px;
	transform: translateX(-50%);

	@media screen and (min-width: 200px) and (max-width: 1299px) {
		width: 10%;
		display: none;
	}
`;

const MapCenter1 = styled.div`
	display: none;
	@media screen and (min-width: 768px) and (max-width: 1299px) {
		width: 40%;
		display: flex;
	}
	@media (max-width: 768px) {
		width: 60%;
		display: flex;
	}
`;
const MapHolder = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;
const MapImageHolder = styled.div`
	width: 100%;
	height: auto;
	cursor: pointer;
	transition: all ease-in-out 0.5s;
	position: relative;
	&:hover {
		scale: 1.1;
		/* position: fixed; */
		/* opacity: 0.8; */
	}

	.coming {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		font-weight: 600;
		font-size: 30px;
		text-align: center;
		display: none;
		@media (max-width: 1550px) {
			font-size: 26px;
		}
		@media (max-width: 1024px) {
			font-size: 22px;
		}
		@media (max-width: 768px) {
			font-size: 18px;
		}
	}
	&:hover .coming {
		display: block;
	}
`;
const MapImageCenterHolder = styled.div`
	margin-top: 40px;
	width: 100%;
	height: auto;
	transition: all ease-in-out 0.5s;
	position: relative;
	cursor: pointer;
	@media screen and (min-width: 200px) and (max-width: 1299px) {
		margin-top: 10px;
	}
	&:hover {
		scale: 1.1;
		/* opacity: 0.8; */
	}
`;
const MapImage = styled.img`
	width: 100%;
	height: 100%;
`;

const MapNameHolder = styled.div`
	text-align: center;
	color: #fff;
	font-family: 'Montserrat';
	font-style: italic;
	font-weight: 500;
	font-size: 26px;
	line-height: 37px;
	/* identical to box height */
	color: #ffffff;
	white-space: pre;

	@media (max-width: 1000px) {
		font-size: 22px;
	}

	@media screen and (max-width: 480px) {
		font-size: 13px;
		line-height: 25px;
		white-space: nowrap;
	}

	@media screen and (min-width: 481px) and (max-width: 800px) {
		font-size: 18px;
		line-height: 25px;
		white-space: nowrap;
	}
`;
const MapNameText = styled.span``;
const GoBtn = styled.div`
	position: absolute;
	/* width: 200px;
	height: 70px; */
	padding: 8px 40px;
	top: 65%;
	left: 50%;
	transform: translate(-50%);
	background: rgba(157, 195, 230, 0.6);
	color: #ffffff;
	border: 1px solid #ffffff;
	box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
	backdrop-filter: blur(2px);
	font-weight: 600;
	font-family: Montserrat, sans-serif;
	font-style: italic;
	border-radius: 10px;
	text-align: center;
	font-size: 20px;
	display: none;
	z-index: 10000;
	transition: all 0.5s;
	&.displayBtn {
		display: block;
	}
	&:hover {
		cursor: pointer;
		color: #ffffff;
		background: #9dc3e6;
		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
		border-color: transparent;
		backdrop-filter: blur(2px);
	}
	@media (max-width: 1500px) {
		padding: 6px 36px;
		font-size: 18px;
	}
	@media (max-width: 700px) {
		top: 55%;
		padding: 4px 30px;
	}
	@media screen and (max-width: 500px) {
		padding: 2px 20px;
		font-size: 14px;
	}
`;
export default VirtualWorld;
