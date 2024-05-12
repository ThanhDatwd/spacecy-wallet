/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
// import {
// 	NFT,
// 	CreateAndUpdateNFTInput,
// 	Collection,
// 	UploadItemResponse,
// 	MintItemInput,
// 	FreezeItemInput,
// 	Response,
// } from 'models';
// import { useLocation, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import './TestDropStyles.css';
// import { FreezeItemAction } from 'redux/actions/OrderAction/freezeItemAction';
import { getWeb3Contract } from 'hooks';
import BoarcDrop from 'abis/BoarcDrop.json';
import { CONTRACT } from '../../constants';
import { parseUnits } from 'utils';
import { BigNumber } from 'ethers';
import { useSelector } from 'react-redux';
import { selectAddress } from 'redux/slices/web3InfoSlice';
import { CreateAndUpdateNFTInput } from '../../models/NFT';
import axiosAuthen from 'apis/axiosAuthen';
import { API_ENDPOINT } from '../../constants';
const TestDrop = () => {
	const userAdd = useSelector(selectAddress);

	let feeMint: number;
	let atomicMatchReceipt: any = {};
	let tracsactionHash: string;
	let itemTokenId: number;
	let nftData: any;
	let dataUrl: string;
	const collectionUrl =
		'http://192.168.0.46:8080/collections/detail/collectionId/6305f8f31e1246a10dd0f30b'; //test
	const mintNftItem = async () => {
		const contractMetaSpacecyDrop = getWeb3Contract(BoarcDrop.abi, CONTRACT[4].BoarcDrop);

		await contractMetaSpacecyDrop.methods
			.feeMint()
			.call()
			.then((res: any) => {
				feeMint = res;
			});
		// await contractMetaSpacecyDrop.methods
		// 	.safeMint()
		// 	.send({ from: userAdd, value: feeMint })
		// 	.then((receipt: any) => {
		// 		atomicMatchReceipt = receipt;
		// 		tracsactionHash = atomicMatchReceipt.transactionHash;
		// 		itemTokenId = atomicMatchReceipt.events.Minted.returnValues.tokenId;
		// 	});
		await contractMetaSpacecyDrop.methods
			.tokenURI(3)
			.call()
			.then((res: any) => {
				dataUrl = res;
				// axiosAuthen.get(res).then((res: any) => {
				// 	nftData = {
				// 		name: res.name,
				// 		description: res.description,
				// 		image: res.image,
				// 	};
				// });

				// const url = '/items/drop';
				// return axiosAuthen.post(url, nftData);
			});
		await axiosAuthen.get(dataUrl).then((infoNft: any) => {
			// console.log(infoNft);
			nftData = {
				itemTokenId: 3,
				itemName: infoNft.name,
				description: infoNft.description,
				itemMedia: infoNft.image,
				itemPreviewMedia: infoNft.image,
				itemOriginMedia: infoNft.image,
				properties: '',
				userAddress: userAdd,
				metadata: dataUrl,
				txHash: '0xa7b97de63d78d63323bea7302776a31bf223254403f74a80af4489e9b4128015',
			};
		});
		await axiosAuthen.get(collectionUrl).then((collectionInfo: any) => {
			nftData = {
				...nftData,
				chainId: collectionInfo.data.chainId,
				collectionId: collectionInfo.data._id,
				price: feeMint,
				priceType: 'eth',
				external_url: '',
				quantity: 1,
				creator: collectionInfo.data.userAddress,
			};
		});
		await axiosAuthen
			.post(`${API_ENDPOINT}items/drop`, nftData)
			.catch((error) => {
				console.log('error ', error);
			});
	};
	// console.log(nftData);
	return (
		<>
			<div className="drop-container">
				<h1>Boarc|Art or Bamboo</h1>
				<p>Create by Hoang Long</p>
			</div>
			<div className="button-container">
				<div className="btn-drop" onClick={mintNftItem}>
					Mint For 0.06eth
				</div>
			</div>
		</>
	);
};

export default TestDrop;
