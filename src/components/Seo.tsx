import { Helmet } from 'react-helmet-async'
import { SITE_URL, SITE_NAME } from '../lib/site'

export { SITE_URL, SITE_NAME }

interface SeoProps {
  title: string
  description: string
  /** Route path, e.g. '/project/qr-stellencheck'. Empty string = home ('/'). */
  path?: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: object | object[]
  /** Keep the page out of search results (e.g. Impressum with home address). */
  noindex?: boolean
}

export default function Seo({
  title,
  description,
  path = '',
  image,
  type = 'website',
  jsonLd,
  noindex = false,
}: SeoProps) {
  // Normalise home to a trailing slash so the runtime canonical matches the
  // prerendered one exactly (avoids conflicting canonicals).
  const url = `${SITE_URL}${path || '/'}`
  const img = image
    ? image.startsWith('http')
      ? image
      : `${SITE_URL}${image}`
    : undefined
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {img && <meta property="og:image" content={img} />}

      <meta name="twitter:card" content={img ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {img && <meta name="twitter:image" content={img} />}

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  )
}
