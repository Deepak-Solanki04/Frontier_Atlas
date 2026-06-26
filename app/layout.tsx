import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
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
    <html lang="en">
      <body className={inter.className}>
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
