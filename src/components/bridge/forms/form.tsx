import { BridgeAddressInput } from "@/components/bridge/forms/address-input";
import { BridgeTokenInput } from "@/components/bridge/forms/token-input";
import { ChainsButton } from "@/components/bridge/transfer/chains-button";
import { TransferButton } from "@/components/bridge/transfer/transfer-funds";
import ConnectWallet from "@/components/shared/wallet/connect";
import { CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

const BridgeForm = () => {
	return (
		<>
			<CardContent className={"space-y-2.5 px-1.5"}>
				<BridgeTokenInput>
					<ChainsButton />
				</BridgeTokenInput>
				<BridgeAddressInput />
			</CardContent>
			<CardFooter className={cn("flex flex-col gap-2 px-1.5")}>
				<ConnectWallet title={"Connect Starknet Wallet"}>
					<TransferButton />
				</ConnectWallet>
			</CardFooter>
		</>
	);
};

export default BridgeForm;
