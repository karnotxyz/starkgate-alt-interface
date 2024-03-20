import { axiosCoinGeckoApi } from "@/services/tokens/api";

export const tokensApi = {
	getETHtoUSD: async () => {
		return await axiosCoinGeckoApi.get("/simple/price", {
			params: {
				ids: "ethereum",
				vs_currencies: "usd",
			},
		});
	},
};
