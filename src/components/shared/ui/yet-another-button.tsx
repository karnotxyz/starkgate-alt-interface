import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type * as React from "react";
import { forwardRef } from "react";

export const buttonVariants = cva(
	"shadow-inner dark:text-foreground bg-primary/80 hover:bg-primary dark:bg-primary/40 dark:hover:bg-primary/50 transition-all ease-&lsqb;cubic-bezier(0.95,0.05,0.795,0.035)&rsqb; active:scale-95 hover:shadow-primary/50 hover:shadow-lg",
	{
		variants: {
			variant: {
				nav: "hover:scale-[1.02]",
				card: "text-xl p-7 w-full",
				referral: "text-base p-6 w-full shadow-none hover:shadow-none",
			},
			defaultVariants: { variant: "card" },
		},
	},
);

interface YetAnotherButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	loading?: boolean;
}

const YetAnotherButton = forwardRef<HTMLButtonElement, YetAnotherButtonProps>(
	({ loading, className, variant, ...props }, ref) => {
		return (
			<Button
				ref={ref}
				className={cn(
					buttonVariants({ variant }),
					className,
					loading && "gap-2",
				)}
				{...props}
			>
				{loading ? <Loader2 className={"size-5 animate-spin"} /> : null}
				{props.children}
			</Button>
		);
	},
);
YetAnotherButton.displayName = "YetAnotherButton";
export { YetAnotherButton };
