import { motion } from 'framer-motion'

const items =
  'UI/UX Design \u00A0\u2022\u00A0 Marketing Automation \u00A0\u2022\u00A0 KPI-Dashboards \u00A0\u2022\u00A0 Performance Marketing \u00A0\u2022\u00A0 Brand Identity \u00A0\u2022\u00A0 3D Visualisierung \u00A0\u2022\u00A0 '

export default function Marquee() {
  return (
    <motion.div
      className="overflow-hidden border-y border-stroke-subtle py-7 shadow-[inset_0_18px_30px_-20px_rgba(0,0,0,0.7),inset_0_-18px_30px_-20px_rgba(0,0,0,0.7)]"
      style={{ backgroundColor: 'rgba(31,31,31,0.5)' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="animate-marquee flex whitespace-nowrap">
        {/* Repeat content 4 times for seamless loop */}
        {[...Array(4)].map((_, idx) => (
          <span
            key={idx}
            className="font-body text-sm uppercase tracking-[0.25em] text-content-tertiary"
          >
            {items}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
