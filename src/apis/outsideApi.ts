import { Response } from 'models';
import axios from 'axios';
const outsiteApi = {
	handleConvertTokenToMonney(symbol: string, amount: number): Promise<Response<any>> {
		const url = `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?symbol=${symbol}&amount=${amount}`;
		return axios.get(url, {
			headers: {
				'X-CMC_PRO_API_KEY': 'a1d046ec-60a3-4dae-a12c-88babc243c04',
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		});
	},
};
export default outsiteApi;
