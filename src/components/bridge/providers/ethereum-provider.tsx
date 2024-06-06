"use client";

import { PropsWithChildren } from "react";
import { fallback } from "viem";
import { http, createConfig } from "wagmi";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia, anvil } from "wagmi/chains";

const rpcUrl = process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL;

const httpWagmiConfig = createConfig({
	chains: [sepolia, mainnet, anvil],
	ssr: true,
	transports: {
		[mainnet.id]: fallback([http(rpcUrl), http()]),
		[sepolia.id]: fallback([http(rpcUrl), http()]),
		[anvil.id]: fallback([http(rpcUrl), http()]),
	},
});

const EthereumProvider = ({ children }: PropsWithChildren) => {
	return <WagmiProvider config={httpWagmiConfig}>{children}</WagmiProvider>;
};

export default EthereumProvider;
