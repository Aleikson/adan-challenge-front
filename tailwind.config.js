/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#334155',
        secondary: '#64748b',
        neutral: '#e2e8f0',
      },
    },
  },
  plugins: ['@tailwindcss/line-clamp'],
}