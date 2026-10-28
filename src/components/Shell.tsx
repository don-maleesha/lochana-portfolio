import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../data/profile'

export default function Shell({ crumb, children }: { crumb?: string; children: ReactNode }) {
  return (
    <div className="shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="topbar">
        {crumb ? (
          <div>
            <Link to="/">← map</Link> / {crumb}
          </div>
        ) : (
          <Link to="/" className="wordmark">
            <span className="wordmark-full">{profile.name}</span>
            <span className="wordmark-short">{profile.shortName}</span>
          </Link>
        )}
        <div>
          <span className="dot" aria-hidden="true" />
          all systems operational
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <Link to="/accessibility">Accessibility</Link>
      </footer>
    </div>
  )
}
