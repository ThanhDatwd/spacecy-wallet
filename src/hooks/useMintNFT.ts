/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_ENDPOINT, CONTRACT } from '../constants';
import BoarcDrop from '../abis/BoarcDrop.json';
import { NftMint } from 'models';
import { useEffect, useState } from 'react';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
import { getWeb3Contract } from './getWeb3Contract';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { startLoading, hasError, successBuy, finishBuy } from '../redux/slices/mintNftSlice';
//redux
import {
	selectOpenModal,
	openModalBuy,
	closeModalBuy,
	resetState,
} from 'redux/slices/mintNftSlice';
import { selectConnectModal, setConnectModal } from 'redux/slices/modalSlice';
import { toast } from 'react-toastify';
const baseURL = 'collections';
const baseURL1 = 'items';
const useMintNFT = (contract?: any) => {
	const [didMinted, setDidMinted] = useState(false);
	const dispatch = useAppDispatch();
	const openModal = useAppSelector(selectOpenModal);
	const currentChainId = useAppSelector(selectChainId);
	const userAddress = useAppSelector(selectAddress);
	const [infoDrop, setInfoDrop] = useState({
		feeMint: '0',
	});
	let atomicMatchReceipt: any = {};
	let tracsactionHash: string;
	let itemTokenId: string;
	let nftData: NftMint;
	let dataUrl: string;
	const toggleModal = (id: string) => {
		if (openModal) {
			dispatch(closeModalBuy());
			dispatch(resetState());
			dispatch(finishBuy(false));
			setDidMinted(false);
		} else {
			dispatch(openModalBuy(id));
		}
	};
	const isConnectWallet = async (id: string) => {
		if (userAddress) {
			toggleModal(id);
		} else {
			toast.error('please connect your wallet');
			dispatch(setConnectModal(true));
		}
	};
	const getInfoDrop = async () => {
		await contract.methods
			.feeMint()
			.call()
			.then((res: any) => {
				setInfoDrop((prev) => ({ ...prev, feeMint: res }));
			})
			.catch((error: any) => {
				console.log(error);
			});
	};
	const updateInfoNft = async (data: any, amount: any, id: any) => {
		const dataUpdate = {
			collectionId: data.Collection.info.collectionId,
			productId: id,
			availableItem: data.Collection.info.item[Number(id) - 1].availableItem - Number(amount),
			userAddress: userAddress,
			itemTokenId: data.Collection.info.item[Number(id) - 1].itemTokenId,
		};
		try {
			await axios.put(`${API_ENDPOINT}${baseURL1}/drop`, dataUpdate);
			dispatch(successBuy());
		} catch (error) {
			console.log(error);
			dispatch(hasError(error));
		}
	};
	const createItemAfterMint = async (id: string, data: any) => {
		let infoNftUrl: string;
		try {
			infoNftUrl = await contract.methods
				.tokenURI(id)
				.call()
				.then((res: any) => {
					// console.log(res);
					return res;
				});
			await axios.get(infoNftUrl).then((infoNft: any) => {
				nftData = {
					chainId: currentChainId,
					collectionId: data.Collection.info.collectionId,
					price: infoDrop.feeMint,
					priceType: 'eth',
					external_url: '',
					quantity: 1,
					creator: data.Collection.createrInfo.userAddress,
					itemTokenId: itemTokenId,
					itemName: infoNft.data.name,
					description: infoNft.data.description,
					itemMedia: infoNft.data.image,
					itemPreviewMedia: infoNft.data.image,
					itemOriginMedia: infoNft.data.image,
					properties: '',
					userAddress: userAddress,
					metadata: infoNftUrl,
					txHash: tracsactionHash,
					standard: data.Collection.info.ERC,
				};
			});
			await axios.post(`${API_ENDPOINT}items/drop`, nftData);
			dispatch(successBuy());
		} catch (error) {
			console.log(error);
			dispatch(hasError(error));
		}
	};

	const mintNftItem = async (id: any, amount: any, dataCollection: any) => {
		dispatch(startLoading());
		setDidMinted(true);
		dispatch(finishBuy(true));
		try {
			await contract.methods
				.claim(id, amount)
				.send({ from: userAddress, value: infoDrop.feeMint })
				.then((res: any) => {
					atomicMatchReceipt = res;
					tracsactionHash = res.events.Claimed.transactionHash;
					itemTokenId = res.events.Claimed.returnValues.id;
				});
			// console.log('itemTokenId ' + itemTokenId);

			await updateInfoNft(dataCollection, amount, id);
		} catch (error) {
			console.log(error);
			dispatch(hasError(error));
		}
		return;
	};
	const mintNftItem721 = async (dataCollection: any) => {
		dispatch(startLoading());
		setDidMinted(true);
		dispatch(finishBuy(true));
		try {
			await contract.methods
				.claim()
				.send({ from: userAddress, value: infoDrop.feeMint })
				.then((receipt: any) => {
					atomicMatchReceipt = receipt;
					tracsactionHash = atomicMatchReceipt.transactionHash;
					itemTokenId = atomicMatchReceipt.events.Minted.returnValues.tokenId;
				});

			await createItemAfterMint(itemTokenId, dataCollection);
		} catch (error) {
			console.log(error);
			dispatch(hasError(error));
		}
		return;
	};
	useEffect(() => {
		getInfoDrop();
	}, []);
	useEffect(() => {}, [infoDrop]);
	return {
		mintNftItem,
		getInfoDrop,
		mintNftItem721,
		didMinted,
		isConnectWallet,
		toggleModal,
		infoDrop,
	};
};
export default useMintNFT;
