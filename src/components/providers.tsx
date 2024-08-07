"use client";

import * as React from "react";
import { WagmiProvider, createConfig } from "wagmi";
import { Chain } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

interface ProvidersProps {
  children: React.ReactNode;
}

const origynNetwork: Chain = {
  id: 86420,
  name: "Origyn Network",
  rpcUrls: {
    default: { http: ["https://rpc-origyn-network-ytbrtr4djq.t.conduit.xyz"] },
    public: { http: ["https://rpc-origyn-network-ytbrtr4djq.t.conduit.xyz"] },
  },
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      url: "https://explorer.origyn.alphadevs.dev",
      name: "Origyn Explorer",
    },
  },
};

const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
    chains: [origynNetwork],
    appName: "Photon",
  })
);

const queryClient = new QueryClient();

export function Providers({ children, ...props }: ProvidersProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="rounded">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
