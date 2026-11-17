import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { ProjectEntry } from '../data/projects'
import { projectsPage } from '../data/projects'

const FEEDBACK_MS = 250

// "CakeShop" -> "CS", "Ceylon Cuisine" -> "CC", "RelaxU" -> "RU"
const initials = (title: string) => (title.match(/[A-Z]/g)?.join('') || title).slice(0, 2).toUpperCase()

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * One project on /projects. The title link is stretched over the whole card (see .project-card CSS),
 * so the card is a single link with a short accessible name and nothing else inside is interactive.
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
      <div className="project-thumb">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.thumbnailAlt ?? `Screenshot of ${project.title}`}
            width={1200}
            height={675}
            loading="lazy"
          />
        ) : (
          <span className="project-thumb-initials" aria-hidden="true">
            {initials(project.title)}
          </span>
        )}
      </div>

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
