import { useQuery } from "@tanstack/react-query";
import { tokensApi } from "@/services/tokens/tokens-api";

export interface useEthToUsdProps {
	amount: number;
}

export const useEthToUsd = ({ amount }: useEthToUsdProps) => {
	const { data, isPending } = useQuery({
		queryKey: ["ethToUsd"],
		queryFn: tokensApi.getETHtoUSD,
		refetchOnWindowFocus: false,
		retry: false,
		refetchOnMount: false,
	});

	if (isPending) {
		return { amount: 0, isLoading: true };
	}

	if (!data) {
		return { amount: 0, isLoading: false };
	}

	const ethToUsd = data.data.ethereum.usd;
	const usdAmount = Number(amount) * ethToUsd;
	return { amount: usdAmount, isLoading: false };
};
