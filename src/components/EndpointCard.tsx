import { useEffect, useRef, useState } from 'react'
import type { Endpoint } from '../data/contact'

/**
 * An "other endpoint" card. The route link is stretched over the whole card (like project cards);
 * the email card also gets a copy button that sits above that link.
 */
export default function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const external = endpoint.href.startsWith('https://')
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    if (!endpoint.copy) return
    try {
      await navigator.clipboard.writeText(endpoint.copy)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <li className="card endpoint-card">
      <a
        className="endpoint-link"
        href={endpoint.href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className="endpoint-route">{endpoint.route}</span>
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
      <span className="endpoint-subtitle">{endpoint.subtitle}</span>
      {endpoint.copy && (
        <div className="endpoint-copy">
          <button type="button" className="endpoint-copy-btn" onClick={copy} aria-label={`Copy ${endpoint.copy}`}>
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <rect x="5" y="5" width="9" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H11" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span aria-hidden="true">copy</span>
          </button>
          <span className="endpoint-copied" aria-live="polite">
            {copied ? 'copied' : ''}
          </span>
        </div>
      )}
    </li>
  )
}
