/* eslint-disable @typescript-eslint/no-unused-vars */
// utils
import { parseUnits } from '../calculate';
import { formatUnits } from '@ethersproject/units';
import { BigNumber } from 'ethers';
// abis
import { getWeb3Contract } from 'hooks';
import ContractIERC20 from 'abis/IERC20.json';

// erc20function not use for native token
export function erc20function() {
	const getBalanceOfUser = async (
		userAddress: string,
		tokenPayment: string
	): Promise<BigNumber> => {
		const contractIERC20 = getWeb3Contract(ContractIERC20.abi, tokenPayment);

		let balanceOfUser: BigNumber = BigNumber.from(0);
		await contractIERC20.methods
			.balanceOf(userAddress)
			.call()
			.then(function (result: BigNumber) {
				balanceOfUser = result;
			})
			.catch((error: any) => console.log(error.message));

		return balanceOfUser;
	};

	const getAmountAllowance = async (
		ownerAddress: string,
		spenderAddress: string,
		tokenPayment: string
	): Promise<BigNumber> => {
		const contractIERC20 = getWeb3Contract(ContractIERC20.abi, tokenPayment);

		let amountAllowance: BigNumber = BigNumber.from(0);
		await contractIERC20.methods
			.allowance(ownerAddress, spenderAddress)
			.call()
			.then(function (result: BigNumber) {
				amountAllowance = result;
			})
			.catch((error: any) => console.log(error.message));
		return amountAllowance;
	};

	const increaseAmountAllowance = async (
		tokenAddress: string,
		amount: BigNumber,
		ownerAddress: string,
		spenderAddress: string
	): Promise<void> => {
		const contractIERC20 = getWeb3Contract(ContractIERC20.abi, tokenAddress);

		await contractIERC20.methods
			.increaseAllowance(spenderAddress, amount.toString())
			.send({ from: ownerAddress });
	};

	const getDecimal = async (tokenPayment: string): Promise<number> => {
		const contractIERC20 = getWeb3Contract(ContractIERC20.abi, tokenPayment);
		// console.log(tokenPayment);
		let decimal: number = 0;
		await contractIERC20.methods
			.decimals()
			.call()
			.then(function (result: number) {
				decimal = result;
			})
			.catch((error: any) => console.log(error.message));
		return decimal;
	};

	const changeTokenToWei = async (tokenAddress: string, amount: number): Promise<BigNumber> => {
		const decimal: number = await getDecimal(tokenAddress);

		const result: BigNumber = parseUnits(amount.toString(), decimal);
		return result;
	};

	const changeWeiToToken = async (tokenAddress: string, amount: BigNumber): Promise<string> => {
		const decimal: number = await getDecimal(tokenAddress);
		const result: string = formatUnits(amount.toString(), decimal);

		return result;
	};

	const checkBalance = async (
		tokenAddress: string,
		userAddress: string,
		amountToCheck: BigNumber
	): Promise<boolean> => {
		const userBalance: BigNumber = await getBalanceOfUser(userAddress, tokenAddress);

		if (BigNumber.from(String(userBalance)).lt(String(amountToCheck))) {
			return false;
		}
		return true;
	};

	const getMissingAllowanceAmount = async (
		tokenAddress: string,
		userAddress: string,
		spenderAddress: string,
		amountToCheck: BigNumber
	): Promise<BigNumber> => {
		const amountAllowanced: BigNumber = await getAmountAllowance(
			userAddress,
			spenderAddress,
			tokenAddress
		);
		return BigNumber.from(String(amountToCheck)).sub(String(amountAllowanced));
	};

	const approveAmount = async (
		spenderAddress: string,
		amount: BigNumber,
		tokenPayment: string,
		ownerAddress: string
	) => {
		const contractIERC20 = getWeb3Contract(ContractIERC20.abi, tokenPayment);
		let status = await contractIERC20.methods
			.approve(spenderAddress, amount)
			.send({ from: ownerAddress })
			.then((res: any) => {
				return true;
			})
			.catch((error: any) => {
				console.log(error);
				return false;
			});
		return status;
	};

	return {
		changeTokenToWei,
		changeWeiToToken,
		getDecimal,
		getAmountAllowance,
		increaseAmountAllowance,
		getBalanceOfUser,
		checkBalance,
		getMissingAllowanceAmount,
		approveAmount,
	};
}
