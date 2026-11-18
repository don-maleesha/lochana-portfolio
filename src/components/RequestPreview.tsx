import { contactPage } from '../data/contact'

type Values = { name: string; email: string; message: string }

const truncate = (s: string, max: number) => (s.length > max ? `${s.slice(0, max)}…` : s)

/** Live, syntax-highlighted preview of the request body as the visitor types. */
export default function RequestPreview({ values }: { values: Values }) {
  const body: [keyof Values, string][] = [
    ['name', values.name],
    ['email', values.email],
    ['message', truncate(values.message, contactPage.previewMax)],
  ]
  return (
    <div className="console-part">
      <p className="console-label">request</p>
      <pre className="json console-json">
        <span className="tok-method">POST /contact</span>
        {'\n{\n'}
        {body.map(([key, value], i) => (
          <span key={key}>
            {'  '}
            <span className="tok-key">{JSON.stringify(key)}</span>
            <span className="tok-punc">: </span>
            <span className="tok-str">{JSON.stringify(value)}</span>
            {i < body.length - 1 ? <span className="tok-punc">,</span> : null}
            {'\n'}
          </span>
        ))}
        {'}'}
      </pre>
    </div>
  )
}
