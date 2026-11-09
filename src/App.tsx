import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Works from './components/Works'
import About from './components/About'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import GrainOverlay from './components/GrainOverlay'
import Gallery3D from './components/Gallery3D'
import GameSection from './components/GameSection'
import ProjectPage from './components/ProjectPage'
import Seo from './components/Seo'
import FAQ from './components/FAQ'
import CookieConsent from './components/CookieConsent'
import BackToTop from './components/BackToTop'
import { Impressum, Datenschutz } from './components/Legal'
import { setLenis, scrollToTop, prefersReducedMotion } from './lib/scroll'
import { SITE_TITLE, SITE_DESCRIPTION } from './lib/site'
import { personLd, websiteLd, faqLd } from './lib/structuredData'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(
          () => el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' }),
          100
        )
      }
    } else {
      // Plain navigation (e.g. logo → home, or opening a project) lands at the top
      scrollToTop({ immediate: true })
    }
  }, [pathname, hash])
  return null
}

function HomePage() {
  return (
    <>
      <Seo
        title={SITE_TITLE}
        description={SITE_DESCRIPTION}
        image="/og-image.jpg"
        jsonLd={[personLd, websiteLd, faqLd]}
      />
      {/* Depth stage — fixed ambient gradient (brand #1F1F1F → #353535) behind all
          sections to give the page depth instead of a flat single tone */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(70% 50% at 50% 0%, rgba(251,119,81,0.05), transparent 70%), radial-gradient(135% 115% at 50% 0%, #3B3B3B 0%, #353535 28%, #2B2B2B 62%, #1F1F1F 100%)',
        }}
      />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Works />
        <Gallery3D />
        <GameSection />
        <About />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}

function AppContent() {
  useEffect(() => {
    // Smooth scrolling is motion too: skip it for "reduce motion" users
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    setLenis(lenis)

    return () => {
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return (
    // reducedMotion="user": with the OS "reduce motion" setting on, framer-motion
    // drops movement (slide/scale) and keeps only opacity fades
    <MotionConfig reducedMotion="user">
      <CustomCursor />
      <GrainOverlay />
      <Navbar />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Routes>
      <CookieConsent />
      <BackToTop />
    </MotionConfig>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
