/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// components
import InfoAccountUser from 'components/pages/InfoAccount/InfoAccountUser';
import TabInfoAccount from 'components/pages/InfoAccount/TabInfoAccount';
import { IFormEditProfileInputs } from 'components/Form/FormEditProfile';
import LazyImageCustom from 'components/CustomUI/LazyImages/LazyImageCustom';
// mui
import { Box, ClickAwayListener, Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
// slices
import { selectUser } from 'redux/slices/userSlice';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
import {
	selectFilter as selectFilterListOffer,
	setFilter,
	resetAll,
} from 'redux/slices/orderSlice';
// actions
import { updateUser } from 'redux/actions/userAction';
import { fetchListPaymentTokenByChainId } from 'redux/actions/tokenPaymentAction';
import { fetchListOrderOffer, fetchListOrderOfferMade } from 'redux/actions/orderAction';
// styled
import { UserBackground } from './styled';
// model
import { OptionSelectCustom, Response, User } from 'models';
// enum
import { FilterOfferOption } from 'enum';
import uploadApi from 'apis/uploadApi';

import { SizeContext } from 'contexts/SizeObserver';

const filterOptions: OptionSelectCustom<string>[] = [
	{
		name: 'Offer received',
		value: String(FilterOfferOption.OfferReceived),
	},
	{
		name: 'Offer made',
		value: String(FilterOfferOption.OfferMade),
	},
];

function MyInfoAccount() {
	const dispatch = useDispatch();
	const { innerWidth } = useContext(SizeContext);
	const HeightBanner = innerWidth / 4.5;

	// useState
	const [currentFilterOfferOption, setCurrentFilterFilterOfferOption] = useState<
		OptionSelectCustom<string>
	>(filterOptions[0]);
	const [isOpenModalEditProfile, setIsOpenModalEditProfile] = useState<boolean>(false);
	const [viewFull, setViewFull] = useState(false);

	// useSelector
	const userInfo: User | null = useSelector(selectUser);
	const chainId = useSelector(selectChainId);
	const userAddress = useSelector(selectAddress);
	const filterListOffer = useSelector(selectFilterListOffer);

	// useEffect
	// fetch list token payment
	useEffect(() => {
		if (chainId) {
			dispatch(fetchListPaymentTokenByChainId(chainId, executeAfterFetchListTokenPayment));
		}
	}, [chainId]);

	// fetch list order offer
	useEffect(() => {
		if (userAddress && chainId && Object.keys(filterListOffer).length > 0) {
			if (Object.keys(filterListOffer)[0] === 'maker') {
				dispatch(
					fetchListOrderOffer(
						{ ...filterListOffer, asc: '-1', chainId },
						executeAfterFetchListOrderOffer
					)
				);
			} else if (Object.keys(filterListOffer)[0] === 'taker') {
				dispatch(
					fetchListOrderOfferMade(
						{ ...filterListOffer, asc: '-1', chainId },
						executeAfterFetchListOrderOffer
					)
				);
			}
		}

		return () => {
			dispatch(resetAll());
		};
	}, [dispatch, userAddress, chainId, filterListOffer]);

	// setFilter list order offer
	useEffect(() => {
		if (userAddress) {
			if (Number(currentFilterOfferOption.value) === FilterOfferOption.OfferReceived) {
				dispatch(setFilter({ taker: userAddress }));
			} else {
				dispatch(setFilter({ maker: userAddress }));
			}
		}
	}, [userAddress, currentFilterOfferOption]);

	// functions
	const executeAfterFetchListTokenPayment = (globalStateNewest: RootState) => {
		const { tokenPayment } = globalStateNewest;
		if (!tokenPayment.isSuccess) {
			toast.error('Can not fetch list token payment!');
		}
	};

	const executeAfterFetchListOrderOffer = (globalStateNewest: RootState) => {
		const { order } = globalStateNewest;
		if (!order.isSuccess) {
			toast.error('Can not fetch list offer!' + order.errorMessage);
		}
	};

	const onSubmitEditProfile = async (data: IFormEditProfileInputs) => {
		if (!userAddress) return;

		const avatar: any = data.avatar;
		const background: any = data.background;
		let avatarURL: string = '';
		let backgroundURL: string = '';

		try {
			if (typeof avatar === 'string') {
				// if this is string, it's because it is already an image url
				avatarURL = avatar;
			} else {
				const avatarForm = new FormData();
				avatarForm.append('file', avatar.raw);
				const res: Response<any> = await uploadApi.uploadUserMedia(avatarForm, userAddress);
				avatarURL = res.data;
			}

			if (typeof background === 'string') {
				// if this is string, it's because it is already an image url
				backgroundURL = background;
			} else {
				const backgroundForm = new FormData();
				backgroundForm.append('file', background.raw);
				const res: Response<any> = await uploadApi.uploadUserMedia(
					backgroundForm,
					userAddress
				);
				backgroundURL = res.data;
			}

			const executeAfterUpdateUser = (globalStateNewest: RootState) => {
				const { user } = globalStateNewest;

				if (user.isSuccess) {
					toast.success('Update profile success!');
					setIsOpenModalEditProfile(false);
				} else {
					toast.error(user.errorMessage);
				}
			};

			const newData: User = {
				...data,
				avatar: avatarURL,
				background: backgroundURL,
				userAddress,
			};
			// console.log(newData);

			dispatch(updateUser(newData, executeAfterUpdateUser));
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box sx={{ pt: '5px', mt: 12, width: '100%' }}>
			{userAddress && userInfo && (
				<Fragment>
					<UserBackground sx={{ height: HeightBanner }}>
						<LazyImageCustom
							src={userInfo.background}
							alt="user background"
							wrapperPosition="relative"
							type="skeleton"
							imgStyle={{ objectFit: 'cover', width: '100%', height: '100%' }}
							onClick={() => {
								setViewFull(true);
							}}
						/>
					</UserBackground>

					<InfoAccountUser
						infoUser={userInfo}
						modal={isOpenModalEditProfile}
						setModal={setIsOpenModalEditProfile}
						onSubmitEditProfile={onSubmitEditProfile}
					/>

					{viewFull && (
						<Box
							sx={{
								position: 'fixed',
								display: 'block',
								left: 0,
								right: 0,
								top: 0,
								bottom: 0,
								zIndex: 9999,
								background: 'rgba(0,0,0,0.4)',
							}}
						>
							<ClickAwayListener
								onClickAway={(e) => {
									e.stopPropagation();
									if (viewFull) {
										setViewFull(false);
									}
								}}
							>
								<Box
									sx={{
										position: 'absolute',
										left: '50%',
										top: '50%',
										transform: 'translate(-50%, -50%)',
										width: '70%',
										img: {
											width: '100%',
											height: '100%',
										},
									}}
								>
									<img src={userInfo.background} alt="banner" />
								</Box>
							</ClickAwayListener>
						</Box>
					)}
				</Fragment>
			)}
			{/* <Box sx={{ background: '#fff', pt: 2 }}></Box> */}
			<Container maxWidth="xxl" sx={{ mb: 6 }}>
				<TabInfoAccount
					// props for OffersTab
					currentFilterOfferOption={currentFilterOfferOption}
					setCurrentFilterFilterOfferOption={setCurrentFilterFilterOfferOption}
					listFilterOfferOption={filterOptions}
				/>
			</Container>
		</Box>
	);
}

export default MyInfoAccount;
