/* eslint-disable @typescript-eslint/no-unused-vars */

import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import HeaderIGO from './HeaderIGO';
import IGOOffering from './IGOOffering';
import EndedIGO from './EndedIGO';
import HeaderImg from 'assets/Test/header.jpeg';
import BackgroundImg from 'assets/Test/background.jpeg';
import LogoImg from 'assets/Test/logo.jpeg';

const exampTypography = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

export interface IIGOcomponentProps {}

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

export default function IGOcomponent(props: IIGOcomponentProps) {
	// useEffect
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div>
			<Container maxWidth="xxl">
				<HeaderIGO />
				<IGOOffering />
				<EndedIGO />
			</Container>
		</div>
	);
}
