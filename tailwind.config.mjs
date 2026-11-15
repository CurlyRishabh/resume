/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // One accent only. `accent`, `accent2` and `secondary` are the same
      // violet on purpose: older class names keep working, and nothing on
      // the page can introduce a second colour by accident.
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#cbccff",
        secondary: "#9296f0",
        accent: "#9296f0",
        accent2: "#9296f0",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
