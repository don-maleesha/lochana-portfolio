import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Last location key seen in this page load. null until the first page renders. Can't test for
// key === 'default' instead: after a refresh the router restores the key from history.state.
let lastKey: string | null = null

/**
 * Sets document.title and, after client-side navigation, moves focus to
 * <main> so screen reader and keyboard users start at the new content.
 * The initial page load (including a refresh) keeps the browser's default focus.
 */
export function usePageTitle(title: string) {
  const { key } = useLocation()

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    const initial = lastKey === null
    const changed = key !== lastKey
    lastKey = key
    if (initial || !changed) return
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [key])
}
