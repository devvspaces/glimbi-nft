"use client";

import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";
import { UmiProvider } from "../utils/UmiProvider";
import "@solana/wallet-adapter-react-ui/styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { SolanaTimeProvider } from "@/utils/SolanaTimeContext";
import { theme } from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
  let endpoint = "https://api.devnet.solana.com";
  if (process.env.NEXT_PUBLIC_RPC) {
    endpoint = process.env.NEXT_PUBLIC_RPC;
  }
  const wallets = useMemo(() => [], []);
  return (
    <ChakraProvider theme={theme}>
      <WalletProvider wallets={wallets}>
        <UmiProvider endpoint={endpoint}>
          <WalletModalProvider>
            <SolanaTimeProvider>{children}</SolanaTimeProvider>
          </WalletModalProvider>
        </UmiProvider>
      </WalletProvider>
    </ChakraProvider>
  );
}
