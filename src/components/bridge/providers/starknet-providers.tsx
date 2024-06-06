"use client";

import { goerli, mainnet, sepolia, madara } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  jsonRpcProvider,
} from "@starknet-react/core";
import type React from "react";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";

const rpcUrl = process.env.NEXT_PUBLIC_STARKNET_RPC_URL;



export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const connectors = [
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector(),
  ];

  let provider = publicProvider();

  if (rpcUrl) {
    provider = jsonRpcProvider({
      rpc: () => ({
        nodeUrl: rpcUrl,
      }),
    });
  }

  return (
    <StarknetConfig
      chains={[mainnet, sepolia, goerli, madara]}
      provider={provider}
      connectors={connectors}
      autoConnect={true}
    >
      {children}
    </StarknetConfig>
  );
}
