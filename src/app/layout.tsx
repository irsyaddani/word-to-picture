import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { BackgroundMusic } from "@/components/audio/background-music";

import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Word to Picture",
  description: "Aplikasi belajar Bahasa Inggris berbasis gambar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${nunito.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <BackgroundMusic />
        {children}
      </body>
    </html>
  );
}
