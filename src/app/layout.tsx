import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/styles/globals.scss";
import QueryClientWrapper from "@/app/ui/components/QueryClientWrapper";
import ResponsivenessProvider from "@/app/ui/components/responsiveness-provider/ResponsivenessProvider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

const interItalic = Inter({
  style: "italic",
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: true,
  variable: "--font-inter-italic",
});

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
      <body className={`${interItalic.variable} ${inter.className}`}>
        <ResponsivenessProvider>
          <QueryClientWrapper>{children}</QueryClientWrapper>
        </ResponsivenessProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
