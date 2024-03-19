import { useL2Transfer } from "@/components/bridge/hooks/use-l2-transfer";
import { useValidateTransaction } from "@/components/bridge/hooks/use-validate-transaction";
import { useBridgeInputStore } from "@/components/bridge/state/store";
import { TransferModal } from "@/components/bridge/transfer/modal";
import { TransferToProps } from "@/components/bridge/transfer/transfer-funds";
import { MaintenanceDialog } from "@/components/shared/ui/maintenance-dialog";
import { YetAnotherButton } from "@/components/shared/ui/yet-another-button";
import { parseFromDecimals } from "@/lib/number-parser";
import { useAccount as useStarknetAccount } from "@starknet-react/core";
import { memo, useDeferredValue } from "react";
import { useAccount as useMetamaskAccount } from "wagmi";
import { useShallow } from "zustand/react/shallow";

const TransferToStarknet = ({
	isUnderMaintenance = false,
}: TransferToProps) => {
	const { account } = useStarknetAccount();
	const { address: metamaskAddress } = useMetamaskAccount();
	const { inputRecipientAddress, getToPayAmount, getTokenDecimals } =
		useBridgeInputStore(
			useShallow((state) => ({
				inputRecipientAddress: state.addressToReceive,
				getToPayAmount: state.getTokenToPayAmount,
				getTokenDecimals: () => state.getTokenDecimals(),
			})),
		);

	// defer values to avoid re-renders
	const amountWei = useDeferredValue(getToPayAmount("wei"));
	const defInputRecipientAddress = useDeferredValue(inputRecipientAddress);
	const recipientAddress = metamaskAddress ?? defInputRecipientAddress ?? "";

	// transfer
	const { executeTransaction, isTransactionPending, feeInEth } =
		useL2Transfer(recipientAddress, BigInt(amountWei));

	// track active transaction

	// validations
	const { buttonLabel, isDisabled } = useValidateTransaction({
		isUnderMaintenance,
		toChain: "Ethereum",
	});

	return (
		<TransferModal
			isFeeValid={true}
			loading={isTransactionPending}
			triggerComponent={
				<YetAnotherButton
					type={"submit"}
					variant={"card"}
					disabled={isDisabled}
				>
					{buttonLabel}
				</YetAnotherButton>
			}
			transferFn={() => executeTransaction()}
			data={{
				fromAddress: account?.address ?? "",
				toAddress: recipientAddress,
				amount:
					Number(parseFromDecimals(amountWei, getTokenDecimals())) ??
					0,
				fee: feeInEth,
			}}
		/>
	);
};

export default memo(TransferToStarknet);
