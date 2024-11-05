import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'min-425': '425px',
        'min-820': '820px',
        'landscape-1366': { 'raw': '(min-width: 1366px) and (orientation: landscape)' },
        'portrait-1024': { 'raw': '(min-width: 1024px) and (max-height: 1366px) and (orientation: portrait)' },
      },
      keyframes: {
        drift1: {
          from: { transform: 'translate(0, 0) scale(1)' },
          to: { transform: 'translate(0px, 20px) scale(1.1)' },
        },
        drift2: {
          from: { transform: 'translate(0, 0) scale(1)' },
          to: { transform: 'translate(20px, 10px) scale(1.1)' },
        },
        drift3: {
          from: { transform: 'translate(0, 0) scale(1)' },
          to: { transform: 'translate(-30px, 20px) scale(1.1)' },
        },
        drift4: {
          from: { transform: 'translate(0, 0) scale(1)' },
          to: { transform: 'translate(20px, 30px) scale(1.1)' },
        }, 
        drift5: {
          from: { transform: 'translate(0, 0) scale(1)' },
          to: { transform: 'translate(20px, 30px) scale(1.1)' },
        },
        drift6: {
          from: { transform: 'translate(0, 0) scale(1)' },
          to: { transform: 'translate(20px, 30px) scale(1.1)' },
        }
      },
      animation: {
        drift1: 'drift1 6s ease-in-out infinite alternate',
        drift2: 'drift2 6s ease-in-out infinite alternate',
        drift3: 'drift3 6s ease-in-out infinite alternate',
        drift4: 'drift4 6s ease-in-out infinite alternate',
        drift5: 'drift5 6s ease-in-out infinite alternate',
        drift6: 'drift6 6s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
export default config;
