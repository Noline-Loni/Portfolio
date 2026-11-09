import type Lenis from 'lenis'

let lenisInstance: Lenis | null = null

/** Register the app's Lenis instance so scroll helpers animate smoothly. */
export function setLenis(instance: Lenis | null): void {
  lenisInstance = instance
}

/** True when the visitor has "reduce motion" switched on in their OS. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Scroll back to the top of the page (smooth by default, or instant). */
export function scrollToTop(opts?: { immediate?: boolean }): void {
  const immediate = opts?.immediate || prefersReducedMotion()
  if (lenisInstance) {
    lenisInstance.scrollTo(0, immediate ? { immediate: true } : { duration: 1.1 })
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
  }
}
