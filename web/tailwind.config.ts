import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#4F8E2F",
        "dark-green": "#32671F",
        beje: "#DCC9B6",
        brown: "#5A3A31"
      },
      fontFamily: {
        sans: 'var(--font-inter)',
        alt: 'var(--font-roboto)'
      }
    },
  },
  plugins: [
    daisyui,
  ],
};
export default config;
