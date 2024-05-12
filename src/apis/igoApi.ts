import axiosClient from './axiosClient';
import { Response } from 'models';

const igoApi = {
	// Send request IGO
	sendRequestIgo(data: any): Promise<Response<any>> {
		const url = `/INO/request/create`;
		return axiosClient.post(url, data);
	},
	// Get IGO REQUEST ID BY USERADDRESS
	getIdRequestIGOByUserAddress(userAddress: string) {
		const url = `/INO/list/owner/${userAddress}/type/2`;
		return axiosClient.get(url);
	},
	// Get IGO REQUEST DETAIL BY IGO REQUEST ID
	getRequestDetailByIGORequestId(IGOId: string) {
		const url = `/INO/detail/inoId/${IGOId}`;
		return axiosClient.get(url);
	},
	// Send
	sendConfirmIGO() {},
};
export default igoApi;
