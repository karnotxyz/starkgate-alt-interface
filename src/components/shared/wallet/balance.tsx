"use client";

import { useL2NetworkCheck } from "@/components/bridge/hooks/use-l2-network-check";
import { useBridgeInputStore } from "@/components/bridge/state/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	useAccount as useL2Account,
	useBalance as useL2Balance,
} from "@starknet-react/core";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { useAccount as useL1Account, useBalance as useL1Balance } from "wagmi";
import { useShallow } from "zustand/react/shallow";
import { formatUnits } from "viem";
import { DisplayUsdEthValue } from "@/components/shared/tokens/display-usd-eth-value";

interface BalanceProps {
	token?: string;
	className?: string;
}

const BalanceButton = ({
	children,
	className,
	balance,
	onClick,
}: {
	children: ReactNode;
	className?: string;
	balance: number;
	onClick?: (balance: number) => void;
}) => {
	const handleClick = () => {
		onClick?.(balance);
	};

	if (balance === null || balance === undefined) {
		return null;
	}

	return (
		<Button
			type={"button"}
			variant={"ghost"}
			size={"sm"}
			onClick={handleClick}
			className={cn(
				"absolute bottom-0 right-5 gap-x-1",
				"text-xs text-foreground/70 hover:bg-transparent",
				"m-0 p-0",
				className,
			)}
		>
			{children}
		</Button>
	);
};

function useStoredBalance(toStore: string | null) {
	const { balance, setBalance } = useBridgeInputStore(
		useShallow((state) => ({
			balance: state.balance,
			setBalance: state.setBalance,
		})),
	);

	useEffect(() => {
		if (!toStore) {
			return;
		}
		setBalance(parseFloat(toStore));
	}, [toStore, setBalance]);

	return { balance, setBalance };
}

export const L1Balance = ({ className }: BalanceProps) => {
	const { address, status } = useL1Account();
	const { data, error } = useL1Balance({
		address: address,
	});
	const formatted = formatUnits(
		data?.value ?? BigInt(0),
		data?.decimals ?? 18,
	);
	const { balance } = useStoredBalance(formatted);
	const { setTokenToPayInput: setBalance } = useBridgeInputStore(
		useShallow((state) => ({
			setTokenToPayInput: state.setTokenToPayInput,
		})),
	);

	useEffect(() => {
		if (!error) return;
		toast.error(error.message);
	}, [error]);

	if (!data || status === "disconnected") {
		return null;
	}

	if (error) {
		return null;
	}

	return (
		<BalanceButton
			balance={balance}
			onClick={setBalance}
			className={className}
		>
			Balance: {formatted} {data.symbol}
			<DisplayUsdEthValue variant={"parenthesis"} amount={balance} />
		</BalanceButton>
	);
};

export const L2Balance = ({ token, className }: BalanceProps) => {
	const { isNetworkSame, currentNetwork } = useL2NetworkCheck();
	const { address, isDisconnected } = useL2Account();
	const { data, error } = useL2Balance({
		address,
		token: token,
	});
	const { balance } = useStoredBalance(data?.formatted ?? null);
	const { setTokenToPayInput: setBalance } = useBridgeInputStore(
		useShallow((state) => ({
			setTokenToPayInput: state.setTokenToPayInput,
		})),
	);

	if (!isNetworkSame && !isDisconnected) {
		const capitalisedNetwork =
			currentNetwork?.charAt(0).toUpperCase() + currentNetwork?.slice(1);
		return (
			<BalanceButton
				balance={balance}
				onClick={() => {}}
				className={className}
			>
				Change wallet network to {capitalisedNetwork}
			</BalanceButton>
		);
	}

	if (data === undefined || isDisconnected) {
		return null;
	}

	if (error) {
		toast.error(error.message);
		return null;
	}

	return (
		<BalanceButton
			balance={balance}
			onClick={() => setBalance(balance)}
			className={className}
		>
			Balance: {data.formatted} {data.symbol}
			<DisplayUsdEthValue variant={"parenthesis"} amount={balance} />
		</BalanceButton>
	);
};
