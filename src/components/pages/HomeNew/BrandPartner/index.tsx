/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { BrandWraper } from './styled';

import Boarc from 'assets/Home/LOGOPartnersNew/Boarc.png';
import Apac from 'assets/Home/LOGOPartnersNew/apacdao.png';
import OKC from 'assets/Home/LOGOPartnersNew/okc.png';
import Coinmap from 'assets/Home/LOGOPartnersNew/coinmap.png';
import Meta from 'assets/Home/LOGOPartnersNew/metwork.png';
import Medidev from 'assets/Home/LOGOPartnersNew/medidev.png';
import ETH from 'assets/Home/LOGOPartnersNew/ethVN.png';
// import Event from 'assets/Home/LOGOPartnersNew/event.png';
import forbit from 'assets/Home/LOGOPartnersNew/bulefn.png'; //cech
import polygon from 'assets/Home/LOGOPartnersNew/polygon.png';
import axx from 'assets/Home/LOGOPartnersNew/aax.png';
import coinres from 'assets/Home/LOGOPartnersNew/coinres.png';
import apolar from 'assets/Home/LOGOPartnersNew/apolar.png';
import neloverse from 'assets/Home/LOGOPartnersNew/neloverse.png';
import near from 'assets/Home/LOGOPartnersNew/Nelo.png';
import kkk from 'assets/Home/LOGOPartnersNew/11K.png';
import bulefn from 'assets/Home/LOGOPartnersNew/bulefn.png';
import jdi from 'assets/Home/LOGOPartnersNew/Jdi.png';
import oxa from 'assets/Home/LOGOPartnersNew/Oxa.png';
import { SizeContext } from 'contexts/SizeObserver';

export interface IBrandPartnerProps {}

export default function BrandPartner(props: IBrandPartnerProps) {
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const MaxWidth1 = innerWidth < 1800 ? '1240px' : '1400px';
	const theme = useTheme();
	return (
		<Box
			mt={6.5}
			sx={{
				[theme.breakpoints.down(768)]: {
					mt: 4,
				},
				[theme.breakpoints.down(480)]: {
					mt: 2,
				},
			}}
		>
			<Box
				sx={{
					background: 'rgba(177, 218, 255, 0.45)',
					px: 1,
					py: 2,
				}}
			>
				<Typography
					color="white"
					variant="h2"
					textAlign="center"
					fontStyle="italic"
					fontWeight={600}
					mb={4}
					sx={{
						'@media (max-width: 500px)': {
							marginBottom: '8px',
						},
					}}
				>
					Partnership
				</Typography>
				<Box
					sx={{
						width: 'fit-content',
						margin: '0 auto',
					}}
				>
					<Box
						maxWidth={MaxWidth}
						mx="auto"
						mt={0}
						sx={{
							// display: 'grid',
							// gridTemplateColumns: 'repeat(6,1fr)',
							// gridTemplateRows: 'repeat(1,200px)',
							// columnGap: '32px',
							// alignItems: 'center',
							// justifyItems: 'center',
							display: 'flex',
							justifyContent: 'center',
							marginBottom: '50px',
							'& :last-child': { marginRight: '0px' },
							'@media (max-width: 800px)': {
								marginBottom: '16px',
							},
						}}
					>
						<BrandWraper>
							<img src={Boarc} alt="Boarc" />
						</BrandWraper>
						<BrandWraper>
							<img src={jdi} alt="Boarc" />
						</BrandWraper>
						<BrandWraper>
							<img src={Apac} alt="Boarc" />
						</BrandWraper>
						<BrandWraper>
							<img src={bulefn} alt="Boarc" />
						</BrandWraper>
						<BrandWraper>
							<img src={polygon} alt="Boarc" />
						</BrandWraper>
					</Box>
					<Box
						maxWidth={MaxWidth1}
						mx="auto"
						mt={0}
						sx={{
							// display: 'grid',
							// gridTemplateColumns: 'repeat(5,0.5fr)',
							// gridTemplateRows: 'repeat(1,200px)',
							// columnGap: '32px',
							// alignItems: 'center',
							// justifyItems: 'center',
							display: 'flex',
							justifyContent: 'center',
							marginBottom: '50px',
							'& :last-child': { marginRight: '0px' },
							'@media (max-width: 800px)': {
								marginBottom: '16px',
							},
						}}
					>
						<BrandWraper>
							<img src={near} alt="Boarc" />
						</BrandWraper>
						<BrandWraper>
							<img src={kkk} alt="Boarc" />
						</BrandWraper>
						<BrandWraper>
							<img src={coinres} alt="Boarc" />
						</BrandWraper>

						<BrandWraper>
							<img src={Coinmap} alt="Boarc" />
						</BrandWraper>
					</Box>
					<Box
						maxWidth={MaxWidth}
						mx="auto"
						mt={0}
						sx={{
							// display: 'grid',
							// gridTemplateColumns: 'repeat(6,1fr)',
							// gridTemplateRows: 'repeat(1,200px)',
							// columnGap: '32px',
							// alignItems: 'center',
							// justifyItems: 'center',
							display: 'flex',
							justifyContent: 'center',
							marginBottom: '50px',
							'& :last-child': { marginRight: '0px' },
							'@media (max-width: 800px)': {
								marginBottom: '0px',
							},
						}}
					>
						<BrandWraper>
							<img src={oxa} alt="Boarc" />
						</BrandWraper>
						<BrandWraper>
							<img src={neloverse} alt="Boarc" />
						</BrandWraper>
						<BrandWraper>
							<img src={apolar} alt="Boarc" />
						</BrandWraper>

						<BrandWraper>
							<img src={Medidev} alt="Boarc" />
						</BrandWraper>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
