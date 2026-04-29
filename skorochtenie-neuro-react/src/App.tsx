import { BookingProvider } from './components/ui/BookingContext';
import { BookingModal } from './components/sections/BookingModal';
import { Hero } from './components/sections/Hero';
import { WhySpeedReading } from './components/sections/WhySpeedReading';
import { PromiseBand } from './components/sections/PromiseBand';
import { HowItWorks } from './components/sections/HowItWorks';
import { Skills } from './components/sections/Skills';
import { Methodology } from './components/sections/Methodology';
import { Results } from './components/sections/Results';
import { Reviews } from './components/sections/Reviews';
import { FinalCta } from './components/sections/FinalCta';

export default function App() {
  return (
    <BookingProvider>
      <a href="#main-content" className="skip-link">
        Перейти к содержимому
      </a>
      <main id="main-content">
        <Hero />
        <WhySpeedReading />
        <PromiseBand />
        <HowItWorks />
        <Skills />
        <Methodology />
        <Results />
        <Reviews />
        <FinalCta />
      </main>
      <BookingModal />
    </BookingProvider>
  );
}
