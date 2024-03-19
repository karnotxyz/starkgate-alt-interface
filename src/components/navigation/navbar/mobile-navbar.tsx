"use client";
import { NavButtons } from "@/components/navigation/navbar/nav-buttons";
import { NavItems } from "@/components/navigation/navbar/nav-items";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export const MobileNavbar = () => {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button className={"md:hidden"} variant={"ghost"}>
					<Menu className={"size-6"} />
					<span className={"sr-only"}>Open menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side={"left"}
				className={
					"flex grow flex-col items-center justify-between pr-0"
				}
			>
				<div
					className={
						"container flex w-full flex-col items-center gap-4 pt-20"
					}
				>
					<NavItems
						handleClick={() => setOpen(false)}
						className={"flex w-full flex-col space-y-2 text-4xl"}
					/>
				</div>
				<NavButtons
					handleClick={() => setOpen(false)}
					className={"md:space-x-8"}
				/>
			</SheetContent>
		</Sheet>
	);
};
