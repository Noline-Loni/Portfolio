import type Lenis from 'lenis'

let lenisInstance: Lenis | null = null

/** Register the app's Lenis instance so scroll helpers animate smoothly. */
export function setLenis(instance: Lenis | null): void {
  lenisInstance = instance
}

/** Scroll back to the top of the page (smooth by default, or instant). */
export function scrollToTop(opts?: { immediate?: boolean }): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, opts?.immediate ? { immediate: true } : { duration: 1.1 })
  } else {
    window.scrollTo({ top: 0, behavior: opts?.immediate ? 'auto' : 'smooth' })
  }
}
