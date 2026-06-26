import type { Metadata } from "next";
import { Inter, Comfortaa, Outfit, Quicksand, Righteous } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
      <body className={`${inter.className} ${comfortaa.variable} ${outfit.variable} ${quicksand.variable} ${righteous.variable}`}>
        <div className="app-shell">
          <Header />
          <div className="app-body">
            <Sidebar />
            <div className="main-wrapper">
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
