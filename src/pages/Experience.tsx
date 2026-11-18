import Shell from '../components/Shell'
import ReleaseEntry from '../components/ReleaseEntry'
import AtAGlance from '../components/AtAGlance'
import { usePageTitle } from '../hooks/usePageTitle'
import { profile } from '../data/profile'
import { experiencePage as page, releases } from '../data/experience'
import type { Release } from '../data/experience'

const SECTIONS: Release['section'][] = ['work', 'education']

export default function Experience() {
  usePageTitle(`Experience — ${profile.name}`)
  return (
    <Shell crumb="experience">
      <div className="stack experience-page">
        <section className="stack" style={{ gap: 12 }}>
          <div className="eyebrow">{page.eyebrow}</div>
          <h1 className="h-page">{page.title}</h1>
          <p className="lede">{page.intro}</p>
        </section>

        {/* Sidebar first in source order: below the subtitle on narrow screens, right column on wide ones */}
        <div className="experience-grid">
          <AtAGlance />
          <div className="experience-main">
            {SECTIONS.map((section) => {
              const entries = releases.filter((r) => r.section === section)
              if (entries.length === 0) return null
              return (
                <section key={section} className="tl-section" aria-labelledby={`timeline-${section}`}>
                  <h2 id={`timeline-${section}`} className="tl-divider">
                    <span aria-hidden="true">── </span>
                    {page.sections[section]}
                  </h2>
                  <ol className={`timeline ${section}`}>
                    {entries.map((r) => (
                      <ReleaseEntry key={r.version} release={r} />
                    ))}
                  </ol>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </Shell>
  )
}
