import type { Metadata } from "next";
import { Inter, Comfortaa, Outfit, Quicksand, Righteous } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

const comfortaa = Comfortaa({ subsets: ["latin"], variable: "--font-comfortaa" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" });
const righteous = Righteous({ weight: "400", subsets: ["latin"], variable: "--font-righteous" });

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&family=Fredoka:wght@600;700&family=Righteous&family=Quicksand:wght@700&family=Outfit:wght@700&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} ${comfortaa.variable} ${outfit.variable} ${quicksand.variable} ${righteous.variable}`}>
        <div className="app-shell">
          <Header />
          <div className="app-body">
            <Sidebar />
            <div className="main-wrapper">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
