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
  title: 'Бесплатная диагностика английского для детей 7–10 лет — Matrius',
  description:
    'Ребёнок учит английский, но не может сказать и двух слов? Запишитесь на бесплатную онлайн-диагностику Matrius. Педагог за 60 минут найдёт причину молчания и покажет, как разговорить ребёнка за лето.',
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
