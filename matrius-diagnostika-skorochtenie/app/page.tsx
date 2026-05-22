import Hero from '@/components/Hero'
import About from '@/components/About'
import Diagnostic from '@/components/Diagnostic'
import CTAForm from '@/components/CTAForm'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Diagnostic />
      <CTAForm />
      <Footer />
    </main>
  )
}
