import { useBridgeTypeToggle } from "@/components/bridge/hooks/use-bridge-type-toggle";
import { TransferModalData } from "@/components/bridge/transfer/modal";
import { EthereumLogo } from "@/components/shared/logos/ethereum";
import { StarknetLogo } from "@/components/shared/logos/starknet";
import { DisplayUsdEthValue } from "@/components/shared/tokens/display-usd-eth-value";
import { HelpTooltip } from "@/components/shared/ui/help-tooltip";
import { useNetworkUtils } from "@/components/shared/wallet/hooks/use-network-utils";
import { Separator } from "@/components/ui/separator";
import { sliceAddress } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import React from "react";

export const ReviewContent = ({
	fromAddress,
	toAddress,
	amount,
	fee,
	token,
}: TransferModalData & { token: string }) => {
	const { getL1EstimatedTime, getL2EstimatedTime } = useNetworkUtils();
	const [isDeposit] = useBridgeTypeToggle();

	const fromImage = isDeposit ? (
		<EthereumLogo className={"size-4"} />
	) : (
		<StarknetLogo className={"size-4"} />
	);
	const toImage = isDeposit ? (
		<StarknetLogo className={"size-4"} />
	) : (
		<EthereumLogo className={"size-4"} />
	);

	return (
		<div className={"flex grow flex-col gap-y-2 pb-2"}>
			<div className={"relative flex justify-between"}>
				<div className={"flex flex-col gap-y-1"}>
					<span className={"text-muted-foreground"}>From</span>
					<span
						className={
							"flex items-center gap-x-1.5 text-foreground"
						}
					>
						{fromImage}
						<HelpTooltip content={fromAddress}>
							<span>{sliceAddress(fromAddress)}</span>
						</HelpTooltip>
					</span>
				</div>
				<ArrowRight
					className={
						"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
					}
					size={20}
				/>
				<div className={"flex flex-col items-end gap-y-1"}>
					<span className={"text-muted-foreground"}>To</span>
					<span
						className={
							"flex items-center gap-x-1.5 text-foreground"
						}
					>
						{toImage}
						<HelpTooltip content={toAddress}>
							<span>{sliceAddress(toAddress)}</span>
						</HelpTooltip>
					</span>
				</div>
			</div>
			<Separator className={"my-2"} />
			<div className={"flex justify-between"}>
				<span className={"text-muted-foreground"}>Amount</span>
				<div className={"text-foreground"}>
					<span>{`${amount} ${token}`}</span>{" "}
					<DisplayUsdEthValue
						variant={"parenthesis"}
						className={"text-sm"}
						amount={amount}
					/>
				</div>
			</div>
			{isDeposit && (
				<div className={"flex justify-between"}>
					<span
						className={
							"flex items-center gap-x-2 text-muted-foreground"
						}
					>
						Fee
						<HelpTooltip
							className={"mt-0.5"}
							content={
								isDeposit
									? "Fee paid to Starknet for handling the deposit."
									: "Network operational costs."
							}
						/>
					</span>
					<div className={"text-foreground"}>
						<span>{`${fee} ${token}`}</span>{" "}
						<DisplayUsdEthValue
							variant={"parenthesis"}
							className={"text-sm"}
							amount={Number(fee)}
						/>
					</div>
				</div>
			)}
			<div className={"flex justify-between"}>
				<span
					className={
						"flex items-center gap-x-2 text-muted-foreground"
					}
				>
					Estimated time
				</span>
				<span className={"text-foreground"}>
					{isDeposit
						? `~${getL1EstimatedTime()} minutes`
						: `~${getL2EstimatedTime()} hours`}
				</span>
			</div>
		</div>
	);
};
