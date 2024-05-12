/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';

// Model 3D
// @ts-ignore
import Ball from 'assets/Model/Ball/premier-ball/source/Premier Ball.glb';
// @ts-ignore
import AvatarRed from 'assets/Model/Avatar/New/Avatar_space.glb';
// import AvatarRed from 'assets/Model/Avatar/Multi/Avatars_space.glb';
// @ts-ignore
import AvatarBlue from 'assets/Model/Avatar/Blue/avatar-space-blue.glb';
// @ts-ignore
import AvatarGreen from 'assets/Model/Avatar/Blue/Avatar charater green.glb';
// @ts-ignore
import Flyby3 from 'assets/Model/Flyby/flyby.glb';
import FlybyBack from 'assets/Model/Flyby/skflyby.png';
// @ts-ignore
import Wormhole3 from 'assets/Model/Wormhole/wormhole.glb';
import WormholeBack from 'assets/Model/Wormhole/skwormhole.jpeg';
// @ts-ignore
import Box3 from 'assets/Model/Box/box2.glb';
import BoxBack from 'assets/Model/Box/back1.jpeg';
// @ts-ignore
import Sport from 'assets/Model/Sport/sport.glb';
import SportBack from 'assets/Model/Sport/sksport.jpeg';
//

// import Avatar1 from 'assets/Home/boyy.webp';
// import Metaverse from 'assets/Home/metaverse.webp';
// import Wormhole from 'assets/Home/wormhole.webp';
// import Flyby from 'assets/Home/flyby.webp';
// import VirtualEvent from 'assets/Home/event.webp';
// import Marketplace from 'assets/Home/marketplace.webp';
// import VirtualSport from 'assets/Home/virtual-sport.webp';
// import BoxCard from 'assets/Home/box-card.webp';

// Card
import meta from 'assets/Home/card/meta.jpeg';
import meta1 from 'assets/Home/card/meta1.jpeg';
import meta2 from 'assets/Home/card/meta2.jpeg';

import drop1 from 'assets/Home/card/drop1.webp';
import drop from 'assets/Home/card/drop.webp';
import drop2 from 'assets/Home/card/drop2.png';

import avatar from 'assets/Home/card/avatar.png';
import avatar1 from 'assets/Home/card/avatar1.png';
import avatar2 from 'assets/Home/card/avatar2.png';

import nft2 from 'assets/Home/card/nft2.webp';
import nft from 'assets/Home/card/nft.webp';
import nft1 from 'assets/Home/card/nft1.webp';

//
import CustomSliderButton from 'components/CustomUI/CustomSliderButton';
import { Box, fabClasses, Stack, Typography, useTheme } from '@mui/material';
import { LinkWrapper } from 'components/CustomUI/Card/NFTItemCard/styled';
import SizeObserver, { SizeContext } from 'contexts/SizeObserver';
import { BoxModelWrapper, CardRef } from './styled';
import bglight from 'assets/Home/BG1.webp';
import {
	PATH_CATEGORY,
	PATH_DROP,
	PATH_MARKETPLACE,
	PATH_VIRTUAL_WORLD,
	PATH_VIEWALL,
} from '../../../../routes/path';
import { textGradient } from 'components/Theme/CustomStyled';

// Inter face Model viewer
declare global {
	namespace JSX {
		interface IntrinsicElements {
			'model-viewer': React.DetailedHTMLProps<any, HTMLElement>;
		}
	}
}

