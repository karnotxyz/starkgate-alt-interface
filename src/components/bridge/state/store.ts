import { Token, TokenConstants } from "@/components/bridge/constants";
import { parseToDecimals } from "@/lib/number-parser";
import { create } from "zustand";

type formToken = {
	coin: Token;
	input: number | null;
};

type toPayAmountReturnTypes = "raw" | "wei";

type BridgeInputState = {
	tokenToPay: formToken;
	addressToReceive: string;
	balance: number;
};

type BridgeInputActions = {
	setTokenToPay: (token: formToken) => void;
	setTokenToPayInput: (input: number | null) => void;
	setTokenToPayCoin: (coin: Token) => void;
	setAddressToReceive: (address: string) => void;
	getTokenToPayAmount: (returnType: toPayAmountReturnTypes) => number;
	getTokenAddress: () => string;
	getTokenDecimals: () => number;
	getTokenInput: () => string | null;
	setBalance: (balance: number) => void;
};

const bridgeInputInitialState = {
	tokenToPay: { coin: TokenConstants.ETH, input: null },
	addressToReceive: "",
	balance: 0,
};

export const useBridgeInputStore = create<
	BridgeInputState & BridgeInputActions
>((set, get) => ({
	...bridgeInputInitialState,
	setTokenToPay: (token: formToken) => set({ tokenToPay: token }),
	setTokenToPayInput: (input: number | null) => {
		set((state) => ({
			tokenToPay: { ...state.tokenToPay, input },
		}));
	},
	setTokenToPayCoin: (coin: Token) =>
		set((state) => ({ tokenToPay: { ...state.tokenToPay, coin } })),
	getTokenToPayAmount: (returnType: toPayAmountReturnTypes) => {
		const { input, coin } = get().tokenToPay;
		switch (returnType) {
			case "raw":
				return input ?? 0;
			case "wei": {
				if (input === null) return 0;
				const { decimals } = coin;
				// input * 10 ** decimals
				return Number(parseToDecimals(input, decimals));
			}
		}
	},
	getTokenInput: () => get().tokenToPay.input?.toString() ?? null,
	getTokenAddress: () => get().tokenToPay.coin.address,
	getTokenDecimals: () => get().tokenToPay.coin.decimals,
	setAddressToReceive: (address: string) => {
		set({ addressToReceive: address });
	},
	setBalance: (balance: number) => set({ balance }),
}));
