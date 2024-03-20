"use client";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const usePaste = (options: UseMutationOptions) => {
	return useMutation({
		mutationFn: async () => await navigator.clipboard.readText(),
		...options,
	});
};
