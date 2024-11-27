/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Maitree', 'sans-serif'],
        display: ['Pacifico', 'display']
      },
      backgroundImage: {
        'hero-pattern': "url('@/assets/images/bg.jpg')"
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-left': 'slideInLeft 1s ease-out forwards',
        'slide-in-right': 'slideInRight 1s ease-out forwards',
      },
      colors: {
        filterBar: {home: '#414267'},
        'purple': '#585ABF',
        'secondary': '#F3A04C',
      }
    },
  },
  plugins: [],
}
