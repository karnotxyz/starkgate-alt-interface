import ETH_LOGO from "../../../../assets/logos/eth.png";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const EthereumLogo = ({ className }: { className?: string }) => {
	return (
		<>
			<Image
				className={cn(
					"rounded-full shadow-md shadow-indigo-500/50",
					className,
				)}
				height={25}
				width={25}
				src={ETH_LOGO}
				alt={"Ethereum"}
				priority
			/>
			<span className={"sr-only"}>Ethereum</span>
		</>
	);
};
