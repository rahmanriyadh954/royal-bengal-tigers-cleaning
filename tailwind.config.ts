// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // এই লাইনটা নিশ্চিত করো যেন থাকে
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFD700', // Light Golden Yellow
          hoverYellow: '#E6C200',
          dark: '#0F172A',   // Professional Slate for text
          light: '#F8FAFC',  // Subtle background
        },
      },
    },
  },
  plugins: [],
};
export default config;