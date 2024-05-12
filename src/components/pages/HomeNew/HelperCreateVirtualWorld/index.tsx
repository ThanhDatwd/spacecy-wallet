import { Box, Typography, useTheme } from '@mui/material';
import { SizeContext } from 'contexts/SizeObserver';
import React, { useContext } from 'react';
import Robots from 'assets/Home/robots.webp';
import { BoxCoverItem } from '../styled';

const helpStep = [
	{
		id: 1,
		step: 'Step 1',
		description: 'Choose A Metaverse Platform',
	},
	{
		id: 2,
		step: 'Step 2',
		description: 'Design The Metaspace',
	},
	{
		id: 3,
		step: 'Step 3',
		description: 'Build An Interaction Layer',
	},
	{
		id: 4,
		step: 'Step 4',
		description: 'Build An Interoperability Layer',
	},
];
export interface IHelperVirtualWorldProps {}

export default function HelperVirtualWorld(props: IHelperVirtualWorldProps) {
	const { innerWidth } = useContext(SizeContext);
	const theme = useTheme();
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';

	const renderHelper = () => {
		return helpStep.map((step: any, index: number) => (
			<Box
				key={index}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: '8px 0',
				}}
			>
				<Box>
					<Typography
						color="white"
						variant="h6"
						fontWeight="500"
						fontStyle="italic"
						noWrap
						sx={{
							...(theme.palette.mode === 'light' && {
								color: 'rgba(19, 23, 64, 1)',
							}),
						}}
					>
						{step.step}
					</Typography>
				</Box>
				<Box>
					<Typography
						color="white"
						textAlign="center"
						variant="h6"
						fontWeight="500"
						fontStyle="italic"
						noWrap
						sx={{
							...(theme.palette.mode === 'light' && {
								color: 'rgba(19, 23, 64, 1)',
							}),
						}}
					>
						{step.description}
					</Typography>
				</Box>
			</Box>
		));
	};
	return (
		<div
		// style={{
		// 	...(theme.palette.mode === 'light' && {
		// 		background: 'linear-gradient(90deg, #E8D9DF 0%, #EFF2FA 50%, #F2F7F1 100%)',
		// 	}),
		// }}
		>
			<Box pt={0}>
				<Box maxWidth={MaxWidth} mx="auto" mb={8}>
					{theme.palette.mode === 'light' ? (
						<Box mb={4}>
							<Typography
								color="rgba(19, 23, 64, 1)"
								variant="h2"
								textAlign="center"
								fontStyle="italic"
								fontWeight={600}
							>
								Space Internet to Control Robots
							</Typography>
						</Box>
					) : (
						<Box mb={4}>
							<Typography
								color="white"
								variant="h2"
								textAlign="center"
								fontStyle="italic"
								fontWeight={600}
							>
								Space Internet to Control Robots
							</Typography>
						</Box>
					)}

					<Box px={1}>
						<BoxCoverItem
							sx={{
								borderRadius: '12px',
								width: '100%',

								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								gap: 4,
								justifyContent: 'space-between',
								[theme.breakpoints.down(600)]: {
									flexDirection: 'column',
								},
							}}
						>
							<Box
								sx={{
									width: 'calc(100% - 932px)',
									[theme.breakpoints.down(1332)]: {
										width: '350px',
									},
								}}
							>
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
										gap: '36px',
									}}
								>
									{renderHelper()}
								</Box>
							</Box>
							<Box
								sx={{
									width: '900px',
									img: {
										width: '100%',
										height: '620px',
										objectFit: 'cover',
										borderRadius: '20px',
									},
									[theme.breakpoints.down(1332)]: {
										width: '(100% - 350px)',
										img: {
											height: 'auto',
											minHeight: '350px',
										},
									},
									[theme.breakpoints.down(600)]: {
										width: '100%',
										img: {
											minHeight: 'auto',
										},
									},
								}}
							>
								<img src={Robots} alt="Instantly Display Your NFTs" />
							</Box>
						</BoxCoverItem>
					</Box>
				</Box>
			</Box>
		</div>
	);
}
