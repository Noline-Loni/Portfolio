import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const gridConfig: Record<string, { span: string; height: string }> = {
  'luba-labs': { span: 'md:col-span-7', height: 'h-[400px] md:h-[600px]' },
  'cremas-lakay': { span: 'md:col-span-5', height: 'h-[400px] md:h-[600px]' },
  'haiti-med': { span: 'md:col-span-6', height: 'h-[400px] md:h-[520px]' },
  'nutrition-pets': { span: 'md:col-span-6', height: 'h-[400px] md:h-[520px]' },
}

const automationProjects = projects.filter((p) => p.kind === 'automation')
const designProjects = projects.filter((p) => p.kind !== 'automation')

function SectionLabel({ children }: { children: string }) {
  return (
    <motion.div
      className="mb-10 flex items-center gap-3 md:mb-14"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="h-2 w-2 rounded-full bg-accent" />
      <span className="font-body text-xs uppercase tracking-[0.3em] text-content-tertiary">
        {children}
      </span>
    </motion.div>
  )
}

export default function Works() {
  return (
    <section id="work" className="px-6 py-28 md:px-12 md:py-40 lg:px-24">
      {/* ───────── Automation & Engineering ───────── */}
      <SectionLabel>Automation &amp; Engineering</SectionLabel>

      <div className="mb-24 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-36 lg:grid-cols-4">
        {automationProjects.map((project, i) => (
          <motion.div
            key={project.slug}
            className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-md bg-surface-secondary p-7 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] md:p-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.8,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Hover tint via GPU opacity (avoids repainting the card's shadow) */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-surface-tertiary opacity-0 transition-opacity duration-500 ease-smooth group-hover:opacity-100" />

            <Link
              to={`/project/${project.slug}`}
              className="absolute inset-0 z-10"
              data-hover
            >
              <span className="sr-only">{project.title}</span>
            </Link>

            {/* Top row: category + year */}
            <div className="relative z-[5] flex items-center justify-between">
              <span className="font-body text-[10px] uppercase tracking-[0.2em] text-content-tertiary">
                {project.category}
              </span>
              <span className="font-body text-[10px] text-content-tertiary">
                {project.year}
              </span>
            </div>

            {/* Bottom block: metric + title + tags */}
            <div className="relative z-[5] mt-8">
              {project.heroMetric && (
                <div className="mb-5">
                  <div className="font-display text-4xl leading-none text-accent transition-transform duration-500 ease-smooth group-hover:-translate-y-0.5 md:text-5xl">
                    {project.heroMetric.value}
                  </div>
                  <div className="mt-2 font-body text-xs text-content-tertiary">
                    {project.heroMetric.label}
                  </div>
                </div>
              )}
              <h3 className="font-display text-2xl text-content md:text-3xl">
                {project.title}
              </h3>
              <span className="mt-1 inline-block font-body text-[10px] uppercase tracking-[0.2em] text-accent">
                {project.subtitle}
              </span>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-stroke-subtle/50 px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.1em] text-content-tertiary/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ───────── Design & Branding ───────── */}
      <SectionLabel>Design &amp; Branding</SectionLabel>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {designProjects.map((project, i) => {
          const config = gridConfig[project.slug] || {
            span: 'md:col-span-6',
            height: 'h-[400px] md:h-[520px]',
          }
          return (
            <motion.div
              key={project.slug}
              className={`group relative overflow-hidden rounded-md shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ${config.span} ${config.height}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                to={`/project/${project.slug}`}
                className="absolute inset-0 z-10"
                data-hover
              >
                <span className="sr-only">{project.title}</span>
              </Link>

              {/* Cover image — promoted to its own GPU layer so the hover
                  scale/opacity is composited, not repainted */}
              <img
                src={project.cover}
                alt={project.coverAlt || project.title}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full transform-gpu object-cover ${project.coverPosition || 'object-center'} transition duration-700 ease-smooth will-change-[transform,opacity] group-hover:scale-105 group-hover:opacity-20`}
              />

              {/* Dark overlay that intensifies on hover */}
              <div className="absolute inset-0 bg-surface/20 transition duration-700 ease-smooth group-hover:bg-surface/80" />

              {/* Project info */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                {/* Top row: category */}
                <div>
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] text-content/60 drop-shadow-sm transition-colors duration-500 group-hover:text-content-tertiary">
                    {project.category}
                  </span>
                </div>

                {/* Bottom: title + hover content */}
                <div>
                  <h3 className="font-display text-2xl text-content drop-shadow-md md:text-3xl lg:text-4xl">
                    {project.title}
                  </h3>

                  {/* Hover-reveal */}
                  <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-smooth group-hover:max-h-60 group-hover:opacity-100">
                    <span className="mt-1 inline-block font-body text-[10px] uppercase tracking-[0.2em] text-accent">
                      {project.subtitle}
                    </span>
                    <p className="mt-3 max-w-md font-body text-xs leading-relaxed text-content-secondary/90 md:text-sm">
                      {project.intro}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm border border-stroke-subtle/50 px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.1em] text-content-tertiary/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
