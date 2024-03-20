"use client";
import { useBridgeTypeToggle } from "@/components/bridge/hooks/use-bridge-type-toggle";

export const TransferDescription = () => {
	const [isDeposit] = useBridgeTypeToggle();
	const from = isDeposit ? "Ethereum" : "Starknet";
	const to = isDeposit ? "Starknet" : "Ethereum";

	return (
		<>
			Transfer ETH from <strong>{from}</strong> to <strong>
				{to}
			</strong>{" "}
		</>
	);
};
