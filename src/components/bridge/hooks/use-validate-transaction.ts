"use client";

import { useBridgeInputStore } from "@/components/bridge/state/store";
import { useAccount as useMetamaskAccount } from "wagmi";
import { useShallow } from "zustand/react/shallow";

type useValidateTransactionProps = {
	isUnderMaintenance: boolean;
	toChain: "Ethereum" | "Starknet";
};

export const useValidateTransaction = ({
	isUnderMaintenance,
	toChain,
}: useValidateTransactionProps) => {
	const { address: metamaskAddress } = useMetamaskAccount();
	const { inputRecipientAddress, getToPayAmount, balance } =
		useBridgeInputStore(
			useShallow((state) => ({
				inputRecipientAddress: state.addressToReceive,
				getToPayAmount: state.getTokenToPayAmount,
				balance: state.balance,
			})),
		);
	const amountAsIs = getToPayAmount("raw");
	const amountInWei = getToPayAmount("wei");

	const hasSufficientBalance = balance >= amountAsIs;
	const hasRecipientWallet = Boolean(
		metamaskAddress || inputRecipientAddress,
	);
	const isDisabled =
		!(hasRecipientWallet && amountInWei && hasSufficientBalance) ||
		isUnderMaintenance;

	let buttonLabel = `Transfer to ${toChain}`;
	switch (true) {
		case isUnderMaintenance:
			buttonLabel = "Under Maintenance";
			break;
		case !hasRecipientWallet:
			buttonLabel = "Add Ethereum Wallet";
			break;
		case !amountInWei:
			buttonLabel = "Add Amount";
			break;
		case !hasSufficientBalance:
			buttonLabel = "Insufficient Balance";
			break;
		default:
			break;
	}

	return { isDisabled, buttonLabel };
};
