"use client";

import { cn } from "@/lib/utils";
import { useWindowScroll } from "@uidotdev/usehooks";
import { PropsWithChildren } from "react";

export const NavHeader = ({ children }: PropsWithChildren) => {
	const [{ y }] = useWindowScroll();
	const isScrolled = y && y > 0;

	return (
		<nav
			className={cn(
				"fixed z-50",
				"flex w-full items-center justify-between p-5",
				"transition-all duration-300 ease-in-out",
				isScrolled &&
					"bg-background/50 shadow-sm backdrop-blur-2xl transition ease-in-out",
			)}
		>
			{children}
		</nav>
	);
};
