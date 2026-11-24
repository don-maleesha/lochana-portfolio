/**
 * Light/dark theme. The theme is the `data-theme` attribute on <html>; styles.css swaps the
 * colour tokens on it. An inline script in index.html sets it before first paint, using the
 * same storage key and fallback as below, so keep the two in sync.
 *
 * The visitor's preference is 'system' (the default: follow the OS setting, live), 'light' or
 * 'dark'. An explicit light or dark choice is saved and pins the theme until changed.
 */

export type Theme = 'light' | 'dark'
export type ThemePreference = Theme | 'system'

const STORAGE_KEY = 'theme'
const LIGHT_QUERY = '(prefers-color-scheme: light)'
/** Browser UI colour per theme; matches --bg in styles.css */
const THEME_COLOR: Record<Theme, string> = { dark: '#0B0D14', light: '#FAFAFA' }

export function storedPreference(): ThemePreference {
  try {
    const t = localStorage.getItem(STORAGE_KEY)
    return t === 'light' || t === 'dark' ? t : 'system'
  } catch {
    return 'system' // storage blocked (private mode, disabled cookies)
  }
}

function systemTheme(): Theme {
  return window.matchMedia(LIGHT_QUERY).matches ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
}

export function savePreference(pref: ThemePreference) {
  applyTheme(pref === 'system' ? systemTheme() : pref)
  try {
    if (pref === 'system') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, pref)
  } catch {
    // Not saved; the choice still applies until the page is reloaded
  }
}

/** Re-applies the system theme when the OS setting changes, unless a theme is pinned. */
export function followSystemTheme() {
  const mq = window.matchMedia(LIGHT_QUERY)
  const listener = () => {
    if (storedPreference() === 'system') applyTheme(systemTheme())
  }
  mq.addEventListener('change', listener)
  return () => mq.removeEventListener('change', listener)
}
