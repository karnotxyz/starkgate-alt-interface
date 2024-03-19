import { FC, useEffect, useState } from "react";
import { Connector, useConnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MetamaskLogo } from "@/components/bridge/wallet/metamask-logo";
import { cn } from "@/lib/utils";
import { innerGroupTextStyle } from "@/components/shared/transfer/transfer-input-wrapper";
import { errorCodes } from "@/components/bridge/wallet/error-constants";

interface ProviderRpcError extends Error {
	message: string;
	code: number;
	data?: unknown;
}

const ConnectMetamask: FC = () => {
	const { connect, connectors, error, isPending } = useConnect();
	const customError = error as ProviderRpcError;

	if (customError) {
		switch (customError.code) {
			case errorCodes.rpc.resourceUnavailable:
				toast.error(
					"Connection to wallet was denied while locked. Try unlocking your wallet and try again.",
				);
				break;
			default:
				toast.error("Failed to connect to wallet. Try again.");
				break;
		}
	}

	return (
		<>
			{connectors.map(
				(connector) =>
					// FIXME: hardcoded metamask, find better solution (evaluate use of
					connector.name === "MetaMask" && (
						<WalletOption
							key={connector.uid}
							connector={connector}
							onClick={() => {
								connect({ connector });
							}}
							isPending={isPending}
						/>
					),
			)}
		</>
	);
};

const WalletOption = ({
	connector,
	onClick,
	isPending,
}: {
	connector: Connector;
	onClick: () => void;
	isPending: boolean;
}) => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		(async () => {
			const provider = await connector.getProvider();
			setReady(!!provider);
		})();
	}, [connector]);

	return (
		<Button
			variant={"outline"}
			className={cn(
				"w-fit gap-2 bg-transparent text-xs sm:text-sm md:text-base",
				innerGroupTextStyle(),
			)}
			disabled={!ready || isPending}
			key={connector.id}
			onClick={onClick}
		>
			{connector.name.toLowerCase() === "metamask" && <MetamaskLogo />}
			{!ready
				? `${connector.name} is unavailable.`
				: // FIXME: correct loading state
				  isPending
				  ? "Connecting..."
				  : "Connect Ethereum Wallet"}
		</Button>
	);
};

export default ConnectMetamask;
