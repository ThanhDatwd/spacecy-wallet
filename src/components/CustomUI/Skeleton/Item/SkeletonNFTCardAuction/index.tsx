/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Skeleton, Box, Stack } from '@mui/material';
// styled
import { CardWrapper, SkeletonContent, SkeletonImage } from './styled';

export interface ISkeletonNFTItemCardProps {}

export default function SkeletonNFTItemCardAuction(props: ISkeletonNFTItemCardProps) {
	return (
		<CardWrapper>
			<Box sx={{}}>
				<SkeletonImage width="100%" variant="rectangular" />

				<SkeletonContent sx={{ p: 1.5 }}>
					<Stack mt={0.5} direction="row" justifyContent="space-between">
						<Skeleton sx={{ height: '36px', width: '120px' }} />
						<Skeleton sx={{ height: '36px', width: '40px' }} />
					</Stack>
					<Stack mt={0.5} direction="row" justifyContent="space-between">
						<Skeleton sx={{ height: '36px', width: '100%' }} />
					</Stack>
					<Skeleton
						variant="text"
						sx={{ my: 0, height: '40px', width: '70%', mr: 'auto', ml: 'auto' }}
					/>
				</SkeletonContent>
			</Box>
		</CardWrapper>
	);
}
