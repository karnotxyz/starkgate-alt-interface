"use client";

import { useNetworkUtils } from "@/components/shared/wallet/hooks/use-network-utils";
import { useAccount as useL2Account, useNetwork } from "@starknet-react/core";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export const useL2NetworkCheck = () => {
	const { isConnected } = useL2Account();
	const { chain: currentChain } = useNetwork();
	const {
		network: currentNetwork,
		isL2NetworkByChainId: isNetworkByChainId,
	} = useNetworkUtils();
	const isNetworkSameRef = useRef<boolean>(true);
	const capitalizedNetwork =
		currentNetwork[0].toUpperCase() + currentNetwork.slice(1);

	useEffect(() => {
		const chainId = currentChain.id;
		if (!chainId || !isConnected) return;
		isNetworkSameRef.current = isNetworkByChainId(chainId);
		if (isNetworkSameRef.current) {
			toast.dismiss();
			return;
		}
		const chainName =
			currentChain.name === "Starknet" ? "Mainnet" : currentChain.name;
		toast.warning(
			`Your Starknet wallet is connected to ${chainName}. Please switch to ${capitalizedNetwork} in order to use the app.`,
		);
	}, [currentChain, isConnected, isNetworkByChainId, capitalizedNetwork]);

	return {
		isNetworkSame: isNetworkSameRef.current,
		currentNetwork,
	};
};
