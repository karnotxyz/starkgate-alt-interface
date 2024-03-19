import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { DisplayNetworks } from "@/components/bridge/wallet/display-networks";

export const anchorStyle = cva("font-bold hover:underline");

export function Footer() {
	return (
		<footer
			className={cn(
				"flex w-full items-center justify-between gap-8 p-6 text-xs sm:text-base md:gap-2",
			)}
		>
			<p>
				Made with 🍭 by{" "}
				<a
					target={"_blank"}
					rel={"noreferrer"}
					className={cn(anchorStyle())}
					href="https://yetanothercompany.xyz"
				>
					Yet Another Company
				</a>{" "}
				and forged by{" "}
				<a
					target={"_blank"}
					rel={"noopener noreferrer"}
					className={cn(anchorStyle())}
					href="https://lambdaclass.com"
				>
					LambdaClass
				</a>
				.
			</p>
			<DisplayNetworks />
		</footer>
	);
}
