"use client";

import { useProvider } from "@starknet-react/core";
import { RpcProvider } from "starknet";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { hexToNumber } from "viem";

type BlockWithTxHashes = {
	l1_gas_price: {
		price_in_wei: string;
	};
};

export const useL2FeeData = (
	props: Omit<
		UseQueryOptions<
			BlockWithTxHashes,
			unknown,
			BlockWithTxHashes,
			[string]
		>,
		"queryKey" | "queryFn"
	> = {},
) => {
	const { provider } = useProvider();
	const rpcProvider = provider as RpcProvider;
	let l2GasPriceInWei = undefined;

	const { data, ...rest } = useQuery({
		queryKey: ["l2-fee-data"],
		queryFn: async (): Promise<BlockWithTxHashes> => {
			try {
				return await rpcProvider.getBlockWithTxHashes();
			} catch (error) {
				console.error(error);
				return { l1_gas_price: { price_in_wei: "0x0" } };
			}
		},
		...props,
	});

	if (data) {
		l2GasPriceInWei = hexToNumber(
			data.l1_gas_price.price_in_wei as `0x${string}`,
		);
	}

	return { l2GasPriceInWei, ...rest };
};
