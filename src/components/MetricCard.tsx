import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'

/** Plain counts ("199", "100+", "12×") count up; everything else just appears. */
const COUNTABLE = /^(\d+)([+×]?)$/

const EASE = [0.22, 1, 0.36, 1] as const

/** Long values ("4 h → 20 min") get a smaller size so the cards stay even. */
function sizeFor(value: string): string {
  if (value.length <= 4) return 'text-3xl md:text-4xl'
  if (value.length <= 8) return 'text-2xl md:text-[2.5rem] md:leading-[1.1]'
  return 'text-xl md:text-2xl'
}

/**
 * Key figure on a project page. The label is always visible (touch devices
 * have no hover); hovering only darkens the card and adds an accent border.
 */
export default function MetricCard({
  value,
  label,
  index,
}: {
  value: string
  label: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()
  const match = value.match(COUNTABLE)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ''
  // Starts as the real value so prerendered HTML and no-JS show the truth.
  const [shown, setShown] = useState(value)

  useEffect(() => {
    if (!inView || reduceMotion || target === 0) return
    const controls = animate(0, target, {
      duration: 1.2,
      delay: index * 0.08,
      ease: EASE,
      onUpdate: (v) => setShown(`${Math.round(v)}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, target, suffix, index])

  return (
    <motion.div
      ref={ref}
      className="group flex min-h-[8.5rem] min-w-0 flex-col justify-center rounded-lg border border-transparent bg-surface-secondary px-5 py-6 transition-colors duration-base ease-smooth hover:border-accent/50 hover:bg-surface-deep md:min-h-[10.5rem] md:px-6 md:py-7"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay: index * 0.04, ease: EASE },
        },
      }}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className={`font-display text-accent [overflow-wrap:anywhere] ${sizeFor(value)}`}>
        {/* Screen readers get the final value, not the running counter */}
        <span className="sr-only">{value}</span>
        <span aria-hidden>{shown}</span>
      </div>
      <div className="mt-2 font-body text-xs leading-snug text-content-tertiary transition-colors duration-base group-hover:text-content md:text-sm">
        {label}
      </div>
    </motion.div>
  )
}
