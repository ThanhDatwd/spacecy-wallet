import { dispatch, getState } from 'redux/store';
import {
	startLoading,
	hasError,
	getUserSuccess,
	updateUserSuccess,
	getOtherUserInfoSuccess,
	logOutUserSuccess,
} from 'redux/slices/userSlice';
import userApi from 'apis/userApi';
import { Response, User } from 'models';

export function loginUser(
	userAddress: string,
	signature: string,
	secret: any = undefined,
	MyCallBack?: Function
) {
	return async () => {
		dispatch(startLoading());
		// try {
		const response: Response<User> = await userApi.loginUser(userAddress, signature, secret);
		dispatch(getUserSuccess(response));
		// }
		// } catch (error) {
		// 	console.log('unauthor');
		// 	dispatch(hasError(error));
		// 	throw error;
		// } finally {
		// 	if (MyCallBack) MyCallBack(getState());
		// }
	};
}

export function getOtherUserInfo(userAddress: string, MyCallBack?: Function) {
	return async () => {
		dispatch(startLoading());
		try {
			const response: Response<User> = await userApi.getUserByAddress(userAddress);
			dispatch(getOtherUserInfoSuccess(response));
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}

export function updateUser(data: User, MyCallBack?: Function) {
	return async () => {
		dispatch(startLoading());
		try {
			const response: Response<User> = await userApi.updateUser(data);
			dispatch(updateUserSuccess(response));
		} catch (error: any) {
			dispatch(hasError(error.message));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}

export function logoutUser(userAddress: string, MyCallBack?: Function) {
	return async () => {
		dispatch(startLoading());
		try {
			await userApi.logoutUser(userAddress);
			dispatch(logOutUserSuccess());
		} catch (error: any) {
			dispatch(hasError(error.message));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}
