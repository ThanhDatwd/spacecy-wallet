/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Web3 from 'web3';
import { RPC_URLS } from '../constants/connector.constant';
import { formatUnits } from '@ethersproject/units';
import { BigNumber } from 'ethers';
export const getWeb3ChainId = async (
	chainId: any,
	addressToken: any,
	abi: any,
	type: any,
	bigNumber: BigNumber
) => {
	if (chainId && addressToken) {
		let RPC = RPC_URLS[chainId];
		const web3 = new Web3(Web3.givenProvider);
		let contract = new web3.eth.Contract(abi, addressToken);
		// // set provider for all later instances to use
		// Contract.setProvider(RPC);
		// var contract = new Contract(abi, addressToken);
		// console.log(test);
		// console.log(contract);
		// console.log(addressToken);
		let decimal: number = 0;
		if (addressToken === '0x0000000000000000000000000000000000000000') {
			decimal = 18;
		} else {
			await contract.methods
				.decimals()
				.call()
				.then((res: any) => {
					decimal = res;
				})
				.catch((error: any) => {
					console.log(error);
				});
		}
		const result: string = formatUnits(bigNumber.toString(), decimal);

		// console.log(result + ' ' + type);
		return result;
	}
};
