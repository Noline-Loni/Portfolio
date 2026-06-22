import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
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
import Seo, { SITE_URL } from './components/Seo'
import CookieConsent from './components/CookieConsent'

function ScrollToHash() {
  const { hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }, [hash])
  return null
}

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Noline Lindor',
  jobTitle: 'Creative Technologist',
  url: SITE_URL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bochum',
    addressCountry: 'DE',
  },
  knowsAbout: [
    'UI/UX Design',
    'Marketing Automation',
    'Performance Marketing',
    'Python',
    'Meta Marketing API',
    'Google Ads',
    'SEO',
    'React',
    'Brand Identity',
  ],
  sameAs: [
    'https://www.linkedin.com/in/noline-lindor-43b923213',
    'https://github.com/Noline-Loni',
    'https://www.instagram.com/noline_lindor',
    'https://www.facebook.com/noline.lindor',
  ],
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Noline Lindor',
  url: SITE_URL,
}

function HomePage() {
  return (
    <>
      <Seo
        title="Noline Lindor — Creative Technologist"
        description="Creative Technologist an der Schnittstelle von Design, Marketing und Technologie. UI/UX Design, Marketing Automation & KPI-Dashboards."
        image="/og-image.jpg"
        jsonLd={[personLd, websiteLd]}
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
      </main>
      <Footer />
    </>
  )
}

function AppContent() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <GrainOverlay />
      <Navbar />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
      </Routes>
      <CookieConsent />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
