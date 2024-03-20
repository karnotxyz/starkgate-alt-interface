"use client";

import { useBridgeTypeToggle } from "@/components/bridge/hooks/use-bridge-type-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ToggleTypeButtonProps = {
	switchTo: "Starknet" | "Ethereum";
	className?: string;
};
export const ToggleTypeButton = ({
	className,
	switchTo,
}: ToggleTypeButtonProps) => {
	const [, setToggle] = useBridgeTypeToggle();
	return (
		<Button
			variant={"outline"}
			className={cn(className)}
			onClick={setToggle}
		>
			{`Switch to transfer to ${switchTo}`}
		</Button>
	);
};
