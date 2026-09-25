import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Onest } from 'next/font/google'
import './globals.css'
import { UtmCapture } from '@/components/UtmCapture'

const onest = Onest({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700'], variable: '--font-onest', display: 'swap' })

// В статической сборке пути к ассетам нужно префиксовать вручную.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

const TITLE = 'Бесплатный урок-диагностика по скорочтению для ребёнка 6–10 лет — Matrius'
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

// Счётчики 1-в-1 с /skorochtenie-urok/: Метрика 98858030 + VK Пиксель (Top.Mail.Ru) 3743427.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={onest.variable}>
      <head>
        {/* Yandex.Metrika — id 98858030 */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=98858030', 'ym');
            ym(98858030, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>

        {/* Top.Mail.Ru (ВК Пиксель) — id 3743427 */}
        <Script id="top-mailru-counter" strategy="afterInteractive">
          {`
            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({id: "3743427", type: "pageView", start: (new Date()).getTime()});
            (function (d, w, id) {
              if (d.getElementById(id)) return;
              var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
              ts.src = "https://top-fwz1.mail.ru/js/code.js";
              var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
              if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
            })(document, window, "tmr-code");
          `}
        </Script>
      </head>
      <body className="bg-white font-sans text-ink antialiased">
        <UtmCapture />
        {children}

        {/* Yandex.Metrika noscript fallback */}
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/98858030" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>

        {/* Top.Mail.Ru noscript fallback */}
        <noscript>
          <div>
            <img
              src="https://top-fwz1.mail.ru/counter?id=3743427;js=na"
              style={{ position: 'absolute', left: '-9999px' }}
              alt="Top.Mail.Ru"
            />
          </div>
        </noscript>
      </body>
    </html>
  )
}
