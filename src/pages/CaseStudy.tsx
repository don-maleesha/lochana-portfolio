import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import Shell from '../components/Shell'
import StatusHeader from '../components/StatusHeader'
import QuickFacts from '../components/QuickFacts'
import ScreensGallery from '../components/ScreensGallery'
import ProjectDiagram from '../components/ProjectDiagram'
import ProjectNav from '../components/ProjectNav'
import { usePageTitle } from '../hooks/usePageTitle'
import { profile } from '../data/profile'
import { projects, projectsPage as page } from '../data/projects'

type Section = { id: string; title: string; body: ReactNode }

export default function CaseStudy() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  usePageTitle(`${project ? project.title : 'Project not found'} — ${profile.name}`)

  if (!project) {
    return (
      <Shell topbar={<StatusHeader current="not found" />}>
        <div className="stack" style={{ gap: 12 }}>
          <h1 className="h-page">Project not found</h1>
          <p className="lede">
            No such project. <Link to="/projects">Back to projects</Link>
          </p>
        </div>
      </Shell>
    )
  }

  const [hero, ...gallery] = project.screens ?? []
  const s = page.sections

  // Only sections with data are rendered; numbers follow the rendered order
  const sections: Section[] = []
  if (project.overview) {
    sections.push({ id: 'overview', title: s.overview, body: <p>{project.overview}</p> })
  }
  if (project.myRole?.length) {
    sections.push({ id: 'my-role', title: s.myRole, body: <BulletList items={project.myRole} /> })
  }
  if (project.features?.length) {
    sections.push({ id: 'features', title: s.features, body: <TitledList items={project.features} /> })
  }
  if (gallery.length) {
    sections.push({ id: 'screens', title: s.screens, body: <ScreensGallery screens={gallery} /> })
  }
  if (project.diagram) {
    sections.push({ id: 'architecture', title: s.architecture, body: <ProjectDiagram diagram={project.diagram} /> })
  }
  if (project.decisions?.length) {
    sections.push({ id: 'decisions', title: s.decisions, body: <TitledList items={project.decisions} /> })
  }
  if (project.challenges?.length) {
    sections.push({
      id: 'challenges',
      title: s.challenges,
      body: (
        <ul className="case-items">
          {project.challenges.map((c, i) => (
            <li key={i}>
              <p>
                <span className="case-label">Problem</span> {c.problem}
              </p>
              <p>
                <span className="case-label">Fix</span> {c.fix}
              </p>
            </li>
          ))}
        </ul>
      ),
    })
  }
  if (project.learnings?.length) {
    sections.push({ id: 'learnings', title: s.learnings, body: <BulletList items={project.learnings} /> })
  }

  const { github, demo } = project.links ?? {}

  return (
    <Shell topbar={<StatusHeader current={project.slug} year={project.year} />}>
      <div className="case-study">
        <section className="stack case-head" style={{ gap: 16 }}>
          <h1 className="h-page">{project.title}</h1>
          <p className="project-meta">
            {project.context} · {project.year}
          </p>
          <p className="lede case-summary">{project.summary}</p>
          {(github || demo) && (
            <div className="case-links">
              {github && <ExternalButton href={github} label={page.caseLinks.github} />}
              {demo && <ExternalButton href={demo} label={page.caseLinks.demo} />}
            </div>
          )}
        </section>

        {hero && (
          <figure className="case-hero">
            <img src={hero.src} alt={hero.alt} width={1200} height={675} loading="eager" />
          </figure>
        )}

        <div className="case-body">
          <QuickFacts project={project} />
          <div className="case-main">
            {sections.map((section, i) => (
              <section key={section.id} className="case-section" aria-labelledby={`section-${section.id}`}>
                <h2 id={`section-${section.id}`} className="case-section-title">
                  <span className="case-section-num">{String(i + 1).padStart(2, '0')}</span> {section.title}
                </h2>
                <div className="case-section-body">{section.body}</div>
              </section>
            ))}
          </div>
        </div>

        <ProjectNav prev={projects[index - 1]} next={projects[index + 1]} />
      </div>
    </Shell>
  )
}

function ExternalButton({ href, label }: { href: string; label: string }) {
  return (
    <a className="btn case-link" href={href} target="_blank" rel="noopener noreferrer">
      {label} <span aria-hidden="true">↗</span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="content-list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

function TitledList({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul className="case-items">
      {items.map((item) => (
        <li key={item.title}>
          <h3 className="case-item-title">{item.title}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  )
}
