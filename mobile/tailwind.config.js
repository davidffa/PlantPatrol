import { fontFamily } from "./src/styles/fontFamily";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily
    },
  },
  plugins: [],
}

