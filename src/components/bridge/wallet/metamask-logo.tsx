import React, { FC } from "react";
import Image from "next/image";
import METAMASK_LOGO from "../../../../assets/logos/metamask.png";
import { cn } from "@/lib/utils";

interface MetamaskLogoProps {
	className?: string;
}

const MetamaskLogo: FC<MetamaskLogoProps> = ({ className }) => {
	return (
		<Image
			className={cn("size-6", className)}
			height={25}
			width={25}
			src={METAMASK_LOGO}
			alt={"wallet_logo"}
			priority
		/>
	);
};

export { MetamaskLogo };
