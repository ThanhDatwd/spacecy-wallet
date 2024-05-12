/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_ENDPOINT } from 'constants/index';
import Web3 from 'web3';
import { toast } from 'react-toastify';
// utils
import { getRandomUint40, localStorageCustom } from 'utils';
// redux
import { dispatch } from 'redux/store';
import { removeUserLogin } from 'redux/slices/web3InfoSlice';
// models
import { AuthSignature } from 'models';
import data from '@iconify/icons-eva/close-circle-fill';
import { loginUser } from 'redux/actions/userAction';

const web3 = new Web3(Web3.givenProvider);
const MESSAGE =
	'Welcome to Metaspacecy looks forward to providing an innovative NFT solution for all of savvy hodlers to create a mutual community and become a future destination in the NFT decentralised world.\nNonce: ';

const axiosAuthen = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
	},
});

declare module 'axios' {
	export interface AxiosRequestConfig {
		_retry?: boolean;
	}
}

// Add a request interceptor
axiosAuthen.interceptors.request.use(
	async function (config: AxiosRequestConfig) {
		// Do something before request is sent

		// get wallet address and chainId
		const userAddress = await web3.eth.getAccounts();
		const chainId = await web3.eth.getChainId();

		// get auth signature from localStorage
		let authSignature: AuthSignature | null | undefined;
		// if (userAddress[0])
		// 	authSignature = localStorageCustom.getAuthSignatureByUserAddress(
		// 		userAddress[0].toLowerCase()
		// 	);

		config.data = {
			...config.data,
			chainId: chainId ?? 4,
		};
		config.headers = {
			...config.headers,
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		};
		return config;
	},
	function (error: any) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosAuthen.interceptors.response.use(
	function (response: AxiosResponse) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	async function (error: AxiosError) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		const originalConfig: AxiosRequestConfig = error.config;
		console.log('authen error', error);
		// error "Not Authenticate" or "Signature Expired"
		if (
			(error.response?.status === 451 || error.response?.status === 401) &&
			!originalConfig._retry
		) {
			try {
				originalConfig._retry = true; // prevent infinite loop

				// get wallet address and chainId
				const userAddress = await web3.eth.getAccounts();
				const chainId = await web3.eth.getChainId();
				userAddress[0] = userAddress[0].toLowerCase();
				const newSignatureMessageHash = `${MESSAGE}${getRandomUint40()}`;
				const newSignature = await web3.eth.personal.sign(
					newSignatureMessageHash,
					userAddress[0],
					''
				);
				//fetch login after sign
				dispatch(loginUser(userAddress[0], newSignature, newSignatureMessageHash));
				// assign new auth signature to localStorage

				// refresh signature
				// await axiosAuthen.post(`users/refreshSignature`, {
				// 	userAddress: userAddress[0],
				// 	chainId: chainId,
				// });

				originalConfig.data = {
					...JSON.parse(originalConfig.data),
					signature: newSignature,
					secret: newSignatureMessageHash,
					chainId: chainId ?? 4,
				};

				return error; // call back request have been failed
			} catch (error: any) {
				console.log(error);
				toast.error(error.message);
				dispatch(removeUserLogin());
			}
		}

		return Promise.reject(error);
	}
);

export default axiosAuthen;
