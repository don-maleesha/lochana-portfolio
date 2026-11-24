import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { followSystemTheme, savePreference, storedPreference } from '../theme'
import type { ThemePreference } from '../theme'

const icon = (children: ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
)

const OPTIONS: { value: ThemePreference; label: string; icon: ReactNode }[] = [
  {
    value: 'system',
    label: 'System theme',
    icon: icon(
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </>,
    ),
  },
  {
    value: 'light',
    label: 'Light theme',
    icon: icon(
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>,
    ),
  },
  {
    value: 'dark',
    label: 'Dark theme',
    icon: icon(<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />),
  },
]

/** Top-bar System / Light / Dark switch. System (follow the OS) is the default. */
export default function ThemeToggle() {
  const [pref, setPref] = useState<ThemePreference>(storedPreference)
  useEffect(() => followSystemTheme(), [])

  return (
    <div className="theme-switch" role="group" aria-label="Colour theme">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-label={o.label}
          title={o.label}
          aria-pressed={pref === o.value}
          onClick={() => {
            savePreference(o.value)
            setPref(o.value)
          }}
        >
          {o.icon}
        </button>
      ))}
    </div>
  )
}
