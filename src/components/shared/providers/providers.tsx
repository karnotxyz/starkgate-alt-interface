import EthereumProvider from "@/components/bridge/providers/ethereum-provider";
import { StarknetProvider } from "@/components/bridge/providers/starknet-providers";
import { ReactQueryProvider } from "@/components/shared/providers/react-query";
import { ThemeProvider } from "@/components/shared/providers/theme-provider";
import { Provider } from "jotai";
import NextTopLoader from "nextjs-toploader";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { siteConfig } from "@/config/site";

const Providers = ({ children }: PropsWithChildren) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<EthereumProvider>
				<ReactQueryProvider>
					<Provider>
						<StarknetProvider>
							<NextTopLoader
								color={siteConfig.themeColor}
								zIndex={9999}
								showSpinner={false}
							/>
							{children}
							<Toaster
								visibleToasts={1}
								position={"top-center"}
								theme={"system"}
								closeButton
								richColors
								duration={8000}
							/>
						</StarknetProvider>
					</Provider>
				</ReactQueryProvider>
			</EthereumProvider>
		</ThemeProvider>
	);
};

export default Providers;
