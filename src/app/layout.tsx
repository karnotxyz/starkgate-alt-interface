import { baseFont } from "@/app/fonts";
import { rootMetadata as metadata, viewport } from "@/app/metadata";
import { Footer } from "@/components/navigation/footer";
import { Navbar } from "@/components/navigation/navbar/navbar";
import Providers from "@/components/shared/providers/providers";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { PropsWithChildren } from "react";
export { metadata };
export { viewport };

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en-US" suppressHydrationWarning>
			<body
				className={cn(
					baseFont.className,
					"subpixel-antialiased",
					"flex min-h-screen flex-col",
					"bg-background",
					"selection:bg-accent/80 dark:selection:bg-accent/80",
				)}
			>
				<Providers>
					<Navbar />
					<main className="mt-24 flex grow flex-col items-center justify-center space-y-4 md:px-4">
						{children}
					</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
