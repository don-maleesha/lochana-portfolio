import { useState } from 'react'
import { Link } from 'react-router-dom'
import Shell from '../components/Shell'
import { usePageTitle } from '../hooks/usePageTitle'
import { releases } from '../data/experience'

export default function Experience() {
  usePageTitle('Experience — Lochana')
  const [selectedId, setSelectedId] = useState(releases[0].id)
  const selected = releases.find((r) => r.id === selectedId) ?? releases[0]

  return (
    <Shell crumb="experience">
      <div className="stack">
        <section className="stack" style={{ gap: 12 }}>
          <div className="eyebrow">GET /experience</div>
          <h1 className="h-page">Release history</h1>
          <p className="lede">Roles and education shown as tagged releases. Select a release to read its changelog.</p>
        </section>

        <div className="row-wrap" style={{ gap: 48 }}>
          <div className="col stack" style={{ flexBasis: 340, gap: 16 }}>
            {releases.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedId(r.id)}
                aria-pressed={r.id === selectedId}
                className={`card${r.id === selectedId ? ' selected' : ''}`}
                style={{ textAlign: 'left', font: 'inherit', color: 'inherit', cursor: 'pointer', gap: 6 }}
              >
                <span className="eyebrow" style={{ color: r.id === selectedId ? 'var(--accent)' : undefined }}>
                  {r.tag}
                </span>
                <span className="card-title">{r.title}</span>
                <span>{r.org}</span>
                <span className="muted" style={{ fontSize: 13 }}>{r.period}</span>
              </button>
            ))}
          </div>

          <article className="card" style={{ flex: '2 1 480px', minWidth: 0, padding: 32, gap: 28 }}>
            <header className="stack" style={{ gap: 6 }}>
              <div className="eyebrow">Release notes · {selected.tag}</div>
              <h2 className="h-card">{selected.title}</h2>
              <div className="muted" style={{ fontSize: 13 }}>
                {selected.org} · {selected.period}
              </div>
            </header>

            <section className="stack" style={{ gap: 12 }}>
              <h3 className="card-title">Changelog</h3>
              <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selected.notes.map((n) => (
                  <li key={n} className="muted">{n}</li>
                ))}
              </ul>
            </section>

            {selected.stack.length > 0 && (
              <section className="stack" style={{ gap: 12 }}>
                <h3 className="card-title">Dependencies</h3>
                <div className="chips">
                  {selected.stack.map((s) => (
                    <span className="chip" key={s}>{s}</span>
                  ))}
                </div>
              </section>
            )}

            {selected.projects.length > 0 && (
              <section className="stack" style={{ gap: 12 }}>
                <h3 className="card-title">Shipped in this release</h3>
                <div className="row-wrap" style={{ gap: 16 }}>
                  {selected.projects.map((slug) => (
                    <Link key={slug} to={`/projects/${slug}`} className="card col" style={{ flexBasis: 200, padding: 16, gap: 6 }}>
                      <span className="card-title">{slug}</span>
                      <span className="muted" style={{ fontSize: 13 }}>→ open deploy view</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </div>
    </Shell>
  )
}
