import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import './globals.css'

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-onest',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Поможем ребёнку не потерять школьные знания за лето — Matrius',
  description:
    'Бесплатный урок по скорочтению Matrius + 3 подарка: два чек-листа с упражнениями и читательский дневник. К сентябрю +0,7 балла к среднему баллу.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={onest.variable}>
      <body>{children}</body>
    </html>
  )
}
