import {
	Collection,
	ListParams,
	Response,
	ListResponse,
	ListResponseNonPaging,
	CreateCollectionInput,
	CollectionCategory,
} from 'models';
import axiosAuthen from './axiosAuthen';
import axiosClient from './axiosClient';

const collectionApi = {
	getListTopCollection(
		chainId: number,
		data: ListParams,
		filter: ListParams
	): Promise<ListResponse<Collection>> {
		const { pageSize, page } = data;
		const url = `/collections/top/${chainId}/pageSize/${pageSize}/page/${page}`;
		return axiosClient.post(url, { ...filter });
	},

	fetchNewCollectionsPagination(
		pageSize: number,
		page: number
	): Promise<ListResponse<Collection>> {
		const url = `/collections/query/pageSize/${pageSize}/page/${page}`;

		return axiosClient.post(url, { sort: 'createdAt:desc' });
	},

	getListCollectionId(pagination: ListParams, filter: ListParams): Promise<ListResponse<any>> {
		const { page, pageSize } = pagination;
		const url = `/collections/query/pageSize/${pageSize}/page/${page}`;

		const body = { ...filter };
		return axiosClient.post(url, body);
	},

	getListBoxCollectionId(pagination: ListParams, filter: ListParams): Promise<ListResponse<any>> {
		const { page, pageSize } = pagination;
		const url = `/collections/box/pageSize/${pageSize}/page/${page}`;

		const body = { ...filter };
		return axiosClient.post(url, body);
	},

	getSearchListCollectionId(
		pagination: ListParams,
		filter: ListParams
	): Promise<ListResponse<any>> {
		const { page, pageSize } = pagination;
		const url = `/collections/query-search/pageSize/${pageSize}/page/${page}`;

		const body = { ...filter };
		return axiosClient.post(url, body);
	},

	getListCollectionByOwnerOrCreatorItems(
		pagination: ListParams,
		filter: ListParams
	): Promise<ListResponse<any>> {
		const { page, pageSize } = pagination;
		const url = `/collections/collectible-asset/pageSize/${pageSize}/page/${page}`;

		const body = { ...filter };
		return axiosClient.post(url, body);
	},

	getCollectionById(collectionId: string): Promise<Response<any>> {
		const url = `/collections/collectionId/${collectionId}`;
		return axiosClient.get(url);
	},

	getCollectionDetailById(collectionId: string): Promise<Response<any>> {
		const url = `/collections/detail/collectionId/${collectionId}`;
		return axiosClient.get(url);
	},

	getSearchCollectionById(collectionId: string): Promise<Response<any>> {
		const url = `/collections/search/collectionId/${collectionId}`;
		return axiosClient.get(url);
	},

	createCollection(data: CreateCollectionInput): Promise<Response<any>> {
		const url = `/collections/create`;
		return axiosAuthen.post(url, data);
	},

	importCollection(
		chainId: number,
		userAddress: string,
		collectionAddress: string
	): Promise<Response<any>> {
		const url = `/items/import`;
		const data = { chainId, userAddress, collectionAddress };

		return axiosAuthen.post(url, data);
	},

	editCollection(data: CreateCollectionInput, collectionId: string): Promise<Response<any>> {
		const url = `/collections/collectionId/${collectionId}`;
		return axiosAuthen.put(url, data);
	},

	checkExistCollectionName(collectionName: string, chainId: number): Promise<Response<any>> {
		const url = `/collections/checkName`;
		return axiosClient.post(url, { collectionName, chainId });
	},

	getAllCategory(): Promise<ListResponse<any>> {
		const url = `/collections/category`;
		return axiosClient.get(url);
	},

	getListCollectionCategory(): Promise<ListResponseNonPaging<CollectionCategory>> {
		const url = `/collections/topCategory`;
		return axiosClient.get(url);
	},
	getListCollectionIdByCategory(
		pagination: ListParams,
		type: number
	): Promise<ListResponse<any>> {
		const { page, pageSize } = pagination;

		const url = `/collections/category/${type}/pageSize/${pageSize}/page/${page}`;
		return axiosClient.get(url);
	},
};

export default collectionApi;
