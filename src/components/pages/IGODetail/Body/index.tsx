/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { Box, Typography } from '@mui/material';
import Video1 from 'assets/Test/video1.mp4';
import Video2 from 'assets/Test/video2.mp4';
import Video3 from 'assets/Test/video3.mp4';
import Video4 from 'assets/Test/video4.mp4';
import Video5 from 'assets/Test/video5.mp4';
import LogoPartner from 'assets/Test/logo-brand.png';
import RoadMap from 'assets/Test/road-map.jpeg';
import ButtonGradient from 'components/CustomUI/ButtonGradient';

export interface IBodyIGODetailProps {}

export default function BodyIGODetail(props: IBodyIGODetailProps) {
	return (
		<Box>
			{/* FIRST */}
			<Box sx={{ background: 'rgba(0,0,0,0.1)' }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						mt: 8,
						padding: '64px 24px',
						maxWidth: '1248px',
						margin: '0 auto',
					}}
				>
					<Box sx={{ order: 1, ml: 13 }}>
						<Typography>
							SYN CITY is the first ever Mafia Metaverse. The Mafia is simply nothing
							without its members, and for that reason, we are introducing the
							revolutionary MAFIA as a DAO (MaaD) system.
							<br />
							<br /> Players can grind in daily events, PvE, PvP, and Syndicate events
							such as cross-chain Mafia wars. Join a syndicate and run businesses,
							taxing your underlings and paying tribute to your bosses.
						</Typography>
					</Box>
					<Box sx={{ order: 0, width: '492px' }}>
						<video width="492" controls>
							<source src={Video1} type="video/mp4" />
							<source src="movie.ogg" type="video/ogg" />
							Your browser does not support the video tag.
						</video>
					</Box>
				</Box>
			</Box>

			{/* SECOND */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					mt: 8,
					padding: '64px 24px',
					maxWidth: '1248px',
					margin: '0 auto',
				}}
			>
				<Box sx={{ order: 0, mr: 13 }}>
					<Typography>
						SYN CITY is the first ever Mafia Metaverse. The Mafia is simply nothing
						without its members, and for that reason, we are introducing the
						revolutionary MAFIA as a DAO (MaaD) system.
						<br />
						<br /> Players can grind in daily events, PvE, PvP, and Syndicate events
						such as cross-chain Mafia wars. Join a syndicate and run businesses, taxing
						your underlings and paying tribute to your bosses.
					</Typography>
				</Box>
				<Box sx={{ order: 1, width: '492px' }}>
					<video width="492" controls>
						<source src={Video2} type="video/mp4" />
						<source src="movie.ogg" type="video/ogg" />
						Your browser does not support the video tag.
					</video>
				</Box>
			</Box>
			{/* THRID */}
			<Box sx={{ background: 'rgba(0,0,0,0.1)' }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						mt: 8,
						padding: '64px 24px',
						maxWidth: '1248px',
						margin: '0 auto',
					}}
				>
					<Box sx={{ order: 1, ml: 13 }}>
						<Typography>
							SYN CITY is an action-adventure RPG game in which the players acquire,
							manage, trade, and expand members of their syndicate. Climbing to the
							top of SYN CITY won’t be easy, but it will be lucrative and fun!
							<br />
							<br /> Build up your crew and take on other player crews to earn
							reputation and currency with server-authoritative,replayable battles.
						</Typography>
					</Box>
					<Box sx={{ order: 0, width: '492px' }}>
						<video width="492" controls>
							<source src={Video3} type="video/mp4" />
							<source src="movie.ogg" type="video/ogg" />
							Your browser does not support the video tag.
						</video>
					</Box>
				</Box>
			</Box>
			{/* FOUTH */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					mt: 8,
					padding: '64px 24px',
					maxWidth: '1248px',
					margin: '0 auto',
				}}
			>
				<Box sx={{ order: 0, mr: 13 }}>
					<Typography>
						Build your business empire and earn assets by building, owning businesses,
						looting, raiding, trading, farming, borrowing/lending, and other Mafia
						activities. Battle other criminal syndicates for world domination! Fight the
						biggest, baddest, most geared-out criminal syndicates in various PvE, PvP,
						and syndicate events to progress in the metaverse.
					</Typography>
				</Box>
				<Box sx={{ order: 1, width: '492px' }}>
					<video width="492" controls>
						<source src={Video4} type="video/mp4" />
						<source src="movie.ogg" type="video/ogg" />
						Your browser does not support the video tag.
					</video>
				</Box>
			</Box>
			{/* FIFTH */}
			<Box sx={{ background: 'rgba(0,0,0,0.1)' }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						mt: 8,
						padding: '64px 24px',
						maxWidth: '1248px',
						margin: '0 auto',
					}}
				>
					<Box sx={{ order: 1, ml: 13 }}>
						<Typography>
							The Blueprint owners will be able to acquire in-game assets. The
							Blueprints will form the foundation of the in-game assets by providing
							incentives and perks within the SYN CITY ecosystem.
							<br />
							<br /> Blueprint assets will be upgradable through various mechanisms
							including training, modifying, PvE and PvP battles, farming,
							borrowing/lending, and staking and Gacha.
						</Typography>
						<Box mt={3}>
							<ButtonGradient sx={{ width: '140px' }}>
								<Typography>Buy</Typography>
							</ButtonGradient>
						</Box>
					</Box>
					<Box sx={{ order: 0, width: '492px' }}>
						<video width="492" controls>
							<source src={Video5} type="video/mp4" />
							<source src="movie.ogg" type="video/ogg" />
							Your browser does not support the video tag.
						</video>
					</Box>
				</Box>
			</Box>
			{/* Road Map */}
			<Box>
				<img src={RoadMap} alt="" />
			</Box>
			{/* Brand */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					mt: 8,
					padding: '64px 24px',
					maxWidth: '1248px',
					margin: '0 auto',
				}}
			>
				<Box sx={{ order: 2, ml: 13 }}>
					<Typography variant="h4" sx={{ fontWeight: 600 }}>
						Superpower Labs
					</Typography>
					<Typography mt={2}>
						Superpower is a Web3 development, Publishing, and Incubation ecosystem
						building the highest quality and cutting edge ecosystems.
					</Typography>
				</Box>
				<Box sx={{ order: 1, width: '492px' }}>
					<img src={LogoPartner} alt="Logo-Partner" />
				</Box>
			</Box>
		</Box>
	);
}
