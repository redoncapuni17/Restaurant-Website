import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pupa: {
          // Warm peach — matched to puparestaurant.com
          cream: "#FBF0E4", // soft peach — text on dark photo overlays
          beige: "#F5DEC4", // peach — page / header / footer surface
          brown: "#3D2A1F", // dark brown — primary text / ink
          dark: "#1A1410", // warm near-black — photo overlays
          gold: "#B8956C", // muted bronze/tan — accent
          warm: "#7A6352", // secondary text on light
          accent: "#8F6B45", // stronger accent / hover
          emerald: "#B8956C", // alias kept for existing class usage
          champagne: "#E8D4B8", // soft peach-gold — banners
          ink: "#3D2A1F", // text on light surfaces
        },
      },
      fontFamily: {
        // Cormorant Garamond — serif elegant, me kontrast të lartë, për tituj
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
