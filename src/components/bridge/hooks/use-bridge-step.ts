import {
	bridgeDestinationTx,
	bridgeOriginTx,
	bridgeStepAtom,
} from "@/components/bridge/state/atoms";
import { useAtom } from "jotai/index";

export const useBridgeStep = () => {
	const [step, setStep] = useAtom(bridgeStepAtom);
	const [originTxDetails, setOriginTxDetails] = useAtom(bridgeOriginTx);
	const [destinationTxDetails, setDestinationTxDetails] =
		useAtom(bridgeDestinationTx);
	const isIdle = step === "idle";
	const setIdle = () => setStep("idle");
	const isConfirming = step === "confirming";
	const setConfirming = () => setStep("confirming");
	const isProcessingOrigin = step === "processingOrigin";
	const setProcessingOrigin = (hash: string, explorerUrl: string) => {
		setOriginTxDetails({ hash, explorerUrl });
		setStep("processingOrigin");
	};
	const isProcessingDestination = step === "processingDestination";
	const setProcessingDestination = () => {
		setStep("processingDestination");
	};
	const isSuccess = step === "success";
	const setSuccess = (hash: string, explorerUrl: string) => {
		setStep("success");
		setDestinationTxDetails({
			hash,
			explorerUrl,
		});
	};
	const { explorerUrl: destinationExplorerUrl } = destinationTxDetails ?? {};
	const { explorerUrl: originExplorerUrl } = originTxDetails ?? {};
	return {
		step,
		isIdle,
		setIdle,
		isConfirming,
		setConfirming,
		isProcessingOrigin,
		setProcessingOrigin,
		isProcessingDestination,
		setProcessingDestination,
		isSuccess,
		setSuccess,
		originExplorerUrl,
		destinationExplorerUrl,
		setOriginTxDetails,
		setDestinationTxDetails,
	};
};
