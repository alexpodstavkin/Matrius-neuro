'use client'
import { useEffect, useState } from 'react'
import { deadlineDate } from './deadline-date'

// Отсчёт до конца дня дедлайна (пн–чт → четверг, пт–вс → понедельник).
// Считается в браузере, поэтому не устаревает без пересборки.
function left() {
  const d = deadlineDate()
  const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59)
  const ms = Math.max(0, end.getTime() - Date.now())
  const sec = Math.floor(ms / 1000)
  return {
    days: Math.floor(sec / 86400),
    hours: Math.floor((sec % 86400) / 3600),
    minutes: Math.floor((sec % 3600) / 60),
    seconds: sec % 60,
  }
}

function plural(n: number, forms: [string, string, string]) {
  const a = n % 100
  const b = n % 10
  if (a >= 11 && a <= 14) return forms[2]
  if (b === 1) return forms[0]
  if (b >= 2 && b <= 4) return forms[1]
  return forms[2]
}

function Group({ value, label, pad }: { value: number; label: string; pad: boolean }) {
  const digits = (pad ? String(value).padStart(2, '0') : String(value)).split('')
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-[2px]">
        {digits.map((d, i) => (
          <span
            key={i}
            className="flex h-[34px] w-[22px] items-center justify-center rounded-[4px] bg-orange text-[24px] font-medium tabular-nums leading-none text-white md:h-[40px] md:w-[26px] md:text-[28px]"
          >
            {d}
          </span>
        ))}
      </div>
      <span className="mt-1 text-[11px] text-ink md:text-[12px]">{label}</span>
    </div>
  )
}

export function Countdown() {
  const [t, setT] = useState<ReturnType<typeof left> | null>(null)
  useEffect(() => {
    setT(left())
    const id = setInterval(() => setT(left()), 1000)
    return () => clearInterval(id)
  }, [])
  // до гидрации — пустое место той же высоты, чтобы сервер не отдал время сборки
  if (!t) return <div className="h-[52px] md:h-[60px]" aria-hidden />
  return (
    <div className="flex items-start justify-center gap-2.5 md:gap-3">
      <Group value={t.days} label={plural(t.days, ['день', 'дня', 'дней'])} pad={false} />
      <Group value={t.hours} label={plural(t.hours, ['час', 'часа', 'часов'])} pad />
      <Group value={t.minutes} label={plural(t.minutes, ['минута', 'минуты', 'минут'])} pad />
      <Group value={t.seconds} label={plural(t.seconds, ['секунда', 'секунды', 'секунд'])} pad />
    </div>
  )
}
