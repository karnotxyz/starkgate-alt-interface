"use client";
import { anchorStyle } from "@/components/navigation/footer";
import { useDeviceSize } from "@/components/shared/hooks/use-device-size";
import { buttonVariants } from "@/components/shared/ui/yet-another-button";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { ConnectVariables, Connector, useConnect } from "@starknet-react/core";
import { Loader2 } from "lucide-react";
import React, { memo } from "react";
import { StarknetConnectorImage } from "@/components/bridge/wallet/starknet-connector-image";

type ConnectModalProps = {
	title?: string;
	className?: string;
};

export default function ConnectModal({
	title = "Connect Wallet",
	className,
}: ConnectModalProps) {
	const { connect, connectors, isPending, pendingConnector } = useConnect();
	const { isSmallDevice } = useDeviceSize();
	const description = "Connect your starknet wallet to get started.";

	return (
		<>
			{isSmallDevice ? (
				<Drawer>
					<DrawerTrigger className={"w-full"} asChild>
						<Button
							type={"button"}
							className={cn(
								buttonVariants({ variant: "card" }),
								className,
							)}
						>
							{title}
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>{title}</DrawerTitle>
							<DrawerDescription>{description}</DrawerDescription>
						</DrawerHeader>
						<WalletsGrid
							className={"mx-2"}
							connectors={connectors}
							connect={connect}
							isPending={isPending}
							pendingConnector={pendingConnector}
						/>
						<DrawerFooter>
							<RecommendedWallets />
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			) : (
				<Dialog>
					<DialogTrigger className={"w-full"} asChild>
						<Button
							type={"button"}
							className={cn(
								buttonVariants({ variant: "card" }),
								className,
							)}
						>
							{title}
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</DialogHeader>
						<WalletsGrid
							connectors={connectors}
							connect={connect}
							isPending={isPending}
							pendingConnector={pendingConnector}
						/>
						<RecommendedWallets />
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}

const WalletsGrid = ({
	connectors,
	connect,
	isPending,
	pendingConnector,
	className,
}: {
	connectors: Connector[];
	connect: (args?: ConnectVariables) => void;
	isPending: boolean;
	pendingConnector: Connector | undefined;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"grid grid-cols-[repeat(auto-fill,minmax(theme(width.52),1fr))] gap-3.5 p-2",
				className,
			)}
		>
			{connectors.map((connector) => {
				const isAvailable = connector.available();
				const isPendingConnector = pendingConnector === connector;

				// @ts-expect-error _wallet is not correctly typed in the core package
				if (connector._wallet === undefined) return null;

				return (
					<Button
						variant={"ghost"}
						className={cn(
							"flex items-center gap-2 p-12",
							"scale-100 transition-all ease-in-out hover:scale-105 active:scale-95",
							"bg-transparent text-xs sm:text-sm md:text-base",
							isPending && "cursor-wait",
						)}
						key={connector.id}
						onClick={() => connect({ connector })}
						disabled={!isAvailable}
					>
						{isPending && isPendingConnector ? (
							<Loader2 className={"size-7 animate-spin"} />
						) : (
							<StarknetConnectorImage connector={connector} />
						)}
						{isAvailable ? "Connect" : "Unavailable"}{" "}
						{connector.name}
					</Button>
				);
			})}
		</div>
	);
};

const RecommendedWallets = memo(function RecommendedWallets() {
	return (
		<p className={"text-center text-xs text-foreground/80"}>
			We recommend using either{" "}
			<a
				target={"_blank"}
				rel={"noopener noreferrer"}
				className={cn(anchorStyle())}
				href={
					"https://chromewebstore.google.com/detail/argent-x/dlcobpjiigpikoobohmabehhmhfoodbb?hl=en-US"
				}
			>
				Argent X
			</a>{" "}
			or{" "}
			<a
				target={"_blank"}
				rel={"noopener noreferrer"}
				className={cn(anchorStyle())}
				href={
					"https://chromewebstore.google.com/detail/braavos-smart-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma?hl=en-US"
				}
			>
				Braavos
			</a>
			.
		</p>
	);
});
