import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/**
 * The one text-CTA style of the site: Poppins, coral, only the label is
 * underlined — the arrow sits next to it (outside the underline) and nudges
 * in its direction on hover.
 *
 * - `to`      → internal route (react-router Link)
 * - `href`    → external link, opens in a new tab
 * - `onClick` → renders a <button>
 */
type Arrow = 'right' | 'left' | 'external'

interface ArrowLinkProps {
  children: ReactNode
  arrow?: Arrow
  to?: string
  href?: string
  onClick?: () => void
  className?: string
}

const GLYPH: Record<Arrow, string> = { right: '→', left: '←', external: '↗' }
const NUDGE: Record<Arrow, string> = {
  right: 'group-hover:translate-x-1',
  left: 'group-hover:-translate-x-1',
  external: 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
}

export default function ArrowLink({
  children,
  arrow = 'right',
  to,
  href,
  onClick,
  className = '',
}: ArrowLinkProps) {
  const base = `group inline-flex items-baseline gap-2 font-body text-sm text-accent transition-colors duration-fast hover:text-content ${className}`

  const glyph = (
    <span
      aria-hidden
      className={`inline-block transition-transform duration-fast ease-smooth ${NUDGE[arrow]}`}
    >
      {GLYPH[arrow]}
    </span>
  )
  const label = (
    <span className="underline decoration-accent/60 underline-offset-4 transition-colors group-hover:decoration-content">
      {children}
    </span>
  )
  const content =
    arrow === 'left' ? (
      <>
        {glyph}
        {label}
      </>
    ) : (
      <>
        {label}
        {glyph}
      </>
    )

  if (to) {
    return (
      <Link to={to} className={base} data-hover>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base} data-hover>
        {content}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={base} data-hover>
      {content}
    </button>
  )
}
