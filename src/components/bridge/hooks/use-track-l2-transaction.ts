"use client";

import { useBridgeStep } from "@/components/bridge/hooks/use-bridge-step";
import { useNetworkUtils } from "@/components/shared/wallet/hooks/use-network-utils";
import { useProvider } from "@starknet-react/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { RpcProvider, hash, num, uint256 } from "starknet";

type useTrackTransactionProps = {
	amount: uint256.Uint256 | undefined;
	l2Recipient: string | undefined;
	contractAddress: string;
};

export const useTrackL2Transaction = ({
	amount,
	l2Recipient,
	contractAddress,
}: useTrackTransactionProps) => {
	const { isProcessingDestination, setSuccess } = useBridgeStep();
	const { getL2ExplorerUrl } = useNetworkUtils();

	const { provider } = useProvider();
	const providerRPC = provider as RpcProvider;

	const keyFilter = [num.toHex(hash.starknetKeccak("deposit_handled"))];

	const queryKey = useMemo(
		() => [
			"trackTransaction",
			{
				amount,
				l2Recipient,
				contractAddress,
			},
		],
		[amount, l2Recipient, contractAddress],
	);

	const enabled = Boolean(
		provider &&
			contractAddress &&
			amount &&
			l2Recipient &&
			isProcessingDestination,
	);

	const { low, high } = amount ?? { low: "0x0", high: "0x0" };
	return useQuery({
		queryKey: queryKey,
		queryFn: async () => {
			const eventsList = await providerRPC.getEvents({
				address: contractAddress,
				from_block: "latest",
				keys: [keyFilter],
				chunk_size: 25,
			});
			return eventsList.events.map((e) => {
				const lowData = String(num.toHex(low)).toLowerCase();
				const highData = String(num.toHex(high)).toLowerCase();
				// l2_recipient
				e.keys[2] === l2Recipient &&
					// token info (hardcoded for now)
					e.keys[1] === "0x455448" &&
					// amount low
					e.data[0] === lowData &&
					// amount high
					e.data[1] === highData &&
					isProcessingDestination &&
					setSuccess(
						e.transaction_hash,
						getL2ExplorerUrl(e.transaction_hash),
					);
			});
		},
		refetchInterval: 5000,
		enabled: enabled,
	});
};
