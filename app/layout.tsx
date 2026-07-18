import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans, Outfit, Inter } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "../components/ConditionalHeader";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Frontier Atlas | AI Research Intelligence",
  description: "The open platform for discovering and advancing frontier AI research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${plusJakarta.variable} ${outfit.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <div className="app-shell">
          <ConditionalHeader />
          <div className="main-wrapper">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

