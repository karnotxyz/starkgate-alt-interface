"use client";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import React, { PropsWithChildren } from "react";

interface HelpTooltipProps extends PropsWithChildren {
	delayDuration?: number;
	className?: string;
	content: string;
}

export const HelpTooltip = ({
	delayDuration = 150,
	className,
	content,
	children,
}: HelpTooltipProps) => {
	return (
		<TooltipProvider delayDuration={delayDuration}>
			<Tooltip>
				<TooltipTrigger asChild>
					{children ?? (
						<HelpCircle className={cn("size-4", className)} />
					)}
				</TooltipTrigger>
				<TooltipContent>
					<p>{content}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
