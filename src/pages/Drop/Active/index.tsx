/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { useContext } from 'react';
// import drop1 from 'assets/Drop/drop1.png';
// import drop2 from 'assets/Drop/drop2.png';
import drop3 from 'assets/Boarc/image33.png';
import { StackItem } from '../styled';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import status from 'assets/icons/status.svg';
import statusGray from 'assets/icons/status-gray.svg';
import { PATH_DROP } from 'routes/path';
//redux
import { useAppSelector } from 'redux/hooks';
import { selectDataActiveDrop } from 'redux/slices/dropSlice';
import { SizeContext } from 'contexts/SizeObserver';

const Active: React.FC = () => {
	const dataActiveDrop = useAppSelector(selectDataActiveDrop);
	const { innerWidth } = useContext(SizeContext);
	const theme = useTheme();
	const listActive = [
		{
			id: 1,
			image: drop3,
			title: 'ZODIAC SIGN',
			creater: 'Hoang Long',
			totalNFT: '100',
			availableNFT: '99',
			price: '0,01',
			owner: '1',
			totalSales: '0.01',
			status: true,
			linkDrop: `#${PATH_DROP.boarc}`,
		},
		// {
		// 	id: 2,
		// 	image: drop2,
		// 	title: 'Artstation ',
		// 	creater: 'Lazy',
		// 	totalNFT: '100',
		// 	availableNFT: '99',
		// 	price: '0,06',
		// 	owner: '1000',
		// 	totalSales: '110.85',
		// 	status: true,
		// 	linkDrop: '',
		// },
		// {
		// 	id: 3,
		// 	image: drop3,
		// 	title: 'Dope Spacecy',
		// 	creater: 'alyxbow',
		// 	totalNFT: '100',
		// 	availableNFT: '99',
		// 	price: '0,06',
		// 	owner: '1000',
		// 	totalSales: '110.85',
		// 	status: false,
		// 	linkDrop: '',
		// },
	];

	return (
		<Stack gap={4} sx={{ mt: 4 }}>
			{dataActiveDrop.length > 0 &&
				dataActiveDrop.map((item: any) => {
					return (
						<Link
							key={item.info._id}
							href={`#/drops/${item.info.collectionId}`}
							sx={{
								'&:hover': {
									textDecoration: 'none',
								},
							}}
						>
							<Box
								sx={{
									position: 'relative',
									height: '500px',
									background: `url(${item.info.image}) center center / cover no-repeat`,
									borderRadius: '16px',
									'&::after': {
										content: '""',
										background: 'rgba(0,0,0,0.5)',
										position: 'absolute',
										left: 0,
										top: 0,
										width: '100%',
										height: '100%',
										borderRadius: '16px',
										zIndex: 0,
									},
								}}
							>
								<Box
									sx={{
										position: 'relative',
										p: 4,
										width: '100%',
										height: '100%',
										color: '#fff !important',
										display: 'flex',
										alignItems: 'flex-end',
										zIndex: 5,
										[theme.breakpoints.down(768)]: {
											px: 2,
										},
										[theme.breakpoints.down(480)]: {
											px: '10px',
										},
									}}
								>
									<Stack
										direction="row"
										justifyContent="space-between"
										alignItems="center"
										width="100%"
									>
										<Box sx={{ width: '100%' }}>
											<Typography variant="h2" fontWeight="600">
												{item.info.tittle}
											</Typography>
											<Typography variant="h4" fontWeight="500">
												Created by {item.info.creator}
											</Typography>
											<Stack direction="row" gap={5}>
												<StackItem>
													<Typography
														variant="h6"
														color="#E7E8EC"
														textAlign="center"
													>
														Available NFTs
													</Typography>
													<p>
														{item.info.availableNFT}{' '}
														<span>/ {item.info.totalNFT}</span>
													</p>
												</StackItem>
												<StackItem>
													<Typography
														variant="h6"
														color="#E7E8EC"
														textAlign="center"
													>
														Price
													</Typography>
													<p>
														{item.info.price}{' '}
														<span>{item.info.symbolPrice}</span>
													</p>
												</StackItem>
												{innerWidth > 650 ? (
													<>
														{' '}
														<StackItem>
															<Typography
																variant="h6"
																color="#E7E8EC"
																textAlign="center"
															>
																Owners
															</Typography>
															<p>{item.info.owner}</p>
														</StackItem>
														<StackItem>
															<Typography
																variant="h6"
																color="#E7E8EC"
																textAlign="center"
															>
																Total sales
															</Typography>
															<p>
																{item.info.totalSales}{' '}
																<span>{item.info.symbolPrice}</span>
															</p>
														</StackItem>
													</>
												) : null}
											</Stack>
											<Box
												sx={{
													mt: 2,
													width: '600px',
													'@media (max-width: 950px)': {
														width: '450px',
													},
													button: {
														width: 'fit-content',
														mx: 'auto',
														borderColor: 'transparent',
														'&:disabled': {
															background: 'rgba(157, 195, 230, 0.5)',
															color: '#fff',
															borderColor: 'transparent',
														},
														img: {
															width: '20px',
															marginRight: '10px',
														},
														'@media (max-width: 650px)': {
															mx: 0,
														},
													},
												}}
											>
												{item.info.availableNFT > 0 ? (
													<ButtonWhite disabled>
														<img src={statusGray} alt="status" />
														Minting Now
													</ButtonWhite>
												) : (
													<ButtonWhite disabled>
														<img src={status} alt="status" />
														Minting Sold Out
													</ButtonWhite>
												)}
											</Box>
										</Box>
										{innerWidth > 850 ? (
											<Box
												sx={{
													button: {
														width: '10rem',
														mx: 'auto',
														background: 'rgba(157, 195, 230, 0.5)',
														color: '#fff',
														borderColor: 'transparent',
													},
												}}
											>
												<ButtonWhite>View Drop</ButtonWhite>
											</Box>
										) : null}
									</Stack>
								</Box>
							</Box>
						</Link>
					);
				})}
		</Stack>
	);
};

export default React.memo(Active);
