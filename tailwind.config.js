/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-dark)",
        foreground: "var(--text-main)",
        border: "rgba(255, 255, 255, 0.1)",
        primary: {
          DEFAULT: "var(--primary-gold)",
          dark: "var(--primary-gold-dark)",
        },
        muted: {
          DEFAULT: "var(--text-muted)",
          foreground: "var(--text-muted)",
        },
      },
    },
  },
  plugins: [],
}
