// Линейные иконки в духе эталона (тонкий контур, без заливки).
type P = { className?: string }

export function IconBook({ className = '' }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9h12a6 6 0 0 1 6 6v24a5 5 0 0 0-5-5H6z" />
      <path d="M42 9H30a6 6 0 0 0-6 6v24a5 5 0 0 1 5-5h13z" />
      <path d="M10 16h8M10 22h8M30 16h8M30 22h8" />
    </svg>
  )
}

export function IconMap({ className = '' }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 12l12-4 12 4 12-4v28l-12 4-12-4-12 4z" />
      <path d="M18 8v28M30 12v28" />
    </svg>
  )
}

export function IconSearch({ className = '' }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="21" cy="21" r="13" />
      <path d="M31 31l11 11" />
      <path d="M15 22c2-5 5-7 7-7M26 25h.02" />
    </svg>
  )
}

export function IconFlag({ className = '' }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 42V6" />
      <path d="M12 8h22l-4 7 4 7H12z" />
    </svg>
  )
}

export function IconCheck({ className = '' }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="26" height="26" rx="6" />
      <path d="M10 16.5l4 4 8-9" />
    </svg>
  )
}
