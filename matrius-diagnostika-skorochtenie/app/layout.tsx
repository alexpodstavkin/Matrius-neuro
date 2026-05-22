import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Закрытая база знаний по скорочтению — Matrius',
  description:
    'Родителям детей 7–14 лет: доступ к закрытой базе материалов Matrius и диагностика чтения в подарок.',
  openGraph: {
    title: 'Закрытая база знаний по скорочтению — Matrius',
    description:
      'Доступ к закрытой базе материалов по скорочтению и бесплатная 60-минутная диагностика чтения.',
    type: 'website',
    locale: 'ru_RU',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#385681',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
