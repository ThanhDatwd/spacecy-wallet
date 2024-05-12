/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from 'react-toastify';
// utils
import { BigNumber } from 'ethers';
import { randomBytes } from '@ethersproject/random';
import { isNativeToken, erc20function, ValidateOrder } from 'utils';
import ProofTokens from 'abis/ProofTokens.json';

// constants
import { CONTRACT } from '../../../constants';

// hooks
import { getWeb3Contract } from 'hooks';

export interface ApproveForPredictInput {
	userAddress: string;
	chainId: number;
	paymentToken: string;
	amount: number;
}
export interface ApproveForRedeemInput {
	userAddress: string;
	chainId: number;
}
export interface GetBalaceOfEvenInput {
	userAddress: string;
	chainId: number;
	eventId: any;
	option: any;
}
const { validateOrderSignature, validateOrderParameters, checkOrderCanMatch } = ValidateOrder();

export function AcceptEventAction() {
	const ApproveForPredict = async (data: ApproveForPredictInput): Promise<boolean> => {
		if (!isNativeToken(data.paymentToken)) {
			try {
				const amountToWei: BigNumber = await erc20function().changeTokenToWei(
					data.paymentToken,
					data.amount
				);
				let status = await erc20function().approveAmount(
					CONTRACT[data.chainId].PREDICTION,
					amountToWei,
					data.paymentToken,
					data.userAddress
				);
				return status;
			} catch (error) {
				return false;
			}
		} else {
			return true;
		}
	};
	const ApproveForRedeem = async (
		data: ApproveForRedeemInput,
		isChecking: boolean
	): Promise<boolean> => {
		const { chainId, userAddress } = data;
		try {
			// contract MetaSpacecyCreatureAccessory
			const contractMetaSpacecyCreatureAccessory = getWeb3Contract(
				ProofTokens.abi,
				CONTRACT[chainId].PROOFTOKEN
			);

			// ============================================================== CHECK APPROVED =========================================================================//
			let isApproved: boolean = false;
			await contractMetaSpacecyCreatureAccessory.methods
				.isApprovedForAll(userAddress, CONTRACT[data.chainId].PREDICTION)
				.call()
				.then(function (result: boolean) {
					isApproved = result;
				});

			// ==============================================================APPROVE ITEM IF USER HAVEN'T APPROVE =========================================================================//
			if (!isApproved) {
				// Not approvedForAll yet + isChecking => return false immediately
				if (isChecking) {
					return false;
				} else {
					// Approve item
					await contractMetaSpacecyCreatureAccessory.methods
						.setApprovalForAll(CONTRACT[data.chainId].PREDICTION, true)
						.send({ from: userAddress });
				}
			}

			return true;
		} catch (error) {
			toast.error('Some error occur when initializing your wallet for staking!');
			console.log(error);
			return false;
		}
	};
	const getBalanceOfEvent = async (data: GetBalaceOfEvenInput): Promise<any> => {
		const ContractProof = getWeb3Contract(ProofTokens.abi, CONTRACT[data.chainId].PROOFTOKEN);
		let result = await ContractProof.methods
			.balanceOfEvent(data.userAddress, data.eventId, data.option)
			.call()
			.then((result: any) => result)
			.catch((error: any) => {
				toast.error('Some error occur when you redeem!');
				return error;
			});
		return result;
	};
	return {
		ApproveForPredict,
		ApproveForRedeem,
		getBalanceOfEvent,
	};
}
