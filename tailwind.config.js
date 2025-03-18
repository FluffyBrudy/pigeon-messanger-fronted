import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins-bold"]
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-100%)' },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: 'scale(0)' },
          "100": { opacity: "1", transform: 'scale(1)' }
        },
        scaleOut: {
          "0%": { opacity: "1", transform: 'scale(1)' },
          "100": { opacity: "0", transform: 'scale(0)' }
        },
        smoothWidth: {
          "0%": { opacity: "0.1" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        fadeOut: 'fadeOut 0.5s ease-in-out forwards',
        scaleIn: "scaleIn 0.5s ease-in-out forwards",
        scaleOut: "scaleOut 0.5s ease-in-out forwards",
        smoothWidth: "smoothWidth 0.5s ease-in-out forwards"
      },
    },
  },
  plugins: [],
}
