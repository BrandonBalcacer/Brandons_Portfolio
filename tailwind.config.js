/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F5F1EA",
        cream: "#FAF7F1",
        paper: "#FFFFFF",
        ink: "#1F1E1D",
        graphite: "#3D3A36",
        muted: "#6B6963",
        subtle: "#8F8B82",
        line: "#E5DFD2",
        rule: "#D4CDB9",
        clay: "#CC785C",
        clayDeep: "#A85A41",
        clayLight: "#E8B79E",
        sand: "#EAE2D0",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        card: "0 1px 0 rgba(31,30,29,0.04), 0 8px 24px -12px rgba(31,30,29,0.10)",
        soft: "0 0 0 1px rgba(31,30,29,0.06)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "slow-spin": "spin 18s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
