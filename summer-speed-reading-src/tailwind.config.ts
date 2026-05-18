import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        matrius: {
          navy: '#385681',
          cove: '#6082b1',
          gray: '#4a6a98',
          shark: '#292a32',
        },
        cta: {
          DEFAULT: '#ef6432',
          hover: '#dd501d',
        },
        ink: '#212121',
        ink2: '#666666',
        ink3: '#787878',
        surface: {
          base: '#ffffff',
          soft: '#f8f8f8',
          muted: '#f2f2f2',
        },
      },
      fontFamily: {
        sans: ['var(--font-onest)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '10px',
      },
      boxShadow: {
        soft: '0 8px 48px rgba(0, 0, 0, 0.12)',
      },
      letterSpacing: {
        tight2: '-0.02em',
      },
    },
  },
  plugins: [],
}

export default config
