import { useEffect, useState } from 'react'
import { currentTheme, onSystemThemeChange, saveTheme } from '../theme'
import type { Theme } from '../theme'

/** Top-bar button that switches between the light and dark themes. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme)
  useEffect(() => onSystemThemeChange(setTheme), [])

  const next: Theme = theme === 'dark' ? 'light' : 'dark'
  const label = `Switch to ${next} theme`
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      onClick={() => {
        saveTheme(next)
        setTheme(next)
      }}
    >
      {/* Shows the theme you'll switch to: a sun in dark mode, a moon in light mode */}
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
        {next === 'light' ? (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </g>
        ) : (
          <path
            d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  )
}
