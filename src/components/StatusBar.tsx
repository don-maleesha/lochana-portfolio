import { useEffect, useState } from 'react'

const BUILD_TIME = new Date(__BUILD_TIME__)

const colomboTime = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Colombo',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})
const relative = new Intl.RelativeTimeFormat('en', { numeric: 'always' })

/** "just now", "5 minutes ago", "3 hours ago", "2 days ago" */
function deployedAgo(now: Date) {
  if (import.meta.env.DEV) return 'just now'
  const minutes = Math.floor((now.getTime() - BUILD_TIME.getTime()) / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return relative.format(-minutes, 'minute')
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return relative.format(-hours, 'hour')
  return relative.format(-Math.floor(hours / 24), 'day')
}

/** One-line status under the map: time since the last deploy and the time in Colombo. */
export default function StatusBar() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    // Re-render on each minute boundary, then once a minute
    const tick = () => setNow(new Date())
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      tick()
      interval = window.setInterval(tick, 60_000)
    }, 60_000 - (Date.now() % 60_000))
    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [])

  return (
    <p className="status-bar">
      <span>
        last deploy <time dateTime={__BUILD_TIME__}>{deployedAgo(now)}</time>
      </span>
      <span className="status-bar-sep" aria-hidden="true">
        ·
      </span>
      <span>Colombo {colomboTime.format(now)}</span>
    </p>
  )
}
