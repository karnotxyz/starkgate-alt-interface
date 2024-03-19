import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";

export const rootMetadata: Metadata = {
	title: siteConfig.name,
	description: siteConfig.description,
	metadataBase: new URL("https://yetanotherbridge.com"),
	keywords: [
		"Starknet",
		"StarkNet",
		"StarkGate",
		"Starkware",
		"ZK",
		"Zero Knowledge",
		"DeFi",
		"DeFi Starknet",
		"Bridge",
		"L1",
		"Layer 1",
		"L2",
		"Layer 2",
		"Starknet L2",
		"L1 to L2",
		"L2 to L1",
		"Starknet to Ethereum",
		"Ethereum to Starknet",
		"Starknet DeFi",
		"Starknet Bridge",
		"Starknet Ethereum",
		"Starknet ETH",
	],
	category: "crypto",
	alternates: {
		canonical: "/",
		languages: {
			"en-US": "/en-US",
		},
	}
};

export const viewport: Viewport = {
	themeColor: siteConfig.themeColor,
	width: "device-width",
	initialScale: 1,
	minimumScale: 1,
	maximumScale: 5,
};
