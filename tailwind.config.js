/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0f0f10',
        panel: '#17181a',
        panelSoft: '#1f2124',
        accent: '#d4af37',
        accentSoft: '#f2d675',
      },
    },
  },
  plugins: [],
};
