"use client";

import { STARKGATE_DEPOSIT_ABI } from "@/components/bridge/abis";
import { useBridgeStep } from "@/components/bridge/hooks/use-bridge-step";
import { useTrackL2Transaction } from "@/components/bridge/hooks/use-track-l2-transaction";
import { useNetworkUtils } from "@/components/shared/wallet/hooks/use-network-utils";
import { useProvider } from "@starknet-react/core";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { RpcProvider, cairo } from "starknet";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useCallback, useEffect, useMemo, useRef } from "react";

export const useL1Transfer = (
	l1Address: `0x${string}`,
	l2Recipient: string,
	amountInWei: number,
) => {
	const { getL1ExplorerUrl, getDepositAddress, getStarkgateAddressData } =
		useNetworkUtils();
	const {
		setIdle,
		setConfirming,
		setProcessingOrigin,
		setProcessingDestination,
	} = useBridgeStep();
	const { provider } = useProvider();
	const rpcProvider = provider as RpcProvider;

	/**
	 * fee estimate
	 */
	const amountAsUint256 = cairo.uint256(amountInWei);
	const { low, high } = amountAsUint256;
	const payload = [l2Recipient, String(low), String(high)];
	const { l1EthBridgeAddress, l2EthBridgeAddress } =
		getStarkgateAddressData();

	const queryKey = useMemo(() => {
		return ["estimateMessageFee", amountInWei, l2Recipient];
	}, [amountInWei, l2Recipient]);

	const { data: feeEstimateData } = useQuery({
		queryKey: queryKey,
		queryFn: async () => {
			try {
				return await rpcProvider.estimateMessageFee({
					from_address: l1EthBridgeAddress,
					to_address: l2EthBridgeAddress,
					entry_point_selector: "handle_deposit",
					payload: payload,
				});
			} catch (e) {
				console.error("estimateMessageFee error: ", e);
				return null;
			}
		},
		enabled: Boolean(
			l2Recipient &&
				amountInWei &&
				l1EthBridgeAddress &&
				l2EthBridgeAddress,
		),
	});
	const { overall_fee: overallFee } = feeEstimateData ?? {};

	// do contract write (https://wagmi.sh/react/guides/write-to-contract)
	const {
		data: writeContractData,
		writeContract: write,
		isPending: isTransactionPending,
	} = useWriteContract({
		mutation: {
			onMutate: () => {
				setConfirming();
			},
			onSuccess: (data) => {
				setProcessingOrigin(data, getL1ExplorerUrl(data));
			},
			onError: (error) => {
				switch (true) {
					case error.message.includes("User rejected the request"):
						setIdle();
						toast.warning(
							"You just rejected the transaction, you might want to try again.",
						);
						break;
					case error.message.includes(
						"Attempting to use a disconnected port object",
					):
						setIdle();
						toast.warning(
							"Your wallet seems to be locked, unlock it and try again.",
						);
						break;
					default:
						toast.error(
							"Oops! Something went wrong with the transfer, try again.",
						);
						break;
				}
			},
		},
	});

	// wait for transaction
	const { isLoading, isSuccess } = useWaitForTransactionReceipt({
		hash: writeContractData,
	});

	// escape hatch to prevent multiple submissions
	const isSubmitted = useRef<boolean>(false);

	useEffect(() => {
		if (!isSuccess || isSubmitted.current) return;
		setProcessingDestination();
		isSubmitted.current = true;
	}, [isSuccess, setProcessingDestination]);

	// track when starkgate is sending the funds in the L2
	useTrackL2Transaction({
		amount: amountAsUint256,
		l2Recipient: l2Recipient,
		contractAddress: l2EthBridgeAddress,
	});

	const amountWithFee = BigInt(amountInWei) + BigInt(overallFee ?? 0);

	// function to execute the contract write
	const writeContract = useCallback(() => {
		write({
			address: getDepositAddress(),
			abi: STARKGATE_DEPOSIT_ABI,
			functionName: "deposit",
			args: [amountInWei, l2Recipient],
			value: amountWithFee,
			account: l1Address,
		});
	}, [
		write,
		getDepositAddress,
		l1Address,
		amountInWei,
		l2Recipient,
		amountWithFee,
	]);

	return {
		isLoading,
		isTransactionPending,
		writeContract,
		// convert overallFee from hex to decimal and return it as a string
		overallFee: parseInt(overallFee ?? "0", 16).toString(),
	};
};
