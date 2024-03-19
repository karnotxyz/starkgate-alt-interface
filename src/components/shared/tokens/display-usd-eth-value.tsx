import {
	useEthToUsd,
	useEthToUsdProps,
} from "@/components/shared/hooks/use-eth-to-usd";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const usdEthValueVariants = cva("text-xs", {
	variants: {
		variant: {
			parenthesis: "before:content-['('] after:content-[')']",
		},
	},
});

interface DisplayUsdEthValue
	extends useEthToUsdProps,
		VariantProps<typeof usdEthValueVariants> {
	className?: string;
	toFixed?: number;
}

export const DisplayUsdEthValue = ({
	amount,
	className,
	variant,
	toFixed = 2,
}: DisplayUsdEthValue) => {
	const { isLoading, amount: usdAmount } = useEthToUsd({ amount });

	if (isLoading) {
		return <></>;
	}

	return (
		<span
			className={cn(
				usdEthValueVariants({ variant }),
				"text-xs",
				className,
			)}
		>
			${usdAmount.toFixed(toFixed)}
		</span>
	);
};
