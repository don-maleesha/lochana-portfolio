import { useEffect, useEffectEvent, useState } from 'react'

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** The "deploy" intro: a short build log that resolves into the page content. */
export default function BuildLog({ target, onDone }: { target: string; onDone: () => void }) {
  const lines = [
    `$ deploy ${target}`,
    '▸ resolving dependencies ........ ok',
    '▸ compiling case study ........... ok',
    '▸ running checks ................. ok',
    '✓ live — rendering page',
  ]
  const total = lines.length
  const [count, setCount] = useState(() => (reducedMotion() ? total : 0))
  const finish = useEffectEvent(onDone)

  useEffect(() => {
    if (count >= total) {
      finish()
      return
    }
    const t = setTimeout(() => setCount((c) => c + 1), 280)
    return () => clearTimeout(t)
  }, [count, total])

  return (
    <div className="terminal" role="status" aria-live="polite">
      {lines.slice(0, count).map((line, i) => (
        <div key={i} className={i === 0 ? '' : i === lines.length - 1 ? '' : 'muted'} style={i === lines.length - 1 ? { color: 'var(--accent)' } : undefined}>
          {line}
        </div>
      ))}
      <div className="progress" aria-hidden="true">
        <div style={{ width: `${(count / lines.length) * 100}%` }} />
      </div>
    </div>
  )
}
