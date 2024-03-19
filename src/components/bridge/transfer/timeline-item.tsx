import { useBridgeStep } from "@/components/bridge/hooks/use-bridge-step";
import { BridgeStep } from "@/components/bridge/state/atoms";
import { HelpTooltip } from "@/components/shared/ui/help-tooltip";
import { cn } from "@/lib/utils";
import { ClassNameWithChildren } from "@/types/class-name-with-children";
import { Minus } from "lucide-react";
import React, { ReactNode } from "react";
import { useBridgeTypeToggle } from "@/components/bridge/hooks/use-bridge-type-toggle";

export type TimelineItemProps = {
	step: BridgeStep;
	message: string;
	Icon: (props: ClassNameWithChildren) => ReactNode;
};

export const TimelineItem = ({ message, step, Icon }: TimelineItemProps) => {
	const {
		step: state,
		originExplorerUrl,
		destinationExplorerUrl,
	} = useBridgeStep();
	const [isDeposit] = useBridgeTypeToggle();

	return (
		<div className={"flex flex-col"}>
			<Icon className={"inline-flex items-center gap-3"}>
				{message}
				{
					// set explorer url only for origin item
					(state === "processingDestination" ||
						state === "success") &&
						step === "processingOrigin" &&
						originExplorerUrl !== "" && (
							<ViewOnExplorer explorerUrl={originExplorerUrl} />
						)
				}
				{
					// set explorer url only for destination item
					state === "success" &&
						step === "processingDestination" &&
						destinationExplorerUrl !== "" && (
							<ViewOnExplorer
								explorerUrl={destinationExplorerUrl}
							/>
						)
				}
			</Icon>
			{
				// add vertical separator for confirming step
				step === "confirming" && (
					<VerticalSeparator
						className={cn(
							step === "confirming" &&
								state !== "confirming" &&
								"text-success",
						)}
					/>
				)
			}
			{
				// add vertical separator for processing step
				isDeposit && step === "processingOrigin" && (
					<VerticalSeparator
						className={cn(
							step === "processingOrigin" &&
								state !== "processingOrigin" &&
								state !== "confirming"
								? "text-success"
								: state === "confirming" &&
										"text-muted-foreground",
						)}
					/>
				)
			}
		</div>
	);
};

const ViewOnExplorer = ({
	explorerUrl,
	className,
}: { explorerUrl: string; className?: string }) => (
	<HelpTooltip content={"View on explorer"}>
		<a
			className={className}
			target={"_blank"}
			rel={"noreferrer"}
			href={explorerUrl}
		>
			🔗
		</a>
	</HelpTooltip>
);

const VerticalSeparator = ({ className }: ClassNameWithChildren) => (
	<Minus className={cn("my-2 ml-0.5 size-3 rotate-90", className)} />
);
