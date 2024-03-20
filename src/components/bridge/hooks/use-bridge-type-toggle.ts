import { bridgeTypeAtom } from "@/components/bridge/state/atoms";
import { useAtom } from "jotai/index";

type BridgeReturnType = [isDeposit: boolean, setBridgeTypeToggle: () => void];

export const useBridgeTypeToggle = (): BridgeReturnType => {
	const [bridgeType, setBridgeType] = useAtom(bridgeTypeAtom);
	const isDeposit = bridgeType === "deposit";
	const toggleBridgeType = () => {
		setBridgeType((prev) => (prev === "deposit" ? "withdraw" : "deposit"));
	};
	return [isDeposit, toggleBridgeType] as const;
};
