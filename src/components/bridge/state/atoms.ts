import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { NetworkType } from "@/components/shared/wallet/hooks/use-network-utils";

export const bridgeTypeAtom = atom<"deposit" | "withdraw">("withdraw");

const BridgeStepStates = {
	idle: 0,
	confirming: 1,
	processingOrigin: 2,
	processingDestination: 3,
	success: 4,
} as const;

export type BridgeStep = keyof typeof BridgeStepStates;
export const bridgeStepAtom = atom<BridgeStep>("idle");

type TransactionDetailsType = {
	hash: string;
	explorerUrl: string;
};

export const bridgeOriginTx = atom<TransactionDetailsType>({
	hash: "",
	explorerUrl: "",
});

export const bridgeDestinationTx = atom<TransactionDetailsType>({
	hash: "",
	explorerUrl: "",
});

const storage = createJSONStorage<NetworkType>(() =>
	typeof window !== "undefined"
		? window.localStorage
		: (undefined as unknown as Storage),
);

export const networkAtom = atomWithStorage<NetworkType>(
	"network",
	"anvil",
	storage,
	{
		getOnInit: true,
	},
);

export const networkAtomL2 = atomWithStorage<NetworkType>(
	"network",
	"madara",
	storage,
	{
		getOnInit: true,
	},
);