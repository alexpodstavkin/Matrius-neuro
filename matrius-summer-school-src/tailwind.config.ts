import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#385681',
          dark: '#292A32',
          light: '#6082B1',
          mid: '#4A6A98',
        },
        orange: {
          DEFAULT: '#F49060',
          hover: '#E27A48',
        },
        ink: '#212121',
        muted: '#666666',
        caption: '#787878',
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F8F8F8',
          tint: '#F2F2F2',
        },
      },
      fontFamily: {
        sans: ['Onest', 'system-ui', '-apple-system', 'sans-serif'],
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
}

export default config
