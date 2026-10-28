import { useState } from 'react'
import type { FormEvent } from 'react'
import Shell from '../components/Shell'
import { usePageTitle } from '../hooks/usePageTitle'

type Field = 'name' | 'email' | 'message'
type Errors = Partial<Record<Field, string>>

const FIELDS: Field[] = ['name', 'email', 'message']

function validate(form: HTMLFormElement): Errors {
  const errors: Errors = {}
  const value = (f: Field) => (form.elements.namedItem(f) as HTMLInputElement | HTMLTextAreaElement).value.trim()
  if (!value('name')) errors.name = 'Enter your name.'
  const email = value('email')
  if (!email) errors.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter an email address like name@example.com.'
  if (!value('message')) errors.message = 'Enter a message.'
  return errors
}

export default function Contact() {
  usePageTitle('Contact — Lochana')
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const found = validate(form)
    setErrors(found)
    const firstInvalid = FIELDS.find((f) => found[f])
    if (firstInvalid) {
      const el = form.elements.namedItem(firstInvalid) as HTMLElement
      setSent(false)
      el.focus()
      return
    }
    // TODO: send to a real endpoint (Resend, Formspree, or a serverless function).
    setSent(true)
  }

  // Once errors are showing, re-check as the visitor fixes them
  function onChange(e: FormEvent<HTMLFormElement>) {
    if (Object.keys(errors).length > 0) setErrors(validate(e.currentTarget))
  }

  const describedBy = (f: Field) => (errors[f] ? `f-${f}-error` : undefined)

  return (
    <Shell crumb="contact">
      <div className="stack">
        <section className="stack" style={{ gap: 12 }}>
          <div className="eyebrow">POST /contact</div>
          <h1 className="h-page">Send a request</h1>
          <p className="lede">The contact form is an API console. Fill the body, send, read the response.</p>
        </section>

        <div className="row-wrap">
          <form className="col card" style={{ padding: 32, gap: 20 }} onSubmit={onSubmit} onChange={onChange} noValidate>
            <div className="field">
              <label htmlFor="f-name">Name</label>
              <input
                id="f-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="[your name]"
                required
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={describedBy('name')}
              />
              {errors.name && (
                <p id="f-name-error" className="field-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="f-email">Email</label>
              <input
                id="f-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="[you@example.com]"
                required
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={describedBy('email')}
              />
              {errors.email && (
                <p id="f-email-error" className="field-error">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="f-message">Message</label>
              <textarea
                id="f-message"
                name="message"
                placeholder="[what would you like to build or discuss?]"
                required
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={describedBy('message')}
              />
              {errors.message && (
                <p id="f-message-error" className="field-error">
                  {errors.message}
                </p>
              )}
            </div>
            <button type="submit" className="btn primary" style={{ alignSelf: 'flex-start' }}>
              Send request
            </button>
            <p className="muted" style={{ fontSize: 13 }}>
              This demo form doesn’t send or store anything. [Privacy note: how messages will be handled once the
              form is live.]
            </p>
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
