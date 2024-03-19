export type Token = {
	address: string;
	decimals: number;
};

export const TokenConstants = {
	ETH: {
		address:
			"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
		decimals: 18,
	},
	USDC: {
		address:
			"0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426",
		decimals: 6,
	},
} as const;
