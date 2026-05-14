import { nb } from '../lib/typography'

const docs = [
  { label: 'Политика конфиденциальности', href: 'https://matrius.online/privacypolicy' },
  { label: 'Договор оферты', href: 'https://matrius.online/publicofertamatrius' },
]

const programs = [
  { label: 'Подготовка к школе', href: 'https://matrius.online/podgotovkakschkole' },
  { label: 'Логопедия', href: 'https://matrius.online/logopedia' },
  { label: 'Математика (1–8 класс)', href: 'https://matrius.online/matematika' },
  { label: 'Скорочтение', href: 'https://matrius.online/sckorochtenie' },
  { label: 'Ментальная арифметика', href: 'https://matrius.online/mentalariphmetika' },
]

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--surface-soft)',
      }}
    >
      <div
        className="container"
        style={{ paddingTop: 'clamp(48px, 6vw, 72px)', paddingBottom: 'clamp(28px, 3vw, 36px)' }}
      >
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Бренд + юридический блок */}
          <div className="flex flex-col gap-5">
            <a
              href="https://matrius.online/"
              target="_blank"
              rel="noopener"
              className="footer-logo"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="matrius-logo.png" alt="Matrius" className="footer-logo__img" />
              <span>Matrius</span>
            </a>
            <div
              className="flex flex-col gap-3"
              style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--ink-3)' }}
            >
              <p>
                {nb(
                  'ООО «МАТРИУС ГРУПП» осуществляет деятельность в сфере информационных технологий. Согласно приказу Минцифры от 08.10.22 следующие виды деятельности (код): 2.01.'
                )}
              </p>
              <p>
                {nb(
                  'Адрес юридического лица: 426068, Удмуртская Республика, г. о. город Ижевск, г. Ижевск, ул. Автозаводская, д. 7, офис 416.'
                )}
              </p>
              <p>{nb('Образовательная лицензия №Л035-1265-18/652138 от 19.05.2023.')}</p>
              <p>
                {nb(
                  'ООО «МАТРИУС ГРУПП», ИНН 1840120295, КПП 184001001, ОГРН 1231800007670, ОКВЭД 85.41.9.'
                )}
              </p>
            </div>
          </div>

          {/* Направления */}
          <div className="flex flex-col gap-3">
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
              }}
            >
              Направления обучения
            </div>
            <ul
              className="flex flex-col gap-2 list-none p-0 m-0"
              style={{ fontSize: 14, color: 'var(--ink-2)' }}
            >
              {programs.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener"
                    className="hover:opacity-70"
                  >
                    {nb(p.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Документы */}
          <div className="flex flex-col gap-3">
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
              }}
            >
              Документы
            </div>
            <ul
              className="flex flex-col gap-2 list-none p-0 m-0"
              style={{ fontSize: 14, color: 'var(--ink-2)' }}
            >
              {docs.map((d) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener"
                    className="hover:opacity-70"
                  >
                    {nb(d.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div className="flex flex-col gap-3">
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
              }}
            >
              Связаться с нами
            </div>
            <ul
              className="flex flex-col gap-2 list-none p-0 m-0"
              style={{ fontSize: 14, color: 'var(--ink-2)' }}
            >
              <li>
                <a
                  href="tel:+79852197400"
                  className="hover:opacity-70"
                  style={{ fontWeight: 600, color: 'var(--ink)' }}
                >
                  +7 (985) 219-74-00
                </a>
              </li>
              <li>
                <a href="mailto:info@matrius.ru" className="hover:opacity-70">
                  info@matrius.ru
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/matrius_ru"
                  target="_blank"
                  rel="noopener"
                  className="hover:opacity-70"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://vk.com/matrius_ru"
                  target="_blank"
                  rel="noopener"
                  className="hover:opacity-70"
                >
                  ВКонтакте
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr
          style={{
            border: 0,
            height: 1,
            background: 'var(--border-subtle)',
            margin: 'clamp(24px, 3vw, 40px) 0 16px',
          }}
        />

        <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
          © 2026 Matrius. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
