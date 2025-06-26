// import type { Config } from 'tailwindcss'

const config = {
  content: ['./index.html', './src/**/*.{vue,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
      },
      keyframes: {
        'skeleton-loading': {
          '0%, 100%': { 'background-color': 'hsl(199, 35%, 88%)' },
          '50%': { 'background-color': 'hsl(200, 20%, 95%)' },
        },
      },
      animation: {
        'skeleton-loading': 'skeleton-loading 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
