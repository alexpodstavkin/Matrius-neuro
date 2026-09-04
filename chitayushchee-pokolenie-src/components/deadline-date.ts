// Дата закрытия записи. Правило владельца 04.09.2026:
// с понедельника по четверг запись открыта до ближайшего ЧЕТВЕРГА,
// с пятницы по воскресенье — до ближайшего ПОНЕДЕЛЬНИКА.
// Считается в браузере при каждой загрузке, поэтому не устаревает без пересборки.
const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
]

export function deadlineDate(from: Date = new Date()): Date {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  const day = today.getDay() // 0 — воскресенье, 4 — четверг
  const target = day >= 1 && day <= 4 ? 4 : 1 // чт или пн
  const shift = (target - day + 7) % 7
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + shift)
}

export function deadlineText(from: Date = new Date()): string {
  const d = deadlineDate(from)
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]}`
}
