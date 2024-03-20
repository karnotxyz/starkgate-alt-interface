"use client";
import { useBridgeInputStore } from "@/components/bridge/state/store";
import { MetamaskLogo } from "@/components/bridge/wallet/metamask-logo";
import { useDeviceSize } from "@/components/shared/hooks/use-device-size";
import { innerGroupTextStyle } from "@/components/shared/transfer/transfer-input-wrapper";
import { HelpTooltip } from "@/components/shared/ui/help-tooltip";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
import React, { FC } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useShallow } from "zustand/react/shallow";

const DisconnectMetamask: FC = () => {
	const { disconnect } = useDisconnect();
	const { address } = useAccount();
	const { setAddressToReceive } = useBridgeInputStore(
		useShallow((state) => ({
			setAddressToReceive: state.setAddressToReceive,
		})),
	);
	const { isSmallDevice } = useDeviceSize();
	const title = "Disconnect Wallet";
	const description =
		"When disconnecting your wallet you'll need to either:\na) Reconnect your wallet.\nb) Manually add a recipient address.";

	const handleDisconnect = () => {
		setAddressToReceive("");
		disconnect();
	};

	return (
		<>
			{isSmallDevice ? (
				<Drawer dismissible={false}>
					<DrawerTrigger className={"w-full"} asChild>
						<Button
							type={"button"}
							variant={"outline"}
							className={cn(
								"w-fit gap-2 bg-transparent text-xs sm:text-sm md:text-base",
								innerGroupTextStyle(),
							)}
						>
							<MetamaskLogo />
							{`Disconnect  ${
								address
									? sliceAddress(address)
									: "Recipient Wallet"
							}`}
						</Button>
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
					<HelpTooltip content={`Disconnect ${address}`}>
						<AlertDialogTrigger asChild>
							<Button
								type={"button"}
								variant={"outline"}
								className={cn(
									"w-fit gap-2 bg-transparent text-xs sm:text-sm md:text-base",
									innerGroupTextStyle(),
								)}
							>
								<MetamaskLogo />
								{`Disconnect  ${
									address
										? sliceAddress(address)
										: "Recipient Wallet"
								}`}
							</Button>
						</AlertDialogTrigger>
					</HelpTooltip>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>{title}</AlertDialogTitle>
							<AlertDialogDescription
								className={"whitespace-break-spaces"}
							>
								{description}
							</AlertDialogDescription>
						</AlertDialogHeader>
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
};

export { DisconnectMetamask };
