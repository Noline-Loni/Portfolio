// Post-build prerender: writes a static index.html per route with the correct
// <title>, description, canonical, Open Graph / Twitter tags and JSON-LD, and
// generates sitemap.xml. The SPA still hydrates and renders the body — this
// gives crawlers and AI/social scrapers correct per-route markup without SSR.
//
// All data + structured-data builders come from src/lib/structuredData.ts
// (single source of truth), transpiled with esbuild (a Vite dependency).

import { build } from 'esbuild'
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST = resolve('dist')

// --- 1. Bundle the shared data/structured-data module and import it ---
const bundled = await build({
  entryPoints: ['src/lib/structuredData.ts'],
  bundle: true,
  format: 'esm',
  write: false,
  platform: 'node',
})
const tmp = resolve(DIST, '_seo-data.mjs')
writeFileSync(tmp, bundled.outputFiles[0].text)
const {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  projects,
  personLd,
  websiteLd,
  faqLd,
  creativeWorkLd,
  breadcrumbLd,
} = await import(pathToFileURL(tmp).href)
rmSync(tmp)

// --- 2. Route table ---
const routes = [
  {
    path: '/',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    image: '/og-image.jpg',
    priority: '1.0',
    changefreq: 'monthly',
    jsonLd: [personLd, websiteLd, faqLd],
  },
  ...projects.map((p) => ({
    path: `/project/${p.slug}`,
    title: `${p.title} — ${p.subtitle} · ${SITE_NAME}`,
    description: p.intro,
    type: 'article',
    image: p.cover || null,
    priority: '0.8',
    changefreq: 'yearly',
    jsonLd: [creativeWorkLd(p), breadcrumbLd(p)],
  })),
  {
    path: '/kennenlernen',
    title: '1 Wahrheit, 1 Lüge – Lern Noline kennen',
    description:
      'Ein kleines Spiel statt eines langen Anschreibens: Drei Runden, je zwei Aussagen über Noline Lindor. Eine stimmt, eine ist erfunden. Findest du die Wahrheit?',
    type: 'website',
    image: '/og-kennenlernen.jpg',
    priority: '0.7',
    changefreq: 'monthly',
    jsonLd: [],
  },
  // Legal pages: prerendered (so they work without JS and on direct load) but
  // noindex + left out of the sitemap — the Impressum contains a home address.
  ...[
    {
      path: '/impressum',
      title: `Impressum · ${SITE_NAME}`,
      description: 'Impressum von nolinelindor.com — Anbieterkennzeichnung nach § 5 DDG.',
    },
    {
      path: '/datenschutz',
      title: `Datenschutzerklärung · ${SITE_NAME}`,
      description:
        'Datenschutzerklärung von nolinelindor.com — welche Daten beim Besuch verarbeitet werden und welche Rechte du hast.',
    },
  ].map((r) => ({ ...r, type: 'website', image: null, jsonLd: [], noindex: true })),
]

// --- 3. Per-route static HTML ---
const template = readFileSync(resolve(DIST, 'index.html'), 'utf8')

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Tags carry data-rh="true" so react-helmet-async adopts (reconciles) them on
// hydration instead of appending duplicates.
function headTags(route) {
  const url = SITE_URL + route.path
  const img = route.image ? SITE_URL + route.image : null
  return [
    `<meta name="description" content="${esc(route.description)}" data-rh="true" />`,
    `<link rel="canonical" href="${url}" data-rh="true" />`,
    ...(route.noindex ? [`<meta name="robots" content="noindex, follow" data-rh="true" />`] : []),
    `<meta property="og:type" content="${route.type}" data-rh="true" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" data-rh="true" />`,
    `<meta property="og:title" content="${esc(route.title)}" data-rh="true" />`,
    `<meta property="og:description" content="${esc(route.description)}" data-rh="true" />`,
    `<meta property="og:url" content="${url}" data-rh="true" />`,
    ...(img ? [`<meta property="og:image" content="${img}" data-rh="true" />`] : []),
    `<meta name="twitter:card" content="${img ? 'summary_large_image' : 'summary'}" data-rh="true" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" data-rh="true" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" data-rh="true" />`,
    ...(img ? [`<meta name="twitter:image" content="${img}" data-rh="true" />`] : []),
    ...route.jsonLd.map(
      (b) =>
        `<script type="application/ld+json" data-rh="true">${JSON.stringify(b)}</script>`
    ),
  ].join('\n    ')
}

for (const route of routes) {
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`)
    .replace('</head>', `    ${headTags(route)}\n  </head>`)
  const outPath =
    route.path === '/'
      ? resolve(DIST, 'index.html')
      : resolve(DIST, route.path.replace(/^\//, ''), 'index.html')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html)
}

// --- 4. sitemap.xml (with current lastmod) ---
const lastmod = new Date().toISOString().slice(0, 10)
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .filter((r) => !r.noindex)
    .map(
      (r) =>
        `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`
writeFileSync(resolve(DIST, 'sitemap.xml'), sitemap)

console.log(
  `✓ Prerendered ${routes.length} routes + sitemap.xml (lastmod ${lastmod})`
)
