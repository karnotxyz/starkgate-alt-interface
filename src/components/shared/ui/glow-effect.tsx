import { cn } from "@/lib/utils";
import React from "react";
import { cva, VariantProps } from "class-variance-authority";

const glowVariants = cva(
	// after -> up | before -> down
	"-z-10 flex flex-col place-items-center before:bg-gradient-radial before:absolute before:rounded-full before:blur-2xl before:content-[''] before:-translate-x-1/2 before:translate-y-1/2 sm:before:h-[350px] sm:before:w-[380px] after:bg-gradient-conic after:absolute after:-z-20 after:blur-3xl after:content-[''] after:translate-x-1/3 sm:after:h-[280px] sm:after:w-[380px]",
	{
		variants: {
			variant: {
				swap: "before:from-fuchsia-500 before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-fuchsia-700 before:dark:opacity-30 after:from-indigo-50 after:via-violet-300 after:dark:from-indigo-950 after:dark:via-violet-900 after:dark:opacity-50 after:dark:from-indigo-950 after:dark:via-violet-900 after:dark:opacity-50",
				bridge: "before:from-indigo-50 before:via-violet-300 before:dark:from-indigo-950 before:dark:via-violet-900 before:dark:from-indigo-950 before:dark:via-violet-900 before:dark:opacity-30 after:from-fuchsia-500 after:dark:bg-gradient-to-br after:dark:from-transparent after:dark:to-fuchsia-700 after:dark:opacity-40",
			},
		},
	},
);

interface GlowEffectProps extends VariantProps<typeof glowVariants> {
	className?: string;
}

const GlowEffect = ({ className, variant }: GlowEffectProps) => {
	return (
		<span
			className={cn(
				glowVariants({ variant, className }),
				"animate-pulse",
			)}
		/>
	);
};

export default GlowEffect;
