import { motion } from 'framer-motion'

const items =
  'UI/UX Design \u00A0\u2022\u00A0 AWS Lambda \u00A0\u2022\u00A0 n8n Automation \u00A0\u2022\u00A0 AI Dashboards \u00A0\u2022\u00A0 Graphic Design \u00A0\u2022\u00A0 Project Management \u00A0\u2022\u00A0 '

export default function Marquee() {
  return (
    <motion.div
      className="overflow-hidden border-y border-stroke-subtle py-7"
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
