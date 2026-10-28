import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Sets document.title and, after client-side navigation, moves focus to
 * <main> so screen reader and keyboard users start at the new content.
 * The initial page load keeps the browser's default focus.
 */
export function usePageTitle(title: string) {
  const { key } = useLocation()

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    if (key === 'default') return
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [key])
}
