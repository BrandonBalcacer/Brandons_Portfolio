/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0A0A0A",
        elevated: "#0F0F0F",
        ink: "#FAFAFA",
        graphite: "#A3A3A3",
        muted: "#737373",
        subtle: "#525252",
        line: "#1F1F1F",
        rule: "#2A2A2A",
        accent: "#3B82F6",
        accentDeep: "#1E40AF",
        accentSoft: "#1E3A8A",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "Impact", "Helvetica Neue", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        eyebrow: "0.28em",
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.04), 0 12px 30px -16px rgba(0,0,0,0.7)",
        glow: "0 0 40px -10px rgba(59,130,246,0.6)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
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
