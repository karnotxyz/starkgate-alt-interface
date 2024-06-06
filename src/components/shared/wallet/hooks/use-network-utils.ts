"use client";

import { networkAtom, networkAtomL2 } from "@/components/bridge/state/atoms";
import { ChainInfo } from "@/components/shared/enums/chain-info";
import { Tokens } from "@/components/shared/tokens/tokens";
import {
  mainnet as L2Mainnet,
  sepolia as L2Sepolia,
  madara as L2Madara,
} from "@starknet-react/chains";
import { useAtom } from "jotai";
import {
  mainnet as L1Mainnet,
  sepolia as L1Sepolia,
  anvil as L1Anvil,
} from "wagmi/chains";

export const networkOptions: NetworkType[] = [
  "mainnet",
  "sepolia",
  "anvil",
  "madara",
];
export type NetworkType = "mainnet" | "sepolia" | "anvil" | "madara";

export const useNetworkUtils = () => {
  const [network, setNetwork] = useAtom(networkAtom);
  const [network_l2, setNetworkL2] = useAtom(networkAtomL2);

  console.log(">>>>> network :", network);
  console.log(">>>>> network_l2 :", network_l2);

  const isSepolia = network === "sepolia";
  const isMainnet = network === "mainnet";
  const isAnvil = network === "anvil";
  const isTestnet = isSepolia;
  const setSepolia = () => setNetwork("sepolia");
  const setMainnet = () => setNetwork("mainnet");
  const setAnvil = () => setNetwork("anvil");

  const isMadara = network_l2 === "madara";
  const setMadara = () => setNetworkL2("madara");

  console.log(">>>>> isMadara :", isMadara);

  const setL1NetworkByChainId = (chainId: number) => {
    switch (chainId) {
      case L1Sepolia.id:
        setSepolia();
        break;
      case L1Mainnet.id:
        setMainnet();
        break;
      case L1Anvil.id:
        setAnvil();
        break;
      default:
        throw new Error("Unsupported chainId");
    }
  };
  const isL1NetworkByChainId = (chainId: number) => {
    switch (chainId) {
      case L1Sepolia.id:
        return isSepolia;
      case L1Mainnet.id:
        return isMainnet;
      case L1Anvil.id:
        return isAnvil;
      default:
        return false;
    }
  };

  const getCurrentL1NetworkId = () => {
    switch (network) {
      case "sepolia":
        return L1Sepolia.id;
      case "mainnet":
        return L1Mainnet.id;
      case "anvil":
        return L1Anvil.id;
      default:
        throw new Error("Unsupported network");
    }
  };

  const isL2NetworkByChainId = (chainId: bigint) => {
    console.log(
      "isL2NetworkByChainId : ",
      L2Madara.id,
      chainId,
      chainId === L2Madara.id,
      isMadara
    );
    switch (chainId) {
      case L2Sepolia.id:
        return isSepolia;
      case L2Mainnet.id:
        return isMainnet;
      case L2Madara.id:
        return isMadara;
      default:
        return false;
    }
  };

  // etherscan.com/tx/0x...
  const getL1ExplorerUrl = (hash: string) => {
    switch (network) {
      case "sepolia":
        return `${ChainInfo.L1.sepolia.EXPLORER_URL}tx/${hash}`;
      case "mainnet":
        return `${ChainInfo.L1.mainnet.EXPLORER_URL}tx/${hash}`;
      case "anvil":
        return `${ChainInfo.L1.mainnet.EXPLORER_URL}tx/${hash}`;
      default:
        throw new Error("Unsupported network");
    }
  };

  // starkscan.com/eth-tx/0x...
  const getL1ToL2ExplorerUrl = (hash: string) => {
    switch (network) {
      case "sepolia":
        return `${ChainInfo.L2.sepolia.EXPLORER_URL}eth-tx/${hash}`;
      case "mainnet":
        return `${ChainInfo.L2.mainnet.EXPLORER_URL}eth-tx/${hash}`;
      case "madara":
        return `${ChainInfo.L2.mainnet.EXPLORER_URL}eth-tx/${hash}`;
      default:
        throw new Error("Unsupported network");
    }
  };

  // starkscan.com/tx/0x...
  const getL2ExplorerUrl = (hash: string) => {
    switch (network_l2) {
      case "sepolia":
        return `${ChainInfo.L2.sepolia.EXPLORER_URL}tx/${hash}`;
      case "mainnet":
        return `${ChainInfo.L2.mainnet.EXPLORER_URL}tx/${hash}`;
      case "madara":
        return `${ChainInfo.L2.mainnet.EXPLORER_URL}tx/${hash}`;
      default:
        throw new Error("Unsupported network");
    }
  };

  const getL1EstimatedTime = () => {
    return isTestnet ? 5 : 2;
  };

  const getL2EstimatedTime = () => {
    return 12;
  };

  // ESCROW_CONTRACT_ADDRESS
  const getWithdrawalAddress = (): string => {
    return process.env.NEXT_PUBLIC_WITHDRAWAL_CONTRACT_ADDRESS as string;
  };

  // STARKGATE_BRIDGE_ADDRESS
  const getDepositAddress = (): `0x${string}` => {
    return process.env.NEXT_PUBLIC_DEPOSIT_CONTRACT_ADDRESS as `0x${string}`;
  };

  /**
		Tokens.L1.ETH.bridgeAddress.goerli,
		Tokens.L2.ETH.bridgeAddress.goerli
	 */
  const getStarkgateAddressData = (): {
    l1EthBridgeAddress: string;
    l2EthBridgeAddress: string;
  } => {
    // console.log(">>>>>> getStarkgateAddressData : ", ne)

    switch (network_l2) {
      case "sepolia":
        return {
          l1EthBridgeAddress: Tokens.L1.ETH.bridgeAddress.sepolia,
          l2EthBridgeAddress: Tokens.L2.ETH.bridgeAddress.sepolia,
        };
      case "mainnet":
        return {
          l1EthBridgeAddress: Tokens.L1.ETH.bridgeAddress.mainnet,
          l2EthBridgeAddress: Tokens.L2.ETH.bridgeAddress.mainnet,
        };
      case "madara":
        return {
          l1EthBridgeAddress: Tokens.L1.ETH.bridgeAddress.anvil,
          l2EthBridgeAddress: Tokens.L2.ETH.bridgeAddress.madara,
        };
      default:
        throw new Error("Unsupported network");
    }
  };

  return {
    network,
    network_l2,
    isSepolia,
    isMainnet,
    isAnvil,
    isMadara,
    isTestnet,
    setSepolia,
    setMainnet,
    setNetwork,
    setNetworkL2,
    setAnvil,
    setMadara,
    setL1NetworkByChainId,
    isL1NetworkByChainId,
    isL2NetworkByChainId,
    getCurrentL1NetworkId,
    getL1ExplorerUrl,
    getL1ToL2ExplorerUrl,
    getL2ExplorerUrl,
    getL1EstimatedTime,
    getL2EstimatedTime,
    getWithdrawalAddress,
    getDepositAddress,
    getStarkgateAddressData,
  };
};
