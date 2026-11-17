import { Link } from 'react-router-dom'
import Shell from '../components/Shell'
import { usePageTitle } from '../hooks/usePageTitle'
import { profile } from '../data/profile'
import { githubProfile, projects } from '../data/projects'

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

        <ul className="project-list">
          {projects.map((p) => (
            <li key={p.slug} className="card project-row">
              <div className="project-row-head">
                {/* The heading link is stretched over the whole card (see .project-row CSS) */}
                <h2 className="h-card">
                  <Link to={`/projects/${p.slug}`}>{p.name}</Link>
                </h2>
                <span className="muted">{p.year}</span>
              </div>
              <p className="muted">{p.summary}</p>
              <div className="chips">
                <span className="chip">{p.kind}</span>
                <span className="chip">{p.team}</span>
                {p.stack.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <span aria-hidden="true">→ deploy</span>
            </li>
          ))}
        </ul>

        <div className="cta-row">
          <a href={githubProfile.href}>{githubProfile.label}</a>
        </div>
      </div>
    </Shell>
  )
}
