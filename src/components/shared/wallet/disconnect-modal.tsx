"use client";
import { useDeviceSize } from "@/components/shared/hooks/use-device-size";
import { HelpTooltip } from "@/components/shared/ui/help-tooltip";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { cn, sliceAddress } from "@/lib/utils";
import { useAccount, useDisconnect } from "@starknet-react/core";
import React, { forwardRef } from "react";
import { StarknetConnectorImage } from "@/components/bridge/wallet/starknet-connector-image";

export default function DisconnectModal() {
	const { disconnect } = useDisconnect();
	const { isSmallDevice } = useDeviceSize();
	const title = "Disconnect Wallet";
	const description =
		"You'll need to reconnect your wallet to interact with the application again.\nAre you sure you want to disconnect your wallet?";

	function handleDisconnect() {
		disconnect();
	}

	return (
		<>
			{isSmallDevice ? (
				<Drawer dismissible={false}>
					<DrawerTrigger asChild>
						<WalletButton />
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>{title}</DrawerTitle>
							<DrawerDescription
								className={"whitespace-break-spaces"}
							>
								{description}
							</DrawerDescription>
						</DrawerHeader>
						<DrawerFooter>
							<DrawerClose asChild>
								<Button
									variant={"destructive"}
									onClick={handleDisconnect}
								>
									{title}
								</Button>
							</DrawerClose>
							<DrawerClose asChild>
								<Button
									className={"w-full"}
									variant={"outline"}
								>
									Cancel
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			) : (
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<WalletButton />
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>{title}</AlertDialogHeader>
						<div className="flex flex-col gap-6">
							<AlertDialogDescription
								className={"whitespace-break-spaces text-sm"}
							>
								{description}
							</AlertDialogDescription>
						</div>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={handleDisconnect}>
								{title}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</>
	);
}

const WalletButton = forwardRef<HTMLButtonElement, ButtonProps>(
	({ ...props }, ref) => {
		const { address, connector } = useAccount();
		const addressShort = address ? sliceAddress(address) : null;

		if (!addressShort || !connector) return null;

		return (
			<HelpTooltip content={`Disconnect ${address ?? ""}`}>
				<Button
					className={cn(
						"absolute -top-2 right-0 gap-2",
						"text-xs sm:text-sm md:text-base",
					)}
					variant="ghost"
					ref={ref}
					{...props}
				>
					<StarknetConnectorImage
						SVGClassName={"size-4 sm:size-4 md:size-4 lg:size-5"}
						connector={connector}
					/>
					{`Disconnect ${addressShort}`}
				</Button>
			</HelpTooltip>
		);
	},
);
WalletButton.displayName = "WalletButton";
