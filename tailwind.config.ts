import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#282219",
        moss: "#3f6f63",
        coral: "#b94a2c",
        marigold: "#f4b942",
        lavender: "#8f78c8",
        sky: "#7ab7d8",
        paper: "#fbfbf8",
      },
      boxShadow: {
        card: "0 24px 70px rgba(33, 31, 42, 0.12)",
        soft: "0 14px 34px rgba(33, 31, 42, 0.09)",
      },
      fontFamily: {
        sans: [
          "var(--font-interface)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
