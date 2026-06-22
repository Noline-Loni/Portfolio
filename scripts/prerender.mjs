// Post-build prerender: writes a static index.html per route with the correct
// <title>, description, canonical, Open Graph / Twitter tags and JSON-LD.
// The SPA still hydrates and renders the body — this gives crawlers and social
// scrapers correct per-route markup without a full SSR/SSG framework.
//
// Project data is imported from src/data/projects.ts (single source of truth)
// by transpiling it with esbuild (already a Vite dependency).

import { build } from 'esbuild'
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'

const SITE_URL = 'https://nolinelindor.com'
const SITE_NAME = 'Noline Lindor'
const DIST = resolve('dist')

// --- 1. Import the project list from TS via esbuild ---
const bundled = await build({
  entryPoints: ['src/data/projects.ts'],
  bundle: true,
  format: 'esm',
  write: false,
  platform: 'node',
})
const tmp = resolve(DIST, '_projects.mjs')
writeFileSync(tmp, bundled.outputFiles[0].text)
const { projects } = await import(pathToFileURL(tmp).href)
rmSync(tmp)

// --- 2. Shared structured data ---
const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Noline Lindor',
  jobTitle: 'Creative Technologist',
  url: SITE_URL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bochum',
    addressCountry: 'DE',
  },
  knowsAbout: [
    'UI/UX Design',
    'Marketing Automation',
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

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
}

const creativeWorkLd = (p) => ({
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

// --- 3. Build the route table ---
const HOME_DESC =
  'Creative Technologist an der Schnittstelle von Design, Marketing und Technologie. UI/UX Design, Marketing Automation & KPI-Dashboards.'

const routes = [
  {
    path: '/',
    title: 'Noline Lindor — Creative Technologist',
    description: HOME_DESC,
    type: 'website',
    image: '/og-image.jpg',
    jsonLd: [personLd, websiteLd],
  },
  ...projects.map((p) => ({
    path: `/project/${p.slug}`,
    title: `${p.title} — ${p.subtitle} · Noline Lindor`,
    description: p.intro,
    type: 'article',
    image: p.cover || null,
    jsonLd: [creativeWorkLd(p)],
  })),
]

// --- 4. Render ---
const template = readFileSync(resolve(DIST, 'index.html'), 'utf8')

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function headTags(route) {
  const url = SITE_URL + route.path
  const img = route.image ? SITE_URL + route.image : null
  const tags = [
    `<meta name="description" content="${esc(route.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route.type}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    ...(img ? [`<meta property="og:image" content="${img}" />`] : []),
    `<meta name="twitter:card" content="${img ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    ...(img ? [`<meta name="twitter:image" content="${img}" />`] : []),
    ...route.jsonLd.map(
      (b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`
    ),
  ]
  return tags.join('\n    ')
}

function renderRoute(route) {
  let html = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${esc(route.title)}</title>`
  )
  html = html.replace('</head>', `    ${headTags(route)}\n  </head>`)
  return html
}

for (const route of routes) {
  const outPath =
    route.path === '/'
      ? resolve(DIST, 'index.html')
      : resolve(DIST, route.path.replace(/^\//, ''), 'index.html')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, renderRoute(route))
}

console.log(`✓ Prerendered ${routes.length} routes (1 home + ${projects.length} projects)`)
