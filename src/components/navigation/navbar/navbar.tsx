import { MobileNavbar } from "@/components/navigation/navbar/mobile-navbar";
import { NavButtons } from "@/components/navigation/navbar/nav-buttons";
import { NavHeader } from "@/components/navigation/navbar/nav-header";
import { NavItems } from "@/components/navigation/navbar/nav-items";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Navbar() {
	return (
		<NavHeader>
			<div className={cn("flex space-x-2")}>
				<Link href={"/"} key={"home"}>
					<Button
						variant={"ghost"}
						className={cn(
							"inline-flex items-center justify-center",
							"active:scale-95",
							"px-4 py-2 transition-all ease-in-out",
						)}
					>
						<span className={"text-3xl"}>{siteConfig.emoji}</span>
					</Button>
				</Link>
				<NavItems className={"hidden md:inline-flex"} />
			</div>
			<div className={"flex gap-x-2"}>
				<NavButtons className={"hidden space-x-2 md:inline-flex"} />
			</div>
			<MobileNavbar />
		</NavHeader>
	);
}
