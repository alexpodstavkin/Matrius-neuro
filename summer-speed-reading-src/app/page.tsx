import Hero from './components/Hero'
import Care6Cells from './components/Care6Cells'
import Methodology from './components/Methodology'
import WhySummer from './components/WhySummer'
import FreeLesson from './components/FreeLesson'
import Gifts from './components/Gifts'
import Trust from './components/Trust'
import Faq from './components/Faq'
import LeadForm from './components/LeadForm'
import Footer from './components/Footer'

export default function Page() {
  return (
    <main id="main">
      <Hero />
      <Care6Cells />
      <WhySummer />
      <Methodology />
      <FreeLesson />
      <Gifts />
      <Trust />
      <Faq />
      <LeadForm />
      <Footer />
    </main>
  )
}
