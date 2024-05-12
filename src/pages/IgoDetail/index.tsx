/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { Box, Container } from '@mui/material';
import IGODetailComponent from 'components/pages/IGODetail';

export interface IIgoDetailProps {}

export default function IgoDetail(props: IIgoDetailProps) {
	return (
		<Box>
			<IGODetailComponent />
		</Box>
	);
}
