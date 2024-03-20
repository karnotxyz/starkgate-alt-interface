import { cn } from "@/lib/utils";
import { comicNeue_700 } from "@/app/fonts";
import { PropsWithChildren } from "react";
import Balancer from "react-wrap-balancer";

interface TitleProps extends PropsWithChildren {
	className?: string;
}

export const Title = ({ className, children }: TitleProps) => {
	return (
		<h1
			className={cn(
				comicNeue_700.className,
				"text-center text-6xl font-bold text-primary",
				className,
			)}
		>
			<Balancer>{children}</Balancer>
		</h1>
	);
};
