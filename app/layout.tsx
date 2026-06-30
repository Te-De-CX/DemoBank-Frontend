import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// const syne = Syne({
//   subsets: ["latin"],
//   variable: "--font-syne",
//   display: "swap",
//   weight: ["400", "500", "600", "700", "800"],
// });

export const metadata: Metadata = {
  title: "DigiBank — Banking made beautiful",
  description: "Modern digital banking with real-time updates, virtual cards, and AI-powered savings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={inter.className}>
      <Providers>
        {children}
      </Providers>
    </body>
  </html>
  );
}