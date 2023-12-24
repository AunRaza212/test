/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{html,js}"],
  theme: {
    screens: {
      'xm': '480px',
      '3xl':'1920px',
      'sm': '640px',
      'md': '768px',
      'lg': '976px',
      'xl': '1440px',
      '2xl':'1536px'
    },
    extend: {
    
    },
  },
  plugins: [],
}

