import Hero from '@/components/Hero'
import About from '@/components/About'
import Diagnostic from '@/components/Diagnostic'
import CTAForm from '@/components/CTAForm'
import Footer from '@/components/Footer'
import UtmCapture from '@/components/UtmCapture'

export default function Page() {
  return (
    <main className="min-h-screen">
      <UtmCapture />
      <Hero />
      <About />
      <Diagnostic />
      <CTAForm />
      <Footer />
    </main>
  )
}
