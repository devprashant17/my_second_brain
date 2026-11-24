/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Replaces the default `font-sans` (applies globally)
        sans: ['"Manrope"', 'sans-serif'],
        // Or adds a separate `font-manrope` utility class
        manrope: ['"Manrope"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
