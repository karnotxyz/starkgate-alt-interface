"use client";

import { useBridgeStep } from "@/components/bridge/hooks/use-bridge-step";
import { useNetworkUtils } from "@/components/shared/wallet/hooks/use-network-utils";
import {
	useAccount as useStarknetAccount,
	useContract,
	useWaitForTransaction as useWaitForL2Transaction,
} from "@starknet-react/core";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { CallData, cairo } from "starknet";
import { STARKGATE_WITHDRAWAL_ABI } from "@/components/bridge/abis";

// FIXME: refactor to fit starkgate withdrawal
export const useL2Transfer = (recipientAddress: string, amountWei: bigint) => {
	const { getWithdrawalAddress, getL2ExplorerUrl } = useNetworkUtils();
	const {
		isProcessingOrigin,
		setConfirming,
		setProcessingOrigin,
		setProcessingDestination,
		setIdle,
	} = useBridgeStep();
	const { account } = useStarknetAccount();

	/**
	 * Contract data
	 */
	const amountInUint256 = cairo.uint256(amountWei);

	// set_order contract
	const { contract: setOrderContract } = useContract({
		abi: STARKGATE_WITHDRAWAL_ABI,
		address: getWithdrawalAddress(),
	});

	// escape hatch to prevent multiple submissions
	const isSubmitted = useRef<boolean>(false);

	const {
		mutate,
		data: tx,
		isPending: isTransactionPending,
	} = useMutation({
		mutationFn: async () => {
			if (!account || !amountInUint256) return null;
			return await account.execute([
				// Calling the second contract: https://docs.starknet.io/documentation/tools/starkgate_function_reference/#withdraw
				{
					contractAddress: setOrderContract?.address ?? "",
					entrypoint: "initiate_withdraw",
					// transfer
					calldata: CallData.compile({
						l1_recipient: recipientAddress,
						amount: amountInUint256,
					}),
				},
			]);
		},
		onMutate: setConfirming,
		onSuccess: (data) => {
			if (!data) return;
			const { transaction_hash } = data;
			const url = getL2ExplorerUrl(transaction_hash);
			setProcessingOrigin(transaction_hash, url);
			isSubmitted.current = false;
		},
		onError: (error) => {
			switch (error.message) {
				case "User abort":
					setIdle();
					toast.warning(
						"You just rejected the transaction, you might want to try again.",
					);
					break;
				case "Execute failed":
					setIdle();
					toast.warning(
						"Did you just reject your transfer? You might want to try again.",
					);
					break;
				case "Attempting to use a disconnected port object":
					setIdle();
					toast.warning(
						"Your wallet seems to be locked, unlock it and try again.",
					);
					break;
				default:
					console.error(error);
					toast.error(
						"Oops! Something went wrong with the transfer, try again.",
					);
					break;
			}
		},
	});

	/**
	 * Wait for transaction to be submitted
	 */
	const { data: l2TransactionData } = useWaitForL2Transaction({
		hash: tx?.transaction_hash ?? "",
		refetchInterval: 2000,
		enabled: Boolean(tx?.transaction_hash && isProcessingOrigin),
	});

	/**
	 * Set submitted on successful transaction submission
	 */
	useEffect(() => {
		if (!l2TransactionData || isSubmitted.current) return;
		setProcessingDestination();
		isSubmitted.current = true;
	}, [setProcessingDestination, l2TransactionData]);

	return {
		executeTransaction: mutate,
		isTransactionPending,
		feeInEth: "not implemented",
	};
};
