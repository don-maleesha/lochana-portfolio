import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Shell from '../components/Shell'
import BuildLog from '../components/BuildLog'
import ProjectDiagram from '../components/ProjectDiagram'
import { usePageTitle } from '../hooks/usePageTitle'
import { profile } from '../data/profile'
import { projects } from '../data/projects'

export default function Project() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  // Track which project went live so prev/next navigation replays the deploy
  const [liveSlug, setLiveSlug] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()
  usePageTitle(`${project ? project.name : 'Project not found'} — ${profile.name}`)

  if (!project) {
    return (
      <Shell crumb="projects / not found">
        <div className="stack" style={{ gap: 12 }}>
          <h1 className="h-page">Project not found</h1>
          <p className="lede">
            No such project. <Link to="/projects">Back to projects</Link>
          </p>
        </div>
      </Shell>
    )
  }

  const live = liveSlug === project.slug
  const prev = projects[index - 1]
  const next = projects[index + 1]

  return (
    <Shell crumb={`projects / ${project.slug}`}>
      <div className="stack">
        {/* key forces the deploy log to replay when switching projects */}
        <BuildLog key={project.slug} target={`projects/${project.slug}`} onDone={() => setLiveSlug(project.slug)} />

        {/* Keep exactly one h1 on the page while the deploy log runs */}
        {!live && <h1 className="sr-only">{project.name}</h1>}

        {live && (
          <motion.div
            className="stack"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <section className="stack" style={{ gap: 16 }}>
              <h1 className="h-page">{project.name}</h1>
              <p className="lede">{project.summary}</p>
              <ul className="chips" aria-label="Project details">
                <li className="chip">{project.kind}</li>
                <li className="chip">{project.team}</li>
                <li className="chip">{project.year}</li>
              </ul>
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
          </motion.div>
        )}
      </div>
    </Shell>
  )
}
