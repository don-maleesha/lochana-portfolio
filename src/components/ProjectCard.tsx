import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { ProjectEntry } from '../data/projects'
import { projectsPage } from '../data/projects'

const FEEDBACK_MS = 250

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * One project on /projects. Text only: screenshots appear on the project's own case-study page.
 * The title link is stretched over the whole card (see .project-card CSS), so the card is a
 * single link with a short accessible name and nothing else inside is interactive.
 */
export default function ProjectCard({ project, featured = false }: { project: ProjectEntry; featured?: boolean }) {
  const titleId = `project-${project.slug}`
  const to = `/projects/${project.slug}`
  const navigate = useNavigate()
  const [deploying, setDeploying] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  // Plain left click: show "deploying…" briefly, then navigate. Modified clicks (new tab/window)
  // and reduced motion fall through to the link's normal behaviour with no delay.
  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || prefersReducedMotion()) return
    e.preventDefault()
    if (deploying) return
    setDeploying(true)
    timer.current = window.setTimeout(() => navigate(to), FEEDBACK_MS)
  }

  return (
    <article className={`card project-card${featured ? ' featured' : ''}`} aria-labelledby={titleId}>
      <div className="project-body">
        <div className="project-head">
          <h3 id={titleId} className="project-title">
            <Link to={to} onClick={onClick}>
              {project.title}
            </Link>
          </h3>
          <span className="project-year">{project.year}</span>
        </div>
        <p className="project-meta">{project.context}</p>
        <p className="project-summary">{project.summary}</p>
        <ul className="chips" aria-label="Key technologies">
          {project.keyStack.slice(0, 4).map((s) => (
            <li className="chip" key={s}>
              {s}
            </li>
          ))}
        </ul>
        <span className={`project-cta${deploying ? ' deploying' : ''}`} aria-hidden="true">
          {deploying ? (
            projectsPage.cardCtaBusy
          ) : (
            <>
              <span className="project-cta-arrow">→</span> {projectsPage.cardCta}
            </>
          )}
        </span>
      </div>
    </article>
  )
}
