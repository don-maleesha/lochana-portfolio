import { Link } from 'react-router-dom'
import Shell from '../components/Shell'
import { usePageTitle } from '../hooks/usePageTitle'
import { profile } from '../data/profile'

const about = profile.about
const groupId = (name: string) => `skills-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

export default function About() {
  usePageTitle(`${about.title} — ${profile.name}`)
  return (
    <Shell crumb="about">
      <div className="stack">
        <section className="stack" style={{ gap: 12 }}>
          <div className="eyebrow">{about.eyebrow}</div>
          <h1 className="h-page">{about.title}</h1>
          <p className="lede" style={{ textWrap: 'balance' }}>
            {about.intro}
          </p>
        </section>

        <div className="about-row">
          <section className="card about-narrow">
            <h2 className="card-title">{about.bioHeading}</h2>
            <div className="bio-text">
              {about.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <section className="card about-narrow">
            <h2 className="card-title">{about.skillsHeading}</h2>
            <div className="skill-rows">
              {[about.coreStack, ...about.skills].map((group, i) => (
                <div key={group.name} className={`skill-row${i === 0 ? ' core' : ''}`}>
                  <span id={groupId(group.name)} className="eyebrow">
                    {group.name}
                  </span>
                  <ul className="chips" aria-labelledby={groupId(group.name)}>
                    {group.items.map((s) => (
                      <li className="chip" key={s}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="cta-row about-narrow">
          {about.links.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  )
}
