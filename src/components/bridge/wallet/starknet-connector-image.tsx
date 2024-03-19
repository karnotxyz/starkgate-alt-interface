import { cn } from "@/lib/utils";
import { Connector } from "@starknet-react/core";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import SVG from "react-inlinesvg";

export const StarknetConnectorImage = ({
	connector,
	SVGClassName,
	ImageClassName,
}: {
	connector: Connector;
	SVGClassName?: string;
	ImageClassName?: string;
}) => {
	const { theme } = useTheme();
	const systemTheme = useTheme().resolvedTheme;
	let defaultTheme = "dark";
	if (theme === "system" && systemTheme) {
		defaultTheme = systemTheme;
	}
	if (theme !== "system" && theme) {
		defaultTheme = theme;
	}
	const connectorIconDark = connector.icon.dark;
	const connectorIconLight = connector.icon.light;
	let connectorIcon = undefined;
	const SVG_REGEX = /<svg[\s\S]*?<path[\s\S]*?\/>[\s\S]*?<\/svg>/;
	let isSVG = undefined;
	switch (defaultTheme) {
		case "dark":
			isSVG = connectorIconDark && SVG_REGEX.test(connectorIconDark);
			connectorIcon = connectorIconDark;
			break;
		case "light":
			isSVG = connectorIconLight && SVG_REGEX.test(connectorIconLight);
			connectorIcon = connectorIconLight;
			break;
	}

	return (
		<>
			{isSVG
				? connectorIcon && (
						<SVG
							className={cn(
								"size-7 sm:size-8 md:size-9 lg:size-10",
								SVGClassName,
							)}
							src={connectorIcon}
							title={connector.name}
						/>
				  )
				: connectorIcon && (
						<Image
							className={cn("size-7", ImageClassName)}
							height={25}
							width={25}
							src={connectorIcon}
							alt={"wallet_logo"}
						/>
				  )}
		</>
	);
};
