import Image from "next/image";
import STARKNET_LOGO from "../../../../assets/logos/starknet.png";
import React from "react";
import { cn } from "@/lib/utils";

export const StarknetLogo = ({ className }: { className?: string }) => {
	return (
		<>
			<Image
				className={cn(
					"rounded-full shadow-md shadow-orange-500/30",
					className,
				)}
				height={25}
				width={25}
				src={STARKNET_LOGO}
				alt={"Starknet"}
				priority
			/>
			<span className={"sr-only"}>Starknet</span>
		</>
	);
};
