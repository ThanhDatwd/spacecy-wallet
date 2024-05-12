/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from '@mui/material';
import eventApi from 'apis/eventApi';
import PredictionListCard from 'components/pages/Prediction/PredictionListCard';
import { useIsMounted } from 'hooks';
import React, { useEffect, useState } from 'react';
// selector
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
const PredictionHistoryTab = () => {
	const chainId = useSelector(selectChainId);
	const userAddress = useSelector(selectAddress);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [listEvent, setListEvent] = useState([]);
	const isMounted = useIsMounted();

	const handleGetListEvent = async (chainId: number, userAddress: string) => {
		try {
			setIsLoading(true);
			const response: any = await eventApi.getEventOfUser(chainId, userAddress);
			const listEvent = response.data;

			if (listEvent.length >= 0) {
				setListEvent(listEvent);
				// if (isMounted()) setListEvent([]);
			} else {
				if (isMounted()) setListEvent(listEvent);
			}
		} catch (error) {
			toast.error('Some error occur when getting your events!');
		} finally {
			if (isMounted()) setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!chainId || !userAddress) return;
		handleGetListEvent(chainId, userAddress);
	}, [chainId, userAddress]);

	return (
		<Box>
			<PredictionListCard loading={isLoading} listEvent={listEvent} />
		</Box>
	);
};

export default PredictionHistoryTab;
