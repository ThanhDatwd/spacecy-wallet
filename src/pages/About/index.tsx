/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { Fragment, useContext } from 'react';

import bgBanner from 'assets/About/bg-banner.png';
import bgCenter from 'assets/About/bg-center.png';
import bgEarth from 'assets/About/bg-earth.png';
import bgMeta from 'assets/About/bg-meta.png';
import team1 from 'assets/About/team1.svg';
import team2 from 'assets/About/team2.svg';

// import {} from './styled';

import { SizeContext } from 'contexts/SizeObserver';
import Founder from './Founder';
import Overview from './Overview';
import Studio from './Studio';

// Image

const About: React.FC = () => {
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const theme = useTheme();
	const darkTheme = theme.palette.mode === 'dark';

	return (
		<Fragment>
			<Box
				sx={{
					h1: {
						[theme.breakpoints.down(1024)]: {
							fontSize: '50px',
						},
						[theme.breakpoints.down(768)]: {
							fontSize: '44px',
						},
						[theme.breakpoints.down(480)]: {
							fontSize: '38px',
						},
					},
				}}
			>
				<Box
					sx={{
						background: `url(${bgBanner})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
						height: '100vh',
					}}
				>
					<Box
						maxWidth={MaxWidth}
						mx="auto"
						px={4}
						pt="25vh"
						textAlign="center"
						sx={{
							[theme.breakpoints.down(768)]: {
								px: 2,
							},
							[theme.breakpoints.down(480)]: {
								px: 1,
							},
						}}
					>
						<Typography variant="h1" fontWeight={600}>
							About Metaspacecy
						</Typography>
						<Typography variant="h6" fontWeight={600} mt={2}>
							Metaspacecy is a web3 space company open-source built on blockchain
							technology at scale. Where decentralized networks explore the big ideas
							and connect identity ownership, also unity & interoperability to push
							the crypto and NFT space forward and open a network of 3D virtual worlds
							focused on the social connection in metaverse.
						</Typography>
					</Box>
				</Box>
				<Box>
					<Founder />
				</Box>
				<Box>
					<Overview />
				</Box>
				<Box>
					<Studio />
				</Box>
				<Box
					sx={{
						background: `radial-gradient(35.36% 27.39% at 53.1% 43.75%, rgba(0, 0, 0, 0.66) 0%, rgba(0, 0, 0, 0) 100%), url(${bgCenter})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
						height: '100vh',
						[theme.breakpoints.down(900)]: {
							height: '100%',
						},
					}}
				>
					<Stack
						justifyContent="center"
						alignItems="center"
						maxWidth={MaxWidth}
						mx="auto"
						px={4}
						textAlign="center"
						height="100%"
						sx={{
							[theme.breakpoints.down(768)]: {
								px: 2,
							},
							[theme.breakpoints.down(480)]: {
								px: 1,
							},
						}}
					>
						<Stack
							justifyContent="space-between"
							gap={4}
							height="85%"
							width="100%"
							sx={{
								[theme.breakpoints.down(1200)]: {
									height: '55%',
								},
								[theme.breakpoints.down(900)]: {
									height: '100%',
									py: 4,
								},
							}}
						>
							<Box maxWidth="800px" mx="auto">
								<Typography variant="h6" fontWeight="500">
									38 Employees come from gaming, MMORPG, technology experts,
									Blockchain, Unity, Unreal, art creators, fashion designers, and
									master insight customers
								</Typography>
							</Box>
							<Stack
								direction="row"
								justifyContent="space-between"
								width="100%"
								gap="100px"
								sx={{
									'@media (max-height: 940px)': {
										gap: '100px',
										justifyContent: 'center',
									},
									[theme.breakpoints.down(900)]: {
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
										gap: '50px',
									},

									img: {
										width: '40%',
										'@media (max-height: 940px)': {
											width: '35%',
										},
										'@media (max-height: 840px)': {
											width: '30%',
										},
										'@media (max-height: 700px)': {
											width: '26%',
										},
										[theme.breakpoints.down(900)]: {
											width: '60%',
										},
										[theme.breakpoints.down(600)]: {
											width: '80%',
										},
									},
								}}
							>
								<img src={team1} alt="team" />
								<img src={team2} alt="team" />
							</Stack>
						</Stack>
					</Stack>
				</Box>
				<Box
					sx={{
						background: `radial-gradient(35.36% 27.39% at 53.1% 43.75%, rgba(0, 0, 0, 0.66) 0%, rgba(0, 0, 0, 0) 100%), url(${bgCenter})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
						py: 4,
					}}
				>
					<Stack
						justifyContent="center"
						alignItems="center"
						maxWidth="900px"
						mx="auto"
						px={4}
						textAlign="center"
						height="100%"
						sx={{
							[theme.breakpoints.down(768)]: {
								px: 2,
							},
							[theme.breakpoints.down(480)]: {
								px: 1,
							},
						}}
					>
						<Typography variant="h2" fontWeight={600}>
							We're Bringing Web3 Culture To Life
						</Typography>
						<Typography variant="h6" fontWeight={500} mb={4}>
							Web3 is Shifting Power in Culture As blockchain technology continues to
							grow and advance, across art, luxury, gaming, and more.
						</Typography>

						<Typography variant="h2" fontWeight={600}>
							Why is Web3 important?
						</Typography>
						<Typography variant="h6" fontWeight={500}>
							Although Web3's killer features aren't isolated and don't fit into neat
							categories, for simplicity we've tried to separate them to make them
							easier to understand.
						</Typography>
						<Typography variant="h6" fontWeight={500} mb={4}>
							Web3 allows for direct ownership through non-fungible tokens (NFTs). No
							one, not even the game's creators, has the power to take away your
							ownership. And, if you stop playing, you can sell or trade your in-game
							items on open markets and recoup their value.
						</Typography>

						<Typography variant="h2" fontWeight={600}>
							The Evolutionary of NFT Marketplace Development On Web3 "Web3 Social"
						</Typography>
						<Typography variant="h4" fontWeight={600} my={1}>
							What makes NFTs so popular?
						</Typography>
						<Typography variant="h6" fontWeight={500}>
							Firstly, they are based on Web 3 technology, Secondly, it enables NFT
							artists to have exclusive ownership of their creations.And the rise of
							Web3, compounded by the increasing popularity of non-fungible tokens
							(NFTs)
						</Typography>
						<Typography variant="h6" fontWeight={500} mt={2}>
							We built Web 3 NFT Marketplace to start buying/selling and swapping NFTs
							with ease.
						</Typography>
					</Stack>
				</Box>
				<Box
					sx={{
						background: `radial-gradient(35.36% 27.39% at 53.1% 43.75%, rgba(0, 0, 0, 0.66) 0%, rgba(0, 0, 0, 0) 100%), url(${bgCenter})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
						height: '100vh',
					}}
				>
					<Stack
						justifyContent="center"
						alignItems="center"
						maxWidth="900px"
						mx="auto"
						px={4}
						textAlign="center"
						height="100%"
						sx={{
							[theme.breakpoints.down(768)]: {
								px: 2,
							},
							[theme.breakpoints.down(480)]: {
								px: 1,
							},
						}}
					>
						<Typography variant="h2" fontWeight={600} mb={8}>
							Metaverse – Why Now?
						</Typography>
						<Typography variant="h6" fontWeight={500}>
							In spite of all this perplexity and skepticism, why are organizations
							beginning to take notice of the Metaverse? Why are companies choosing
							now to invest in this potential future digital revolution?
						</Typography>

						<Typography variant="h6" fontWeight={500} my={4}>
							Well, there are a number of exciting reasons that the Metaverse might
							not be as farfetched as some have chosen to believe.
						</Typography>
						<Typography variant="h6" fontWeight={500}>
							The question is, are organizations ready to look past the excitement and
							see the true opportunities that the Web 3.0 will bring to their
							business?
						</Typography>
					</Stack>
				</Box>

				<Box
					sx={{
						background: `url(${bgEarth})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
						height: '1800px',
						[theme.breakpoints.down(2200)]: {
							height: '100vh',
						},
						'@media (max-height: 1200px) and (max-width: 2200px)': {
							height: '1300px',
						},
						'@media (max-height: 1000px) and (max-width: 2200px)': {
							height: '1180px',
						},
						'@media (max-height: 800px) and (max-width: 2200px)': {
							height: '1100px',
						},
					}}
				>
					<Stack
						justifyContent="center"
						alignItems="center"
						maxWidth="1000px"
						mx="auto"
						px={4}
						textAlign="center"
						height="100%"
						sx={{
							[theme.breakpoints.down(768)]: {
								px: 2,
							},
							[theme.breakpoints.down(480)]: {
								px: 1,
							},
						}}
					>
						<Stack
							justifyContent="space-between"
							height="90%"
							sx={{
								[theme.breakpoints.down(480)]: {
									height: '95%',
								},
							}}
						>
							<Box
							// sx={{
							// 	background: 'rgba(0, 46, 88, 0.6)',
							// 	backdropFilter: 'blur(10px)',
							// 	borderRadius: '12px',
							// 	p: 6,
							// 	[theme.breakpoints.down(480)]: {
							// 		p: 3,
							// 	},
							// }}
							>
								<Typography variant="h2" fontWeight={600}>
									Mission
								</Typography>
								<Typography variant="h6" fontWeight={500} my={4}>
									Metaspacecy’s mission is to “build a human co-experience
									platform that enables shared experiences among billions of
									users.” fostering the community of users around the shared
									virtual worlds
								</Typography>
								<Typography variant="h4" fontWeight={600}>
									If we build the open metaverse, they will come
								</Typography>
							</Box>
							<Box
							// sx={{
							// 	background: 'rgba(0, 46, 88, 0.6)',
							// 	backdropFilter: 'blur(10px)',
							// 	borderRadius: '12px',
							// 	p: 6,
							// 	[theme.breakpoints.down(480)]: {
							// 		p: 3,
							// 	},
							// }}
							>
								<Typography variant="h2" fontWeight={600}>
									Our Vission
								</Typography>
								<Typography variant="h6" fontWeight={500} my={4}>
									The grand vision of the Metaspacecy is to provide a parallel
									digital universe connected to our physical world through
									multiple digital technologies.
								</Typography>
								<Typography variant="h6" fontWeight={500}>
									The convergence of the virtual (online) and real (offline)
									universes will enable us to communicate in the digital world
									through avatars.
								</Typography>
							</Box>
						</Stack>
					</Stack>
				</Box>
				<Box
					sx={{
						background: `url(${bgMeta})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
						height: '100vh',
					}}
				>
					<Stack
						justifyContent="center"
						alignItems="center"
						maxWidth="1100px"
						mx="auto"
						px={4}
						textAlign="center"
						height="100%"
						sx={{
							[theme.breakpoints.down(768)]: {
								px: 2,
							},
							[theme.breakpoints.down(480)]: {
								px: 1,
							},
						}}
					>
						<Stack justifyContent="space-between" height="80%">
							<Box>
								<Typography variant="h2" fontWeight={600}>
									Metaverse – Why Now?
								</Typography>
								<Typography variant="h4" fontWeight={500} my={4}>
									The fact is, pretty we don’t sell things. "The key to being
									seen, heard, and understood”
								</Typography>
							</Box>
							<Box>
								<Typography variant="h4" fontWeight={500}>
									We build interactive spaces with cultures in the value of the
									brand story. Meets our storytellers.
								</Typography>
							</Box>
						</Stack>
					</Stack>
				</Box>
			</Box>
		</Fragment>
	);
};

export default React.memo(About);
