"use client";

import { useBridgeTypeToggle } from "@/components/bridge/hooks/use-bridge-type-toggle";
import { EthereumLogo } from "@/components/shared/logos/ethereum";
import { StarknetLogo } from "@/components/shared/logos/starknet";
import { HelpTooltip } from "@/components/shared/ui/help-tooltip";
import { innerGroupTextStyle } from "@/components/shared/transfer/transfer-input-wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

export const ChainsButton = () => {
	const [isDeposit, setBridgeType] = useBridgeTypeToggle();
	let fromLogo: ReactNode = <></>;
	let toLogo: ReactNode = <></>;

	switch (isDeposit) {
		case true:
			fromLogo = <EthereumLogo />;
			toLogo = <StarknetLogo />;
			break;
		case false:
			fromLogo = <StarknetLogo />;
			toLogo = <EthereumLogo />;
			break;
	}

	return (
		<HelpTooltip
			content={`Press to transfer ETH ${
				isDeposit ? "from" : "to"
			} Starknet`}
		>
			<Button
				onClick={setBridgeType}
				type={"button"}
				variant={"outline"}
				className={
					"absolute right-6 top-8 flex items-center gap-2 px-1.5 py-3.5"
				}
			>
				{fromLogo}
				<ArrowRight className={cn("size-5", innerGroupTextStyle())} />
				{toLogo}
			</Button>
		</HelpTooltip>
	);
};
