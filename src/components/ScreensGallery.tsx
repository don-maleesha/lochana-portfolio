import { useEffect, useRef, useState } from 'react'
import type { Screen } from '../data/projects'

/**
 * Screenshot grid with a simple lightbox. The lightbox is a native modal <dialog>: it makes the
 * rest of the page inert (focus stays inside), closes on Esc, and returns focus to the opening
 * button. Page scrolling is locked while it is open.
 */
export default function ScreensGallery({ screens }: { screens: Screen[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const open = openIndex === null ? null : screens[openIndex]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || openIndex === null) return
    dialog.showModal()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // A click on the backdrop (outside the dialog box) closes it
    const onBackdrop = (e: MouseEvent) => {
      if (e.target === dialog) dialog.close()
    }
    dialog.addEventListener('click', onBackdrop)
    return () => {
      dialog.removeEventListener('click', onBackdrop)
      document.body.style.overflow = prevOverflow
      if (dialog.open) dialog.close()
    }
  }, [openIndex])

  return (
    <>
      <ul className="screens-grid">
        {screens.map((screen, i) => (
          <li key={screen.src}>
            <figure className="screen">
              <button type="button" className="screen-open" onClick={() => setOpenIndex(i)}>
                <img src={screen.src} alt={screen.alt} width={1200} height={675} loading="lazy" />
                <span className="sr-only">(view full size)</span>
              </button>
              {screen.caption && <figcaption>{screen.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>

      <dialog ref={dialogRef} className="lightbox" aria-label={open?.alt ?? 'Screenshot'} onClose={() => setOpenIndex(null)}>
        {open && (
          <figure className="lightbox-figure">
            <img src={open.src} alt={open.alt} width={1200} height={675} />
            {open.caption && <figcaption>{open.caption}</figcaption>}
          </figure>
        )}
        <form method="dialog" className="lightbox-close">
          {/* autoFocus: the native dialog focuses this when it opens */}
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <button type="submit" className="btn" autoFocus>
            Close
          </button>
        </form>
      </dialog>
    </>
  )
}
