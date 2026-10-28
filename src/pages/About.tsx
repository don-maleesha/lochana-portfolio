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
          <div className="stack" style={{ maxWidth: '70ch', gap: 16 }}>
            {profile.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="card-title">Skills</h2>
          <div className="skill-groups">
            {profile.skills.map((group) => (
              <div key={group.name} className="stack" style={{ gap: 8 }}>
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
    </Shell>
  )
}
