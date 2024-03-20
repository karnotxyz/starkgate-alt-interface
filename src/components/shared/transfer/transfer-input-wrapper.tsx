import { MotionDiv } from "@/components/shared/framer-motion/motion-div";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { PropsWithChildren } from "react";

interface SwapInputWrapperProps extends PropsWithChildren {
	label: string;
	htmlFor?: string;
	className?: string;
	layoutId?: string;
}

export const innerGroupTextStyle = cva(
	"group-focus-within:text-black group-hover:text-black text-foreground/70 dark:group-focus-within:text-white dark:group-hover:text-white",
);

export const TransferInputWrapper = ({
	label,
	htmlFor,
	className,
	children,
	layoutId,
}: SwapInputWrapperProps) => {
	return (
		<MotionDiv
			transition={{
				type: "spring",
			}}
			layoutId={layoutId}
		>
			<div
				className={cn(
					"relative flex flex-col space-y-2 rounded-lg px-3 pb-8 pt-5",
					"transition-all ease-in-out",
					"group focus-within:border-gray-400 dark:focus-within:border-gray-700",
					"hover:border-gray-400/80 dark:hover:border-gray-700/80",
					"border-2 dark:border-gray-700/50",
					className,
				)}
			>
				<Label
					htmlFor={htmlFor}
					className={cn("pl-1 capitalize", innerGroupTextStyle())}
				>
					{label}
				</Label>
				{children}
			</div>
		</MotionDiv>
	);
};
