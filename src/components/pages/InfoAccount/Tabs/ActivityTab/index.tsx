/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
// component
import HistoryFilter from 'components/pages/CollectionDetail/Tabs/ActivityTab/HistoryFilter';
import InfiniteListActivity from 'components/CustomUI/InfiniteList/InfiniteListActivity';
import ButtonLoadmore from 'components/CustomUI/ButtonLoadmore';
// redux
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectListActivity,
	selectPagination,
	selectFilter,
	selectHasNextPage,
	selectLoading,
	selectInitialState,
	setPagination,
} from 'redux/slices/tradingSlice';
import { resetAll } from 'redux/slices/tradingSlice';
import { selectAddress } from 'redux/slices/web3InfoSlice';
// actions
import { fetchUserHistory } from 'redux/actions/tradingAction';
// models
import { HistoryActivity } from 'models';
// mui
import { Stack, useTheme } from '@mui/material';
// styled
import { FilterWrapper, Wrapper, ListHistory } from './styled';

function ActivityTab() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const { infoAccountAddress } = useParams();
	const otherUserAddress: any = infoAccountAddress;
	const { pathname } = useLocation();
	// useState
	const [allowLoadMore, setAllowLoadMore] = useState<boolean>(false);
	const [fetchNextPage, setFetchNextPage] = useState<boolean>(false);

	// useSelector
	const userAddress = useSelector(selectAddress);
	const listActivity: HistoryActivity[] = useSelector(selectListActivity);
	const pagination = useSelector(selectPagination);
	const filter = useSelector(selectFilter);
	const hasNextPage = useSelector(selectHasNextPage);
	const isLoading = useSelector(selectLoading);

	// vars
	const initialState = selectInitialState;
	// fetchUserHistory isFirstLoad === true
	useEffect(() => {
		if (pathname.includes('other')) {
			dispatch(
				fetchUserHistory(
					otherUserAddress,
					initialState.pagination,
					initialState.filter,
					true,
					executeAfterFetchUserHistory
				)
			);
		} else if (userAddress) {
			dispatch(
				fetchUserHistory(
					userAddress,
					initialState.pagination,
					initialState.filter,
					true,
					executeAfterFetchUserHistory
				)
			);
		}

		//old code
		// if (userAddress) {
		// 	dispatch(
		// 		fetchUserHistory(
		// 			userAddress,
		// 			initialState.pagination,
		// 			initialState.filter,
		// 			true,
		// 			executeAfterFetchUserHistory
		// 		)
		// 	);
		// }
		//main code end
		return () => {
			// need reset redux because UI for sorting is rerendered to the begining
			dispatch(resetAll());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userAddress]);

	// fetchAllNFTs isFirstLoad === false
	useEffect(() => {
		if (pagination.page === 1 && !filter.isFiltering) {
			return;
		}
		if (userAddress) {
			dispatch(
				fetchUserHistory(
					userAddress,
					pagination,
					filter,
					false,
					executeAfterFetchUserHistory
				)
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userAddress, pagination, filter]);

	useEffect(() => {
		if (fetchNextPage) {
			dispatch(setPagination({ ...pagination, page: pagination.page + 1 }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchNextPage]);

	// functions
	const handleFetchNextPage = () => {
		setFetchNextPage(true);
	};

	const executeAfterFetchUserHistory = (globalStateNewest: RootState) => {
		setFetchNextPage(false);
		const { tradeHistory } = globalStateNewest;
		if (!tradeHistory.isSuccess) {
			toast.error('Can not fetch collection history!' + tradeHistory.errorMessage);
		}
	};

	return (
		<>
			<Wrapper>
				<ListHistory>
					<InfiniteListActivity
						listTokenId={listActivity}
						isLoading={isLoading}
						hasNextPage={hasNextPage}
						fetchNextPage={handleFetchNextPage}
						allowLoadMore={allowLoadMore}
					/>
				</ListHistory>

				<FilterWrapper>
					<HistoryFilter />
				</FilterWrapper>
			</Wrapper>

			{!allowLoadMore && hasNextPage && !isLoading && (
				<Stack alignItems="center">
					<ButtonLoadmore onClick={() => setAllowLoadMore(true)} />
				</Stack>
			)}
		</>
	);
}

export default ActivityTab;
