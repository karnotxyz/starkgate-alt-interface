"use client";
import { motion, MotionProps, spring } from "framer-motion";
import * as React from "react";

interface MotionDivProps extends MotionProps {
	className?: string;
}

export const MotionDiv = ({
	children,
	className,
	layout,
	layoutId,
}: MotionDivProps) => {
	return (
		<motion.div
			layout={layout ?? true}
			transition={spring}
			className={className}
			layoutId={layoutId ?? ""}
		>
			{children}
		</motion.div>
	);
};
