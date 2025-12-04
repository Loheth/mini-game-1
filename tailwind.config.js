/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        minecraft: {
          sky: '#8fc8ff',
          grass: '#3f8c28',
          grassLight: '#63b135',
          dirt: '#7a4e24',
          dirtDark: '#4b2d15',
          cobble: '#c0c5c9',
          stone: '#6c6f72',
          border: '#231409',
          emerald: '#1fb862',
          lapis: '#1d4ed8',
          ember: '#d94830',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      boxShadow: {
        blocky: '4px 4px 0 #231409',
        blockyLg: '8px 8px 0 #231409',
      },
    },
  },
  plugins: [],
}


