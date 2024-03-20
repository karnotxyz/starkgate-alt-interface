import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function sliceAddress(address: string, length = 6) {
	return `${address.slice(0, length)}...${address.slice(-4)}`;
}

export const isDevEnv = process.env.NODE_ENV === "development";
