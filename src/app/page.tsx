import BridgeForm from "@/components/bridge/forms/form";
import { TransferDescription } from "@/components/bridge/transfer/transfer-description";
import GlowEffect from "@/components/shared/ui/glow-effect";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import React from "react";

const DisconnectL2Modal = dynamic(
	() => import("@/components/shared/wallet/disconnect-modal"),
	{
		ssr: false,
	},
);

export default function BridgePage() {
	return (
		<>
			<GlowEffect variant={"bridge"} />
			<Card
				className={cn(
					"mx-1.5 p-3 py-1 sm:max-w-lg md:max-w-xl",
					"transition-all ease-in-out",
				)}
			>
				<CardHeader className={"px-2"}>
					<CardTitle
						className={
							"relative flex items-center justify-between space-x-2"
						}
					>
						<div className={"flex items-center gap-2"}>
							<span>Bridge</span>
						</div>
						<DisconnectL2Modal />
					</CardTitle>
					<CardDescription className={"pt-2"}>
						<TransferDescription />
					</CardDescription>
				</CardHeader>
				<BridgeForm />
			</Card>
		</>
	);
}
