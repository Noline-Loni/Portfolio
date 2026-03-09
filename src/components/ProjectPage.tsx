import { useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getProject, getNextProject } from '../data/projects'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const project = getProject(slug || '')
  const nextProject = getNextProject(slug || '')
  const heroRef = useRef<HTMLDivElement>(null)

  // Parallax: slight upward movement of hero image
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  // Scroll to top on slug change — use instant scroll + reset Lenis
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    // Fallback for Lenis
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [slug])

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="font-display text-4xl text-content">
            Projekt nicht gefunden
          </h1>
          <Link
            to="/"
            className="mt-6 inline-block font-body text-sm text-accent underline underline-offset-4"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    )
  }

  // Count text sections for chapter numbering
  let chapterIndex = 0

  return (
    <div className="min-h-screen bg-surface">
      {/* ═══════════════ PARALLAX HERO ═══════════════ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Fixed-like parallax background image */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <img
            src={project.cover}
            alt={project.title}
            className={`h-full w-full object-cover ${project.coverPosition || 'object-center'}`}
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface/40 to-transparent" />

        {/* Hero content — pinned to bottom */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-12 md:pb-24 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-4 inline-block font-body text-[10px] uppercase tracking-[0.3em] text-accent">
              {project.subtitle}
            </span>
            <h1 className="font-display text-2xl leading-[0.95] tracking-[-0.02em] text-content md:text-4xl lg:text-5xl">
              {project.title}
            </h1>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2">
              <span className="font-body text-[10px] uppercase tracking-[0.15em] text-content-tertiary">
                Kategorie
              </span>
              <span className="font-body text-sm text-content-secondary">
                {project.category}
              </span>
            </div>

            {project.externalLink && (
              <>
                <div className="h-4 w-px bg-stroke" />
                <a
                  href={project.externalLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-accent underline underline-offset-4 transition-colors hover:text-content"
                  data-hover
                >
                  {project.externalLink.label} &nearr;
                </a>
              </>
            )}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            className="h-10 w-[1px] bg-content/30"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      </section>

      {/* ═══════════════ INTRO + TAGS ═══════════════ */}
      <section className="px-6 py-24 md:px-12 md:py-36 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <motion.p
            className="font-display text-2xl leading-[1.35] tracking-[-0.01em] text-content md:text-4xl lg:text-5xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            {project.intro}
          </motion.p>

          <motion.div
            className="mt-12 flex flex-wrap gap-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-stroke px-4 py-2 font-body text-xs uppercase tracking-[0.1em] text-content-tertiary"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CONTENT SECTIONS ═══════════════ */}
      {project.sections.map((section, i) => {
        if (section.type === 'text') {
          chapterIndex++
          const num = String(chapterIndex).padStart(2, '0')
          return (
            <section key={i} className="px-6 pb-20 md:px-12 md:pb-28 lg:px-24">
              <motion.div
                className="mx-auto max-w-5xl"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                custom={0}
              >
                {section.heading && (
                  <div className="mb-6 flex items-baseline gap-4">
                    <span className="font-body text-xs tabular-nums text-accent/60">
                      {num}
                    </span>
                    <h2 className="font-display text-2xl tracking-[-0.01em] text-accent md:text-3xl">
                      {section.heading}
                    </h2>
                  </div>
                )}
                <p className="max-w-3xl font-body text-base leading-[1.8] text-content-secondary md:text-lg">
                  {section.content}
                </p>
              </motion.div>
            </section>
          )
        }

        if (section.type === 'image') {
          return (
            <section key={i} className="pb-8 md:pb-12">
              <motion.div
                className="mx-auto max-w-6xl overflow-hidden px-6 md:px-12 lg:px-24"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                custom={0}
              >
                <div className="overflow-hidden rounded-lg">
                  <motion.img
                    src={section.src}
                    alt={section.alt || ''}
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            </section>
          )
        }

        if (section.type === 'image-grid') {
          return (
            <section key={i} className="pb-8 md:pb-12">
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-12 lg:px-24">
                {section.images?.map((img, j) => (
                  <motion.div
                    key={j}
                    className="overflow-hidden rounded-lg"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    custom={j * 0.5}
                  >
                    <motion.img
                      src={img.src}
                      alt={img.alt}
                      className="w-full"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          )
        }

        return null
      })}

      {/* ═══════════════ NEXT PROJECT (dark bg) ═══════════════ */}
      {nextProject && (
        <section className="bg-[#1F1F1F]">
          {/* Divider */}
          <div className="mx-auto max-w-5xl px-6 pt-16 md:px-12 md:pt-24 lg:px-24">
            <div className="h-px w-full bg-stroke-subtle/40" />
          </div>

          <div className="px-6 pb-32 pt-16 md:px-12 md:pb-44 md:pt-20 lg:px-24">
            <motion.div
              className="mx-auto max-w-5xl text-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <span className="font-body text-[10px] uppercase tracking-[0.3em] text-content-tertiary">
                Nächstes Projekt
              </span>
              <button
                onClick={() => navigate(`/project/${nextProject.slug}`)}
                className="group mt-6 block w-full text-center"
                data-hover
              >
                <h3 className="font-display text-4xl tracking-[-0.02em] text-content transition-colors duration-base group-hover:text-accent md:text-6xl lg:text-8xl">
                  {nextProject.title}
                </h3>
                <p className="mt-3 font-body text-sm text-content-tertiary">
                  {nextProject.subtitle}
                </p>
              </button>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}
