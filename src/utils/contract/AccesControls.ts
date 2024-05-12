// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getWeb3Contract } from 'hooks';
import MetaspacecyAccessControls from 'abis/MetaspacecyAccessControls.json';
import { CONTRACT } from '../../constants';
// import { parseEther } from '@ethersproject/units';
// import { isNativeToken } from 'utils/function';
// import { toast } from 'react-toastify';
// import { BigNumber } from 'ethers';

export interface hasAdminRoleData {
	chainId: number;
	userAddress: any;
}

export const AccessControls = () => {
	const isAbleCreateEvent = async (data: hasAdminRoleData): Promise<any> => {
		try {
			const AccessControlContract = getWeb3Contract(
				MetaspacecyAccessControls.abi,
				CONTRACT[data.chainId].MetaSpacecyAccessControls
			);
			const isHasAddminRole = await AccessControlContract.methods
				.hasAdminRole(data.userAddress)
				.call();
			const isHasOperatorRole = await AccessControlContract.methods
				.hasOperatorRole(data.userAddress)
				.call();
			if (isHasAddminRole === true || isHasOperatorRole === true) {
				return true;
			}
			return false;
		} catch (error) {
			return false;
		}
	};

	return {
		isAbleCreateEvent,
	};
};
