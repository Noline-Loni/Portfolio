const GA4_ID = import.meta.env.VITE_GA4_ID

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

let loaded = false

/** True when a GA4 Measurement ID (G-XXXX) is configured via VITE_GA4_ID. */
export function ga4Available(): boolean {
  return typeof GA4_ID === 'string' && /^G-/.test(GA4_ID)
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
