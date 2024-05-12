/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
// models
import { OptionSelectCustom, OrderResponseAPI } from 'models';
// redux
import { useSelector } from 'react-redux';
import { selectListOrderOffer, selectLoading } from 'redux/slices/orderSlice';

// components
import NoItemCircleCard from 'components/CustomUI/Card/NoItemCard/NoItemCircleCard';

import SelectCustom from 'components/CustomField/SelectCustom';
// mui
import { Box, Link, useTheme, Typography } from '@mui/material';
// styled
import { OfferList } from './styled';

// images
import ImageNoOffer from 'assets/icons/Nodata.svg';
import OfferInInfoAccountCard from 'components/CustomUI/Card/OfferInInfoAccountCard';
import SkeletonOfferInInfoAccountList from 'components/CustomUI/Skeleton/List/SkeletonOfferInInfoAccountList';
import { PATH_ITEM } from 'routes/path';

interface OffersTabProps {
	currentFilterOfferOption: OptionSelectCustom<string>;
	setCurrentFilterFilterOfferOption: Function;
	listFilterOfferOption: OptionSelectCustom<string>[];
}

function OffersTab({
	currentFilterOfferOption,
	setCurrentFilterFilterOfferOption,
	listFilterOfferOption,
}: OffersTabProps) {
	const theme = useTheme();

	// useSelector
	const listOrderOffer: OrderResponseAPI[] = useSelector(selectListOrderOffer);
	const isLoading = useSelector(selectLoading);

	// vars
	const isLightTheme = theme.palette.mode === 'light';

	// functions
	const handleChangeFilterOption = (currentOption: OptionSelectCustom<string>) => {
		setCurrentFilterFilterOfferOption(currentOption);
	};

	return (
		<>
			<Box sx={{ width: '200px', ml: 'auto' }}>
				<SelectCustom
					currentItem={currentFilterOfferOption}
					listItem={listFilterOfferOption}
					onChange={handleChangeFilterOption}
				/>
			</Box>

			<Box
				sx={{
					marginTop: '1rem',
					paddingBottom: '1rem',
				}}
			>
				<Box
					sx={{
						backgroundColor: '#E7E8EC',
						borderTopLeftRadius: '12px',
						borderTopRightRadius: '12px',
						display: 'flex',
						padding: '10px 30px',
						color: '#131740',
					}}
				>
					<Typography variant="body1" sx={{ lineHeight: '1.65', flex: '6' }}>
						Item
					</Typography>
					<Typography
						variant="body1"
						sx={{ lineHeight: '1.65', flex: '3', textAlign: 'center' }}
					>
						Price
					</Typography>
					<Typography
						variant="body1"
						sx={{ lineHeight: '1.65', flex: '3', textAlign: 'center' }}
					>
						Date
					</Typography>
				</Box>
				{!isLoading ? (
					<OfferList>
						{listOrderOffer && listOrderOffer.length > 0 ? (
							listOrderOffer.map((item: any, index: number) => {
								console.log(item);
								return (
									<Box
										key={index}
										sx={{
											border: '1px solid #E7E8EC',
											borderTop: 'none',
										}}
									>
										<Link
											href={`#${PATH_ITEM.detail}/${item.itemId}`}
											sx={{ textDecoration: 'none' }}
											underline="none"
											color="unset"
										>
											<OfferInInfoAccountCard
												orderId={item._id}
												itemId={item.itemId}
												price={item.usdPrice}
											/>
										</Link>
									</Box>
								);
							})
						) : (
							<Box sx={{ mt: 2 }}>
								<NoItemCircleCard title="No offer yet!" image={ImageNoOffer} />
							</Box>
						)}
					</OfferList>
				) : (
					<SkeletonOfferInInfoAccountList />
				)}
			</Box>
		</>
	);
}
export default OffersTab;
