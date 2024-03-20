import { useL1Transfer } from "@/components/bridge/hooks/use-l1-transfer";
import { useValidateTransaction } from "@/components/bridge/hooks/use-validate-transaction";
import { useBridgeInputStore } from "@/components/bridge/state/store";
import { TransferModal } from "@/components/bridge/transfer/modal";
import { TransferToProps } from "@/components/bridge/transfer/transfer-funds";
import { YetAnotherButton } from "@/components/shared/ui/yet-another-button";
import { parseFromDecimals } from "@/lib/number-parser";
import { useAccount as useStarknetAccount } from "@starknet-react/core";
import { memo, useDeferredValue } from "react";
import { useAccount as useMetamaskAccount } from "wagmi";
import { useShallow } from "zustand/react/shallow";

const TransferToEthereum = ({
	isUnderMaintenance = false,
}: TransferToProps) => {
	// wallet addresses
	const { address: l2Recipient } = useStarknetAccount();
	const { address: metamaskAddress } = useMetamaskAccount();
	const l1Address: `0x${string}` = metamaskAddress ?? "0x";

	// store utils
	const { getToPayAmountWei, getToPayAmountRaw, getDecimals } =
		useBridgeInputStore(
			useShallow((state) => ({
				getToPayAmountWei: () => state.getTokenToPayAmount("wei"),
				getToPayAmountRaw: () => state.getTokenToPayAmount("raw"),
				getDecimals: () => state.getTokenDecimals(),
			})),
		);

	// defer values to avoid re-renders
	const amount = getToPayAmountWei();
	const defAmount = useDeferredValue(amount);

	// transfer
	const { isLoading, isTransactionPending, writeContract, overallFee } =
		useL1Transfer(l1Address, l2Recipient ?? "0x", defAmount);

	// validations
	const { buttonLabel, isDisabled } = useValidateTransaction({
		isUnderMaintenance,
		toChain: "Starknet",
	});

	return (
		<>
			<TransferModal
				isFeeValid={true}
				loading={isLoading || isTransactionPending}
				data={{
					fromAddress: l1Address,
					toAddress: l2Recipient ?? "",
					amount: getToPayAmountRaw() ?? 0,
					fee: parseFromDecimals(overallFee, getDecimals()),
				}}
				transferFn={() => writeContract()}
				triggerComponent={
					<YetAnotherButton
						type={"submit"}
						variant={"card"}
						disabled={isDisabled}
					>
						{buttonLabel}
					</YetAnotherButton>
				}
			/>
		</>
	);
};

export default memo(TransferToEthereum);
