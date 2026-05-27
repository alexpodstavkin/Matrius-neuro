'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import ProblemBlock from '@/components/ProblemBlock';
import Methodology from '@/components/Methodology';
import LessonBlock from '@/components/LessonBlock';
import ArtemCase from '@/components/ArtemCase';
import ReviewsBlock from '@/components/ReviewsBlock';
import WhyMatrius from '@/components/WhyMatrius';
import CTAFinal from '@/components/CTAFinal';
import Footer from '@/components/Footer';
import LeadModal from '@/components/LeadModal';

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <main className="min-h-screen">
      <section id="hero-section" className="relative w-full">
        <div className="container-x py-12 md:py-16 lg:py-24">
          <Hero onCTA={openModal} />
        </div>
      </section>

      <ProblemBlock onCTA={openModal} />
      <LessonBlock onCTA={openModal} />
      <Methodology />
      <ArtemCase onCTA={openModal} />
      <ReviewsBlock onCTA={openModal} />
      <WhyMatrius />
      <CTAFinal />
      <Footer />

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
