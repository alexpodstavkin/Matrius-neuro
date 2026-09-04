const DOCS = [
  ['Политика конфиденциальности', 'https://matrius.online/privacypolicy'],
  ['Политика использования cookies', 'https://matrius.online/cookies'],
  ['Согласие на рассылку', 'https://matrius.online/agreementmailing'],
  ['Согласие на обработку персональных данных', 'https://matrius.online/personaldata'],
  ['Договор оферты', 'https://matrius.online/publicofertamatrius'],
]

// Узкая строка документов — по решению владельца 04.09.2026 весь остальной подвал снят.
export function Footer() {
  return (
    <footer className="border-t border-ink/[.06] bg-surface-soft py-5">
      <div className="container-x">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {DOCS.map(([t, href]) => (
            <li key={t}>
              <a href={href} target="_blank" rel="noreferrer" className="inline-block py-2 text-[13px] text-muted transition-colors hover:text-blue-hover">
                {t}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
