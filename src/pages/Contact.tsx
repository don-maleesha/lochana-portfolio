import { useState } from 'react'
import type { FormEvent } from 'react'
import Shell from '../components/Shell'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: send to a real endpoint (Resend, Formspree, or a serverless function).
    setSent(true)
  }

  return (
    <Shell crumb="contact">
      <div className="stack">
        <section className="stack" style={{ gap: 12 }}>
          <div className="eyebrow">POST /contact</div>
          <h1 className="h-page">Send a request</h1>
          <p className="lede">The contact form is an API console. Fill the body, send, read the response.</p>
        </section>

        <div className="row-wrap">
          <form className="col card" style={{ padding: 32, gap: 20 }} onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="f-name">NAME</label>
              <input id="f-name" name="name" type="text" placeholder="[your name]" required />
            </div>
            <div className="field">
              <label htmlFor="f-email">EMAIL</label>
              <input id="f-email" name="email" type="email" placeholder="[you@example.com]" required />
            </div>
            <div className="field">
              <label htmlFor="f-msg">MESSAGE</label>
              <textarea id="f-msg" name="message" placeholder="[what would you like to build or discuss?]" required />
            </div>
            <button type="submit" className="btn primary" style={{ alignSelf: 'flex-start' }}>
              Send request
            </button>
          </form>

          <div className="col stack" style={{ gap: 24 }}>
            <div className="terminal" aria-live="polite">
              <div className="eyebrow">Response {sent ? '· demo' : ''}</div>
              {sent ? (
                <>
                  <div style={{ color: 'var(--ok)' }}>201 Created (demo — nothing was actually sent)</div>
                  <pre className="json">{`{
  "status": "queued",
  "message": "[thank-you line]",
  "reply_in": "[typical reply time]"
}`}</pre>
                </>
              ) : (
                <p className="muted">Waiting for a request…</p>
              )}
            </div>

            <div className="stack" style={{ gap: 12 }}>
              <div className="eyebrow">Other endpoints</div>
              <div className="row-wrap" style={{ gap: 12 }}>
                {[
                  ['GET /github', '[handle]'],
                  ['GET /linkedin', '[profile]'],
                  ['GET /email', '[address]'],
                ].map(([title, sub]) => (
                  <div key={title} className="card col" style={{ flexBasis: 160, padding: 16, gap: 4 }}>
                    <span className="card-title">{title}</span>
                    <span className="muted" style={{ fontSize: 13 }}>{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  )
}
