import { useStickyNav } from '../../hooks/useStickyNav';

export function Nav() {
  const scrolled = useStickyNav();
  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="container nav-inner">
        <a href="#" aria-label="Matrius — главная" className="logo-link">
          <span className="logo-slot">
            <img
              src="/logo.png"
              alt="Matrius — онлайн-школа"
              width={48}
              height={48}
              loading="eager"
              decoding="async"
            />
          </span>
        </a>
        <a href="#booking" className="btn btn-accent btn-sm">
          Бесплатный пробный урок
        </a>
      </div>
    </nav>
  );
}
