import type { Project } from '../data/projects'
import { faqs } from '../data/faq'
import { SITE_URL } from './site'

// Re-exported so the prerender script can pull everything from one bundle.
export * from './site'
export { projects } from '../data/projects'

export const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Noline Lindor',
  jobTitle: 'Creative Technologist',
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  email: 'mailto:nolinelindor@gmail.com',
  description:
    'Creative Technologist an der Schnittstelle von Design, Marketing und Technologie — UI/UX Design, KI-gestützte Marketing Automation und datengetriebene Dashboards.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bochum',
    addressCountry: 'DE',
  },
  knowsAbout: [
    'UI/UX Design',
    'Marketing Automation',
    'KI-Workflows',
    'Claude',
    'n8n',
    'Performance Marketing',
    'Python',
    'Meta Marketing API',
    'Google Ads',
    'SEO',
    'React',
    'Brand Identity',
  ],
  sameAs: [
    'https://www.linkedin.com/in/noline-lindor-43b923213',
    'https://github.com/Noline-Loni',
    'https://www.instagram.com/noline_lindor',
    'https://www.facebook.com/noline.lindor',
  ],
}

export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Noline Lindor',
  url: SITE_URL,
}

export const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export const creativeWorkLd = (p: Project) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: p.title,
  headline: `${p.title} — ${p.subtitle}`,
  abstract: p.intro,
  about: p.category,
  keywords: p.tags.join(', '),
  dateCreated: p.year,
  inLanguage: 'de',
  author: { '@type': 'Person', name: 'Noline Lindor', url: SITE_URL },
  url: `${SITE_URL}/project/${p.slug}`,
  ...(p.cover ? { image: `${SITE_URL}${p.cover}` } : {}),
})

export const breadcrumbLd = (p: Project) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Projekte', item: `${SITE_URL}/#work` },
    {
      '@type': 'ListItem',
      position: 3,
      name: p.title,
      item: `${SITE_URL}/project/${p.slug}`,
    },
  ],
})
