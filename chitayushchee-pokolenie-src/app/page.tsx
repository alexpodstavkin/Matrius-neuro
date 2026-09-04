import { Hero, Notice, WhyToday, Stages, DeadlineBanner, Gains } from '@/components/blocks'
import { FormSection } from '@/components/FormSection'
import { Footer } from '@/components/Footer'

export default function Page() {
  return (
    <main>
      <Hero />
      <Notice />
      <WhyToday />
      <Stages />
      <DeadlineBanner />
      <Gains />
      <FormSection />
      <Footer />
    </main>
  )
}