// const ListNav = [
// 	{
// 		id: 1,
// 		title: 'Avatars Space',
// 		image: Avatar1,
// 		content:
// 			'Customize your own 3D Avatar as your virtual body for a fully immersive experience in the virtual world. Get a chance to earn by trading your NFT Avatar on the Marketplace of Metaspacecy!',
// 		isList: false,
// 		isModel: false,
// 		modelLink: '',
// 		exposure: 1,
// 		isBackground: false,
// 		background3D: '',
// 		buttonName: 'Create',
// 		buttonLink: `${PATH_VIRTUAL_WORLD.virtualWorld}`,
// 	},
// 	{
// 		id: 2,
// 		title: 'NFT Marketplace',
// 		image: Marketplace,
// 		content:
// 			'Free mint, buy and sell NFTs from diverse collections in a borderless trading world using an efficient p2p solution and exhibit your NFTs esp. 3D NFTs in Metaspacecy’s virtual spaces to approach global customers.',
// 		isList: false,
// 		isModel: false,
// 		modelLink: '',
// 		exposure: '',
// 		isBackground: false,
// 		background3D: '',
// 		buttonName: 'Explore',
// 		buttonLink: `/#${PATH_MARKETPLACE.root}`,
// 	},
// 	{
// 		id: 3,
// 		title: 'Metaverse',
// 		image: Metaverse,
// 		content:
// 			'Explore and teleport between countless virtual spaces with only an NFT Avatar. Anything in the real world can be found vivid and lively in this metaverse.',
// 		isList: false,
// 		isModel: false,
// 		modelLink: '',
// 		exposure: '',
// 		isBackground: false,
// 		background3D: '',
// 		buttonName: 'Explore',
// 		buttonLink: `${PATH_VIRTUAL_WORLD.virtualWorld}`,
// 	},
// 	{
// 		id: 4,
// 		title: 'Mystery Box',
// 		image: '',
// 		content:
// 			'9999 Mystery Boxes will be dropped on the NFT Marketplace of Metaspacecy for you to unlock and earn random rewards as in-game assets to trade or use in our Flybys or many other games.',
// 		isList: false,
// 		isModel: true,
// 		modelLink: Box3,
// 		exposure: '',
// 		isBackground: true,
// 		background3D: BoxBack,
// 		// background3D: '',
// 		buttonName: 'Explore',
// 		buttonLink: `/#${PATH_MARKETPLACE.root}`,
// 	},
// 	{
// 		id: 5,
// 		title: 'Wormhole',
// 		image: Wormhole,
// 		content:
// 			'Wormholes are a special solution for travelling across different virtual worlds or upgrading items. Besides, wormholes can navigate users to suitable spaces based on their identity when entering.',
// 		isList: false,
// 		isModel: false,
// 		modelLink: Wormhole3,
// 		exposure: '',
// 		isBackground: false,
// 		background3D: WormholeBack,
// 		buttonName: 'Explore',
// 		buttonLink: `/#${PATH_MARKETPLACE.root}`,
// 	},
// 	{
// 		id: 6,
// 		title: 'Flybys',
// 		image: Flyby,
// 		content:
// 			'Developed by Metaspacecy, Flybys is a 3D game with the concept of exploring the countless spaces in the universe. The game not only allows players to fully immerse themselves in the virtual world but also offers chances to earn from trading in-game items.',
// 		isList: false,
// 		isModel: true,
// 		modelLink: Flyby3,
// 		exposure: 1,
// 		isBackground: true,
// 		background3D: FlybyBack,
// 		buttonName: 'Explore',
// 		buttonLink: '',
// 	},
// 	{
// 		id: 7,
// 		title: 'Virtual Events',
// 		image: VirtualEvent,
// 		content:
// 			'The demand for online meeting and socialising have been increasing since the outbreak of COVID-19. Virtual events are where users can regardless of physical barriers, meet and interact in a new and more attractive way that is closer to real-life experience.',
// 		isList: false,
// 		isModel: false,
// 		modelLink: '',
// 		exposure: '',
// 		isBackground: false,
// 		background3D: '',
// 		buttonName: 'Explore',
// 		buttonLink: `${PATH_VIRTUAL_WORLD.virtualEvent}`,
// 	},
// 	{
// 		id: 8,
// 		title: 'Virtual Sport',
// 		image: VirtualSport,
// 		content:
// 			'Apart from experiencing sports matches in the virtual world, Metaspacecy holds a wide range of related activities for you to join, have fun and earn rewards.',
// 		isList: false,
// 		isModel: true,
// 		modelLink: Sport,
// 		exposure: 3,
// 		isBackground: true,
// 		background3D: SportBack,
// 		buttonName: 'Explore',
// 		buttonLink: `${PATH_VIRTUAL_WORLD.virtualSport}`,
// 	},
// 	{
// 		id: 9,
// 		title: 'Flybys',
// 		image: Flyby,
// 		content:
// 			'Developed by Metaspacecy, Flybys is a 3D game with the concept of exploring the countless spaces in the universe. The game not only allows players to fully immerse themselves in the virtual world but also offers chances to earn from trading in-game items.',
// 		isList: false,
// 		isModel: false,
// 		modelLink: Flyby3,
// 		exposure: '',
// 		isBackground: false,
// 		background3D: '',
// 		buttonName: 'Explore',
// 		buttonLink: '',
// 	},
// ];

