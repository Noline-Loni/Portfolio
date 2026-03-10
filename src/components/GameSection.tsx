import { motion } from 'framer-motion'

export default function GameSection() {
  return (
    <section
      id="game"
      className="px-6 py-28 md:px-12 md:py-40 lg:px-24"
    >
      {/* Section label */}
      <motion.div
        className="mb-16 flex items-center gap-3 md:mb-24"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="h-2 w-2 rounded-full bg-accent" />
        <span className="font-body text-xs uppercase tracking-[0.3em] text-content-tertiary">
          Take a Break
        </span>
      </motion.div>

      {/* Two-column layout */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-3xl tracking-[-0.01em] text-content md:text-4xl">
            Claude Jump
          </h2>
          <p className="mt-4 font-body text-sm font-light leading-relaxed text-content-secondary md:text-base">
            Ein kleines Retro-Spiel, gebaut mit purem HTML, CSS &amp; JavaScript.
            Spring durch den Weltraum, weiche Hindernissen aus und schau wie weit
            du kommst.
          </p>
          <a
            href="https://space-jump-ten.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-body text-sm text-accent underline underline-offset-4 transition-colors duration-fast hover:text-content"
            data-hover
          >
            Jetzt spielen ↗
          </a>
        </motion.div>

        {/* Right: CRT Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="https://space-jump-ten.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
            data-hover
          >
            <div className="crt-monitor">
              <div className="crt-bezel">
                <div className="crt-screen group-hover:crt-screen--active">
                  {/* Game preview via iframe (non-interactive, visual only) */}
                  <iframe
                    src="https://space-jump-ten.vercel.app"
                    title="Claude Jump Preview"
                    className="crt-iframe"
                    loading="lazy"
                    tabIndex={-1}
                  />
                  {/* Click overlay to block iframe interaction */}
                  <div className="absolute inset-0 z-[1]" />
                  <div className="crt-scanlines" />
                  <div className="crt-glare" />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 z-[4] flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-sm bg-accent px-5 py-2.5 font-body text-xs uppercase tracking-[0.2em] text-surface">
                      Play Game
                    </span>
                  </div>
                </div>
              </div>
              <div className="crt-bottom-bar">
                <div className="crt-power-led" />
                <span className="font-body text-[9px] uppercase tracking-[0.2em] text-content-tertiary/50">
                  Claude Jump
                </span>
              </div>
              <div className="crt-stand" />
              <div className="crt-stand-base" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
