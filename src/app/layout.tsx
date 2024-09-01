import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/styles/globals.scss";
import QueryClientWrapper from "@/app/ui/components/QueryClientWrapper";
import ResponsivenessProvider from "@/app/ui/components/responsiveness-provider/ResponsivenessProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Braddock | Faça o seu agendamento online!",
  description:
    "Agende seu corte de cabelo, barba, sobrancelha e muito mais na melhor barbearia de Belmonte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ResponsivenessProvider>
          <QueryClientWrapper>{children}</QueryClientWrapper>
        </ResponsivenessProvider>
      </body>
    </html>
  );
}
