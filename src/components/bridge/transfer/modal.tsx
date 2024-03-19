import { useBridgeStep } from "@/components/bridge/hooks/use-bridge-step";
import { ReviewContent } from "@/components/bridge/transfer/review";
import { ProgressTimeline } from "@/components/bridge/transfer/timeline";
import { useDeviceSize } from "@/components/shared/hooks/use-device-size";
import { YetAnotherButton } from "@/components/shared/ui/yet-another-button";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { ReactNode, useState } from "react";
import { useBridgeTypeToggle } from "@/components/bridge/hooks/use-bridge-type-toggle";

export type TransferModalData = {
	fromAddress: string;
	toAddress: string;
	amount: number;
	fee: string;
};

type TransferModalProps = {
	triggerComponent: ReactNode;
	transferFn: () => void;
	data: TransferModalData;
	isFeeValid: boolean;
	loading?: boolean;
};

const IS_TESTING_BUTTON_HIDDEN = true;

export const TransferModal = ({
	triggerComponent,
	transferFn,
	data: { fromAddress, toAddress, amount, fee },
	loading = false,
	isFeeValid,
}: TransferModalProps) => {
	const [isDeposit] = useBridgeTypeToggle();
	const { isIdle, isSuccess, isProcessingDestination, setIdle } =
		useBridgeStep();
	const { isSmallDevice } = useDeviceSize();
	const [open, setOpen] = useState(false);
	let title = "Track your transfer";
	let description = "";
	let Content: ReactNode = <ProgressTimeline />;
	const Footer: ReactNode =
		isDeposit && isSuccess
			? "Deposit Again"
			: !isDeposit && isProcessingDestination
			  ? "Withdraw Again"
			  : null;

	if (isIdle) {
		title = "Review Transfer";
		description =
			"You are about to transfer your funds. Please make sure that everything is correct before proceeding.";
		Content = (
			<>
				<ReviewContent
					fromAddress={fromAddress}
					toAddress={toAddress}
					amount={amount}
					fee={fee}
					token={"ETH"}
				/>
				<AlertDialogFooter variant={"transaction_modal"}>
					<YetAnotherButton
						variant={"card"}
						disabled={loading || !isFeeValid}
						loading={loading}
						onClick={() => {
							transferFn();
						}}
					>
						{isFeeValid
							? "Confirm Transfer"
							: "Error in network Fee"}
					</YetAnotherButton>
				</AlertDialogFooter>
			</>
		);
	}

	function handleOpenChange(open: boolean) {
		setOpen(open);
		if (!open) {
			setIdle();
		}
	}

	return (
		<>
			{isSmallDevice ? (
				<Drawer
					onClose={setIdle}
					open={open}
					onOpenChange={handleOpenChange}
				>
					<DrawerTrigger className={"w-full"} asChild>
						{triggerComponent}
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
						<div
							className={cn(
								"space-y-5 p-6",
								!isSuccess && !isIdle && "mb-10",
							)}
						>
							{Content}
							<InternalStateTestingButton
								hidden={IS_TESTING_BUTTON_HIDDEN}
							/>
						</div>
						{Footer && (
							<DrawerFooter>
								<DrawerClose
									className={cn(
										buttonVariants({ variant: "outline" }),
										"mb-5 w-full p-7 text-lg",
									)}
								>
									{Footer}
								</DrawerClose>
							</DrawerFooter>
						)}
					</DrawerContent>
				</Drawer>
			) : (
				<AlertDialog open={open} onOpenChange={handleOpenChange}>
					<AlertDialogTrigger asChild>
						{triggerComponent}
					</AlertDialogTrigger>
					<AlertDialogContent className={"gap-2 space-y-0"}>
						<InternalStateTestingButton
							hidden={IS_TESTING_BUTTON_HIDDEN}
						/>
						<AlertDialogHeader>
							<AlertDialogTitle className={"capitalize"}>
								{title}
							</AlertDialogTitle>
							<AlertDialogCancel
								onClick={setIdle}
								className={
									"absolute right-3 top-1 border-none bg-transparent px-3 py-2"
								}
							>
								<X className={"size-4"} />
							</AlertDialogCancel>
							<AlertDialogDescription
								className={"whitespace-break-spaces"}
							>
								{description}
							</AlertDialogDescription>
						</AlertDialogHeader>
						{Content}
						{Footer && (
							<AlertDialogFooter variant={"transaction_modal"}>
								<AlertDialogCancel
									className={"w-full p-7 text-lg"}
								>
									{Footer}
								</AlertDialogCancel>
							</AlertDialogFooter>
						)}
					</AlertDialogContent>
				</AlertDialog>
			)}
		</>
	);
};

const InternalStateTestingButton = ({
	hidden = true,
	className,
}: { hidden?: boolean; className?: string }) => {
	const {
		step,
		setIdle,
		setProcessingOrigin,
		setConfirming,
		setProcessingDestination,
		setSuccess,
	} = useBridgeStep();
	return (
		<Button
			variant={"ghost"}
			className={cn(
				"absolute -top-16 md:-top-10",
				hidden && "hidden",
				className,
			)}
			onClick={() => {
				switch (step) {
					case "idle":
						setConfirming();
						break;
					case "confirming":
						setProcessingOrigin("0x1234567890", "lala");
						break;
					case "processingOrigin":
						setProcessingDestination();
						break;
					case "processingDestination":
						setSuccess("0x1234567890", "lala");
						break;
					case "success":
						setIdle();
						break;
				}
			}}
		>
			next (for testing purposes only)
		</Button>
	);
};
