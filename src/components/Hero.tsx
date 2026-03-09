import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import Logo3D from './Logo3D'

const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.6 + i * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function AnimatedWords({
  text,
  className,
  startIndex = 0,
}: {
  text: string
  className?: string
  startIndex?: number
}) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-clip px-[0.05em] py-[0.15em] -mx-[0.05em] -my-[0.15em]">
          <motion.span
            className="inline-block"
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            custom={startIndex + i}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden" id="hero">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 1], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={2}
              color="#F5F5EF"
            />
            {/* Key light from front-left for visibility */}
            <directionalLight
              position={[-3, 2, 4]}
              intensity={1.5}
              color="#E8E8E0"
            />
            {/* Accent rim light from behind */}
            <pointLight
              position={[-3, -2, -4]}
              intensity={1.2}
              color="#FB7751"
            />
            <pointLight
              position={[3, 3, -3]}
              intensity={0.6}
              color="#FB7751"
            />
            <Environment preset="city" />
            <Logo3D />
          </Canvas>
        </Suspense>
      </div>

      {/* Bottom gradient overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-surface via-surface/40 to-transparent" />

      {/* Top vignette */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-surface/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-12 md:pb-28 lg:px-24 lg:pb-32">
        <div className="max-w-5xl">
          <h1 className="font-display text-display leading-[0.95] tracking-[-0.02em]">
            <AnimatedWords text="Design meets" />
            <br />
            <AnimatedWords
              text="Deep"
              className="text-content"
              startIndex={2}
            />{' '}
            <AnimatedWords
              text="Automation."
              className="text-accent"
              startIndex={3}
            />
          </h1>

          <motion.p
            className="mt-6 max-w-xl font-body text-base font-light text-content-secondary md:mt-8 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Noline Lindor — UI/UX Design, AI Integrations{' '}
            <br className="hidden md:block" />
            &amp; Full-Stack Automation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-8 flex items-center gap-4 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-sm bg-accent px-8 py-3.5 font-body text-xs font-bold uppercase tracking-[0.15em] text-surface transition-all duration-base ease-smooth hover:brightness-110 hover:scale-[1.02]"
              data-hover
            >
              Contact
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-sm border border-content px-8 py-3.5 font-body text-xs font-bold uppercase tracking-[0.15em] text-content transition-all duration-base ease-smooth hover:bg-content hover:text-surface"
              data-hover
            >
              Work
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-content-tertiary">
            Scroll
          </span>
          <div className="animate-pulse-line h-10 w-[1px] bg-content-tertiary/50" />
        </div>
      </motion.div>
    </section>
  )
}
