import { motion } from 'framer-motion'

const words =
  'Creative Technologist an der Schnittstelle von Design, Marketing und Technologie. Ich gestalte nicht nur Interfaces und Kampagnen \u2014 ich baue die Automatisierung dahinter: Python-Skripte, API-Anbindungen und Datendashboards, die Marketing-Performance sichtbar und manuelle Prozesse \u00FCberfl\u00FCssig machen. Bochum als Basis, Projekte \u00FCberall.'.split(
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
            Über mich
          </span>
        </motion.div>

        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-14 lg:gap-20">
        {/* Portrait */}
        <motion.figure
          className="relative mx-auto w-full max-w-[280px] md:max-w-none"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
            <img
              src="/images/about/noline-lindor-portrait.webp"
              srcSet="/images/about/noline-lindor-portrait-600.webp 600w, /images/about/noline-lindor-portrait.webp 1200w"
              sizes="(min-width: 768px) 40vw, 280px"
              width={1200}
              height={1500}
              alt="Porträt von Noline Lindor"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Coral accent corner */}
          <div className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-accent" />
        </motion.figure>

        {/* Main text with word-by-word reveal */}
        <p className="flex flex-wrap font-body text-xl font-light leading-relaxed text-content-secondary md:text-xl lg:text-2xl lg:leading-relaxed">
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
        </div>

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
