import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Shell from '../components/Shell'
import BuildLog from '../components/BuildLog'
import { usePageTitle } from '../hooks/usePageTitle'
import { projects } from '../data/projects'

export default function Project() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  // Track which project went live so prev/next navigation replays the deploy
  const [liveSlug, setLiveSlug] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()
  usePageTitle(project ? `${project.name} — Lochana` : 'Project not found — Lochana')

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
            <div className="row-wrap">
              <div className="col stack" style={{ gap: 16 }}>
                <h1 className="h-page">{project.name}</h1>
                <p className="lede">{project.summary}</p>
                <div className="chips">
                  <span className="chip">role: {project.role}</span>
                  <span className="chip">stack: {project.stack.join(', ')}</span>
                  <span className="chip">year: {project.year}</span>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <span className="btn primary">View live</span>
                  <span className="btn">Source</span>
                </div>
              </div>
              <div className="col placeholder" style={{ minHeight: 240 }}>
                [ screenshot / demo ]
              </div>
            </div>

            <div className="row-wrap" style={{ gap: 24 }}>
              {[
                ['Problem', project.problem],
                ['Approach', project.approach],
                ['Outcome', project.outcome],
              ].map(([title, body]) => (
                <div className="card col" style={{ flexBasis: 260 }} key={title}>
                  <h2 className="card-title">{title}</h2>
                  <p className="muted">{body}</p>
                </div>
              ))}
            </div>

            <div className="placeholder">[ mini architecture diagram of this project — same visual language as the landing map ]</div>

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
