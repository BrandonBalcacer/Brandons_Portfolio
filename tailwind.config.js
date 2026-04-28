/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F6F1E8",
        cream: "#FBF7EF",
        paper: "#FFFFFF",
        ink: "#16100E",
        graphite: "#3A2F2C",
        muted: "#766962",
        subtle: "#9B8E86",
        line: "#E7DFD0",
        rule: "#D2C7B3",
        // Ramapo maroon as primary accent (replaces the old clay terracotta).
        clay: "#7A1F2B",
        clayDeep: "#4F1118",
        clayLight: "#F0DCE0",
        maroon: "#7A1F2B",
        maroonDeep: "#4F1118",
        gold: "#C9A55A",
        goldDeep: "#9C7E3D",
        sand: "#EAE2D0",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "Impact", "Helvetica Neue", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        jersey: "0.02em",
      },
      boxShadow: {
        card: "0 1px 0 rgba(22,16,14,0.04), 0 12px 30px -16px rgba(22,16,14,0.18)",
        soft: "0 0 0 1px rgba(22,16,14,0.06)",
        bold: "0 28px 60px -24px rgba(122,31,43,0.35)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "slow-spin": "spin 18s linear infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-fast": "marquee 22s linear infinite",
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
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
