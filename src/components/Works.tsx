import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const gridConfig: Record<
  string,
  { span: string; height: string }
> = {
  'luba-labs': { span: 'md:col-span-7', height: 'h-[400px] md:h-[600px]' },
  'cremas-lakay': { span: 'md:col-span-5', height: 'h-[400px] md:h-[600px]' },
  'haiti-med': { span: 'md:col-span-6', height: 'h-[400px] md:h-[520px]' },
  'nutrition-pets': { span: 'md:col-span-6', height: 'h-[400px] md:h-[520px]' },
}

export default function Works() {
  return (
    <section id="work" className="px-6 py-28 md:px-12 md:py-40 lg:px-24">
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
          Selected Works
        </span>
      </motion.div>

      {/* Asymmetric grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {projects.map((project, i) => {
          const config = gridConfig[project.slug] || {
            span: 'md:col-span-6',
            height: 'h-[400px] md:h-[520px]',
          }
          return (
            <motion.div
              key={project.slug}
              className={`group relative overflow-hidden rounded-md ${config.span} ${config.height}`}
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

              {/* Cover image */}
              <img
                src={project.cover}
                alt={project.title}
                className={`absolute inset-0 h-full w-full object-cover ${project.coverPosition || 'object-center'} transition-all duration-700 ease-smooth group-hover:scale-105 group-hover:opacity-20`}
              />

              {/* Dark overlay that intensifies on hover */}
              <div className="absolute inset-0 bg-surface/20 transition-all duration-700 ease-smooth group-hover:bg-surface/80" />

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
