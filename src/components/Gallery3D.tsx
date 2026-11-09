import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const images = [
  { src: '/images/works/3d/beauty-products.webp', alt: '3D-Rendering: Sprühflasche und Cremetiegel mit nl.-Etikett auf Terrazzo-Kante vor apricotfarbenem Hintergrund' },
  { src: '/images/works/3d/Nail_Shop_mockup-Kamera.webp', alt: '3D-Rendering eines Nagelstudio-Tischs mit Nagellack, Visitenkarten, Laptop und Kaffeetasse' },
  { src: '/images/works/3d/Tabletop_Menue-Mockup_new-Kamera 3.webp', alt: '3D-Rendering: aufgeklappte Speisekarte auf einem Teller im Abendlicht, dahinter Schale und Glas' },
  { src: '/images/works/3d/Tabletop_Menue-Mockup_new2-Kamera 2.webp', alt: '3D-Rendering: Speisekarte auf einem Teller mit Messer und Gabel, von schräg oben im Schattenlicht' },
  { src: '/images/works/3d/Vases-Kamera.webp', alt: '3D-Rendering: Wandregale mit hellen und dunklen Keramikvasen, daneben eine schwarze Holzleiter' },
]

export default function Gallery3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const [translateEnd, setTranslateEnd] = useState(-3000)

  // Measure the actual strip width and calculate how far to translate
  useEffect(() => {
    const measure = () => {
      if (stripRef.current) {
        const stripWidth = stripRef.current.scrollWidth
        const viewportWidth = window.innerWidth
        setTranslateEnd(-(stripWidth - viewportWidth + 48)) // +48 for some end padding
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, translateEnd])

  return (
    <section
      ref={containerRef}
      className="relative"
      // Height creates enough scroll runway for all images to pass through
      style={{ height: `${images.length * 50 + 100}vh` }}
    >
      {/* Sticky viewport — pinned while scrolling through */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Section label */}
        <motion.div
          className="mb-8 flex items-center gap-3 px-6 md:mb-12 md:px-12 lg:px-24"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-body text-xs uppercase tracking-[0.3em] text-content-tertiary">
            3D Visualisierungen
          </span>
        </motion.div>

        {/* Horizontal scroll strip */}
        <motion.div
          ref={stripRef}
          style={{ x }}
          className="flex gap-5 pl-6 md:gap-7 md:pl-12 lg:pl-24"
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className="relative h-[50vh] w-[75vw] flex-shrink-0 overflow-hidden rounded-md shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] md:h-[60vh] md:w-[50vw] lg:w-[45vw]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-smooth hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-surface/40 to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
