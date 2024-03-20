"use client";

import { useBridgeTypeToggle } from "@/components/bridge/hooks/use-bridge-type-toggle";
import { useBridgeInputStore } from "@/components/bridge/state/store";
import { TransferInputWrapper } from "@/components/shared/transfer/transfer-input-wrapper";
import { L1Balance, L2Balance } from "@/components/shared/wallet/balance";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
	ChangeEvent,
	PropsWithChildren,
	Suspense,
	useDeferredValue,
	useId,
} from "react";
import { useShallow } from "zustand/react/shallow";
import { DisplayUsdEthValue } from "@/components/shared/tokens/display-usd-eth-value";

export const BridgeTokenInput = ({ children }: PropsWithChildren) => {
	const { tokenToPay, setTokenToPayInput } = useBridgeInputStore(
		useShallow((state) => ({
			tokenToPay: state.tokenToPay,
			setTokenToPayInput: state.setTokenToPayInput,
			addressToReceive: state.addressToReceive,
			setAddressToReceive: state.setAddressToReceive,
		})),
	);
	const id = useId();
	const [isDeposit] = useBridgeTypeToggle();
	const deferredInput = useDeferredValue(tokenToPay.input);

	const handleOnChange = (
		event: ChangeEvent<HTMLInputElement>,
		setToken: (num: number | null) => void,
	) => {
		const value = event.target.value;
		value ? setToken(parseFloat(value)) : setToken(null);
	};

	return (
		<TransferInputWrapper
			label={"Send"}
			htmlFor={id}
			className={"relative"}
		>
			{children}
			<Input
				onWheel={(e) => e.currentTarget.blur()}
				autoComplete={"off"}
				autoCorrect={"off"}
				id={id}
				placeholder={"0"}
				title={"Amount to bridge"}
				type={"number"}
				value={tokenToPay.input ?? ""}
				className={cn(
					// base style
					"appearance-none rounded border-none bg-transparent py-2 pl-1 text-5xl slashed-zero leading-tight focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent",
					// remove up/down arrows from type number input
					"[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
					// padding for logos
					"pr-32",
				)}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					handleOnChange(e, setTokenToPayInput);
				}}
			/>
			<Suspense
				fallback={
					<Skeleton
						className={"absolute bottom-2.5 right-5 h-4 w-44"}
					/>
				}
			>
				{isDeposit ? (
					<L1Balance token={tokenToPay.coin.address} />
				) : (
					<L2Balance token={tokenToPay.coin.address} />
				)}
			</Suspense>
			<DisplayUsdEthValue
				className={"absolute bottom-2.5 left-4 text-muted-foreground"}
				amount={deferredInput ?? 0}
				toFixed={2}
			/>
		</TransferInputWrapper>
	);
};
