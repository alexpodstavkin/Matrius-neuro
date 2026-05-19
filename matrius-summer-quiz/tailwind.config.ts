import type { Config } from 'tailwindcss';

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
        sans: ['var(--font-onest)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '7px',
        lg: '8px',
        xl: '10px',
      },
      boxShadow: {
        card: '0 8px 48px rgba(0,0,0,0.12)',
        cta: '0 8px 24px -8px rgba(239,100,50,0.35)',
      },
      transitionTimingFunction: {
        brand: 'ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
