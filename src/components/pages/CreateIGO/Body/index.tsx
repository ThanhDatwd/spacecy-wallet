/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Box, Grid, Input, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import {
	ItemWrapperIGO,
	TextWrapperIGO,
	GridWrapperIGO,
	GridContainer,
	BrandTitle,
} from './styled';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import IgoForbit from 'assets/igo-forbit.webp';
import { PATH_IGO } from 'routes/path';
import { formatDayMonth, formatTimeHours } from 'utils';
import { IGOPreview } from 'models/IGO';
import BackgroundImg from 'assets/Test/background.jpeg';

export interface IIGOOfferingProps {
	data: IGOPreview;
}

export default function IGOOffering({ data }: IIGOOfferingProps) {
	const theme = useTheme();
	const renderItemIGOOffering = () => {
		return new Array(2).fill(null).map((index) => (
			<Grid key={index}>
				<ItemWrapperIGO>
					<Box sx={{ maxHeight: '300px', overflow: 'hidden' }}>
						<Skeleton variant="rectangular" width="100%" height="300px" />
					</Box>
					<TextWrapperIGO>
						<Skeleton variant="text" sx={{ fontSize: '2.5rem' }} />

						<Box sx={{ flex: '1 1 0%' }} mt={2}>
							<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
							<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
							<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
							<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
						</Box>
						<GridWrapperIGO>
							<Stack direction="row" justifyContent="space-between">
								<Skeleton width="30%" sx={{ opacity: '0.8' }} />
								<Skeleton width="30%" sx={{ opacity: '0.8' }} />
							</Stack>
							<Stack direction="row" justifyContent="space-between">
								<Skeleton width="30%" sx={{ opacity: '0.8' }} />
								<Skeleton width="30%" sx={{ opacity: '0.8' }} />
							</Stack>
							<Stack direction="row" justifyContent="space-between">
								<Skeleton width="30%" sx={{ opacity: '0.8' }} />
								<Skeleton width="30%" sx={{ opacity: '0.8' }} />
							</Stack>
							<Stack direction="row" justifyContent="space-between">
								<Skeleton width="30%" sx={{ opacity: '0.8' }} />
								<Skeleton width="30%" sx={{ opacity: '0.8' }} />
							</Stack>
						</GridWrapperIGO>
					</TextWrapperIGO>
				</ItemWrapperIGO>
			</Grid>
		));
	};
	return (
		<>
			<Box mt={8}>
				<Box>
					<GridContainer mt={8}>
						<Grid>
							<ItemWrapperIGO>
								<Box sx={{ maxHeight: '300px', overflow: 'hidden' }}>
									<img src={BackgroundImg} alt="" style={{}} />
								</Box>
								<TextWrapperIGO>
									<Typography
										mt={2}
										variant="h4"
										sx={{ fontWeight: '600' }}
										textAlign="center"
									>
										{data.requestINO.projectName}
									</Typography>
									<Box sx={{ flex: '1 1 0%' }} mt={2}>
										<Typography variant="body2">
											{data.requestINO.projectDescription}
										</Typography>
									</Box>
									<GridWrapperIGO>
										<Stack direction="row">
											<Typography
												sx={{ flex: '1 1 0%', opacity: '0.8' }}
												variant="body2"
											>
												Total Volume
											</Typography>
											<Typography variant="body2">
												{data.stableCoinPaymentUSD *
													Number(data.items.length)}{' '}
												USDT
											</Typography>
										</Stack>
										<Stack direction="row">
											<Typography
												sx={{ flex: '1 1 0%', opacity: '0.8' }}
												variant="body2"
											>
												Floor Price
											</Typography>
											<Typography variant="body2">
												{data.stableCoinPaymentUSD} USDT
											</Typography>
										</Stack>
										<Stack direction="row">
											<Typography
												sx={{ flex: '1 1 0%', opacity: '0.8' }}
												variant="body2"
											>
												Total Items
											</Typography>
											<Typography variant="body2">
												{Number(data.items.length)}
											</Typography>
										</Stack>
										<Stack direction="row">
											<Typography
												sx={{ flex: '1 1 0%', opacity: '0.8' }}
												variant="body2"
											>
												End Time
											</Typography>
											<Typography variant="body2">
												{formatDayMonth(data.requestINO.endTime)}{' '}
												{formatTimeHours(data.requestINO.endTime)}
											</Typography>
										</Stack>
									</GridWrapperIGO>
								</TextWrapperIGO>
							</ItemWrapperIGO>
						</Grid>
						{renderItemIGOOffering()}
					</GridContainer>
				</Box>
			</Box>
		</>
	);
}
