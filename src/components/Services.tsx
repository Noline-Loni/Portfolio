import { motion } from 'framer-motion'

const categories = [
  {
    number: '01',
    title: 'Kreativ',
    services: [
      {
        name: 'UI/UX Design',
        desc: 'Nutzerzentrierte Interfaces, die Ästhetik und Funktion verbinden.',
      },
      {
        name: '3D Design',
        desc: 'Dreidimensionale Markenelemente und immersive Visualisierungen.',
      },
      {
        name: 'Brand Identity',
        desc: 'Visuelle Systeme, die Marken definieren und differenzieren.',
      },
    ],
  },
  {
    number: '02',
    title: 'Technologie',
    services: [
      {
        name: 'KPI-Dashboards',
        desc: 'Datengetriebene Visualisierungen, die Marketing-Performance sichtbar machen.',
      },
      {
        name: 'Marketing Automation',
        desc: 'Python-Skripte und API-Anbindungen, die manuelle Prozesse eliminieren.',
      },
      {
        name: 'KI-Workflows',
        desc: 'Claude- und n8n-Workflows, eigene Agenten und Skills, die wiederkehrende Arbeit übernehmen.',
      },
      {
        name: 'Performance Marketing',
        desc: 'Google Ads, Meta Ads und datenbasierte Kampagnensteuerung.',
      },
    ],
  },
]

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

export default function Services() {
  return (
    <section
      id="services"
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
          Leistungen
        </span>
      </motion.div>

      {/* Two-column grid */}
      <div className="grid gap-16 md:grid-cols-2 md:gap-12 lg:gap-20">
        {categories.map((cat, catIdx) => (
          <div key={cat.number}>
            {/* Category header */}
            <motion.div
              className="mb-10 flex items-baseline gap-4 border-b border-stroke-subtle pb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                delay: catIdx * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="font-body text-xs text-content-tertiary">
                {cat.number}
              </span>
              <h2 className="font-display text-3xl md:text-4xl">
                {cat.title}
              </h2>
            </motion.div>

            {/* Service items */}
            <div className="flex flex-col gap-8">
              {cat.services.map((service, i) => (
                <motion.div
                  key={service.name}
                  className="group border-l-[1px] border-stroke-subtle py-1 pl-6 transition-all duration-base ease-smooth hover:border-accent hover:pl-8"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  custom={catIdx * 3 + i}
                  data-hover
                >
                  <h3 className="font-display text-xl transition-colors duration-fast group-hover:text-accent md:text-2xl">
                    {service.name}
                  </h3>
                  <p className="mt-2 font-body text-sm font-light text-content-tertiary">
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
