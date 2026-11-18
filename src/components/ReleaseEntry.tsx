import type { Release } from '../data/experience'
import { experiencePage as page } from '../data/experience'

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

/**
 * One release on the Experience timeline. The version tag and CURRENT label are real text;
 * the dot and rail line are decorative. Work entries list their projects as changelog
 * sub-entries; education entries are a single compact line.
 */
export default function ReleaseEntry({ release }: { release: Release }) {
  const titleId = `release-${slug(release.version)}`
  const compact = release.section === 'education'

  return (
    <li className={`tl-item${release.current ? ' current' : ''}`}>
      <article className={`tl-entry${compact ? ' compact' : ''}`} aria-labelledby={titleId}>
        <p className="tl-version">
          {release.version}
          {release.current && <span className="tl-current">{page.currentLabel}</span>}
        </p>
        <span className="tl-dot" aria-hidden="true" />

        <div className="tl-body">
          {compact ? (
            <h3 id={titleId} className="tl-title">
              {release.title}
              <span className="tl-meta"> — {release.org} · {release.period}</span>
            </h3>
          ) : (
            <>
              <h3 id={titleId} className="tl-title">
                {release.title}
              </h3>
              <p className="tl-meta">
                {release.org} · {release.period}
              </p>
              {release.summary && <p className="tl-summary">{release.summary}</p>}
            </>
          )}

          {!compact && release.projects?.length ? (
            <div className="tl-changelog">
              <p className="tl-changelog-label">{page.changelogLabel}</p>
              <ul className="tl-projects">
                {release.projects.map((p) => (
                  <li key={p.name} className="tl-project">
                    <h4 className="tl-project-name">
                      {p.name} <span className="tl-project-context">— {p.context}</span>
                    </h4>
                    <ul className="content-list tl-bullets">
                      {p.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    {p.deps.length > 0 && (
                      <p className="tl-deps">
                        {page.depsLabel} {p.deps.join(' · ')}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </article>
    </li>
  )
}
