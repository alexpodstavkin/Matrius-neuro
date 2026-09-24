import type { Metadata, Viewport } from 'next'
import { Onest } from 'next/font/google'
import './globals.css'
import { UtmCapture } from '@/components/UtmCapture'

const onest = Onest({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700'], variable: '--font-onest', display: 'swap' })

// В статической сборке пути к ассетам нужно префиксовать вручную.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

const TITLE = 'Бесплатный урок-диагностика по скорочтению для ребёнка 6–12 лет — Matrius'
const DESCRIPTION =
  'За 45–60 минут замерим скорость чтения и понимание текста, сравним с ориентиром возраста и дадим план на месяц. Онлайн, один на один с педагогом, бесплатно.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: [{ url: `${BASE}/matrius-logo.png`, type: 'image/png', sizes: '128x128' }],
    apple: [{ url: `${BASE}/matrius-logo.png`, sizes: '128x128' }],
  },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', locale: 'ru_RU', siteName: 'Матриус' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#385681',
}

// Счётчики (Метрика 98858030, VK 3743427) подключим вместе с боевой формой.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={onest.variable}>
      <body className="bg-white font-sans text-ink antialiased">
        <UtmCapture />
        {children}
      </body>
    </html>
  )
}
