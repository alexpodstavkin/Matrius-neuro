import HeroQuizSwitcher from '@/components/HeroQuizSwitcher';
import ProgramsBento from '@/components/ProgramsBento';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main className="min-h-screen">
      <HeroQuizSwitcher />
      <ProgramsBento />
      <Footer />
    </main>
  );
}
