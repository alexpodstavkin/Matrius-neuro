import type { Metadata, Viewport } from 'next';
import { Onest } from 'next/font/google';
import './globals.css';

const onest = Onest({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-onest',
});

export const metadata: Metadata = {
  title: 'Бесплатная диагностика по русскому языку для 1–4 класса — Matrius',
  description:
    'Ребёнок учит правила, но всё равно пишет с ошибками? Запишитесь на бесплатную диагностику Matrius. Педагог за 60 минут найдёт настоящий пробел и расскажет, как исправить за лето.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#385681',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={onest.variable}>
      <body>{children}</body>
    </html>
  );
}
