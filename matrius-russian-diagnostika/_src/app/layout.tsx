import type { Metadata, Viewport } from 'next';
import { Onest } from 'next/font/google';
import Script from 'next/script';
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

// ID счётчиков аналитики (Matrius, те же что у соседних лендингов).
const YM_ID = '98858030';
const TMR_ID = '3743427';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={onest.variable}>
      <head>
        {/* Yandex.Metrika */}
        <Script
          id="ya-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}', 'ym');
ym(${YM_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
`,
          }}
        />

        {/* Top.Mail.Ru (пиксель ВК / myTarget) */}
        <Script
          id="top-mail-ru"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
var _tmr = window._tmr || (window._tmr = []);
_tmr.push({id: "${TMR_ID}", type: "pageView", start: (new Date()).getTime()});
(function (d, w, id) {
  if (d.getElementById(id)) return;
  var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
  ts.src = "https://top-fwz1.mail.ru/js/code.js";
  var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
  if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
})(document, window, "tmr-code");
`,
          }}
        />
      </head>
      <body>
        {/* noscript-фолбэки для пользователей с отключённым JS */}
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YM_ID}`}
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
            <img
              src={`https://top-fwz1.mail.ru/counter?id=${TMR_ID};js=na`}
              style={{ position: 'absolute', left: '-9999px' }}
              alt="Top.Mail.Ru"
            />
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
