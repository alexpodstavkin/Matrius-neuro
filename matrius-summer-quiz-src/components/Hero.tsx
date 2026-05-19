'use client';

type Props = { onCTA: () => void };

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=70';

export default function Hero({ onCTA }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
      <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
        {/* Лого + название школы */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <img
            src="matrius-logo.png"
            alt="Matrius"
            className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-full"
          />
          <div className="leading-tight">
            <div className="text-navy font-bold text-lg">Matrius</div>
            <div className="text-muted text-sm">Онлайн-школа развития детей 5–17&nbsp;лет.</div>
          </div>
        </div>

        <h1 className="h1 mb-5">
          Доступ к&nbsp;<span className="text-orange">закрытой базе знаний</span>, которая поможет вашему ребёнку не&nbsp;потерять от&nbsp;30% школьных знаний за&nbsp;лето
        </h1>
        <p className="lead mb-7 max-w-2xl">
          Чек-листы, авторские материалы и&nbsp;пошаговые образовательные инструкции общей ценностью более 150&nbsp;000&nbsp;₽. Материал, который поможет вашему ребёнку быть готовым к&nbsp;новому учебному году на&nbsp;5+
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={onCTA} className="btn-primary-wide">
            Забрать бесплатно
          </button>
        </div>
      </div>

      <div className="md:col-span-6 lg:col-span-6">
        <div className="relative h-full min-h-[260px] md:min-h-0 overflow-hidden rounded-xl shadow-card">
          <img
            src={HERO_IMAGE}
            alt="Ребёнок за учёбой летом"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
