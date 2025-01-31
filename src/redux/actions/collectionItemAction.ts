/* eslint-disable @typescript-eslint/no-unused-vars */
import { FilterNft, ListParams, ListResponse } from 'models';
import nftsApi from 'apis/nftsApi';
import { dispatch, getState } from 'redux/store';
import {
	startLoading,
	hasError,
	fetchCollectionItemSuccess,
	fetchCollectionItemFirstLoadSuccess,
	setHasNextPage,
} from 'redux/slices/collectionItemSlice';
import { checkHasNextPage } from 'utils';

export function fetchNFTsByCollectionId(
	collectionId: string,
	collectionChainId: number,
	paginationParams: ListParams,
	filter: FilterNft | {},
	isFetchFirstLoad: boolean,
	MyCallBack?: Function
) {
	return async () => {
		dispatch(startLoading());
		try {
			const tempFilter: FilterNft | {} = {
				...filter,
				collectionId: [collectionId],
				chainId: [collectionChainId],
			};
			const response: ListResponse<any> = await nftsApi.getListTokenIdTest(paginationParams, {
				...tempFilter,
			});

			const { pagination } = response;
			const check: boolean = checkHasNextPage(pagination.currentPage, pagination.totalPages);

			dispatch(setHasNextPage(check));

			if (isFetchFirstLoad) {
				dispatch(fetchCollectionItemFirstLoadSuccess(response));
			} else {
				dispatch(fetchCollectionItemSuccess(response));
			}
		} catch (error: any) {
			dispatch(hasError(error.message));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}
