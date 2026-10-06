/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        'deep-brown': '#120B06',
        gold: '#D4AF37', // antique gold
        brass: '#B5A642', // warm metallic brass
        ivory: '#FFFFF0', // cream / ivory
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}