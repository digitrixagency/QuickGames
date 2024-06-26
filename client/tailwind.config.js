/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': 'rgb(108, 0, 224)',
      },
      screens: {
        'xs': '400px', // custom breakpoint for 400px
      },
    },
  },
  plugins: [],
}

