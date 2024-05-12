/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import CustomSliderCoverflow from 'components/CustomUI/CustomSliderCoverflow';
import { BoxTitleWrapper } from 'pages/HomeNew/styled';
import EX1 from 'assets/Home/EX1.png';
import EX2 from 'assets/Home/EX2.png';
import EX3 from 'assets/Home/EX3.png';
import ItemImg1 from 'assets/Test/ape.jpeg';
import ItemImg2 from 'assets/Test/item-img.jpeg';
import AvatarApe from 'assets/Test/avatar.png';
import IconSun from 'assets/icons/icon-sun.svg';

// @ts-ignore
import Flyby3 from 'assets/Model/Flyby/flyby.glb';
import FlybyBack from 'assets/Model/Flyby/skflyby.png';
// @ts-ignore
import AvatarRed from 'assets/Model/Avatar/Red/Avatar charater red.glb';
import { toast } from 'react-toastify';
import { LinkWrapper } from 'components/CustomUI/Card/NFTItemCard/styled';

export interface ITestUIProps {}
const ListCoverFlow = [
	{
		id: 1,
		itemName: 'Etherium NFT Launching Lab',
		itemImg: ItemImg2,
		avatar: AvatarApe,
		userName: 'Test',
		link: '',
		class: '',
	},
	{
		id: 2,
		itemName: 'Virtual Meeting',
		itemImg: ItemImg1,
		avatar: AvatarApe,
		userName: 'Test',
		link: '',
		class: '',
	},
	{
		id: 3,
		itemName: 'Virtual Concert',
		itemImg: ItemImg2,
		avatar: AvatarApe,
		userName: 'Test',
		link: '',
		class: '',
	},
	{
		id: 4,
		itemName: 'Virtual Concert',
		itemImg: ItemImg1,
		avatar: AvatarApe,
		userName: 'Test',
		link: '',
		class: '',
	},
	{
		id: 5,
		itemName: 'Virtual Concert',
		itemImg: ItemImg2,
		avatar: AvatarApe,
		userName: 'Test',
		link: '',
		class: '',
	},
	{
		id: 6,
		itemName: 'Virtual Concert',
		itemImg: ItemImg1,
		avatar: AvatarApe,
		userName: 'Test',
		link: '',
		class: '',
	},
	{
		id: 7,
		itemName: 'Virtual Concert',
		itemImg: ItemImg2,
		avatar: AvatarApe,
		userName: 'Test',
		link: '',
		class: '',
	},
	{
		id: 3,
		itemName: 'Virtual Concert',
		itemImg: ItemImg1,
		avatar: AvatarApe,
		userName: 'Test',
		link: '',
		class: '',
	},
];
const HeightCardCoverflow = '400px';
export default function TestUI(props: ITestUIProps) {
	const theme = useTheme();
	const RenderListCoverflow = () => {
		return ListCoverFlow.map((item: any, index: number) => (
			<LinkWrapper
				key={index}
				href={item.link}
				className={item.class === '' ? '' : item.class}
			>
				<Box
					sx={{
						background: 'rgba(177, 218, 255, 0.45)',
						borderRadius: '16px',
						overflow: 'hidden',
					}}
				>
					<Box sx={{ height: HeightCardCoverflow }}>
						<img
							src={item.itemImg}
							alt={item.title}
							style={{
								// borderRadius: '16px',
								objectFit: 'cover',
								width: '100%',
								height: '100%',
							}}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							padding: '12px 8px',
							gap: '12px',
						}}
					>
						<Box
							sx={{
								borderRadius: '50%',
								width: '48px',
								height: '48px',
								overflow: 'hidden',
							}}
						>
							<img src={item.avatar} alt={item.itemName} />
						</Box>
						<Box>
							<Box>
								<Typography>{item.itemName}</Typography>
							</Box>
							<Box>
								<Typography fontSize="12px" fontWeight={600}>
									{item.userName}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</LinkWrapper>
		));
	};
	let modelViewerVariants = document.querySelector('model-viewer#character');
	const select = document.querySelector('#variant');

	useEffect(() => {
		if (modelViewerVariants === null) return;
		modelViewerVariants.addEventListener('load', () => {
			// @ts-ignore
			const names = modelViewerVariants.availableVariants;
			for (const name of names) {
				const option = document.createElement('option');
				option.value = name;
				option.textContent = name;
				// @ts-ignore
				select.appendChild(option);
			}
			// Adds a default option.
			const option = document.createElement('option');
			option.value = 'default';
			option.textContent = 'Default';
			// @ts-ignore
			select.appendChild(option);
		});
		// @ts-ignore
		// select.addEventListener('input', (event) => {
		// 	if (!event || event === null) return;
		// 	// @ts-ignore
		// 	modelViewerVariants.variantName =
		// 		event?.target.value === 'default' ? null : event?.target.value;
		// });
	}, [modelViewerVariants, select]);

	return (
		<Box>
			<Box mt={14} maxWidth="1000px" mx="auto">
				<h1>Hello</h1>
				<Box py={8} height="800px" position="relative">
					<model-viewer
						id="character"
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							height: '100%',
							width: '100%',
						}}
						shadow-intensity="1"
						src={AvatarRed}
						// skybox-image={tag.background3D !== '' ? tag.background3D : 'none'}
						alt="A 3D model"
						auto-rotate
						camera-controls
						poster=""
						controller
					>
						<div className="controls">
							<div>
								Variant: <select id="variant"></select>
							</div>
						</div>
					</model-viewer>
				</Box>
			</Box>
		</Box>
	);
}
