import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const charVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.02,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function AnimatedChars({ text }: { text: string }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block overflow-clip px-[0.05em] py-[0.15em] -mx-[0.05em] -my-[0.15em]"
          style={char === ' ' ? { width: '0.3em' } : undefined}
        >
          <motion.span
            className="inline-block"
            variants={charVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={i}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </>
  )
}

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false)
  const [clipOrigin, setClipOrigin] = useState({ x: '50%', y: '65%' })
  const btnRef = useRef<HTMLAnchorElement>(null)

  // Calculate button center in viewport percentages for clip-path origin
  const updateClipOrigin = useCallback(() => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const centerX = ((rect.left + rect.width / 2) / window.innerWidth) * 100
    const centerY = ((rect.top + rect.height / 2) / window.innerHeight) * 100
    setClipOrigin({ x: `${centerX}%`, y: `${centerY}%` })
  }, [])

  return (
    <footer
      id="contact"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-28"
    >
      {/* Expanding background circle — starts exactly from button center */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-30 bg-accent"
            initial={{ clipPath: `circle(0% at ${clipOrigin.x} ${clipOrigin.y})` }}
            animate={{ clipPath: `circle(160% at ${clipOrigin.x} ${clipOrigin.y})` }}
            exit={{ clipPath: `circle(0% at ${clipOrigin.x} ${clipOrigin.y})` }}
            transition={{
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        )}
      </AnimatePresence>

      {/* Big headline — text color changes when expanded */}
      <motion.h2
        className="relative z-40 text-center font-display text-display-lg tracking-[-0.03em]"
        animate={{ color: isHovered ? '#353535' : undefined }}
        transition={{ duration: 0.6, delay: isHovered ? 0.4 : 0 }}
      >
        <AnimatedChars text="Let's build" />
        <br />
        <AnimatedChars text="the future." />
      </motion.h2>

      {/* CTA Button */}
      <motion.a
        ref={btnRef}
        href="mailto:nolinelindor@gmail.com"
        className="relative z-40 mt-16 flex h-36 w-36 items-center justify-center rounded-full bg-accent text-center font-body text-xs font-bold uppercase tracking-[0.15em] md:mt-20 md:h-40 md:w-40"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        animate={{
          color: isHovered ? '#353535' : '#F5F5EF',
          borderColor: isHovered ? '#353535' : 'transparent',
          scale: isHovered ? 1.15 : 1,
        }}
        onHoverStart={() => {
          updateClipOrigin()
          setIsHovered(true)
        }}
        onHoverEnd={() => setIsHovered(false)}
        data-hover
        style={{
          border: '2px solid transparent',
        }}
      >
        Start a<br />Project
      </motion.a>

      {/* Bottom row */}
      <motion.div
        className="absolute bottom-8 left-6 right-6 z-40 flex flex-col items-center justify-between gap-4 md:flex-row md:px-6 lg:px-18"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.span
          className="font-body text-xs"
          animate={{ color: isHovered ? '#353535' : undefined }}
          transition={{ duration: 0.6, delay: isHovered ? 0.4 : 0 }}
        >
          &copy; {new Date().getFullYear()} Noline Lindor
        </motion.span>

        <div className="flex flex-wrap items-center gap-6 md:gap-8">
          <motion.a
            href="mailto:nolinelindor@gmail.com"
            className="font-body text-xs transition-colors duration-fast"
            animate={{ color: isHovered ? '#353535' : undefined }}
            transition={{ duration: 0.6, delay: isHovered ? 0.4 : 0 }}
            data-hover
          >
            Email
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/noline-lindor-43b923213"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs transition-colors duration-fast"
            animate={{ color: isHovered ? '#353535' : undefined }}
            transition={{ duration: 0.6, delay: isHovered ? 0.4 : 0 }}
            data-hover
          >
            LinkedIn
          </motion.a>
          <motion.a
            href="https://github.com/Noline-Loni"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs transition-colors duration-fast"
            animate={{ color: isHovered ? '#353535' : undefined }}
            transition={{ duration: 0.6, delay: isHovered ? 0.4 : 0 }}
            data-hover
          >
            GitHub
          </motion.a>
          <motion.a
            href="https://www.instagram.com/noline_lindor"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs transition-colors duration-fast"
            animate={{ color: isHovered ? '#353535' : undefined }}
            transition={{ duration: 0.6, delay: isHovered ? 0.4 : 0 }}
            data-hover
          >
            Instagram
          </motion.a>
          <motion.a
            href="https://www.facebook.com/noline.lindor"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs transition-colors duration-fast"
            animate={{ color: isHovered ? '#353535' : undefined }}
            transition={{ duration: 0.6, delay: isHovered ? 0.4 : 0 }}
            data-hover
          >
            Facebook
          </motion.a>
        </div>
      </motion.div>
    </footer>
  )
}
