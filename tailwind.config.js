/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mocha: "#FFFFE4", // Off white background 
        darkMocha: "#000000", // For the text
      },
      fontFamily: {
        mono: ["var(--font-space-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
