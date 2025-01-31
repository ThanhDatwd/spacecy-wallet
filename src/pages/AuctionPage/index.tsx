/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
// mui
import { Box, Container, Typography } from '@mui/material';
// components
import TabAuctionAll from 'components/pages/Auction/TabAuctionAll';
import DividerGradient from 'components/CustomUI/DividerGradient';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setFilter } from 'redux/slices/allNftsSlice';
// styled
import { AuctionHeader, Devider, SubAuctionHeader } from './styled';
import AuctionComponentNew from 'components/pages/AuctionNew';

const AuctionPage = () => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const query: string | null = searchParams.get('query');

	// Handle search name function
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);
	const filter = useSelector(selectFilter);

	return (
		<Box sx={{ mt: 16, maxWidth: '1300px', mx: 'auto' }}>
			<Typography
				variant="h1"
				fontWeight={600}
				sx={{ fontStyle: 'italic', textAlign: 'center' }}
			>
				Auction
			</Typography>
			<Box sx={{ mt: 2 }}>
				<TabAuctionAll />
				{/* <AuctionComponentNew /> */}
			</Box>
		</Box>
	);
};

export default AuctionPage;
