/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import drop1 from 'assets/Drop/drop1.png';
// import drop2 from 'assets/Drop/drop2.png';
// import drop3 from 'assets/Drop/drop3.png';
import { StackItem } from '../styled';
import ButtonWhite from 'components/CustomUI/ButtonWhite';
import status from 'assets/icons/status.svg';
import statusGray from 'assets/icons/status-gray.svg';

import { SizeContext } from 'contexts/SizeObserver';
//redux
import { useAppSelector } from 'redux/hooks';
import { selectDataComingDrop } from 'redux/slices/dropSlice';
import CountDown from 'components/CustomUI/Card/NFTItemCardInAuction/CountDown';

const Upcoming: React.FC = () => {
	const dataComingDrop = useAppSelector(selectDataComingDrop);
	const { innerWidth } = useContext(SizeContext);
	const theme = useTheme();

	return (
		<Stack gap={4} sx={{ mt: 4 }}>
			{dataComingDrop.length > 0 &&
				dataComingDrop.map((item: any) => {
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
								{/* <img src={} alt={item.info.title} /> */}
								<Box
									sx={{
										position: 'relative',
										p: 4,
										width: '100%',
										height: '100%',
										color: '#fff !important',
										display: 'flex',
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
										direction="column"
										height="100%"
										width="100%"
										justifyContent="flex-end"
										// sx={{ flex: '1 1 0%' }}
									>
										<Box sx={{ width: '100%' }}>
											<Typography
												variant="h2"
												fontWeight="600"
												// sx={{
												// 	display: '-webkit-box',
												// 	WebkitBoxOrient: 'vertical',
												// 	WebkitLineClamp: '1',
												// 	overflow: 'hidden',
												// }}
											>
												{item.info.tittle}
											</Typography>
											<Typography variant="h4" fontWeight="500" mt={1}>
												Created by {item.info.creator}
											</Typography>
											<Stack direction="row" gap={5} mt="10px">
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
											{innerWidth < 950 ? (
												<Stack
													spacing={1}
													direction="row"
													justifyContent="center"
													sx={{
														borderRadius: '12px',
														padding: '10px 24px',
														background: theme.palette.primary.light,
														color: '#fff',
														fontWeight: '500',
														width: '270px',
														mt: 2,
														[theme.breakpoints.down(650)]: {
															width: 220,
														},
														'& > p': {
															width: '62px',
															[theme.breakpoints.down(650)]: {
																fontSize: '13px',
																width: 49,
															},
														},
														'& > div': {
															width: 'unset',
														},
													}}
												>
													<Typography
														variant="body1"
														fontWeight="500"
														sx={{}}
													>
														Start in
													</Typography>
													<CountDown
														className="countDown"
														timeStart={item.info.startTime * 1000}
														timeEnd={item.info.endTime * 1000}
														executeOne={() => {}}
														executeZero={() => {}}
													/>
												</Stack>
											) : null}

											{/* <Box
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
												{item.status ? (
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
											</Box> */}
											{/* <Stack
												direction="row"
												sx={{
													borderRadius: '12px',
													padding: '10px 24px',
													background: theme.palette.primary.light,
													color: '#fff',
													fontWeight: '500',
												}}
											>
												<Typography
													variant="body1"
													fontWeight="500"
													width="80px"
													sx={{
														[theme.breakpoints.down(650)]: {
															fontSize: '13px',
															width: 64,
														},
													}}
												>
													End in
												</Typography>
											</Stack> */}
										</Box>
										{innerWidth > 950 ? (
											<Box
												sx={{
													position: 'absolute',
													right: '32px',
													bottom: '32px',
												}}
											>
												<Stack
													spacing={1}
													direction="row"
													justifyContent="center"
													sx={{
														borderRadius: '12px',
														padding: '10px 24px',
														background: theme.palette.primary.light,
														color: '#fff',
														fontWeight: '500',
														width: '270px',
														'& > p': {
															width: '62px',
															[theme.breakpoints.down(650)]: {
																fontSize: '13px',
																width: 49,
															},
														},
														'& > div': {
															width: 'unset',
														},
													}}
												>
													<Typography
														variant="body1"
														fontWeight="500"
														sx={{}}
													>
														Start in
													</Typography>
													<CountDown
														className="countDown"
														timeStart={item.info.startTime * 1000}
														timeEnd={item.info.endTime * 1000}
														executeOne={() => {}}
														executeZero={() => {}}
													/>
												</Stack>
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

export default React.memo(Upcoming);