const listCard = [
	{
		id: 1,
		title: 'NFT Marketplace',
		cards: [
			{
				id: 1,
				title: 'Ethereum ',
				image: nft,
				content:
					"Ethereum is a leading network among other blockchains, the first choice for NFT creators because of its highly-secure network and data architecture. Ethereum-based NFT marketplaces help users increase market reach for NFTs with high visibility to more people. Let's explore our NFTs Marketplace on Ethereum.",
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `/#${PATH_VIEWALL.root}`,
				target: '',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
			{
				id: 2,
				title: 'BNB Chain',
				image: nft1,
				content:
					"BNB Chain is an independently operated blockchain with high security and safety in transactions, which is the perfect alternative to the Ethereum network for NFT creators with low gas fees. Let's explore our NFTs Marketplace on BNB Chain.",
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `/#${PATH_CATEGORY.root}`,
				target: '',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
			{
				id: 3,
				title: 'Aptos Network',
				image: nft2,
				content:
					"Aptos is a trending network that uses the Move programming language with the ability to manage and verify resources securely on the blockchain against cyber attacks. Aptos-based NFT marketplaces help NFT creators increase transaction speed with low gas fees and high security. Let's explore our NFTs Marketplace on Aptos.",
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: 'http://aptos.metaspacecy.com/',
				target: '_blank',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
		],
	},
	{
		id: 2,
		title: 'Drop',
		cards: [
			{
				id: 1,
				title: 'Live Drop',
				image: drop,
				content:
					'Live Drop is where you can join to have a chance to own unique NFTs in the first sale from famous artists.',
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `/#${PATH_DROP.root}`,
				target: '',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
			{
				id: 2,
				title: 'Upcoming',
				image: drop1,
				content:
					'Upcoming is where you have to complete all tasks like the conditions of these and then you just wait for the first sale NFTs.',
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `/#${PATH_DROP.root}`,
				target: '',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
			{
				id: 3,
				title: 'Active',
				image: drop2,
				content:
					'Active is where you can review the first sale of NFTs in the recent drops.',
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `/#${PATH_DROP.root}`,
				target: '',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
		],
	},
	{
		id: 3,
		title: 'Avatar Space',
		cards: [
			{
				id: 1,
				title: 'Haibara',
				image: avatar,
				content: `I'm Haibara. I love adventure and discovering new things. Let's explore virtual worlds in Metaspacecy with me. 
					`,
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `${PATH_VIRTUAL_WORLD.root}`,
				target: '_blank',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
			{
				id: 2,
				title: 'Alice',
				image: avatar1,
				content: `Hi, I'm Alice an energetic teenage girl. With an optimistic spirit, I am always looking for new things in life to experience and have true feelings. Let's have an immersive experience at Metaspacecy with me.`,
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `${PATH_VIRTUAL_WORLD.root}`,
				target: '_blank',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
			{
				id: 3,
				title: 'Tom',
				image: avatar2,
				content: `Hi, I'm Tom an active teenage boy with a huge love for sports activities. I love to experience daily entertainment activities with the integration of disruptive technology. Let's have an immersive experience at Metaspacecy with me.`,
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `${PATH_VIRTUAL_WORLD.root}`,
				target: '_blank',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
		],
	},
	{
		id: 4,
		title: 'Virtual Space',
		cards: [
			{
				id: 1,
				title: 'Time Square',
				image: meta,
				content:
					"The Metaspacecy's virtual Times Square is where you can enjoy the actual space of the New York Times Square, which has realistic interactive experiences.",
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `${PATH_VIRTUAL_WORLD.virtualWorld}`,
				target: '_blank',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
			{
				id: 2,
				title: 'Art Gallery',
				image: meta1,
				content: `The Metaspacecy's virtual art gallery is where you can find art NFT collections displayed in the most vivid 3D way, which has never been done before.`,
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `${PATH_VIRTUAL_WORLD.virtualArt}`,
				target: '_blank',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
			{
				id: 3,
				title: 'Meeting Room',
				image: meta2,
				content: `The Metaspacecy's virtual meeting is where you can make use of 3D tools and technology to express and exchange ideas with each other in a more lively way with amazing experiences.`,
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `${PATH_VIRTUAL_WORLD.virtualEvent}`,
				target: '_blank',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
		],
	},
	// {
	// 	id: 5,
	// 	title: 'Metaverse',
	// 	cards: [
	// 		{
	// 			id: 1,
	// 			title: 'Time Square',
	// 			image: meta,
	// 			content:
	// 				"Create your own custom 3D Avatar and explore virtual worlds with one consistent identity. It's your passport to the Metaverse.",
	// 			isModel: false,
	// 			modelLink: '',
	// 			buttonName: 'Explore',
	// 			buttonLink: '',
	// 			exposure: '',
	// 			isBackground: false,
	// 			background3D: '',
	// 		},
	// 		{
	// 			id: 2,
	// 			title: 'Art Gallery',
	// 			image: meta1,
	// 			content:
	// 				'Buy and sell your NFT items in the marketplace using an efficient P2P solution.',
	// 			isModel: false,
	// 			modelLink: '',
	// 			buttonName: 'Explore',
	// 			buttonLink: '',
	// 			exposure: '',
	// 			isBackground: false,
	// 			background3D: '',
	// 		},
	// 		{
	// 			id: 3,
	// 			title: 'Meeting Room',
	// 			image: meta2,
	// 			content:
	// 				'The Metaverse contains countless virtual worlds to explore. The Metaverse can contain entire worlds due to the fact that it’s a boundless 3D universe with Metaspacecy',
	// 			isModel: false,
	// 			modelLink: '',
	// 			buttonName: 'Explore',
	// 			buttonLink: '',
	// 			exposure: '',
	// 			isBackground: false,
	// 			background3D: '',
	// 		},
	// 	],
	// },
];

const listCardTablet = [
	{
		id: 1,
		title: 'NFT Marketplace',
		cards: [
			{
				id: 2,
				title: 'BNB Chain',
				image: nft1,
				content:
					"BNB Chain is an independently operated blockchain with high security and safety in transactions, which is the perfect alternative to the Ethereum network for NFT creators with low gas fees. Let's explore our NFTs Marketplace on BNB Chain.",
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `/#${PATH_CATEGORY.root}`,
				target: '',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
			{
				id: 3,
				title: 'Aptos Network',
				image: nft2,
				content:
					"Aptos is a trending network that uses the Move programming language with the ability to manage and verify resources securely on the blockchain against cyber attacks. Aptos-based NFT marketplaces help NFT creators increase transaction speed with low gas fees and high security. Let's explore our NFTs Marketplace on Aptos.",
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: 'http://aptos.metaspacecy.com/',
				target: '_blank',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
		],
	},
	{
		id: 2,
		title: 'Drop',
		cards: [
			{
				id: 1,
				title: 'Live Drop',
				image: drop,
				content:
					'Live Drop is where you can join to have a chance to own unique NFTs in the first sale from famous artists.',
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `/#${PATH_DROP.root}`,
				target: '',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
			{
				id: 2,
				title: 'Upcoming',
				image: drop1,
				content:
					'Upcoming is where you have to complete all tasks like the conditions of these and then you just wait for the first sale NFTs.',
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `/#${PATH_DROP.root}`,
				target: '',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
		],
	},
	{
		id: 3,
		title: 'Avatar Space',
		cards: [
			{
				id: 1,
				title: 'Haibara',
				image: avatar,
				content: `I'm Haibara. I love adventure and discovering new things. Let's explore virtual worlds in Metaspacecy with me. 
					`,
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `${PATH_VIRTUAL_WORLD.root}`,
				target: '_blank',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
			{
				id: 2,
				title: 'Alice',
				image: avatar1,
				content: `Hi, I'm Alice an energetic teenage girl. With an optimistic spirit, I am always looking for new things in life to experience and have true feelings. Let's have an immersive experience at Metaspacecy with me.`,
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `${PATH_VIRTUAL_WORLD.root}`,
				target: '_blank',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
		],
	},
	{
		id: 4,
		title: 'Virtual Space',
		cards: [
			{
				id: 1,
				title: 'Time Square',
				image: meta,
				content:
					"The Metaspacecy's virtual Times Square is where you can enjoy the actual space of the New York Times Square, which has realistic interactive experiences.",
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `${PATH_VIRTUAL_WORLD.virtualWorld}`,
				target: '_blank',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
			{
				id: 2,
				title: 'Art Gallery',
				image: meta1,
				content: `The Metaspacecy's virtual art gallery is where you can find art NFT collections displayed in the most vivid 3D way, which has never been done before.`,
				isModel: false,
				modelLink: '',
				buttonName: 'Explore',
				buttonLink: `${PATH_VIRTUAL_WORLD.virtualArt}`,
				target: '_blank',
				exposure: '',
				isBackground: false,
				background3D: '',
			},
		],
	},
	// {
	// 	id: 5,
	// 	title: 'Metaverse',
	// 	cards: [
	// 		{
	// 			id: 1,
	// 			title: 'Time Square',
	// 			image: meta,
	// 			content:
	// 				"Create your own custom 3D Avatar and explore virtual worlds with one consistent identity. It's your passport to the Metaverse.",
	// 			isModel: false,
	// 			modelLink: '',
	// 			buttonName: 'Explore',
	// 			buttonLink: '',
	// 			exposure: '',
	// 			isBackground: false,
	// 			background3D: '',
	// 		},
	// 		{
	// 			id: 2,
	// 			title: 'Art Gallery',
	// 			image: meta1,
	// 			content:
	// 				'Buy and sell your NFT items in the marketplace using an efficient P2P solution.',
	// 			isModel: false,
	// 			modelLink: '',
	// 			buttonName: 'Explore',
	// 			buttonLink: '',
	// 			exposure: '',
	// 			isBackground: false,
	// 			background3D: '',
	// 		},
	// 		{
	// 			id: 3,
	// 			title: 'Meeting Room',
	// 			image: meta2,
	// 			content:
	// 				'The Metaverse contains countless virtual worlds to explore. The Metaverse can contain entire worlds due to the fact that it’s a boundless 3D universe with Metaspacecy',
	// 			isModel: false,
	// 			modelLink: '',
	// 			buttonName: 'Explore',
	// 			buttonLink: '',
	// 			exposure: '',
	// 			isBackground: false,
	// 			background3D: '',
	// 		},
	// 	],
	// },
];

const ListNav = [
	{
		id: 1,
		titlePrimary: 'NFT Marketplace',
		title: 'Ethereum Chain',
		image: nft,
		content:
			"The Metaspacecy's collectibles are where you can discover and collect the collections of your favorite artists.",
		isModel: false,
		modelLink: '',
		buttonName: 'Explore',
		buttonLink: `/#${PATH_VIEWALL.collections}`,
		target: '',
		exposure: '',
		isBackground: false,
		background3D: '',
	},
	{
		id: 2,
		titlePrimary: 'NFT Marketplace',
		title: 'BNB Chain',
		image: nft1,
		content: 'Buy and sell your NFT items in the marketplace using an efficient P2P solution.',
		isModel: false,
		modelLink: '',
		buttonName: 'Explore',
		buttonLink: `/#${PATH_CATEGORY.art}`,
		target: '',
		exposure: '',
		isBackground: false,
		background3D: '',
	},
	{
		id: 3,
		titlePrimary: 'NFT Marketplace',
		title: 'Aptos Chain',
		image: nft2,
		content:
			'The Metaverse contains countless virtual worlds to explore. The Metaverse can contain entire worlds due to the fact that it’s a boundless 3D universe with Metaspacecy',
		isModel: false,
		modelLink: '',
		buttonName: 'Explore',
		buttonLink: `/#${PATH_CATEGORY.sport}`,
		target: '',
		exposure: '',
		isBackground: false,
		background3D: '',
	},
	{
		id: 4,
		titlePrimary: 'Drop',
		title: 'Live Drop',
		image: drop,
		content:
			'Live Drop is where you can join to have a chance to own unique NFTs in the first sale from famous artists.',
		isModel: false,
		modelLink: '',
		buttonName: 'Explore',
		buttonLink: `/#${PATH_DROP.root}`,
		target: '',
		exposure: '',
		isBackground: false,
		background3D: '',
	},
	{
		id: 5,
		titlePrimary: 'Drop',
		title: 'Upcoming',
		image: drop1,
		content:
			'Upcoming is where you have to complete all tasks like the conditions of these and then you just wait for the first sale NFTs.',
		isModel: false,
		modelLink: '',
		buttonName: 'Explore',
		buttonLink: `/#${PATH_DROP.root}`,
		target: '',
		exposure: '',
		isBackground: false,
		background3D: '',
	},
	{
		id: 6,
		titlePrimary: 'Drop',
		title: 'Active',
		image: drop2,
		content: 'Active is where you can review the first sale of NFTs in the recent drops. ',
		isModel: false,
		modelLink: '',
		buttonName: 'Explore',
		buttonLink: `/#${PATH_DROP.root}`,
		target: '',
		exposure: '',
		isBackground: false,
		background3D: '',
	},
	{
		id: 7,
		titlePrimary: 'Avatar Space',
		title: 'Haibara',
		image: avatar,
		content:
			"I'm Haibara. I love adventure and discovering new things. Let's explore virtual worlds in Metaspacecy with me.",
		isModel: false,
		modelLink: '',
		buttonName: 'Explore',
		buttonLink: `${PATH_VIRTUAL_WORLD.root}`,
		target: '_blank',
		exposure: '',
		isBackground: false,
		background3D: '',
	},
	{
		id: 8,
		titlePrimary: 'Avatar Space',
		title: 'Alice',
		image: avatar1,
		content:
			"Hi, I'm Alice an energetic teenage girl. With an optimistic spirit, I am always looking for new things in life to experience and have true feelings. Let's have an immersive experience at Metaspacecy with me.",
		isModel: false,
		modelLink: '',
		buttonName: 'Explore',
		buttonLink: `${PATH_VIRTUAL_WORLD.root}`,
		target: '_blank',
		exposure: '',
		isBackground: false,
		background3D: '',
	},
	{
		id: 9,
		titlePrimary: 'Avatar Space',
		title: 'Tom',
		image: avatar2,
		content:
			"Hi, I'm Tom an active teenage boy with a huge love for sports activities. I love to experience daily entertainment activities with the integration of disruptive technology. Let's have an immersive experience at Metaspacecy with me.",
		isModel: false,
		modelLink: '',
		buttonName: 'Explore',
		buttonLink: `${PATH_VIRTUAL_WORLD.root}`,
		target: '_blank',
		exposure: '',
		isBackground: false,
		background3D: '',
	},
	{
		id: 10,
		titlePrimary: 'Virtual Space',
		title: 'Time Square',
		image: meta,
		content:
			"The Metaspacecy's virtual Times Square is where you can enjoy the actual space of the New York Times Square, which has realistic interactive experiences.",
		isModel: false,
		modelLink: '',
		buttonName: 'Explore',
		buttonLink: `${PATH_VIRTUAL_WORLD.virtualWorld}`,
		target: '_blank',
		exposure: '',
		isBackground: false,
		background3D: '',
	},
	{
		id: 11,
		titlePrimary: 'Virtual Space',
		title: 'Art Gallery',
		image: meta1,
		content:
			"The Metaspacecy's virtual art gallery is where you can find art NFT collections displayed in the most vivid 3D way, which has never been done before.",
		isModel: false,
		modelLink: '',
		buttonName: 'Explore',
		buttonLink: `${PATH_VIRTUAL_WORLD.virtualArt}`,
		target: '_blank',
		exposure: '',
		isBackground: false,
		background3D: '',
	},
	{
		id: 12,
		titlePrimary: 'Virtual Space',
		title: 'Meeting Room',
		image: meta2,
		content:
			"The Metaspacecy's virtual meeting is where you can make use of 3D tools and technology to express and exchange ideas with each other in a more lively way with amazing experiences.",
		isModel: false,
		modelLink: '',
		buttonName: 'Explore',
		buttonLink: `${PATH_VIRTUAL_WORLD.virtualEvent}`,
		target: '_blank',
		exposure: '',
		isBackground: false,
		background3D: '',
	},
];

export interface ICardHeaderProps {}

const HeighCardFirstLine = '300px';
const HeighCardSecondLine = '400px';
const HeightCardCoverflow = '550px';

export default function CardHeader(props: ICardHeaderProps) {
	const theme = useTheme();
	const { innerWidth } = useContext(SizeContext);

	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const listItem = () => {
		return ListNav.map((tag: any, index: number) => (
			<Box key={index}>
				<Typography
					variant="h2"
					fontWeight="600"
					textAlign="center"
					mb={4}
					sx={{
						[theme.breakpoints.down(768)]: {
							mb: 3,
						},
						[theme.breakpoints.down(480)]: {
							mb: 2,
						},
					}}
				>
					{tag.titlePrimary}
				</Typography>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: '1fr',
						columnGap: '16px',
					}}
				>
					<CardRef>
						<BoxModelWrapper
							onClick={(e) => {
								e.preventDefault();
							}}
						>
							{tag.isModel ? (
								<model-viewer
									id="mv-demo"
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										height: '100%',
										width: '100%',
										borderRadius: '20px',
										background: 'rgba(157, 195, 230, 0.45)',
									}}
									shadow-intensity="1"
									src={tag.modelLink}
									// skybox-image={tag.background3D !== '' ? tag.background3D : 'none'}
									alt="A 3D model"
									auto-rotate
									exposure={tag.exposure === '' ? 1 : tag.exposure}
									shadow-softness={1}
									camera-controls
									poster=""
									controller
									{...(tag.isBackground
										? { 'skybox-image': tag.background3D }
										: {})}
								></model-viewer>
							) : (
								<img
									src={tag.image}
									alt={tag.title}
									style={{
										borderRadius: '16px',
										objectFit: 'cover',
										objectPosition: 'center center',
										height: '100%',
										position: 'absolute',
										left: '50%',
										transform: 'translateX(-50%)',
									}}
								/>
							)}
						</BoxModelWrapper>
						<Box sx={{ mt: 2 }}>
							<Typography
								sx={{
									userSelect: 'none',
									fontSize: '28px',
									fontWeight: 500,
									...(theme.palette.mode === 'light' && {
										color: 'rgba(19, 23, 64, 1)',
									}),
									[theme.breakpoints.down(828)]: {
										fontSize: '20px',
									},
								}}
								color="white"
								textAlign="center"
								fontStyle="italic"
							>
								{tag.title}
							</Typography>
						</Box>
						<Box
							sx={{
								mt: 2,
								'@media (max-height: 1024px)': {
									mt: 1.5,
								},
							}}
						>
							<Typography
								className="webkit"
								color="white"
								display="-webkit-box"
								fontStyle="italic"
								sx={{
									WebkitBoxOrient: 'vertical',
									WebkitLineClamp: '4',
									overflow: 'hidden',
									userSelect: 'none',
									...(theme.palette.mode === 'light' && {
										color: 'rgba(19, 23, 64, 1)',
									}),
									[theme.breakpoints.down(828)]: {
										fontSize: '14px',
									},
									'@media (max-height: 1024px)': {
										WebkitLineClamp: '3',
									},
								}}
							>
								{tag.content}
							</Typography>
						</Box>
						<Box
							sx={{
								width: '120px',
								height: '40px',
								marginLeft: 'auto',
								position: 'absolute',
								bottom: '24px',
								right: '24px',
								background: 'rgba(255,255,255,0.1)',
								backdropFilter: 'blur(3px)',
								borderRadius: '8px',
								padding: '8px',
								transition: 'all ease 0.5s',
								':hover': {
									background: 'rgba(157, 195, 230, 0.6)',
									borderColor: 'rgba(157, 195, 230, 0.6)',
								},
								...(theme.palette.mode === 'light'
									? {
											border: '1px solid rgba(19, 23, 64, 1)',
									  }
									: {
											border: '1px solid #fff',
									  }),
								[theme.breakpoints.down(828)]: {
									padding: '8px 0 0',
								},
							}}
						>
							<LinkWrapper href={tag.buttonLink} target={tag.target}>
								<Box>
									<Typography
										sx={{
											// userSelect: 'none',
											[theme.breakpoints.down(828)]: {
												fontSize: '14px',
											},
										}}
										textAlign="center"
										fontStyle="italic"
									>
										{tag.buttonName}
									</Typography>
								</Box>
							</LinkWrapper>
						</Box>
						{tag.buttonName1 && (
							<Box
								sx={{
									width: '120px',
									height: '40px',
									marginLeft: 'auto',
									position: 'absolute',
									bottom: '24px',
									right: '160px',
									background: 'rgba(255,255,255,0.1)',
									backdropFilter: 'blur(3px)',
									borderRadius: '8px',
									padding: '8px',
									transition: 'all ease 0.5s',
									':hover': {
										background: 'rgba(157, 195, 230, 0.6)',
										borderColor: 'rgba(157, 195, 230, 0.6)',
									},
									...(theme.palette.mode === 'light'
										? {
												border: '1px solid rgba(19, 23, 64, 1)',
										  }
										: {
												border: '1px solid #fff',
										  }),
									[theme.breakpoints.down(828)]: {
										padding: '8px 0 0',
									},
								}}
							>
								<LinkWrapper href={tag.buttonLink1} target={tag.target}>
									<Box>
										<Typography
											sx={{
												// userSelect: 'none',
												[theme.breakpoints.down(828)]: {
													fontSize: '14px',
												},
											}}
											textAlign="center"
											fontStyle="italic"
										>
											{tag.buttonName1}
										</Typography>
									</Box>
								</LinkWrapper>
							</Box>
						)}
					</CardRef>
				</Box>
			</Box>
		));
	};

	const renderCard = () => {
		return listCard.map((item) => {
			return (
				<Box key={item.id}>
					<Typography
						variant="h2"
						fontWeight="600"
						textAlign="center"
						mb={4}
						sx={{
							[theme.breakpoints.down(768)]: {
								mb: 3,
							},
							[theme.breakpoints.down(480)]: {
								mb: 2,
							},
						}}
					>
						{item.title}
					</Typography>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr 1fr',
							columnGap: '16px',
						}}
					>
						{item.cards.map((tag) => {
							return (
								<Box key={tag.id}>
									<CardRef>
										<BoxModelWrapper>
											{tag.isModel ? (
												<model-viewer
													id="mv-demo"
													style={{
														position: 'absolute',
														top: 0,
														left: 0,
														borderRadius: '20px',
														background: 'rgba(157, 195, 230, 0.45)',
													}}
													shadow-intensity="1"
													src={tag.modelLink}
													// skybox-image={tag.background3D !== '' ? tag.background3D : 'none'}
													alt="A 3D model"
													auto-rotate
													exposure={
														tag.exposure === '' ? 1 : tag.exposure
													}
													shadow-softness={1}
													camera-controls
													poster=""
													controller
													{...(tag.isBackground
														? { 'skybox-image': tag.background3D }
														: {})}
												></model-viewer>
											) : (
												<img
													src={tag.image}
													alt={tag.title}
													style={{
														borderRadius: '16px',
														objectFit: 'cover',
														objectPosition: 'center center',
														height: '100%',
														position: 'absolute',
														left: '50%',
														transform: 'translateX(-50%)',
													}}
												/>
											)}
										</BoxModelWrapper>
										<Box sx={{ mt: 2 }}>
											<Typography
												sx={{
													userSelect: 'none',
													fontSize: '28px',
													fontWeight: 500,
													...(theme.palette.mode === 'light' && {
														color: 'rgba(19, 23, 64, 1)',
													}),
													[theme.breakpoints.down(828)]: {
														fontSize: '20px',
													},
												}}
												color="white"
												textAlign="center"
												fontStyle="italic"
											>
												{tag.title}
											</Typography>
										</Box>
										<Box
											sx={{
												mt: 2,
												'@media (max-height: 1024px)': {
													mt: 1.5,
												},
											}}
										>
											<Typography
												className="webkit"
												color="white"
												display="-webkit-box"
												fontStyle="italic"
												sx={{
													WebkitBoxOrient: 'vertical',
													WebkitLineClamp: '4',
													overflow: 'hidden',
													userSelect: 'none',
													...(theme.palette.mode === 'light' && {
														color: 'rgba(19, 23, 64, 1)',
													}),
													[theme.breakpoints.down(828)]: {
														fontSize: '14px',
													},
													'@media (max-width: 1500px)': {
														WebkitLineClamp: '3',
													},
												}}
											>
												{tag.content}
											</Typography>
										</Box>
										<Box
											sx={{
												width: '120px',
												height: '40px',
												marginLeft: 'auto',
												position: 'absolute',
												bottom: '24px',
												right: '24px',
												background: 'rgba(255,255,255,0.1)',
												backdropFilter: 'blur(3px)',
												borderRadius: '8px',
												padding: '8px',
												transition: 'all ease 0.5s',
												':hover': {
													background: 'rgba(157, 195, 230, 0.6)',
													borderColor: 'rgba(157, 195, 230, 0.6)',
												},
												...(theme.palette.mode === 'light'
													? {
															border: '1px solid rgba(19, 23, 64, 1)',
													  }
													: {
															border: '1px solid #fff',
													  }),
												[theme.breakpoints.down(828)]: {
													padding: '8px 0 0',
												},
											}}
										>
											<LinkWrapper href={tag.buttonLink} target={tag.target}>
												<Box>
													<Typography
														sx={{
															// userSelect: 'none',
															[theme.breakpoints.down(828)]: {
																fontSize: '14px',
															},
														}}
														textAlign="center"
														fontStyle="italic"
													>
														{tag.buttonName}
													</Typography>
												</Box>
											</LinkWrapper>
										</Box>
										{/* {tag.buttonName && (
											<Box
												sx={{
													width: '120px',
													height: '40px',
													marginLeft: 'auto',
													position: 'absolute',
													bottom: '24px',
													right: '160px',
													background: 'rgba(255,255,255,0.1)',
													backdropFilter: 'blur(3px)',
													borderRadius: '8px',
													padding: '8px',
													transition: 'all ease 0.5s',
													':hover': {
														background: 'rgba(157, 195, 230, 0.6)',
														borderColor: 'rgba(157, 195, 230, 0.6)',
													},
													...(theme.palette.mode === 'light'
														? {
																border: '1px solid rgba(19, 23, 64, 1)',
														  }
														: {
																border: '1px solid #fff',
														  }),
													[theme.breakpoints.down(828)]: {
														padding: '8px 0 0',
													},
												}}
											>
												<LinkWrapper href={tag.buttonLink}>
													<Box>
														<Typography
															sx={{
																userSelect: 'none',
																[theme.breakpoints.down(828)]: {
																	fontSize: '14px',
																},
															}}
															textAlign="center"
															fontStyle="italic"
														>
															{tag.buttonName}
														</Typography>
													</Box>
												</LinkWrapper>
											</Box>
										)} */}
									</CardRef>
								</Box>
							);
						})}
					</Box>
				</Box>
			);
		});
	};

	const renderCardTablet = () => {
		return listCardTablet.map((item) => {
			return (
				<Box key={item.id}>
					<Typography
						variant="h2"
						fontWeight="600"
						textAlign="center"
						mb={4}
						sx={{
							[theme.breakpoints.down(768)]: {
								mb: 3,
							},
							[theme.breakpoints.down(480)]: {
								mb: 2,
							},
						}}
					>
						{item.title}
					</Typography>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							columnGap: '16px',
						}}
					>
						{item.cards.map((tag) => {
							return (
								<Box key={tag.id}>
									<CardRef>
										<BoxModelWrapper
											onClick={(e) => {
												e.preventDefault();
											}}
										>
											{tag.isModel ? (
												<model-viewer
													id="mv-demo"
													style={{
														position: 'absolute',
														top: 0,
														left: 0,
														borderRadius: '20px',
														background: 'rgba(157, 195, 230, 0.45)',
													}}
													shadow-intensity="1"
													src={tag.modelLink}
													// skybox-image={tag.background3D !== '' ? tag.background3D : 'none'}
													alt="A 3D model"
													auto-rotate
													exposure={
														tag.exposure === '' ? 1 : tag.exposure
													}
													shadow-softness={1}
													camera-controls
													poster=""
													controller
													{...(tag.isBackground
														? { 'skybox-image': tag.background3D }
														: {})}
												></model-viewer>
											) : (
												<img
													src={tag.image}
													alt={tag.title}
													style={{
														borderRadius: '16px',
														objectFit: 'cover',
														objectPosition: 'center center',
														height: '100%',
														position: 'absolute',
														left: '50%',
														transform: 'translateX(-50%)',
													}}
												/>
											)}
										</BoxModelWrapper>
										<Box sx={{ mt: 2 }}>
											<Typography
												sx={{
													userSelect: 'none',
													fontSize: '28px',
													fontWeight: 500,
													...(theme.palette.mode === 'light' && {
														color: 'rgba(19, 23, 64, 1)',
													}),
													[theme.breakpoints.down(828)]: {
														fontSize: '20px',
													},
												}}
												color="white"
												textAlign="center"
												fontStyle="italic"
											>
												{tag.title}
											</Typography>
										</Box>
										<Box
											sx={{
												mt: 2,
												'@media (max-height: 1024px)': {
													mt: 1.5,
												},
											}}
										>
											<Typography
												className="webkit"
												color="white"
												display="-webkit-box"
												fontStyle="italic"
												sx={{
													WebkitBoxOrient: 'vertical',
													WebkitLineClamp: '4',
													overflow: 'hidden',
													userSelect: 'none',
													...(theme.palette.mode === 'light' && {
														color: 'rgba(19, 23, 64, 1)',
													}),
													[theme.breakpoints.down(828)]: {
														fontSize: '14px',
													},
													'@media (max-width: 1500px)': {
														WebkitLineClamp: '3',
													},
												}}
											>
												{tag.content}
											</Typography>
										</Box>
										<Box
											sx={{
												width: '120px',
												height: '40px',
												marginLeft: 'auto',
												position: 'absolute',
												bottom: '24px',
												right: '24px',
												background: 'rgba(255,255,255,0.1)',
												backdropFilter: 'blur(3px)',
												borderRadius: '8px',
												padding: '8px',
												transition: 'all ease 0.5s',
												':hover': {
													background: 'rgba(157, 195, 230, 0.6)',
													borderColor: 'rgba(157, 195, 230, 0.6)',
												},
												...(theme.palette.mode === 'light'
													? {
															border: '1px solid rgba(19, 23, 64, 1)',
													  }
													: {
															border: '1px solid #fff',
													  }),
												[theme.breakpoints.down(828)]: {
													padding: '8px 0 0',
												},
											}}
										>
											<LinkWrapper href={tag.buttonLink} target={tag.target}>
												<Box>
													<Typography
														sx={{
															// userSelect: 'none',
															[theme.breakpoints.down(828)]: {
																fontSize: '14px',
															},
														}}
														textAlign="center"
														fontStyle="italic"
													>
														{tag.buttonName}
													</Typography>
												</Box>
											</LinkWrapper>
										</Box>
										{/* {tag.buttonName && (
											<Box
												sx={{
													width: '120px',
													height: '40px',
													marginLeft: 'auto',
													position: 'absolute',
													bottom: '24px',
													right: '160px',
													background: 'rgba(255,255,255,0.1)',
													backdropFilter: 'blur(3px)',
													borderRadius: '8px',
													padding: '8px',
													transition: 'all ease 0.5s',
													':hover': {
														background: 'rgba(157, 195, 230, 0.6)',
														borderColor: 'rgba(157, 195, 230, 0.6)',
													},
													...(theme.palette.mode === 'light'
														? {
																border: '1px solid rgba(19, 23, 64, 1)',
														  }
														: {
																border: '1px solid #fff',
														  }),
													[theme.breakpoints.down(828)]: {
														padding: '8px 0 0',
													},
												}}
											>
												<LinkWrapper href={tag.buttonLink}>
													<Box>
														<Typography
															sx={{
																userSelect: 'none',
																[theme.breakpoints.down(828)]: {
																	fontSize: '14px',
																},
															}}
															textAlign="center"
															fontStyle="italic"
														>
															{tag.buttonName}
														</Typography>
													</Box>
												</LinkWrapper>
											</Box>
										)} */}
									</CardRef>
								</Box>
							);
						})}
					</Box>
				</Box>
			);
		});
	};

	return (
		<div
			style={{
				...(theme.palette.mode === 'light' && {
					background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
				}),
				padding: '0 10px',
			}}
		>
			<Box
				pt={8}
				px={4}
				sx={{
					maxWidth: MaxWidth,
					margin: '0 auto',
					[theme.breakpoints.down(1500)]: {
						maxWidth: '1300px',
					},
					[theme.breakpoints.down(1358)]: {
						maxWidth: '1000px',
					},
					[theme.breakpoints.down(828)]: {
						maxWidth: '500px',
					},
					[theme.breakpoints.down(768)]: {
						pt: 4,
						px: 2,
					},
					[theme.breakpoints.down(480)]: {
						pt: 2,
					},
				}}
			>
				{innerWidth > 1357 ? (
					<CustomSliderButton
						delay={15000}
						slidesPerView={1}
						loop={true}
						spaceBetween={12}
						// slidesPerGroup={innerWidth < 1358 ? 1 : 3}
						slidesPerGroup={1}
						centeredSlides={false}
						slidesToShowPoint1358={1}
						slidesToShowPoint1093={1}
						slidesToShowPoint828={1}
						slidesToShowPoint547={1}
						slidesToShowPoint320={1}
						slidesToShowPoint0={1}
						renderItem={renderCard()}
					/>
				) : (
					<CustomSliderButton
						delay={18000}
						slidesPerView={1}
						loop={true}
						spaceBetween={12}
						// slidesPerGroup={innerWidth < 1358 ? 1 : 3}
						slidesPerGroup={1}
						centeredSlides={false}
						slidesToShowPoint1358={1}
						slidesToShowPoint1093={1}
						slidesToShowPoint828={1}
						slidesToShowPoint547={1}
						slidesToShowPoint320={1}
						slidesToShowPoint0={1}
						renderItem={innerWidth > 827 ? renderCardTablet() : listItem()}
					/>
				)}
			</Box>
		</div>
	);
}
