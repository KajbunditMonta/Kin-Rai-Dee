/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'notoSans' : ['Noto-sans', 'sans-serif'],
        'notoSansBold' : ['Noto-sans-bold', 'sans-serif']
      },
    },
  },
  plugins: [],
}