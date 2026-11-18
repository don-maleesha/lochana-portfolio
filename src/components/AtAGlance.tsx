import type { ReactNode } from 'react'
import { availability } from '../data/availability'
import { releases } from '../data/experience'
import { profile } from '../data/profile'

/**
 * "At a glance" panel for /experience, styled like the case-study Quick facts.
 * Values come from their single sources: status from availability.ts, role/company/shipped
 * from the current release in experience.ts, and the rest from profile.glance.
 */
export default function AtAGlance() {
  const g = profile.glance
  const current = releases.find((r) => r.current)
  const shipped = current?.projects?.length ?? 0

  const rows: { label: string; value: ReactNode }[] = []
  if (availability.show) {
    rows.push({
      label: g.labels.status,
      value: (
        <>
          <span className="dot" aria-hidden="true" />
          {availability.text}
        </>
      ),
    })
  }
  if (current) {
    rows.push({ label: g.labels.role, value: current.title })
    rows.push({ label: g.labels.company, value: current.org })
  }
  rows.push({ label: g.labels.location, value: g.location })
  rows.push({ label: g.labels.domain, value: g.domain })
  if (shipped > 0) rows.push({ label: g.labels.shipped, value: `${shipped} ${shipped === 1 ? 'system' : 'systems'}` })
  rows.push({ label: g.labels.stack, value: g.stack.join(' · ') })

  return (
    <aside className="card quick-facts at-a-glance" aria-labelledby="at-a-glance-title">
      <h2 id="at-a-glance-title" className="eyebrow">
        {g.heading}
      </h2>
      <dl>
        {rows.map((row) => (
          <div key={row.label} className="quick-facts-row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      {__HAS_CV__ && (
        <a className="btn case-link at-a-glance-cv" href={g.cv.href} download>
          {g.cv.label} <span aria-hidden="true">↓</span>
        </a>
      )}
    </aside>
  )
}
