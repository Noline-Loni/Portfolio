import { motion } from 'framer-motion'

const words =
  'Aus Bochum. Ich schlie\u00DFe die L\u00FCcke zwischen herausragendem Design und komplexer technischer Logik. Von der ersten Skizze bis zur automatisierten Backend-Architektur entwickle ich digitale Erlebnisse, die fantastisch aussehen und intelligent funktionieren.'.split(
    ' '
  )

export default function About() {
  return (
    <section
      id="about"
      className="flex min-h-screen items-center px-6 py-28 md:px-12 md:py-40 lg:px-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Section label */}
        <motion.div
          className="mb-12 flex items-center gap-3 md:mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-body text-xs uppercase tracking-[0.3em] text-content-tertiary">
            About
          </span>
        </motion.div>

        {/* Main text with word-by-word reveal */}
        <p className="flex flex-wrap font-body text-xl font-light leading-relaxed text-content-secondary md:text-2xl lg:text-3xl lg:leading-relaxed">
          {words.map((word, i) => (
            <span key={i} className="mr-[0.3em] inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>

        {/* Decorative accent line */}
        <motion.div
          className="mt-12 h-[1px] bg-gradient-to-r from-accent via-accent/30 to-transparent md:mt-16"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </section>
  )
}
