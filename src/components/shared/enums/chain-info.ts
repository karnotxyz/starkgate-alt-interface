// https://github.com/starknet-io/starkgate-frontend/blob/master/workspace/packages/enums/src/ChainInfo.ts
import { ChainTypeL1, ChainTypeL2 } from "@/components/shared/enums/chain-type";

interface IChainInfo {
  NAME: string;
  EXPLORER_URL: string;
  CHAIN?: string;
  ID_PREFIX?: string;
}

type ChainsInfo = {
  L1: {
    [L1Chain in ChainTypeL1]: IChainInfo;
  };
  L2: {
    [L2Chain in ChainTypeL2]: IChainInfo;
  };
};

export const ChainInfo: ChainsInfo = {
  L1: {
    [ChainTypeL1.MAIN]: {
      NAME: "Ethereum Mainnet",
      EXPLORER_URL: "https://etherscan.io/",
    },
    [ChainTypeL1.SEPOLIA]: {
      NAME: "Ethereum Sepolia",
      EXPLORER_URL: "https://sepolia.etherscan.io/",
    },
    [ChainTypeL1.ANVIL]: {
      NAME: "Ethereum Anvil",
      EXPLORER_URL: "",
    },
  },
  L2: {
    [ChainTypeL2.MAIN]: {
      CHAIN: "Mainnet",
      NAME: "Starknet Mainnet",
      ID_PREFIX: "23448594291968334",
      EXPLORER_URL: "https://starkscan.co/",
    },
    [ChainTypeL2.SEPOLIA]: {
      CHAIN: "Sepolia",
      NAME: "Starknet Sepolia",
      ID_PREFIX: "1536727068981429685321",
      EXPLORER_URL: "https://sepolia.starkscan.co/",
    },
    [ChainTypeL2.MADARA]: {
      CHAIN: "Madara",
      NAME: "Madara Goerli",
      ID_PREFIX: "1536727068981429685321",
      EXPLORER_URL: "",
    },
  },
};
