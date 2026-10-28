import Shell from '../components/Shell'
import { usePageTitle } from '../hooks/usePageTitle'
import { profile } from '../data/profile'

export default function About() {
  usePageTitle(`About — ${profile.name}`)
  return (
    <Shell crumb="about">
      <div className="stack">
        <section className="stack" style={{ gap: 12 }}>
          <div className="eyebrow">profile.json</div>
          <h1 className="h-page">About</h1>
          <p className="lede">
            Trainee – Software Engineer at Ones and Zeros Pvt Ltd. BSc. in Information Systems, University of Colombo
            School of Computing (2025).
          </p>
        </section>

        <div className="row-wrap">
          <div className="col card">
            <h2 className="card-title">Bio</h2>
            <p className="muted">[A short paragraph about how you work and what you care about building.]</p>
          </div>
          <div className="col card">
            <h2 className="card-title">Skills</h2>
            <div className="chips">
              {['Java', 'Spring Boot', 'React', 'MUI'].map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
              <span className="chip muted" style={{ borderStyle: 'dashed', borderColor: 'var(--line-strong)' }}>
                [add more]
              </span>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  )
}
