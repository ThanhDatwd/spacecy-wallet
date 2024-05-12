import { ListParams } from 'models';

export function generateQueryString(params: ListParams) {
	const query = Object.keys(params)
		.map((key) => {
			if (!params[key]) return '';
			return `${key}=${params[key]}`;
		})
		.join('&');

	return query;
}

export const checkHasNextPage = (currentPage: number, totalPages: number) => {
	return currentPage < totalPages ? true : false;
};

// "function": "0x1::aptos_account::transfer",
// "type_arguments": [],
// "arguments": [
//   "0xea2cc851448874cfe19c5feabe5d48fc94abd91318e9e0684afa969432f5942c",
//   "100000000"
// ]
