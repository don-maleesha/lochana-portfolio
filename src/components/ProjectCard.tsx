import { Link } from 'react-router-dom'
import type { ProjectEntry } from '../data/projects'
import { projectsPage } from '../data/projects'

// "CakeShop" -> "CS", "Ceylon Cuisine" -> "CC", "RelaxU" -> "RU"
const initials = (title: string) => (title.match(/[A-Z]/g)?.join('') || title).slice(0, 2).toUpperCase()

/**
 * One project on /projects. The title link is stretched over the whole card (see .project-card CSS),
 * so the card is a single link with a short accessible name and nothing else inside is interactive.
 */
export default function ProjectCard({ project, featured = false }: { project: ProjectEntry; featured?: boolean }) {
  const titleId = `project-${project.slug}`
  return (
    <article className={`card project-card${featured ? ' featured' : ''}`} aria-labelledby={titleId}>
      <div className="project-thumb">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={`Screenshot of ${project.title}`} loading="lazy" />
        ) : (
          <span className="project-thumb-initials" aria-hidden="true">
            {initials(project.title)}
          </span>
        )}
      </div>

      <div className="project-body">
        <div className="project-head">
          <h3 id={titleId} className="project-title">
            <Link to={`/projects/${project.slug}`}>{project.title}</Link>
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
        <span className="project-cta" aria-hidden="true">
          <span className="project-cta-arrow">→</span> {projectsPage.cardCta}
        </span>
      </div>
    </article>
  )
}
