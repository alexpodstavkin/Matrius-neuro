'use client';

import Hero from './Hero';

type Props = { onCTA: () => void };

export default function CTASection({ onCTA }: Props) {
  return (
    <section className="relative w-full">
      <div className="container-x py-10 md:py-14 lg:py-20">
        <Hero onCTA={onCTA} />
      </div>
    </section>
  );
}
