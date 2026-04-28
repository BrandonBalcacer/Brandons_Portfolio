/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFFFF",
        cream: "#FAFAFA",
        paper: "#FFFFFF",
        ink: "#0A0A0A",
        graphite: "#3A3A3A",
        muted: "#6B6B6B",
        subtle: "#9A9A9A",
        line: "#EAEAEA",
        rule: "#D9D9D9",
        // Editorial deep blue accent — flows from the ocean hero into the rest of the site.
        clay: "#1F3DEC",
        clayDeep: "#0E1E9A",
        clayLight: "#E2E8FF",
        ocean: "#1F3DEC",
        oceanDeep: "#0E1E9A",
        oceanSoft: "#E2E8FF",
        sand: "#F2F2F2",
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
