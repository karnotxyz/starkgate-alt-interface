// https://github.com/starknet-io/starkgate-frontend/blob/master/workspace/apps/starkgate/shared/src/tokens.ts
import { ChainType } from "@/components/shared/enums/chain-type";

export const Tokens = {
	L1: {
		ETH: {
			name: "Ether",
			symbol: "ETH",
			decimals: 18,
			bridgeAddress: {
				[ChainType.L1.MAIN]:
					"0xae0Ee0A63A2cE6BaeEFFE56e7714FB4EFE48D419",
				[ChainType.L1.SEPOLIA]:
					"0x8453FC6Cd1bCfE8D4dFC069C400B433054d47bDc",
			},
			tokenAddress: null,
		},
	},
	L2: {
		ETH: {
			name: "Ether",
			symbol: "ETH",
			decimals: 18,
			bridgeAddress: {
				[ChainType.L2.MAIN]:
					"0x073314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82",
				[ChainType.L2.SEPOLIA]:
					"0x04c5772d1914fe6ce891b64eb35bf3522aeae1315647314aac58b01137607f3f",
			},
			tokenAddress: {
				[ChainType.L2.MAIN]:
					"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
				[ChainType.L2.SEPOLIA]:
					"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
			},
		},
	},
};
