/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { Box, Button, Input, Skeleton, Stack, Typography } from '@mui/material';
import {
	GridEnedIgoContainer,
	ItemEndIgo,
	WrapperImage,
	BorderApplyIGO,
	ButtonApplyIGO,
} from './styled';
import { sliceString } from 'utils';
import { PATH_IGO } from 'routes/path';
import { IGOPreview } from 'models/IGO';
import LogoImg from 'assets/Test/logo.jpeg';

export interface IEndedIGOProps {
	data: IGOPreview;
}

export default function EndedIGO({ data }: IEndedIGOProps) {
	const renderItemIgo = () => {
		return new Array(2).fill(null).map((index) => (
			<ItemEndIgo key={index}>
				<Box sx={{ width: '200px' }}>
					{/* <WrapperImage> */}
					<Skeleton variant="rectangular" width="100%" height="200px" />
					{/* </WrapperImage> */}
				</Box>

				<Stack direction="column">
					<Typography sx={{ opacity: '0.5' }}>NFTs Metaspacecy</Typography>
					<Typography variant="h5" sx={{ flex: '1 1 0%' }}>
						<Skeleton variant="text" sx={{ fontSize: '2rem' }} />
					</Typography>
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				</Stack>
			</ItemEndIgo>
		));
	};
	return (
		<>
			<Box mt={8}>
				<Box mt={4}>
					<GridEnedIgoContainer>
						<ItemEndIgo>
							<Box sx={{ width: '200px' }}>
								<WrapperImage>
									<img src={LogoImg} alt="" />
								</WrapperImage>
							</Box>

							<Stack direction="column">
								<Typography sx={{ opacity: '0.5' }}>NFTs Metaspacecy</Typography>
								<Typography variant="h5" sx={{ flex: '1 1 0%' }}>
									{/* {sliceString('The Star Sharks', 14)} */}{' '}
									{data.requestINO.projectName}
								</Typography>
								<Typography>Price: {data.stableCoinPaymentUSD} USDT</Typography>
							</Stack>
						</ItemEndIgo>
						{renderItemIgo()}
					</GridEnedIgoContainer>
				</Box>
			</Box>
		</>
	);
}
