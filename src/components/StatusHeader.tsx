import { Link } from 'react-router-dom'
import { projectsPage } from '../data/projects'

/**
 * Top-bar content for case-study pages: "← projects / <slug>" on the left and a static
 * "● live · <year>" status on the right, styled like the site's availability status.
 * Rendered inside Shell's <header> via its `topbar` prop. No animation.
 */
export default function StatusHeader({ current, year }: { current: string; year?: string }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link to="/projects">← projects</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{current}</span>
      </nav>
      {year && (
        <div className="status">
          <span className="dot" aria-hidden="true" />
          {projectsPage.caseStatus} · {year}
        </div>
      )}
    </>
  )
}
