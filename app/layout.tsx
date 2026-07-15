import type { Metadata } from "next";
import "./globals.css";
import ConditionalHeader from "../components/ConditionalHeader";

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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" />
      </head>
      <body>
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

