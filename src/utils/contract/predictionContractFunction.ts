//
import { getWeb3Contract } from 'hooks';
import PredictionCollateral from 'abis/PredictionCollateral.json';
import { CONTRACT } from '../../constants';
//import { parseEther } from '@ethersproject/units';
import { isNativeToken } from 'utils/function';
import { toast } from 'react-toastify';
import { BigNumber } from 'ethers';

export interface createEventData {
	description: string;
	answers: string[];
	payment: string;
	creatorFee: number;
	startTime: number;
	endTime: number;
	extraTime: number;
}
export interface predictEventData {
	chainId: number;
	userAddress: string;
	eventId: number;
	option: number;
	amount: any;
	paymentToken: string;
}
export interface redeemEventData {
	chainId: number;
	userAddress: string;
	eventId: number;
	option: number;
	amount: number | string;
}
export interface resolveEventData {
	chainId: number;
	userAddress: string;
	eventId: number;
	outcomes: number[];
}

export const PredictionContractFunction = () => {
	const createEvent = async (
		chainId: number,
		ownerAddress: string,
		data: createEventData
	): Promise<any> => {
		const ContractPrediction = getWeb3Contract(
			PredictionCollateral.abi,
			CONTRACT[chainId].PREDICTION
		);
		let event = await ContractPrediction.methods

			.createEvent(
				data.description,
				data.answers,
				data.payment,
				data.creatorFee * 100,
				data.startTime,
				data.endTime,
				data.extraTime
			)
			.send({
				from: ownerAddress,
				value: await ContractPrediction.methods.entranceFee().call(),
			})
			.then((event: any) => {
				return event;
			});
		return event;
	};
	const predictEvent = async (data: predictEventData): Promise<any> => {
		let value = data.amount;
		let amount = data.amount;
		const ContractPrediction = getWeb3Contract(
			PredictionCollateral.abi,
			CONTRACT[data.chainId].PREDICTION
		);
		if (isNativeToken(data.paymentToken)) {
			amount = 0;
		} else {
			value = 0;
		}
		const result = await ContractPrediction.methods
			.predictEvent(data.eventId, data.option, amount)
			.send({ from: data.userAddress, value })
			.then((result: any) => result)
			.catch((error: any) => {
				toast.error('Some error occur when you predict!');
				return error;
			});
		return result;
	};
	const redeemEvent = async (data: redeemEventData): Promise<any> => {
		const ContractPrediction = getWeb3Contract(
			PredictionCollateral.abi,
			CONTRACT[data.chainId].PREDICTION
		);
		let result = await ContractPrediction.methods
			.redeemEvent(data.eventId, data.option, data.amount)
			.send({ from: data.userAddress })
			.then((result: any) => result)
			.catch((error: any) => {
				toast.error('Some error occur when you redeem!');
				return error;
			});
		return result;
	};
	const resolveEvent = async (data: resolveEventData): Promise<any> => {
		const a = data.outcomes.map((outcome: number) => BigNumber.from(outcome * 100).toString());
		const ContractPrediction = getWeb3Contract(
			PredictionCollateral.abi,
			CONTRACT[data.chainId].PREDICTION
		);
		let result = await ContractPrediction.methods
			.resolveEvent(data.eventId, a)
			.send({ from: data.userAddress })
			.then((result: any) => result)
			.catch((error: any) => {
				toast.error('Some error occur when you resolve!');
				return error;
			});
		return result;
	};
	return {
		createEvent,
		predictEvent,
		redeemEvent,
		resolveEvent,
	};
};
