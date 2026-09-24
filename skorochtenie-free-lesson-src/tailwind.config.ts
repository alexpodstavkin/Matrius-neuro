import type { Config } from 'tailwindcss'

// Палитра Матриуса navy + оранжевый (matrius-design-system.md), вёрстка — по мини-ленду
// zerocoder.ru/free-lesson-on-neural-networks-for-children (колонка 840px).
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: { DEFAULT: '#EF6432', hover: '#D9531F', peach: '#FF946F', deep: '#B8431A' },
        navy: { DEFAULT: '#385681', dark: '#292A32', mid: '#4A6A98', light: '#6082B1', 50: '#E2EAF6' },
        ink: '#212121',
        muted: '#666666',
        column: '#F2F2F2',
      },
      fontFamily: {
        sans: ['var(--font-onest)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { column: '840px' },
    },
  },
  plugins: [],
}
export default config
