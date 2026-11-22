import { Link } from 'react-router-dom'
import Shell from '../components/Shell'
import { usePageTitle } from '../hooks/usePageTitle'
import { profile } from '../data/profile'
import headshot200 from '../assets/lochana-headshot-200.webp'
import headshot400 from '../assets/lochana-headshot-400.webp'

const about = profile.about
const groupId = (name: string) => `skills-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

export default function About() {
  usePageTitle(`${about.title} — ${profile.name}`)
  return (
    <Shell crumb="about">
      <div className="stack">
        <div className="about-intro">
          <img
            className="headshot"
            src={headshot400}
            srcSet={`${headshot200} 200w, ${headshot400} 400w`}
            sizes="(max-width: 560px) 128px, 180px"
            width={180}
            height={180}
            loading="eager"
            decoding="async"
            alt="Lochana"
          />
          <section className="stack" style={{ gap: 12 }}>
            <div className="eyebrow">{about.eyebrow}</div>
            <h1 className="h-page">{about.title}</h1>
            <p className="lede" style={{ textWrap: 'balance' }}>
              {about.intro.map((line, i) => (
                <span key={line} className="intro-line">
                  {/* Read as one sentence by screen readers */}
                  {i > 0 && <span className="sr-only">, </span>}
                  {line}
                </span>
              ))}
            </p>
          </section>
        </div>

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
              {about.skills.map((group) => (
                <div key={group.name} className="skill-row">
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
