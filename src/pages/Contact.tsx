import { useEffect, useState } from 'react'
import type { ChangeEvent, FocusEvent, FormEvent } from 'react'
import Shell from '../components/Shell'
import RequestPreview from '../components/RequestPreview'
import ResponseStatus from '../components/ResponseStatus'
import type { ResponseState } from '../components/ResponseStatus'
import EndpointCard from '../components/EndpointCard'
import { usePageTitle } from '../hooks/usePageTitle'
import { profile } from '../data/profile'
import { contactPage as page } from '../data/contact'

type Field = 'name' | 'email' | 'message'
type Values = Record<Field, string>
type Errors = Partial<Record<Field, string>>

const FIELDS: Field[] = ['name', 'email', 'message']
const EMPTY: Values = { name: '', email: '', message: '' }

// The template value in .env counts as missing, so it never reaches Web3Forms
const PLACEHOLDER_KEY = 'PASTE_KEY_HERE'
const getAccessKey = () => {
  const key = import.meta.env.VITE_WEB3FORMS_KEY?.trim()
  return key && key !== PLACEHOLDER_KEY ? key : ''
}
const MISSING_KEY_HELP = 'VITE_WEB3FORMS_KEY missing — create .env in project root and restart `npm run dev`.'
let warnedMissingKey = false // StrictMode runs effects twice in dev; warn once

function validateField(field: Field, value: string): string | undefined {
  const v = value.trim()
  if (field === 'name' && !v) return page.errors.name
  if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return page.errors.email
  if (field === 'message' && v.length < page.messageMin) return page.errors.message
  return undefined
}

export default function Contact() {
  usePageTitle(`Contact — ${profile.name}`)
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<ResponseState>('idle')
  const sending = status === 'sending'

  useEffect(() => {
    if (import.meta.env.DEV && !getAccessKey() && !warnedMissingKey) {
      warnedMissingKey = true
      console.warn(MISSING_KEY_HELP)
    }
  }, [])

  function setFieldError(field: Field, value: string) {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }))
  }

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = e.target.name as Field
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
    // Once a field shows an error, re-check it as the visitor fixes it
    if (errors[field]) setFieldError(field, e.target.value)
  }

  function onBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFieldError(e.target.name as Field, e.target.value)
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (sending) return
    const form = e.currentTarget
    const found: Errors = {}
    for (const f of FIELDS) found[f] = validateField(f, values[f])
    setErrors(found)
    const firstInvalid = FIELDS.find((f) => found[f])
    if (firstInvalid) {
      setStatus('invalid')
      ;(form.elements.namedItem(firstInvalid) as HTMLElement).focus()
      return
    }

    const accessKey = getAccessKey()
    if (!accessKey) {
      console.error(`Contact form not sent: ${MISSING_KEY_HELP}`)
      setStatus('error')
      return
    }
    const botcheck = (form.elements.namedItem('botcheck') as HTMLInputElement).checked
    setStatus('sending')
    try {
      const res = await fetch(page.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          subject: page.subject(values.name.trim()),
          botcheck,
        }),
      })
      const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null
      if (res.ok && data?.success) {
        // 201 Created
        setStatus('success')
        setValues(EMPTY)
        setErrors({})
        form.reset()
        return
      }
      console.error(`Contact form: Web3Forms responded ${res.status}`, data)
      // 4xx: Web3Forms rejected the request → 422; anything else → 500
      setStatus(res.status >= 400 && res.status < 500 ? 'invalid' : 'error')
    } catch (err) {
      console.error('Contact form: request failed', err)
      setStatus('error')
    }
  }

  const fieldProps = (f: Field) => ({
    id: `f-${f}`,
    name: f,
    value: values[f],
    onChange,
    onBlur,
    placeholder: page.placeholders[f],
    required: true,
    'aria-invalid': errors[f] ? true : undefined,
    'aria-describedby': errors[f] ? `f-${f}-error` : undefined,
  })

  const fieldError = (f: Field) =>
    errors[f] && (
      <p id={`f-${f}-error`} className="field-error">
        {errors[f]}
      </p>
    )

  return (
    <Shell crumb="contact">
      <div className="stack">
        <section className="stack" style={{ gap: 12 }}>
          <div className="eyebrow">{page.eyebrow}</div>
          <h1 className="h-page">{page.title}</h1>
          <p className="lede">{page.intro}</p>
        </section>

        <div className="contact-grid">
          <form className="card contact-form" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="f-name">Name</label>
              <input type="text" autoComplete="name" {...fieldProps('name')} />
              {fieldError('name')}
            </div>
            <div className="field">
              <label htmlFor="f-email">Email</label>
              <input type="email" autoComplete="email" {...fieldProps('email')} />
              {fieldError('email')}
            </div>
            <div className="field">
              <label htmlFor="f-message">Message</label>
              <textarea {...fieldProps('message')} />
              {fieldError('message')}
            </div>
            {/* Honeypot: hidden from people, filled in by bots */}
            <input type="checkbox" name="botcheck" className="sr-only" tabIndex={-1} aria-hidden="true" />
            <button type="submit" className="btn primary" style={{ alignSelf: 'flex-start' }} disabled={sending}>
              {sending ? page.buttons.sending : page.buttons.idle}
            </button>
            <p className="muted" style={{ fontSize: 13 }}>
              {page.note}
            </p>
          </form>

          <div className="terminal contact-console">
            <RequestPreview values={values} />
            <ResponseStatus state={status} />
          </div>

          <section className="stack contact-endpoints" style={{ gap: 12 }} aria-labelledby="endpoints-title">
            <h2 id="endpoints-title" className="eyebrow">
              {page.endpointsHeading}
            </h2>
            <ul className="endpoint-list">
              {page.endpoints.map((ep) => (
                <EndpointCard key={ep.route} endpoint={ep} />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Shell>
  )
}
