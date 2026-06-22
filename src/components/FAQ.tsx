import { useState } from 'react'
import { motion } from 'framer-motion'
import { faqs } from '../data/faq'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="px-6 py-28 md:px-12 md:py-40 lg:px-24">
      <motion.div
        className="mb-12 flex items-center gap-3 md:mb-16"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="h-2 w-2 rounded-full bg-accent" />
        <span className="font-body text-xs uppercase tracking-[0.3em] text-content-tertiary">
          FAQ
        </span>
      </motion.div>

      <div className="mx-auto max-w-4xl border-t border-stroke-subtle/40">
        {faqs.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={i} className="border-b border-stroke-subtle/40">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
                data-hover
              >
                <h3 className="font-display text-xl text-content transition-colors duration-fast md:text-2xl">
                  {item.q}
                </h3>
                <span
                  className={`shrink-0 font-display text-2xl leading-none text-accent transition-transform duration-base ease-smooth ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-base ease-smooth ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="max-w-3xl pb-7 font-body text-base leading-relaxed text-content-secondary">
                  {item.a}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
