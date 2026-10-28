import Shell from '../components/Shell'
import { usePageTitle } from '../hooks/usePageTitle'
import { profile } from '../data/profile'
import SystemMap from '../components/SystemMap'

export default function Home() {
  usePageTitle(`${profile.name} — Software Engineer`)
  return (
    <Shell>
      <div className="stack">
        <section className="stack" style={{ gap: 12 }}>
          <div className="eyebrow">Trainee – Software Engineer</div>
          <h1 className="h-display">{profile.name}</h1>
          <p className="lede" style={{ textWrap: 'balance' }}>
            {profile.headline}
          </p>
          <p className="muted" style={{ fontSize: 13 }}>
            Click a service to deploy its page.
          </p>
        </section>

        <SystemMap />

        <div className="placeholder">[ live ticker — latest commit · deploy status · local time ]</div>
      </div>
    </Shell>
  )
}
