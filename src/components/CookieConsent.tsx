import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ga4Available, loadGA4 } from '../lib/analytics'

const STORAGE_KEY = 'nl-analytics-consent'

/**
 * GDPR-friendly opt-in consent banner. Nothing tracking-related loads until the
 * user explicitly accepts. Only appears when a GA4 ID is configured (VITE_GA4_ID).
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ga4Available()) return
    const choice = localStorage.getItem(STORAGE_KEY)
    if (choice === 'granted') {
      loadGA4()
      return
    }
    if (choice === 'denied') return
    setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'granted')
    loadGA4()
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'denied')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 z-[9998] mx-auto max-w-xl rounded-md border border-stroke-subtle/60 bg-surface-secondary/95 p-5 backdrop-blur-xl md:bottom-6 md:left-6 md:right-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Cookie-Einstellungen"
        >
          <p className="font-body text-sm leading-relaxed text-content-secondary">
            Diese Seite nutzt anonymisierte Statistik (Google Analytics), um zu
            verstehen, was ankommt — nur mit deiner Zustimmung.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={accept}
              className="rounded-sm bg-accent px-5 py-2 font-body text-xs font-bold uppercase tracking-[0.15em] text-surface transition-all duration-base ease-smooth hover:brightness-110"
              data-hover
            >
              Zustimmen
            </button>
            <button
              onClick={decline}
              className="rounded-sm border border-content/40 px-5 py-2 font-body text-xs font-bold uppercase tracking-[0.15em] text-content transition-all duration-base ease-smooth hover:bg-content/10"
              data-hover
            >
              Ablehnen
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
