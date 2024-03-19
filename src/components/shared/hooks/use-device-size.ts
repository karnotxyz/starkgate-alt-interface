"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
	const [value, setValue] = useState(false);

	useEffect(() => {
		function onChange(event: MediaQueryListEvent) {
			setValue(event.matches);
		}

		const result = matchMedia(query);
		result.addEventListener("change", onChange);
		setValue(result.matches);

		return () => result.removeEventListener("change", onChange);
	}, [query]);

	return value;
}

type DeviceSize = {
	isSmallDevice: boolean;
	isMediumDevice: boolean;
	isLargeDevice: boolean;
	isExtraLargeDevice: boolean;
};

export const useDeviceSize = (): DeviceSize => {
	const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
	const isMediumDevice = useMediaQuery("only screen and (max-width : 992px)");
	const isLargeDevice = useMediaQuery("only screen and (max-width : 1200px)");
	const isExtraLargeDevice = useMediaQuery(
		"only screen and (max-width : 1600px)",
	);

	return {
		isSmallDevice,
		isMediumDevice,
		isLargeDevice,
		isExtraLargeDevice,
	};
};
