import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--text-dark)",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "var(--font-plus-jakarta)",
          "Plus Jakarta Sans",
          "Outfit",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
