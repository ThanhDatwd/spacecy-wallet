/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Box, Container, Input, Stack, Typography } from '@mui/material';
import CreateIGO from 'components/pages/CreateIGO/Header';
import IGOOffering from 'components/pages/CreateIGO/Body';
import ICreateIGOComponent from 'components/pages/CreateIGO';
import HeaderImg from 'assets/Test/header.jpeg';
import BackgroundImg from 'assets/Test/background.jpeg';
import LogoImg from 'assets/Test/logo.jpeg';
import ButtonGradient from 'components/CustomUI/ButtonGradient';

import igoApi from 'apis/igoApi';
import { Response } from 'models';

export interface IIgoCreateProps {}
const exampTypography = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

const data = {
	headerImg: HeaderImg,
	background: BackgroundImg,
	logo: LogoImg,
	thumbnail: '',
	nameProject: 'Vinh Test',
	description: exampTypography,
	startTime: 1660461091,
	endTime: 1660979431,
	networkPaymentName: 'ETH',
	networkPaymentPrice: 0.1,
	stableCoinPaymentPrice: 2,
	nativeTokenPaymentPrice: 3,
	totalItems: 1000,
	totalVolume: 300000,
};

export default function IgoCreate(props: IIgoCreateProps) {
	return (
		<Container maxWidth="xxl" sx={{ mt: 14 }}>
			<Box mt={6}>
				<Typography variant="h2" fontStyle="italic">
					Preview Your IGO
				</Typography>
			</Box>
			<Box>
				<ICreateIGOComponent />
			</Box>
		</Container>
	);
}
