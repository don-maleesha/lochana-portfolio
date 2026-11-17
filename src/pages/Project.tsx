import { Link, useParams } from 'react-router-dom'
import Shell from '../components/Shell'
import CaseStudyHeader from '../components/CaseStudyHeader'
import ProjectDiagram from '../components/ProjectDiagram'
import { usePageTitle } from '../hooks/usePageTitle'
import { profile } from '../data/profile'
import { projects } from '../data/projects'

export default function Project() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  usePageTitle(`${project ? project.title : 'Project not found'} — ${profile.name}`)

  if (!project) {
    return (
      <Shell topbar={<CaseStudyHeader current="not found" />}>
        <div className="stack" style={{ gap: 12 }}>
          <h1 className="h-page">Project not found</h1>
          <p className="lede">
            No such project. <Link to="/projects">Back to projects</Link>
          </p>
        </div>
      </Shell>
    )
  }

  const prev = projects[index - 1]
  const next = projects[index + 1]

  return (
    <Shell topbar={<CaseStudyHeader current={project.slug} year={project.year} />}>
      <div className="stack">
        <section className="stack" style={{ gap: 16 }}>
          <h1 className="h-page">{project.title}</h1>
          <p className="project-meta">
            {project.context} · {project.year}
          </p>
          <p className="lede">{project.summary}</p>
          <ul className="chips" aria-label="Stack">
            {project.stack.map((s) => (
              <li className="chip" key={s}>
                {s}
              </li>
            ))}
          </ul>
          {project.links.length > 0 && (
            <div className="cta-row">
              {project.links.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </section>

        {project.thumbnail && (
          <figure className="project-shot">
            <img
              src={project.thumbnail}
              alt={project.thumbnailAlt ?? `Screenshot of ${project.title}`}
              width={1200}
              height={675}
            />
          </figure>
        )}

        <section className="card">
          <h2 className="card-title">What it does</h2>
          <div className="bio-text">
            <p>{project.description}</p>
          </div>
        </section>

        <section className="card">
          <h2 className="card-title">How it fits together</h2>
          <ProjectDiagram diagram={project.diagram} />
        </section>

        <div className="row-wrap">
          <section className="card col">
            <h2 className="card-title">What I built</h2>
            <ul className="content-list">
              {project.built.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </section>
          <section className="card col">
            <h2 className="card-title">What I learned</h2>
            <ul className="content-list">
              {project.learned.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </section>
        </div>

        <nav className="page-nav" aria-label="Project navigation" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, paddingTop: 24, borderTop: '1px solid var(--line)', fontSize: 13 }}>
          {prev ? <Link to={`/projects/${prev.slug}`}>← previous project</Link> : <span />}
          <Link to="/">back to map</Link>
          {next ? <Link to={`/projects/${next.slug}`}>next project →</Link> : <span />}
        </nav>
      </div>
    </Shell>
  )
}
