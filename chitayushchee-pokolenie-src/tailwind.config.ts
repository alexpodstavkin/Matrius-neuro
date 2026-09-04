import type { Config } from 'tailwindcss'

// Эксперимент: вёрстка снята 1-в-1 с mosobrfuture.ru, палитра и шрифт — канон Матриуса «NEURO»
// (~/.claude/memory/matrius-design-system-neuro.md).
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: { DEFAULT: '#5F9FFF', hover: '#4589F0', deep: '#2E6FD1', tint: '#E9F2FF' },
        coral: '#FA876B',
        // CTA по решению владельца 04.09.2026 — красный эталона mosobrfuture, вне палитры Матриуса
        cta: { DEFAULT: '#E94546', hover: '#CC3A3B' },
        ink: '#1D1D1F',
        dark: '#292A32',
        muted: { DEFAULT: '#545454', weak: '#8B8B8B' },
        surface: { DEFAULT: '#FFFFFF', soft: '#F8F8F8', card: '#F4F7FB' },
      },
      fontFamily: { sans: ['var(--font-onest)', 'system-ui', 'sans-serif'] },
      borderRadius: { card: '20px', pill: '999px' },
      maxWidth: { content: '1200px' },
    },
  },
  plugins: [],
}
export default config
