import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        card: "hsl(var(--card))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        destructive: "hsl(var(--destructive))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: [
          '"Inter"',
          '"Inter Fallback"',
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 6px rgba(0,0,0,0.06)",
        soft: "0 4px 24px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
