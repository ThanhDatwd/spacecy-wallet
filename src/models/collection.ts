import { User } from './user';

export interface Collection {
	_id: string;
	// collectionId: string;
	collectionAddress: string;
	userAddress: string;
	logo: string;
	background: string;
	category: number;
	collectionName: string;
	collectionStandard: string;
	description: string;
	royalties: number;
	chainId: number;

	items: number;
	owners: number;
	floorPrice: number;
	percent7Days: number;
	percent30Days: number;
	percent24Hour: number;
	volumeTrade: number;
	volume24Hour: number;
	volume7Days: number;
	volume30Days: number;
	ownerInfo: User;
	listItem: LessInfoItem[];
}

export interface CreateCollectionInput {
	userAddress: string;
	chainId: number;
	logo?: string;
	fileLogoName?: string;
	background?: string;
	fileBackgroundName?: string;
	collectionName: string;
	collectionStandard: string;
	description?: string;
	royalties: number;
}
export interface uploadURL {
	fileName: string;
	result: string;
}
export interface FilterCollection {
	chainId: number[];
	userAddress: string;
	category: number[];
	isCreator?: boolean;
	isOwner?: boolean;
	collectionName: string;
	text: string;
	isFiltering: boolean;
	collectionStandard?: string;
}

export interface FilterTrendingCollection {
	sortBy: string;
	isFiltering?: boolean;
	sortFrom?: string;
	objectQuery?: Collection;
}

export interface CollectionCategory {
	key: number;
	data: CollectionId[];
}

export interface CollectionId {
	_id: string;
}
export interface LessInfoItem {
	_id: string;
	itemMedia: string;
	itemPreviewMedia: string;
}
