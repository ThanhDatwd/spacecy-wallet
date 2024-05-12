export interface createEvent {
	chainId: number;
	eventId: number;
	category: string;
	description: string;
	imgUrl: any;
	answers: string[];
	payment: string;
	startTime: number;
	endTime: number;
	creator: string;
	creatorFee: number;
	txHash: string;
}
export interface uploadEvent {
	file: any;
}
export interface predictEvent {
	userAddress: string;
	eventId: number;
	option: number;
	amount: string;
	txHash: string;
}
export interface redeemEvent {
	userAddress: string;
	eventId: number;
	option: number;
	amount: string;
	txHash: string;
}
export interface resovleEvent {
	userAddress: string;
	eventId: number;
	option: number[];
	txHash: string;
}
