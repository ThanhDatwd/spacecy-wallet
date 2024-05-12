import React, { useEffect, useState } from 'react';
import moment from 'moment';
// mui
import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
// apis
import orderApi from 'apis/orderApi';
// components
import SkeletonOfferInInfoAccountCard from 'components/CustomUI/Skeleton/Item/SkeletonOfferInInfoAccountCard';
// models
import { OrderResponseAPI, Response, NFT } from 'models';
// utils
import { formatNumber, sliceAddress } from 'utils';
// styled
import { OfferCard } from './styled';
// hooks
import { useIsMounted } from 'hooks';
import nftsApi from 'apis/nftsApi';
import openLink from '../../../../assets/icons/openLink.svg';
export interface IOfferInInfoAccountCardProps {
	orderId: string;
	itemId: string;
	price: string;
}

export default function OfferInInfoAccountCard({
	orderId,
	itemId,
	price,
}: IOfferInInfoAccountCardProps) {
	// hooks
	const isMounted = useIsMounted();
	const theme = useTheme();

	// useState
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [orderBuy, setOrderBuy] = useState<OrderResponseAPI | null>(null);
	const [itemProps, setItemProps] = useState<NFT>();
	// useEffect
	useEffect((): any => {
		(async () => {
			setIsLoading(true);

			try {
				const res: Response<OrderResponseAPI> = await orderApi.getOrderDetailByUser(
					orderId
				);
				const orderDetail: OrderResponseAPI = res.data;
				const res1: Response<NFT> = await nftsApi.getSearchNftItemById(itemId);
				const item: NFT = res1.data;
				if (isMounted()) {
					setOrderBuy(orderDetail);
					setItemProps(item);
				}
			} catch (error) {
				console.log(error);
			} finally {
				if (isMounted()) {
					setIsLoading(false);
				}
			}
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return !isLoading ? (
		orderBuy ? (
			<OfferCard>
				<Stack direction="row" alignItems="center" sx={{ flex: '6' }}>
					<Avatar
						sx={{
							width: '50px',
							height: '50px',
							mr: 2,
							'@media screen and (max-width: 500px)': { display: 'none' },
						}}
						src={itemProps?.itemMedia}
						variant="rounded"
						alt="item"
					/>
					<Box>
						<Stack direction="row" alignItems="end">
							<Typography variant="h6" sx={{ mr: 1.5, fontWeight: '600' }}>
								{itemProps?.itemName}
							</Typography>
						</Stack>

						<Typography variant="body2">
							{sliceAddress(orderBuy.maker, 6, 8)}
						</Typography>
					</Box>
				</Stack>

				<Stack
					direction="row"
					alignItems="center"
					justifyContent="center"
					sx={{ flex: '3' }}
				>
					<Box>
						<Typography variant="body2" sx={{ opacity: 0.8, fontStyle: 'italic' }}>
							${formatNumber(Number(price) ?? 0, 2)}
						</Typography>
					</Box>
				</Stack>

				<Stack
					direction="row"
					alignItems="center"
					justifyContent="center"
					sx={{
						mt: 0.5,
						ml: 0.5,
						flex: '3',
					}}
				>
					<Typography
						className="dateColor"
						variant="body1"
						sx={{
							lineHeight: '1.65',
							color: theme.palette.primary.light,
							margin: '5px',
						}}
					>
						{moment(orderBuy.createdAt).fromNow()}
					</Typography>
					<img src={openLink} alt="hinh" />
				</Stack>
			</OfferCard>
		) : (
			<></>
		)
	) : (
		<SkeletonOfferInInfoAccountCard />
	);
}
