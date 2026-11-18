import { contactPage } from '../data/contact'

export type ResponseState = keyof typeof contactPage.responses

/** The "response" half of the console. Announced politely when it changes. */
export default function ResponseStatus({ state }: { state: ResponseState }) {
  const r = contactPage.responses[state]
  return (
    <div className="console-part">
      <p className="console-label">response</p>
      <div className={`console-response ${state}`} aria-live="polite">
        {r.code && <p className="console-code">{r.code}</p>}
        <p className="console-text">{r.text}</p>
      </div>
    </div>
  )
}
