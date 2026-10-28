import { Link } from 'react-router-dom'
import Shell from '../components/Shell'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Accessibility() {
  usePageTitle('Accessibility — Lochana')
  return (
    <Shell crumb="accessibility">
      <div className="stack">
        <section className="stack" style={{ gap: 12 }}>
          <div className="eyebrow">GET /accessibility</div>
          <h1 className="h-page">Accessibility</h1>
          <p className="lede">
            This site aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA.
          </p>
        </section>

        <div className="row-wrap">
          <section className="col card">
            <h2 className="card-title">Conformance</h2>
            <p>Target: WCAG 2.2 Level AA</p>
            <p className="muted">Status: [partially / fully conformant]</p>
            <p className="muted">Last tested: [date last tested]</p>
          </section>

          <section className="col card">
            <h2 className="card-title">How I tested</h2>
            <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>Automated linting with eslint-plugin-jsx-a11y</li>
              <li>Reflow at 320px width and 24×24px target size checked in Chromium</li>
              <li className="muted">[Keyboard-only walkthrough of every page]</li>
              <li className="muted">[Screen reader and browser combinations used]</li>
              <li className="muted">[Other tools, e.g. an automated checker or contrast analyser]</li>
            </ul>
          </section>
        </div>

        <section className="card">
          <h2 className="card-title">Known limitations</h2>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li className="muted">[Known limitation and its workaround]</li>
            <li className="muted">[Another known limitation]</li>
          </ul>
        </section>

        <p>
          Found a barrier? Tell me via the <Link to="/contact">contact page</Link> or at [email address], and I’ll
          aim to reply within [response time].
        </p>
      </div>
    </Shell>
  )
}
