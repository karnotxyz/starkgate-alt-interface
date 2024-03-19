"use client";

import { useBridgeTypeToggle } from "@/components/bridge/hooks/use-bridge-type-toggle";
import TransferToStarknet from "@/components/bridge/transfer/transfer-to-l2";
import TransferToEthereum from "@/components/bridge/transfer/transfer-to-l1";

export interface TransferToProps {
	isUnderMaintenance?: boolean;
}

export const TransferButton = () => {
	const [isDeposit] = useBridgeTypeToggle();
	return isDeposit ? (
		<>
			<TransferToEthereum isUnderMaintenance={false} />
		</>
	) : (
		<>
			<TransferToStarknet isUnderMaintenance={false} />
		</>
	);
};
