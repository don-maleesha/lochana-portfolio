import { Link } from 'react-router-dom'
import type { ProjectEntry } from '../data/projects'

/** Previous / next case study, in the order of projects.ts. */
export default function ProjectNav({ prev, next }: { prev?: ProjectEntry; next?: ProjectEntry }) {
  if (!prev && !next) return null
  return (
    <nav className="page-nav project-nav" aria-label="More projects">
      {prev ? (
        <Link to={`/projects/${prev.slug}`}>
          <span aria-hidden="true">← </span>
          <span className="sr-only">Previous project: </span>
          {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link to={`/projects/${next.slug}`}>
          <span className="sr-only">Next project: </span>
          {next.title}
          <span aria-hidden="true"> →</span>
        </Link>
      )}
    </nav>
  )
}
