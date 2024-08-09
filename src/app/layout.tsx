import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { RecoilProviders } from "@/components/RecoilProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Origyn",
  description: "Origyn is a platform to sell digital goods using your World ID and creator provenance and rights using on-chain attestations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <RecoilProviders>
            {children}
          </RecoilProviders>
        </Providers>
      </body>
    </html>
  );
}
