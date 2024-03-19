import axios from "axios";

export const axiosCoinGeckoApi = axios.create({
	baseURL: "https://api.coingecko.com/api/v3",
	headers: {
		"x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
	},
	timeout: 5000,
});
