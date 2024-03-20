"use client";
import { useBridgeTypeToggle } from "@/components/bridge/hooks/use-bridge-type-toggle";
import { useBridgeInputStore } from "@/components/bridge/state/store";
import { DisconnectMetamask } from "@/components/bridge/wallet/disconnect-metamask";
import { MotionDiv } from "@/components/shared/framer-motion/motion-div";
import { usePaste } from "@/components/shared/hooks/use-paste";
import {
	TransferInputWrapper,
	innerGroupTextStyle,
} from "@/components/shared/transfer/transfer-input-wrapper";
import { HelpTooltip } from "@/components/shared/ui/help-tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LayoutGroup } from "framer-motion";
import { ClipboardPaste, Loader2, Minus, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { ChangeEvent, useId, useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useShallow } from "zustand/react/shallow";

const ConnectMetamask = dynamic(
	() => import("@/components/bridge/wallet/connect-metamask"),
	{
		ssr: false,
		loading: () => (
			<Button
				variant={"outline"}
				className={cn(
					"gap-2 bg-transparent text-xs sm:text-sm md:text-base",
					innerGroupTextStyle(),
				)}
			>
				<Loader2 className={"size-6 animate-spin"} />
				Connect Ethereum Wallet
			</Button>
		),
	},
);

export const BridgeAddressInput = () => {
	const isFirefox =
		typeof window !== "undefined" &&
		window?.navigator?.userAgent?.toLowerCase()?.indexOf("firefox") > -1;
	const id = useId();
	const { addressToReceive, setAddressToReceive } = useBridgeInputStore(
		useShallow((state) => ({
			addressToReceive: state.addressToReceive,
			setAddressToReceive: state.setAddressToReceive,
		})),
	);
	const [isOpen, setIsOpen] = useState<boolean>(() => false);
	const { isConnected } = useAccount();
	const [isDeposit] = useBridgeTypeToggle();
	const { mutate, isPending } = usePaste({
		onSuccess: (data) => {
			setAddressToReceive(data as unknown as string);
		},
	});

	if (isOpen && isConnected) {
		toast.warning(
			"Disconnect your ethereum wallet in order to enter an address.",
		);
		setIsOpen(false);
	}

	const handleClick = () => {
		if (isConnected) {
			toast.warning("Disconnect your ethereum wallet first.");
			return;
		}
		setIsOpen(true);
	};

	return (
		<LayoutGroup id={id}>
			<div className={cn("flex gap-2", isOpen && "flex-col")}>
				{isOpen ? (
					<TransferInputWrapper
						className={cn(isDeposit && "hidden", "py-6")}
						layoutId={id}
						htmlFor={id}
						label={"Ethereum Address"}
					>
						<Input
							autoComplete={"off"}
							autoCorrect={"off"}
							id={id}
							placeholder={"0x0...69"}
							type={"string"}
							value={addressToReceive}
							className={cn(
								"w-full",
								!addressToReceive && "text-5xl",
								"appearance-none rounded border-none bg-transparent py-2 pl-1 text-xl leading-tight focus-visible:ring-0",
								"[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
								!isFirefox && "pr-14",
							)}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setAddressToReceive(e.target.value);
							}}
						/>
						{isFirefox ? (
							<></>
						) : (
							<HelpTooltip
								content={
									"Paste an address from your clipboard."
								}
							>
								<Button
									variant={"outline"}
									className={cn(
										"absolute bottom-6 right-3 flex gap-x-1.5",
										innerGroupTextStyle(),
									)}
									onClick={() => {
										mutate();
									}}
								>
									{isPending ? (
										<Loader2
											className={"size-4 animate-spin"}
										/>
									) : (
										<ClipboardPaste className={"size-4"} />
									)}
									<span className={"sr-only"}>Paste</span>
								</Button>
							</HelpTooltip>
						)}
						<Button
							size={"icon"}
							variant={"ghost"}
							className={cn(
								"absolute right-4 top-0",
								innerGroupTextStyle(),
							)}
							onClick={() => setIsOpen(false)}
						>
							<Minus className={"size-4"} />
						</Button>
					</TransferInputWrapper>
				) : (
					<MotionDiv
						transition={{
							type: "spring",
							ease: "easeInOut",
						}}
						layoutId={id}
					>
						<Button
							className={cn(
								"gap-1 bg-transparent text-xs capitalize sm:text-sm md:text-base",
								isConnected && "cursor-not-allowed opacity-50",
								innerGroupTextStyle(),
								isDeposit && "hidden",
							)}
							variant={"outline"}
							onClick={handleClick}
						>
							<Plus className={"size-4"} />
							<p>Send to a different wallet</p>
						</Button>
					</MotionDiv>
				)}
				<MotionDiv
					className={cn("flex items-center gap-2", isOpen && "pl-3")}
					layout={"position"}
				>
					<p className={cn(isDeposit && "hidden")}>or</p>
					{isConnected ? <DisconnectMetamask /> : <ConnectMetamask />}
				</MotionDiv>
			</div>
		</LayoutGroup>
	);
};
