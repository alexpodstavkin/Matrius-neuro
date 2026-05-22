export default function Header() {
  return (
    <header className="border-b border-[var(--border-subtle)] bg-white">
      <div className="container-x flex items-center justify-between py-5">
        <a href="/" className="flex items-center gap-2 no-underline">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white font-bold text-lg">
            M
          </span>
          <span className="text-navy font-bold text-xl tracking-tight2">Matrius</span>
        </a>
        <a href="#form" className="btn btn-ghost hidden sm:inline-flex">
          Записаться
        </a>
      </div>
    </header>
  )
}
