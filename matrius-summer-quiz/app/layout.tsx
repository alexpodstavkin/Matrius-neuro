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
  title: '8 бесплатных материалов для ребёнка на лето — Matrius',
  description:
    'Ответьте на 3 вопроса и заберите 8 авторских материалов от Matrius для пользы каникул, плюс бесплатный урок-диагностика.',
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
