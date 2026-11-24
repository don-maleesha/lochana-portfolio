/**
 * Light/dark theme. The theme is the `data-theme` attribute on <html>; styles.css swaps the
 * colour tokens on it. An inline script in index.html sets it before first paint, using the
 * same storage key and fallback as below, so keep the two in sync.
 *
 * With no saved choice the site follows the system setting; picking a theme saves it.
 */

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const LIGHT_QUERY = '(prefers-color-scheme: light)'
/** Browser UI colour per theme; matches --bg in styles.css */
const THEME_COLOR: Record<Theme, string> = { dark: '#0B0D14', light: '#FAFAFA' }

export function storedTheme(): Theme | null {
  try {
    const t = localStorage.getItem(STORAGE_KEY)
    return t === 'light' || t === 'dark' ? t : null
  } catch {
    return null // storage blocked (private mode, disabled cookies)
  }
}

export function systemTheme(): Theme {
  return window.matchMedia(LIGHT_QUERY).matches ? 'light' : 'dark'
}

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
}

export function saveTheme(theme: Theme) {
  applyTheme(theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Not saved; the choice still applies until the page is reloaded
  }
}

/** Follows system changes while the visitor hasn't picked a theme. Returns an unsubscribe. */
export function onSystemThemeChange(callback: (theme: Theme) => void) {
  const mq = window.matchMedia(LIGHT_QUERY)
  const listener = () => {
    if (storedTheme()) return
    const t = systemTheme()
    applyTheme(t)
    callback(t)
  }
  mq.addEventListener('change', listener)
  return () => mq.removeEventListener('change', listener)
}
