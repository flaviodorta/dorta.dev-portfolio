/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ED0C32',
        black: '#101010',
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        'share-tech': ['Share Tech', 'sans-serif'],
        'neue-grotesk': ['Neue Grotesk', 'sans-serif'],
      },
      animation: {
        'sound-bar': 'sound-bar 0.60s linear infinite',
        ['fast-pulse']: 'full-pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'sound-bar': {
          '0%': {
            height: '1px',
          },
          '50%': {
            height: '30px',
          },
          '100%': {
            height: '1px',
          },
        },
        ['full-pulse']: {
          '0%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
