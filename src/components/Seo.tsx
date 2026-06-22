import { Helmet } from 'react-helmet-async'

export const SITE_URL = 'https://nolinelindor.com'
export const SITE_NAME = 'Noline Lindor'

interface SeoProps {
  title: string
  description: string
  /** Route path, e.g. '/project/qr-stellencheck'. Empty string = home. */
  path?: string
  /** Absolute or site-relative image URL for social sharing. */
  image?: string
  type?: 'website' | 'article'
  jsonLd?: object | object[]
}

export default function Seo({
  title,
  description,
  path = '',
  image,
  type = 'website',
  jsonLd,
}: SeoProps) {
  const url = `${SITE_URL}${path}`
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
