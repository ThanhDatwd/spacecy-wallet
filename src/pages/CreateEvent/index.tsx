/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';
import Loading from 'components/CustomUI/LoadingPage';

//mui
import { Container } from '@mui/material';
//components
//redux
import { RootState } from 'redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { selectAddress, selectChainId, selectBalance } from 'redux/slices/web3InfoSlice';
import { fetchListPaymentTokenByChainId } from 'redux/actions/tokenPaymentAction';

//Contract funtion
import { Collection, Response } from 'models';
import collectionApi from 'apis/collectionApi';
import uploadApi from 'apis/uploadApi';
import { PATH_COLLECTION, PATH_PREDICTION } from 'routes/path';
import FormCreateEvent from 'components/Form/FormCreateEvent';
import { PredictionContractFunction } from 'utils/contract/predictionContractFunction';
import eventApi from 'apis/eventApi';
import { AccessControls, hasAdminRoleData } from 'utils/contract/AccesControls';

export interface CreateCollectionProps {}

export default function CreateEvent(props: CreateCollectionProps) {
	const { pathname } = useLocation();
	const isEdit = pathname.includes('edit');
	let { collectionId } = useParams();
	const navigate = useNavigate();
	const { isAbleCreateEvent } = AccessControls();

	const [event, setEvent] = useState<Collection>();
	const [loading, setLoading] = useState<boolean>(false);
	const [eventQuestion, setEventQuestion] = useState<string>('');
	const [oldEventQuestion, setOldEventQuestion] = useState<string>('');
	const [existed, setExisted] = useState<boolean>(false);
	const [loadingCheckName, setLoadingCheckName] = useState<boolean>(false);
	const [listCategory, setListCategory] = useState<any>([]);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	//selector
	const userAddress = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);
	//  contract funtion
	const { createEvent } = PredictionContractFunction();

	// fetch Collection by id
	const dispatch = useDispatch();

	const onSubmit = async (data: any) => {
		const dataCreateEvent = {
			description: data?.description,
			answers: data.options,
			creatorFee: data.creatorFee,
			startTime: data.startTime,
			payment: data.paymentToken,
			endTime: data.endTime,
			extraTime: data.duration,
		};
		if (userAddress) {
			try {
				// GỌI API UPLOAD HÌNH ẢNH
				const backgroudForm = new FormData();
				backgroudForm.append('file', data.background.raw);

				await eventApi
					.uploadBackgroundEvent(backgroudForm)
					.then(async (backgroudUpload: any) => {
						if (backgroudUpload.data) {
							console.log('background form:', backgroudUpload.data);
							const result = await createEvent(chainId, userAddress, dataCreateEvent);
							if (result) {
								const event = result?.events?.CreatedEvent.returnValues;
								const dataPost = {
									...dataCreateEvent,
									category: data.category,
									imgUrl: backgroudUpload.data.result,
									creator: event.creator,
									txHash: result.transactionHash,
									eventId: Number(event.eventId),
									extraTime: Number(data.duration),
									payment: event.payment,
									chainId,
								};
								const e = await eventApi.createEvent(dataPost);
								if (e) {
									toast.success('Create an event successfully');
									navigate(`${PATH_PREDICTION.root}`);
								}
							}
						}
					});
				// console.log(t);
			} catch (error) {
				toast.error('Have some error please try again');
			}
		} else {
			toast.error('Please connect with wallet to make this feature');
		}
	};
	// Check collection nam already existed
	const checkExistEventQuestion = (value: any) => {
		if (value === '') {
			setExisted(false);
		}
		setEventQuestion(value);
	};
	// fetch list payment token
	const executeAfterFetchListTokenPayment = (globalStateNewest: RootState) => {
		const { tokenPayment } = globalStateNewest;
		if (!tokenPayment.isSuccess) {
			toast.error('Can not fetch list token payment!');
		}
	};
	useEffect(() => {
		if (eventQuestion === '' || (isEdit && eventQuestion === oldEventQuestion)) return;
		(async () => {
			setLoadingCheckName(true);
			const res: Response<any> = await eventApi.checkExistQuestion(eventQuestion, chainId);
			setExisted(res.data);
			setLoadingCheckName(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chainId, eventQuestion]);
	useEffect(() => {
		if (chainId) {
			// console.log(chainId);
			dispatch(fetchListPaymentTokenByChainId(chainId, executeAfterFetchListTokenPayment));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chainId]);
	useEffect(() => {
		if (!chainId || userAddress === null) return;
		(async () => {
			const data: hasAdminRoleData = {
				chainId,
				userAddress,
			};
			const status = await isAbleCreateEvent(data);
			if (status === false) {
				navigate('/404');
				return;
			}
			setIsAdmin(status);
		})();
	}, [chainId, userAddress]);

	return (
		<>
			{isAdmin === true ? (
				<Container sx={{ mt: 14 }}>
					{loading ? (
						<Loading />
					) : (
						<FormCreateEvent
							isEdit={isEdit}
							onSubmit={onSubmit}
							currentEvent={event}
							checkExistEventQuestion={checkExistEventQuestion}
							existed={existed}
							loadingCheckName={loadingCheckName}
						/>
					)}
				</Container>
			) : (
				<Container sx={{ mt: 14 }}>
					<Loading />
				</Container>
			)}
		</>
	);
}
