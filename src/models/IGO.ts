export interface IGOPreview {
	headerImg: string;
	backgroundImg: string;
	addressINO: string;
	chainId: number;
	collectionId: string;
	collectionInfo: collectionLessInfo;
	createdAt: string;
	descriptionINO: string;
	floorPoint: number;
	isComplete: boolean;
	items: itemsLessInfo[];
	nameINO: string;
	ownerINO: string;
	requestINO: requestINOInfo;
	requestINOId: string;
	typeINO: number;
	updatedAt: string;
	stableCoinPaymentUSD: number;
	stableCoinAddress: string;
	nativePaymentTokenUSD: number;
	nativeTokenAddress: string;
	networkPaymentTokenUSD: number;
	networkPaymentAddress: string;
	listItemId: string[];

	limitItemsPerUser: number;

	__v: 0;
	_id: string;
}

export interface collectionLessInfo {
	_id: string;
	collectionStandard: string;
	collectionAddress: string;
}

export interface requestINOInfo {
	_id: string;
	projectName: string;
	projectWebsite: string;
	companyName: string;
	email: string;
	endTime: number;
	network: number;
	networkPaymentName: string;
	projectDescription: string;
	networkPaymentPrice: string;
	stableCoinPaymentPrice: string;
	nativeTokenPaymentPrice: string;
	startTime: number;
	typeINO: 2;
	walletAddress: string;
}

export interface itemsLessInfo {
	_id: string;
	itemTokenId: string;
}
