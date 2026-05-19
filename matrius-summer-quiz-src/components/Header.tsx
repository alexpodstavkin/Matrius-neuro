export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#EAF1F8]/85 backdrop-blur border-b border-white/40">
      <div className="container-x flex h-14 md:h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white font-bold">
            M
          </span>
          <span className="text-navy font-bold text-lg tracking-tight">Matrius</span>
        </div>
        <a
          href="tel:+78000000000"
          className="hidden md:inline-flex text-sm font-semibold text-navy hover:opacity-70 transition-opacity"
        >
          8 (800) 000-00-00
        </a>
      </div>
    </header>
  );
}
