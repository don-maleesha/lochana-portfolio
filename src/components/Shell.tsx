import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import DeployStrip from './DeployStrip'
import { availability } from '../data/availability'
import { profile } from '../data/profile'

/** A breadcrumb step after "← map"; give `to` for every step except the current page. */
export type Crumb = { label: string; to?: string }

type ShellProps = {
  crumb?: string | Crumb[]
  /** Replaces the default breadcrumb and availability status (used by case-study pages) */
  topbar?: ReactNode
  children: ReactNode
}

export default function Shell({ crumb, topbar, children }: ShellProps) {
  const trail: Crumb[] = typeof crumb === 'string' ? [{ label: crumb }] : (crumb ?? [])
  return (
    <div className="shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="topbar">
        {topbar ?? (
          <>
            {trail.length > 0 ? (
              <nav aria-label="Breadcrumb" className="crumbs">
                <Link to="/">← map</Link>
                {trail.map((c, i) => (
                  <span key={c.label}>
                    <span aria-hidden="true"> / </span>
                    {c.to && i < trail.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                  </span>
                ))}
              </nav>
            ) : (
              <Link to="/" className="wordmark">
                <span className="wordmark-full">{profile.name}</span>
                <span className="wordmark-short">{profile.shortName}</span>
              </Link>
            )}
            {/* Static text, not a live region: the words carry the meaning, the dot is decoration */}
            {availability.show && (
              <div className="status">
                <span className="dot" aria-hidden="true" />
                {availability.text}
              </div>
            )}
          </>
        )}
      </header>
      <main id="main" tabIndex={-1}>
        <DeployStrip />
        {children}
      </main>
      <footer className="site-footer">
        <Link to="/accessibility">Accessibility</Link>
      </footer>
    </div>
  )
}
