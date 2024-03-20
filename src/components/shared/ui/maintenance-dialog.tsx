import { ToggleTypeButton } from "@/components/bridge/transfer/toggle-type-button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { PropsWithChildren } from "react";

interface MaintenanceDialogProps extends PropsWithChildren {
	isUnderMaintenance?: boolean;
	switchTo: "Starknet" | "Ethereum";
	workingOn?: string;
}

export const MaintenanceDialog = ({
	children,
	workingOn = "service",
	isUnderMaintenance,
	switchTo,
}: MaintenanceDialogProps) => {
	const title = "Ongoing Maintenance";
	const description = `🚧 We are currently working on making the ${workingOn} even better, however that means it can't be used atm so please try again later.`;

	return (
		<>
			{children}
			<Dialog defaultOpen={isUnderMaintenance}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription
							className={"px-2 pb-3 pt-6 leading-8"}
						>
							{description}
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<ToggleTypeButton
							switchTo={switchTo}
							className={"w-full"}
						/>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
