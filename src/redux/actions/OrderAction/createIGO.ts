/* eslint-disable @typescript-eslint/no-unused-vars */

import { toast } from 'react-toastify';
// constant
import { CONTRACT } from '../../../constants';
// abi
import { getWeb3Contract } from 'hooks';
import IERC721 from 'abis/IERC721.json';
import IERC1155 from 'abis/IERC1155.json';
// utils
import { isNullAddress } from 'utils';
import { BigNumber } from 'ethers';
// model
import { ApproveData } from 'models';

// isChecking === true => this function just to check => "return" means approved or not.
// isChecking === false => this function approve nfts in wallet  => "return" means succeed or not.
export const ApproveFunction = async (data: ApproveData, isChecking: boolean): Promise<boolean> => {
	const { userAddress, collectionAddress, operatorAddress, standard } = data;

	try {
		// contract Factory
		let contractFactory: any = null;

		// STANDARD 721
		if (standard === 'ERC721') {
			contractFactory = getWeb3Contract(IERC721.abi, collectionAddress);
		} else {
			contractFactory = getWeb3Contract(IERC1155.abi, collectionAddress);
		}

		// ==============================================================CHECK APPROVE ITEM FOR SALE==================================================================================//
		let isApproved: boolean = false;
		await contractFactory.methods
			.isApprovedForAll(userAddress, operatorAddress)
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
				//Approve item
				await contractFactory.methods
					.setApprovalForAll(operatorAddress, true)
					.send({ from: userAddress });
			}
		}

		return true;
	} catch (error) {
		if (isChecking) {
			toast.error('Some error occur when checking your wallet initialize!');
		} else {
			toast.error('Errors occurred during wallet initialization!');
		}
		console.log(error);
		return false;
	}
};
