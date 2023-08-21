/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: '#04152d',
        black2: '#041226',
        black3: '#020c1b',
        blackLighter: '#1c4b91',
        blackLight: '#173d77',
        pink: '#da2f68',
        orange: '#f89e00',
        gradient: 'linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%)',
      }
    },


  },
  plugins: [],
};
