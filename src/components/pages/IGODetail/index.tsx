/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Container } from '@mui/material';
import React from 'react';
import BodyIGODetail from './Body';
import HeaderIgo from './Header';

export interface IIGODetailComponentProps {}

export default function IGODetailComponent(props: IIGODetailComponentProps) {
	return (
		<div>
			<HeaderIgo />
			<Box sx={{}}>
				<BodyIGODetail />
			</Box>
		</div>
	);
}
