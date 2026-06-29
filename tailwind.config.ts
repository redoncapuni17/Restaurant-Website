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
          // Noir Emerald — paletë moderne, larg të verdhës/portokallisë
          cream: "#F5F2EA", // ivory — tekst mbi sfond të errët
          beige: "#F1EFE7", // ivory — sfond i ndritshëm
          brown: "#0F2C22", // smerald i thellë — sipërfaqe/tekst i fortë
          dark: "#080B09", // thuajse e zezë me nuancë jeshile — më e errëta
          gold: "#46A87F", // SMERALD — theksi kryesor (zëvendëson arin)
          warm: "#AEBCAD", // sage-grey — tekst dytësor mbi errët
          accent: "#2C7A59", // smerald i thellë — hover
          emerald: "#46A87F", // alias i theksit smerald
          champagne: "#D8C7A2", // champagne i ftohtë — detaje të holla luksoze
          ink: "#10201A", // tekst i pasur mbi sfond të ndritshëm
        },
      },
      fontFamily: {
        // Cormorant Garamond — serif elegant, me kontrast të lartë, për tituj
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 1s ease forwards",
        shimmer: "shimmer 2s infinite",
        "ken-burns": "kenBurns 20s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        "gradient-x": "gradientX 6s ease infinite",
        "shine-sweep": "shineSweep 5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        kenBurns: {
          "0%": { transform: "scale(1.15) translate(0, 0)" },
          "100%": { transform: "scale(1.3) translate(-1.5%, -1.5%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.08)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shineSweep: {
          "0%": { transform: "translateX(-150%) skewX(-20deg)" },
          "60%, 100%": { transform: "translateX(250%) skewX(-20deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
