export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="w-full px-6 md:px-12 lg:px-24 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="matrius-logo.png"
                alt="Matrius"
                className="h-12 w-12 shrink-0 rounded-full bg-white"
              />
              <div className="leading-snug text-white/75 text-sm font-medium">
                Онлайн-школа развития детей<br />
                5–17&nbsp;лет
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mb-5">
              ООО «МАТРИУС ГРУПП» осуществляет деятельность в&nbsp;сфере информационных технологий.
            </p>
            <p className="text-white/55 text-xs leading-relaxed max-w-md">
              Образовательная лицензия №Л035-1265-18/65213В от&nbsp;19.05.2023
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-3">
              Направления
            </div>
            <ul className="space-y-2 text-sm">
              <li><a href="https://matrius.online/sckorochtenie" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">Скорочтение</a></li>
              <li><a href="https://matrius.online/matematika" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">Математика&nbsp;(1–8 класс)</a></li>
              <li><a href="https://matrius.online/podgotovkakschkole" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">Подготовка&nbsp;к&nbsp;школе</a></li>
              <li><a href="https://matrius.online/logopedia" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">Логопедия</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-3">
              Контакты
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+79852197400" className="hover:opacity-70 transition-opacity">
                  +7&nbsp;(985)&nbsp;219-74-00
                </a>
              </li>
              <li>
                <a href="mailto:info@matrius.ru" className="hover:opacity-70 transition-opacity">
                  info@matrius.ru
                </a>
              </li>
              <li className="text-white/65 leading-relaxed pt-1">
                426068, Удмуртская Республика, г.&nbsp;Ижевск, ул.&nbsp;Автозаводская, д.&nbsp;7, офис&nbsp;416
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-white/55">
          <div className="space-y-1">
            <div>© {new Date().getFullYear()} Matrius. Все права защищены.</div>
            <div>ИНН 1840120295 · ОГРН 1231800007670</div>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 md:justify-end">
            <a
              href="https://matrius.online/privacypolicy"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              Политика конфиденциальности
            </a>
            <a
              href="https://matrius.online/publicofertamatrius"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              Договор оферты
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
