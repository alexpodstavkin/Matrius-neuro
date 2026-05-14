import Hero from './components/Hero'
import ProblemSummer from './components/ProblemSummer'
import WhySpeedreading from './components/WhySpeedreading'
import Methodology from './components/Methodology'
import Gifts from './components/Gifts'
import FreeLesson from './components/FreeLesson'
import LeadForm from './components/LeadForm'
import Footer from './components/Footer'

export default function Page() {
  return (
    <main>
      <Hero />
      <ProblemSummer />
      <WhySpeedreading />
      <Methodology />
      <FreeLesson />
      <Gifts />
      <LeadForm />
      <Footer />
    </main>
  )
}
