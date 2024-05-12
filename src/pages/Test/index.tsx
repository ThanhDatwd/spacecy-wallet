/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, Grid, Link, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React, { useEffect } from 'react';

import IconView from 'assets/icons/external-link-gradient.webp';
import ImgLoading from 'assets/forbit-loading.svg';
import { LazyLoadingImg } from './styled';
import {
	CollectionBackground,
	CollectionCardWrapper,
	CollectionInfo,
	CollectionLogo,
	CollectionLogoWrapper,
	CollectionName,
	ContentPart,
} from 'components/CustomUI/Card/CollectionCard/styled';
import LazyImageCustom from 'components/CustomUI/LazyImages/LazyImageCustom';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { PATH_CATEGORY } from 'routes/path';

import OtherIMG from 'assets/images/category/other.webp';
import ArtworkIMG from 'assets/images/category/art.webp';
import MusicIMG from 'assets/images/category/music.webp';
import PhotographyIMG from 'assets/images/category/photo.webp';
import GamesIMG from 'assets/images/category/game.webp';
import SportIMG from 'assets/images/category/sport.webp';
import MetevarseIMG from 'assets/images/category/metaverse.webp';
import BoxIMG from 'assets/images/category/box.webp';
import CardIMG from 'assets/images/category/card.webp';
import { sliceAddress } from 'utils';
import { TypographyStyled } from 'components/CustomUI/Tab/TabAuction/styled';
import AuctionComponentNew from 'components/pages/AuctionNew';

// @ts-ignore
import Ball from './Premier-Ball.glb';
// @ts-ignore
// import Gallery from './VR Gallery.glb';
declare global {
	namespace JSX {
		interface IntrinsicElements {
			'model-viewer': React.DetailedHTMLProps<any, HTMLElement>;
		}
	}
}

// "https://cdn.glitch.com/addcef2a-6839-4455-94d6-bcf986bfcf1c%2Fmodel.glb?v=1596225062063"
// 'https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.glb?1542147958948'
export default function App() {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);
	const { pathname } = useLocation();

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	useEffect(() => {
		const checkRoute = (pathname: any): void => {
			switch (pathname) {
				case '/test/test-grid': {
					setValue(0);
					break;
				}
				case '/test/test-grid2': {
					setValue(1);
					break;
				}
				default: {
					setValue(0);
				}
			}
		};
		checkRoute(pathname);
		return;
		// eslint-disable-next-line
	}, [pathname]);
	return (
		<>
			<Box sx={{ width: '400px', margin: '0 auto' }}>
				<Box
					sx={{
						position: 'relative',
						paddingTop: '100%',
						borderRadius: '10px',
						overflow: 'hidden',
						cursor: 'pointer',
						border: '1px solid',
					}}
				>
					<model-viewer
						id="mv-demo"
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							height: '100%',
							width: '100%',
						}}
						shadow-intensity="1"
						src={Ball}
						alt="A 3D model of an astronaut"
						auto-rotate
						camera-controls
						poster="./spacesuit.jpg"
						controller
					></model-viewer>
				</Box>
			</Box>
		</>
	);
}
