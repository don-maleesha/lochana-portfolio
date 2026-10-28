import { useState } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

/** Location state set by the system map's service links. */
export type MapLinkState = { fromMap?: boolean }

/**
 * Decorative "deploying /path … ok 200" strip, shown briefly after opening a service from the map.
 * Absolutely positioned in the gap above the content, so it never shifts the page, and hidden from
 * assistive tech. Skipped on direct loads, refreshes, back/forward (POP) and with reduced motion.
 */
export default function DeployStrip() {
  const { pathname, state } = useLocation()
  const navigationType = useNavigationType()
  const reduceMotion = useReducedMotion()
  const [done, setDone] = useState(false)

  const fromMap = (state as MapLinkState | null)?.fromMap === true
  if (!fromMap || navigationType !== 'PUSH' || reduceMotion || done) return null

  return (
    <motion.div
      className="deploy-strip"
      aria-hidden="true"
      initial={{ opacity: 0, scaleY: 1 }}
      animate={{ opacity: [0, 1, 1, 0], scaleY: [1, 1, 1, 0] }}
      transition={{ duration: 0.6, times: [0, 0.2, 0.75, 1], ease: 'easeOut' }}
      onAnimationComplete={() => setDone(true)}
    >
      $ deploying {pathname} … <span className="deploy-ok">ok 200</span>
    </motion.div>
  )
}
