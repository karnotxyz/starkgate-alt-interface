import { ModeToggle } from "@/components/navigation/navbar/mode-toggle";
import { cn } from "@/lib/utils";
import React from "react";

export const NavButtons = ({
	className,
}: {
	className?: string;
	handleClick?: () => void;
}) => {
	return (
		<div
			className={cn(
				"flex w-full items-center justify-between gap-3 px-10",
				"md:w-auto md:flex-row md:gap-0 md:px-0",
				className,
			)}
		>
			<ModeToggle />
		</div>
	);
};
