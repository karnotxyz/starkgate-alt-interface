// https://github.com/starknet-io/starkgate-frontend/blob/master/workspace/packages/enums/src/ChainType.ts
type IChainType = {
	[chain: string]: string | number;
};

export enum ChainTypeL1 {
	MAIN = "mainnet",
	SEPOLIA = "sepolia",
}

export enum ChainTypeL2 {
	MAIN = "mainnet",
	SEPOLIA = "sepolia",
}

type ChainsType = {
	L1: IChainType;
	L2: IChainType;
};

export const ChainType: ChainsType = {
	L1: ChainTypeL1,
	L2: ChainTypeL2,
} as const;