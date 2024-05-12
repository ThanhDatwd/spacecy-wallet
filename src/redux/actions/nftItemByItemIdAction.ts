import nftsApi from 'apis/nftsApi';
import { NFT, Response } from 'models';
import { startLoading, hasError, fetchNftItemSuccess } from 'redux/slices/nftItemByItemIdSlice';

export function fetchDetailNftItemById(
	userAddress: string,
	itemId: string,
	MyCallBack: (value: any) => void
) {
	return async (dispatch: any, getState: any) => {
		dispatch(startLoading());
		try {
			const response: Response<NFT> = await nftsApi.getDetailNftItemById({
				itemId: itemId,
				userAddress:
					userAddress ?? '0x00B91B2F8aFE87FCDc2b3fFA9ee2278cd1E4DDf8'.toLowerCase(),
			});
			dispatch(fetchNftItemSuccess(response));
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}
