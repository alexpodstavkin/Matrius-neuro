export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="w-full px-12 md:px-[72px] lg:px-24 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="matrius-logo.png"
                alt="Matrius"
                className="h-12 w-12 shrink-0 rounded-full bg-white"
              />
              <div className="leading-tight">
                <div className="font-bold text-xl">Matrius</div>
                <div className="text-white/65 text-xs">Онлайн-школа для&nbsp;детей и&nbsp;подростков</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mb-5">
              ООО «МАТРИУС ГРУПП» осуществляет деятельность в сфере информационных технологий.
            </p>
            <p className="text-white/55 text-xs leading-relaxed max-w-md">
              Образовательная лицензия №Л035-1265-18/652138 от 19.05.2023
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-3">
              Направления
            </div>
            <ul className="space-y-2 text-sm">
              <li><a href="https://matrius.online/podgotovkakschkole" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">Подготовка&nbsp;к&nbsp;школе</a></li>
              <li><a href="https://matrius.online/logopedia" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">Логопедия</a></li>
              <li><a href="https://matrius.online/matematika" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">Математика&nbsp;(1–8 класс)</a></li>
              <li><a href="https://matrius.online/sckorochtenie" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">Скорочтение</a></li>
              <li><a href="https://matrius.online/mentalariphmetika" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">Ментальная&nbsp;арифметика</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-3">
              Контакты
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+79852197400" className="hover:opacity-70 transition-opacity">
                  +7 (985) 219-74-00
                </a>
              </li>
              <li>
                <a href="mailto:info@matrius.ru" className="hover:opacity-70 transition-opacity">
                  info@matrius.ru
                </a>
              </li>
              <li className="text-white/65 leading-relaxed pt-1">
                426068, Удмуртская Республика, г. Ижевск, ул. Автозаводская, д. 7, офис 416
              </li>
            </ul>

            <div className="flex items-center gap-3 mt-5">
              <a
                href="#"
                aria-label="Telegram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
              </a>
              <a
                href="#"
                aria-label="ВКонтакте"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.79 17.83c-7.05 0-11.07-4.84-11.24-12.88h3.52c.12 5.9 2.71 8.4 4.78 8.91V4.95h3.32v5.07c2.03-.22 4.16-2.55 4.88-5.07h3.3c-.55 3.1-2.87 5.43-4.52 6.39 1.65.78 4.3 2.81 5.32 6.49h-3.63c-.79-2.48-2.75-4.4-5.35-4.66v4.66h-.38z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-white/55">
          <div className="space-y-1">
            <div>© 2026 Matrius. Все права защищены.</div>
            <div>ИНН 1840120295 · КПП 184001001 · ОГРН 1231800007670 · ОКВЭД 85.41.9</div>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 md:justify-end">
            <a href="#" className="hover:opacity-80 transition-opacity">Политика конфиденциальности</a>
            <a href="#" className="hover:opacity-80 transition-opacity">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
