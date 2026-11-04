import { Link } from 'react-router-dom'
import Shell from '../components/Shell'
import { usePageTitle } from '../hooks/usePageTitle'
import { profile } from '../data/profile'

const groupId = (name: string) => `skills-${name.toLowerCase()}`

export default function About() {
  usePageTitle(`About — ${profile.name}`)
  return (
    <Shell crumb="about">
      <div className="stack">
        <section className="stack" style={{ gap: 12 }}>
          <div className="eyebrow">profile.json</div>
          <h1 className="h-page">About</h1>
          <p className="lede">{profile.aboutIntro}</p>
        </section>

        <section className="card">
          <h2 className="card-title">Bio</h2>
          <div className="bio-layout">
            <div className="bio-text">
              {profile.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <aside className="card glance" aria-labelledby="glance-title">
              <h3 id="glance-title" className="eyebrow">
                At a glance
              </h3>
              <dl>
                {profile.atAGlance.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section className="card">
          <h2 className="card-title">Skills</h2>
          <div className="skill-rows">
            {profile.skills.map((group) => (
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

        <div className="cta-row">
          <Link to="/projects">View projects →</Link>
          <Link to="/contact">Get in touch →</Link>
        </div>
      </div>
    </Shell>
  )
}
