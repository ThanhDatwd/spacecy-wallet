/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
//lib
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import schemaAuction from '../components/Form/FormCreateAuction/schema';
import { BigNumber } from 'ethers';
import { erc20function } from 'utils';
import { toast } from 'react-toastify';
//model
import { OptionSelectCustom, Response, TokenPayment } from 'models';
import { INO, INODetail } from 'models/Auction';
//redux
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchListPaymentTokenByChainId } from 'redux/actions/tokenPaymentAction';
import { resetAll, selectInitialState } from 'redux/slices/collectionSlice';
import { selectAddress, selectChainId, selectCurrentProvider } from 'redux/slices/web3InfoSlice';
import auctionApi from 'apis/auctionApi';
import FieldInputC from '../components/CustomField/FieldInput/index';
import { selectListTokenPayment } from 'redux/slices/tokenPaymentSlice';
//interface
export interface IFormCreateAuctionInputs {
	inoId: string;
	listItemId: string;
	minPrice: number;
	paymentToken: string;
	startTime: number;
	endTime: number;
	nameINO: string;
	descriptionINO: string;
	bidIncreasePercent: number;
	listItemTokenId: string;
}
export interface INewData {
	inoId: string;
	listItemId: string;
	minPrice: string;
	paymentToken: string;
	startTime: number;
	endTime: number;
	nameINO: string;
	descriptionINO: string;
	bidIncreasePercent: number;
	listItemTokenId: string;
	// collectionId : number;
}
interface Selected {
	itemId: string;
	itemName: string;
	itemMedia?: string;
	itemTokenId?: string;
}
const useCreateAuction = () => {
	const dispatch = useAppDispatch();
	const userAddress = useAppSelector(selectAddress);
	const chainId = useAppSelector(selectChainId);
	const web3Info = useAppSelector(selectCurrentProvider);
	const [inoId, setInoId] = useState<any>();
	const [listData, setListData] = useState<INODetail>();
	const [dataForm, setDataForm] = useState<INewData | null>(null);
	const [modalState, setModalState] = useState(false);
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [itemName, setItemName] = useState<string>('');
	const [selected, setSelected] = useState<Selected[]>([]);
	const [arrItemSelected, setArrItemSelected] = useState<any>([]);
	const [currentToken, setCurrentToken] = useState<
		OptionSelectCustom<string> | null | undefined
	>();
	const [errorOfferMessage, setErrorOfferMessage] = useState<string>('');
	const [offerPrice, setOfferPrice] = useState<number>(0);
	const listTokenPayment: TokenPayment[] = useAppSelector(selectListTokenPayment);
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<IFormCreateAuctionInputs>({
		resolver: yupResolver(schemaAuction),
	});
	const onSubmit = async (data: IFormCreateAuctionInputs) => {
		let priceToWei: BigNumber;
		if (data.paymentToken === '0x0000000000000000000000000000000000000000') {
			priceToWei = BigNumber.from((data.minPrice * 10 ** 18).toString());
		} else {
			try {
				priceToWei = await erc20function().changeTokenToWei(
					data.paymentToken,
					data.minPrice
				);
				const dataSend = {
					...data,
					minPrice: String(priceToWei),
				};
				setModalState(true);
				setDataForm(dataSend);
			} catch (error: any) {
				// toast.error(error.message);
				setModalState(false);
			}
		}
	};
	const handleSubmitForm = () => {
		handleSubmit(onSubmit);
	};
	// Handle filter By Name Item
	const handleFilterByName = (e: any) => {
		const value = e.target.value;
		setItemName(value);
	};
	const handleClickOption = (id: string, name: string, media: string, itemToken: string) => {
		const selectedCollection: Selected | undefined = selected.find(
			(item: Selected) => item.itemId === id
		);

		if (!selectedCollection) {
			// option is not selected => select
			const newSelectedItem: Selected = {
				itemId: id,
				itemName: name,
				itemMedia: media,
				itemTokenId: itemToken,
			};
			setSelected([...selected, newSelectedItem]);
			setArrItemSelected((oldArray: any) => [...oldArray, newSelectedItem]);
		} else {
			// option is selected => remove
			setSelected(selected.filter((item: Selected) => item.itemId !== id));
			setArrItemSelected(arrItemSelected.filter((item: any) => item.itemId !== id));
		}
	};
	const handleRemoveItem = (e: any) => {
		setSelected(selected.filter((item: Selected) => item.itemId !== e));
		setArrItemSelected(arrItemSelected.filter((item: any) => item.itemId !== e));
	};
	// Handle field token Payment
	const handleChangePaymentToken = (
		currentPaymentToken: OptionSelectCustom<string> | null | undefined
	) => {
		if (currentPaymentToken) {
			// console.log('currentTokenPayment', currentPaymentToken);
			setCurrentToken(currentPaymentToken);
			// console.log('currentPaymentToken', currentPaymentToken);
			setValue('paymentToken', currentPaymentToken.value);
		} else {
			setCurrentToken(undefined);
		}
	};
	const handleOnChangeOfferPrice = (e: any) => {
		const newOfferPrice = Number(e.target.value);
		if (newOfferPrice <= 0) {
			setErrorOfferMessage('Offer price must be greater then 0');
		} else if (newOfferPrice < 0.001) {
			setErrorOfferMessage('Offer price too low! Min price is 0.001!');
		} else {
			setErrorOfferMessage('');
		}
		setOfferPrice(newOfferPrice);
	};
	let listPaymentTokenTransformed: OptionSelectCustom<string>[] = listTokenPayment.map(
		(tokenPayment: TokenPayment) => ({
			name: tokenPayment.symbol,
			value: tokenPayment.address,
			image: tokenPayment.logoURI,
		})
	);
	//useEffect
	// Fetch list INO
	useEffect(() => {
		(async () => {
			if (userAddress) {
				const res: Response<INO> = await auctionApi.getInoIdByUserAdd(userAddress);
				setInoId(res.data);
			}
		})();

		return () => {
			dispatch(resetAll());
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, userAddress, chainId]);
	// Fetch ino detail
	useEffect(() => {
		(async () => {
			if (inoId && inoId.length > 0) {
				const res: Response<any> = await auctionApi.getInoDetailByInoId(inoId[0]._id);
				setListData(res.data);
			}
		})();

		return () => {
			// dispatch(resetAll());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, inoId]);
	//end
	return {
		handleSubmitForm,
		register,
		setValue,
		listData,
		activeDropDown,
		setActiveDropDown,
		handleClickOption,
		selected,
		itemName,
		handleFilterByName,
		listPaymentTokenTransformed,
		currentToken,
		handleChangePaymentToken,
		handleOnChangeOfferPrice,
	};
};

export default useCreateAuction;
