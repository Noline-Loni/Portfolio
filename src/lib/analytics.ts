const GA4_ID = import.meta.env.VITE_GA4_ID

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

let loaded = false

/** localStorage key holding the visitor's analytics choice ('granted' | 'denied'). */
export const CONSENT_KEY = 'nl-analytics-consent'

/** Current stored choice, or null if the visitor has not decided yet. */
export function getConsent(): 'granted' | 'denied' | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

/**
 * Withdraw consent: store 'denied', delete the GA cookies on this domain and
 * reload so gtag.js is no longer running.
 */
export function revokeConsent(): void {
  try {
    localStorage.setItem(CONSENT_KEY, 'denied')
  } catch {
    /* storage blocked: nothing stored, nothing to revoke */
  }
  const host = window.location.hostname
  const domains = ['', host, `.${host.replace(/^www\./, '')}`]
  document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_'))
    .forEach((name) =>
      domains.forEach((d) => {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`
      })
    )
  window.location.reload()
}

/** True when a GA4 Measurement ID (G-XXXX) is configured via VITE_GA4_ID. */
export function ga4Available(): boolean {
  return typeof GA4_ID === 'string' && /^G-/.test(GA4_ID)
}

/**
 * Sends a GA4 event — only if the visitor consented and gtag is loaded.
 * Without consent this is a silent no-op.
 */
export function trackEvent(name: string, params: Record<string, string | number> = {}): void {
  if (!loaded || getConsent() !== 'granted' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

/** Loads gtag.js and configures GA4. Only call after the user has consented. */
export function loadGA4(): void {
  if (loaded || !ga4Available()) return
  loaded = true

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
  document.head.appendChild(s)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA4_ID as string)
}
