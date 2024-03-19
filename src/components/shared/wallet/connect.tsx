"use client";

import { YetAnotherButton } from "@/components/shared/ui/yet-another-button";
import { useAccount } from "@starknet-react/core";
import dynamic from "next/dynamic";
import React, { memo, PropsWithChildren } from "react";

const ConnectModal = dynamic(() => import("./connect-modal"), {
	ssr: false,
	loading: () => (
		<YetAnotherButton className={"w-full"} variant={"card"} disabled>
			Loading...
		</YetAnotherButton>
	),
});

interface ConnectWalletProps extends PropsWithChildren {
	title?: string;
	className?: string;
}

function ConnectWallet({ title, children }: ConnectWalletProps) {
	const { isConnected } = useAccount();

	return (
		<>{isConnected ? <>{children}</> : <ConnectModal title={title} />}</>
	);
}

export default memo(ConnectWallet);
