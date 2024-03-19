"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { siteConfig } from "@/config/site";

interface NavItemsProps {
	className?: string;
	handleClick?: () => void;
}

export const NavItems = ({ className, handleClick }: NavItemsProps) => {
	const pathname = usePathname();

	return (
		<>
			{siteConfig.mainNav.map(({ title, href }) => {
				if (href === "/") return null;

				return (
					<Link className={className} href={href} key={href}>
						<Button
							onClick={handleClick}
							className={cn(
								"capitalize transition-all ease-in-out hover:scale-105 active:scale-95",
								"text-2xl md:text-base",
								"p-12 md:px-4 md:py-2",
								pathname === `/${href}`
									? "text-foreground"
									: "text-foreground/70",
							)}
							variant={"ghost"}
						>
							{title}
						</Button>
					</Link>
				);
			})}
		</>
	);
};
