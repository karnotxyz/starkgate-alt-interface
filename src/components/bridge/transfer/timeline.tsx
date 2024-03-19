import { useBridgeStep } from "@/components/bridge/hooks/use-bridge-step";
import { useBridgeTypeToggle } from "@/components/bridge/hooks/use-bridge-type-toggle";
import {
	TimelineItem,
	TimelineItemProps,
} from "@/components/bridge/transfer/timeline-item";
import { cn } from "@/lib/utils";
import { ClassNameWithChildren } from "@/types/class-name-with-children";
import { Check, CircleDashed, Loader2 } from "lucide-react";
import React, { useMemo } from "react";

const LoadingSpinner = ({
	isSuccess = false,
	isIdle = false,
	className,
	children,
}: { isSuccess?: boolean; isIdle?: boolean } & ClassNameWithChildren) => {
	if (isIdle) {
		return (
			<>
				<CircleDashed
					className={cn("size-4 text-muted-foreground", className)}
				/>
				<span className={"sr-only"}>Idle</span>
				<span className={cn("text-muted-foreground", className)}>
					{children}
				</span>
			</>
		);
	}

	if (isSuccess) {
		return (
			<>
				<Check className={cn("size-4 text-success", className)} />
				<span className={"sr-only"}>Success</span>
				<span className={cn("text-success", className)}>
					{children}
				</span>
			</>
		);
	}

	return (
		<>
			<Loader2 className={cn("size-4 animate-spin", className)} />
			<span className={"sr-only"}>Processing...</span>
			<span className={cn(className)}>{children}</span>
		</>
	);
};

export const ProgressTimeline = () => {
	const { step: state, isProcessingDestination } = useBridgeStep();
	const [isDeposit] = useBridgeTypeToggle();
	const origin = isDeposit ? "Ethereum" : "Starknet";
	const timeline = useMemo<TimelineItemProps[]>(
		() => [
			{
				step: "confirming",
				message: "Confirm on your wallet.",
				Icon: ({ children, className }: ClassNameWithChildren) => (
					<div className={className}>
						<LoadingSpinner
							className={className}
							isSuccess={state !== "confirming"}
							isIdle={false}
						>
							{children}
						</LoadingSpinner>
					</div>
				),
			},
			{
				step: "processingOrigin",
				message: `Processing in ${origin}.`,
				Icon: ({ children, className }: ClassNameWithChildren) => (
					<div className={className}>
						<LoadingSpinner
							className={className}
							isSuccess={state !== "processingOrigin"}
							isIdle={state === "confirming"}
						>
							{children}
						</LoadingSpinner>
					</div>
				),
			},
		],
		[state, origin],
	);

	return (
		<div className={"flex flex-col py-3"}>
			{!isDeposit && isProcessingDestination && (
				<p className={"-mt-5 pb-4 text-left text-base text-muted-foreground"}>
					In ~12 hours, your funds will be available to execute a
					withdraw in Ethereum.
				</p>
			)}
			{timeline.map((props) => (
				<TimelineItem key={props.message} {...props} />
			))}
		</div>
	);
};
