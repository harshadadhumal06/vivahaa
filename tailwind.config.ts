import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF6EF",
        parchment: "#F3EBDD",
        forest: {
          DEFAULT: "#1F3329",
          light: "#2F4A3C",
          dark: "#142720",
        },
        gold: {
          DEFAULT: "#B8935F",
          light: "#D4B483",
          dark: "#8F6E43",
        },
        rose: {
          DEFAULT: "#D9B8B0",
          light: "#EAD9D3",
        },
        charcoal: "#2B2620",
        line: "#DED2B8",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drawLine: {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(31, 51, 41, 0.25)",
        card: "0 10px 40px -12px rgba(31, 51, 41, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
