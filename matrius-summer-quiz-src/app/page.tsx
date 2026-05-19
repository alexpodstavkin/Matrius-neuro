'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import GiftsBento from '@/components/GiftsBento';
import BeforeAfter from '@/components/BeforeAfter';
import BonusBlock from '@/components/BonusBlock';
import TrustBand from '@/components/TrustBand';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import LeadModal from '@/components/LeadModal';

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <main className="min-h-screen">
      <section id="hero-section" className="relative w-full">
        <div className="container-x py-10 md:py-14 lg:py-20">
          <Hero onCTA={openModal} />
        </div>
      </section>

      <GiftsBento />
      <BeforeAfter onCTA={openModal} />
      <BonusBlock onCTA={openModal} />
      <TrustBand />
      <CTASection onCTA={openModal} />
      <Footer />

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
