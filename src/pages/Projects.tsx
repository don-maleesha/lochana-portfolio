import { Link } from 'react-router-dom'
import Shell from '../components/Shell'
import ProjectCard from '../components/ProjectCard'
import { usePageTitle } from '../hooks/usePageTitle'
import { profile } from '../data/profile'
import { projects, projectsPage as page } from '../data/projects'

export default function Projects() {
  usePageTitle(`${page.title} — ${profile.name}`)
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <Shell crumb="projects">
      <div className="stack projects-page">
        <section className="stack" style={{ gap: 12 }}>
          <div className="eyebrow">{page.eyebrow}</div>
          <h1 className="h-page">{page.title}</h1>
          <p className="lede">{page.intro}</p>
        </section>

        {featured.length > 0 && (
          <section className="stack" style={{ gap: 12 }} aria-labelledby="projects-featured">
            <h2 id="projects-featured" className="eyebrow">
              {page.featuredHeading}
            </h2>
            <ul className="project-list">
              {featured.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} featured />
                </li>
              ))}
            </ul>
          </section>
        )}

        {rest.length > 0 && (
          <section className="stack" style={{ gap: 12 }} aria-labelledby="projects-more">
            <h2 id="projects-more" className="eyebrow">
              {page.moreHeading}
            </h2>
            <ul className="project-list project-grid">
              {rest.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="stack" style={{ gap: 8 }}>
          <p className="muted">
            {page.experience.text} <Link to={page.experience.to}>{page.experience.label}</Link>
          </p>
          <div className="cta-row">
            <a href={page.github.href}>{page.github.label}</a>
          </div>
        </div>
      </div>
    </Shell>
  )
}
