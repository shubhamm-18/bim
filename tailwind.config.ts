import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#20222c",
          muted: "#727583",
          light: "#8e91a0",
        },
        edge: {
          DEFAULT: "#e4e5ec",
          subtle: "#f0f1f5",
        },
        brand: {
          50: "#f5f2ff",
          100: "#ede7fe",
          200: "#dbd0fd",
          300: "#c1acfc",
          400: "#a37efa",
          500: "#8653f5",
          600: "#7040cd",
          700: "#602db9",
          800: "#4f269a",
          900: "#42217c",
        },
        surface: {
          frame: "#f7f8fa",
          card: "#ffffff",
          hover: "#f3f1f8",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
