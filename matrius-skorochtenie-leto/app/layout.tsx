import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import Script from 'next/script'
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
      <head>
        {/* Yandex.Metrika counter — id 98858030 */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=98858030', 'ym');
            ym(98858030, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
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
      <body>
        {children}
        {/* Yandex.Metrika noscript fallback */}
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/98858030"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
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
