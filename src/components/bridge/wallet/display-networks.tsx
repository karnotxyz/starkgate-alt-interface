"use client";

import { EthereumLogo } from "@/components/shared/logos/ethereum";
import { useAccount as useL2Account } from "@starknet-react/core";
import { useAccount as useL1Account } from "wagmi";
import { StarknetLogo } from "@/components/shared/logos/starknet";
import { mainnet } from "@starknet-react/chains";

export const DisplayNetworks = () => {
	const { chain: l1Chain } = useL1Account();
	const { chainId: l2ChainId } = useL2Account();

	return (
		<div className={"flex flex-wrap justify-end gap-4"}>
			{l1Chain && (
				<div className={"flex items-center gap-2"}>
					<EthereumLogo className={"size-5"} />
					<p>{l1Chain?.name === "mainnet" ? "Mainnet" : "Sepolia"}</p>
				</div>
			)}
			{!!l2ChainId && (
				<div className={"flex items-center gap-2"}>
					<StarknetLogo className={"size-5"} />
					<p>{l2ChainId === mainnet.id ? "Mainnet" : "Sepolia"}</p>
				</div>
			)}
		</div>
	);
};
