import {
	// Collection,
	// ListParams,
	Response,
	createEvent,
	predictEvent,
	resovleEvent,
	redeemEvent,
} from 'models';
// import axiosAuthen from './axiosAuthen';
import axiosClient from './axiosClient';
import axiosAuthen from './axiosAuthen';

const eventApi = {
	checkExistQuestion(collectionName: string, chainId: number): Promise<Response<any>> {
		const url = `/collections/checkName`;
		return axiosAuthen.post(url, { collectionName, chainId });
	},
	getListEvent(chainId: number, query: string = '') {
		const url = `events/?chainId=${chainId}${query}`;
		return axiosClient.get(url);
	},
	getEventById(id: string) {
		const url = `events/${id}`;
		return axiosClient.get(url);
	},
	createEvent(data: createEvent) {
		const url = `events/`;
		return axiosAuthen.post(url, data);
	},
	uploadBackgroundEvent(data: any) {
		const url = `items/uploadPreview/`;
		return axiosClient.post(url, data);
	},
	predictEvent(data: predictEvent) {
		const url = `events/predict/`;
		return axiosAuthen.post(url, data);
	},
	redeemEvent(data: redeemEvent) {
		const url = `events/redeem/`;
		return axiosAuthen.post(url, data);
	},
	resovleEvent(data: resovleEvent) {
		const url = `events/resolve/`;
		return axiosAuthen.post(url, data);
	},
	getEventOfUser(chainId: number, userAddress: string) {
		const url = `events/user/?userAddress=${userAddress}&chainId=${chainId}`;
		return axiosAuthen.get(url);
	},
};

export default eventApi;
