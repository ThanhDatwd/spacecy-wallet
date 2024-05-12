/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
// mui
import { Box, Container, Typography } from '@mui/material';
// component
import TabViewAll from 'components/pages/ViewAll/TabViewAll';

export interface IViewAllProps {}

export default function ViewAll(props: IViewAllProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const query: string | null = searchParams.get('query');

	return (
		<Container maxWidth="xxl" sx={{ mt: 16 }}>
			<Typography variant="h1" fontWeight={500} sx={{ my: 3, textAlign: 'center' }}>
				Marketplace
			</Typography>

			{query && (
				<Box>
					<Typography variant="h4" sx={{ wordWrap: 'break-word' }}>
						Search results for: {query}
					</Typography>
				</Box>
			)}

			<Box sx={{ mt: 2, ml: 'auto', mr: 'auto' }}>
				<TabViewAll query={query ?? ''} />
			</Box>
			<Box>
				<Outlet />
			</Box>
		</Container>
	);
}
