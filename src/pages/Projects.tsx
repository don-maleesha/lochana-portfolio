import { Link } from 'react-router-dom'
import Shell from '../components/Shell'
import { usePageTitle } from '../hooks/usePageTitle'
import { profile } from '../data/profile'
import { projects } from '../data/projects'

export default function Projects() {
  usePageTitle(`Projects — ${profile.name}`)
  return (
    <Shell crumb="projects">
      <div className="stack">
        <section className="stack" style={{ gap: 12 }}>
          <div className="eyebrow">GET /projects</div>
          <h1 className="h-page">Projects</h1>
          <p className="lede">Select a project to deploy its case study.</p>
        </section>

        <div className="row-wrap">
          {projects.map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} className="card col">
              <div className="h-card">{p.name}</div>
              <p className="muted">{p.summary}</p>
              <div className="chips">
                {p.stack.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <span>→ deploy</span>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  )
}
