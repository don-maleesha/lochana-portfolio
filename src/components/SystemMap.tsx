import { useEffect, useRef, useState } from 'react'
import type { PointerEvent, Ref } from 'react'
import { Link } from 'react-router-dom'
import { animate } from 'framer-motion'
import { services } from '../data/system'

const W = 1060
const PAD_B = 8
const NODE_H = 72
const rowY = (i: number) => 70 + i * 125
const MID = rowY((services.length - 1) / 2)
const H = rowY(services.length - 1) + NODE_H / 2 + PAD_B
const FIRST = rowY(0)
const LAST = rowY(services.length - 1)

const CLIENT = { x: 0, w: 150 }
const GATEWAY = { x: 230, w: 180 }
const SERVICE = { x: 540, w: 200 }
const STORE = { x: 860, w: 200 }
const TRUNK_X = 475
const HEAD_GAP = 6

/* ---------- Edge geometry, shared by the drawn edges and the packet routes ---------- */
type Point = [number, number]

const centre = (box: { x: number; w: number }, cy: number): Point => [box.x + box.w / 2, cy]
const edges = {
  client: [[CLIENT.x + CLIENT.w, MID], [GATEWAY.x - HEAD_GAP, MID]] as Point[],
  gateway: [[GATEWAY.x + GATEWAY.w, MID], [TRUNK_X, MID]] as Point[],
  trunk: [[TRUNK_X, FIRST], [TRUNK_X, LAST]] as Point[],
  service: (cy: number): Point[] => [[TRUNK_X, cy], [SERVICE.x - HEAD_GAP, cy]],
  store: (cy: number): Point[] => [[SERVICE.x + SERVICE.w, cy], [STORE.x - HEAD_GAP, cy]],
}
const pathD = (pts: Point[]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ')

/* ---------- Request packet ---------- */
// A hop runs from one node to the next along the drawn edges. The packet starts and ends at node
// centres, so it slides out from under each (opaque) node box rather than appearing on the line.
type Hop = { points: Point[]; stage: string }

const INTRO = 'intro'
const PACKET_MS = 900

function routeFor(id: string): Hop[] {
  const hop1: Hop = { points: [centre(CLIENT, MID), ...edges.client, centre(GATEWAY, MID)], stage: 'gateway' }
  if (id === INTRO) return [hop1]
  const cy = rowY(services.findIndex((s) => s.id === id))
  return [
    hop1,
    { points: [centre(GATEWAY, MID), ...edges.gateway, [TRUNK_X, cy], ...edges.service(cy), centre(SERVICE, cy)], stage: id },
    // Stops at the store's (transparent) border instead of its centre
    { points: [centre(SERVICE, cy), ...edges.store(cy), [STORE.x, cy]], stage: `store-${id}` },
  ]
}

const length = (pts: Point[]) => pts.slice(1).reduce((sum, [x, y], i) => sum + Math.hypot(x - pts[i][0], y - pts[i][1]), 0)

function pointAt(pts: Point[], t: number): Point {
  let remaining = t * length(pts)
  for (let i = 1; i < pts.length; i++) {
    const [ax, ay] = pts[i - 1]
    const [bx, by] = pts[i]
    const seg = Math.hypot(bx - ax, by - ay)
    if (remaining <= seg && seg > 0) return [ax + ((bx - ax) * remaining) / seg, ay + ((by - ay) * remaining) / seg]
    remaining -= seg
  }
  return pts[pts.length - 1]
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Drives the packet imperatively (SVG attributes only, no React state), so the map never
 * re-renders for it. A run finishes its current hop before stopping, then fades out.
 */
function createPacketRunner(circle: SVGCircleElement, nodes: Map<string, SVGGElement>) {
  let target: string | null = null
  let running = false
  let disposed = false
  let stopCurrent: (() => void) | null = null
  const timers = new Set<number>()

  // Resolves when the tween completes or is cancelled (tab hidden, unmount)
  const tween = (ms: number, ease: 'easeInOut' | 'linear', onUpdate: (v: number) => void) =>
    new Promise<void>((resolve) => {
      const controls = animate(0, 1, { duration: ms / 1000, ease, onUpdate, onComplete: resolve })
      stopCurrent = () => {
        controls.stop()
        resolve()
      }
    }).finally(() => {
      stopCurrent = null
    })

  const place = ([x, y]: Point) => circle.setAttribute('transform', `translate(${x} ${y})`)
  const setOpacity = (v: number) => circle.setAttribute('opacity', String(v))

  const pulse = (stage: string) => {
    const g = nodes.get(stage)
    if (!g) return
    g.dataset.pulse = ''
    const t = window.setTimeout(() => {
      delete g.dataset.pulse
      timers.delete(t)
    }, 260)
    timers.add(t)
  }

  const canAnimate = () => !disposed && !document.hidden && !prefersReducedMotion()

  async function run() {
    running = true
    let ran: string | null = null
    // No looping: each target runs once; a different target queued meanwhile runs next
    while (target && target !== ran && canAnimate()) {
      const id: string = target
      ran = id
      const hops = routeFor(id)
      const total = id === INTRO ? length(hops[0].points) : hops.reduce((sum, h) => sum + length(h.points), 0)
      place(hops[0].points[0])
      setOpacity(1)
      for (const hop of hops) {
        const ms = id === INTRO ? 600 : (PACKET_MS * length(hop.points)) / total
        await tween(ms, 'easeInOut', (v) => place(pointAt(hop.points, v)))
        if (!canAnimate()) break
        pulse(hop.stage)
        if (target !== id) break // pointer/focus left: stop at this node
      }
      if (canAnimate()) await tween(150, 'linear', (v) => setOpacity(1 - v))
      setOpacity(0)
      if (id === INTRO && target === INTRO) target = null
    }
    running = false
  }

  const onVisibility = () => {
    if (!document.hidden) return
    stopCurrent?.()
    setOpacity(0)
  }
  document.addEventListener('visibilitychange', onVisibility)

  return {
    trigger(id: string) {
      target = id
      if (!running) void run()
    },
    release(id: string) {
      if (target === id) target = null
    },
    intro() {
      const t = window.setTimeout(() => {
        timers.delete(t)
        if (target === null) this.trigger(INTRO)
      }, 250)
      timers.add(t)
    },
    dispose() {
      disposed = true
      target = null
      stopCurrent?.()
      timers.forEach((t) => window.clearTimeout(t))
      nodes.forEach((g) => delete g.dataset.pulse)
      document.removeEventListener('visibilitychange', onVisibility)
    },
  }
}

type NodeProps = {
  x: number
  cy: number
  w: number
  title: string
  sub: string
  className?: string
  nodeRef?: Ref<SVGGElement>
}

function Node({ x, cy, w, title, sub, className = '', nodeRef }: NodeProps) {
  return (
    <g className={`node ${className}`} ref={nodeRef}>
      <rect x={x} y={cy - NODE_H / 2} width={w} height={NODE_H} rx={8} />
      <text className="t" x={x + w / 2} y={cy - 4} textAnchor="middle">
        {title}
      </text>
      <text className="s" x={x + w / 2} y={cy + 16} textAnchor="middle">
        {sub}
      </text>
    </g>
  )
}

export default function SystemMap() {
  const [active, setActive] = useState<string | null>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  // Stable registry of node groups the packet highlights; filled by callback refs at commit
  const [nodes] = useState(() => new Map<string, SVGGElement>())
  const packetRef = useRef<ReturnType<typeof createPacketRunner> | null>(null)

  useEffect(() => {
    if (!circleRef.current) return
    const runner = createPacketRunner(circleRef.current, nodes)
    packetRef.current = runner
    runner.intro()
    return () => {
      runner.dispose()
      packetRef.current = null
    }
  }, [nodes])

  const registerNode = (key: string) => (el: SVGGElement | null) => {
    if (el) nodes.set(key, el)
    else nodes.delete(key)
  }
  const activeRow = active ? rowY(services.findIndex((s) => s.id === active)) : null
  // Touch taps navigate straight away; packets are for pointer hover and keyboard focus
  const isTouch = (e: PointerEvent) => e.pointerType === 'touch'

  return (
    <div>
      <svg
        className="map-svg"
        viewBox={`0 0 ${W} ${H}`}
        role="group"
        aria-label="System map: visitor, gateway, services and data stores"
      >
        <defs aria-hidden="true">
          <marker id="head" className="head" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" />
          </marker>
          <marker id="head-active" className="head-active" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" />
          </marker>
        </defs>

        <text className="col-label" aria-hidden="true" x={CLIENT.x} y={MID - NODE_H / 2 - 16}>CLIENT</text>
        <text className="col-label" aria-hidden="true" x={GATEWAY.x} y={MID - NODE_H / 2 - 16}>GATEWAY</text>
        <text className="col-label" aria-hidden="true" x={SERVICE.x} y={FIRST - NODE_H / 2 - 16}>SERVICES</text>
        <text className="col-label" aria-hidden="true" x={STORE.x} y={FIRST - NODE_H / 2 - 16}>DATA</text>

        {/* client -> gateway */}
        <path className="edge" aria-hidden="true" d={pathD(edges.client)} markerEnd="url(#head)" />
        {/* gateway -> trunk */}
        <path className="edge" aria-hidden="true" d={pathD(edges.gateway)} />
        <path className="edge" aria-hidden="true" d={pathD(edges.trunk)} />

        {services.map((s, i) => {
          const cy = rowY(i)
          const on = active === s.id
          const marker = on ? 'url(#head-active)' : 'url(#head)'
          return (
            <g key={s.id}>
              <path className={`edge${on ? ' active' : ''}`} aria-hidden="true" d={pathD(edges.service(cy))} markerEnd={marker} />
              <path className={`edge${on ? ' active' : ''}`} aria-hidden="true" d={pathD(edges.store(cy))} markerEnd={marker} />
            </g>
          )
        })}

        {/* Reduced motion: the whole route lights up instead of a moving packet (CSS shows these) */}
        {activeRow !== null && (
          <g className="route-static" aria-hidden="true">
            <path className="edge active" d={pathD(edges.client)} markerEnd="url(#head-active)" />
            <path className="edge active" d={pathD(edges.gateway)} />
            <path className="edge active" d={pathD([[TRUNK_X, MID], [TRUNK_X, activeRow]])} />
          </g>
        )}

        {/* Packet overlay: above the edges, below the nodes */}
        <g className="packet-layer" aria-hidden="true">
          <circle ref={circleRef} className="packet" r={6} opacity={0} />
        </g>

        <Node x={CLIENT.x} cy={MID} w={CLIENT.w} title="Visitor" sub="browser" />
        <Node x={GATEWAY.x} cy={MID} w={GATEWAY.w} title="Gateway" sub="home · intro" nodeRef={registerNode('gateway')} />

        {services.map((s, i) => {
          const cy = rowY(i)
          const on = active === s.id
          return (
            <g key={s.id}>
              <Link
                to={s.path}
                className="node-link"
                aria-label={`${s.label} — ${s.method} ${s.path}`}
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive(null)}
                onPointerEnter={(e) => !isTouch(e) && packetRef.current?.trigger(s.id)}
                onPointerLeave={(e) => !isTouch(e) && packetRef.current?.release(s.id)}
                onFocus={() => {
                  setActive(s.id)
                  packetRef.current?.trigger(s.id)
                }}
                onBlur={() => {
                  setActive(null)
                  packetRef.current?.release(s.id)
                }}
              >
                <Node
                  x={SERVICE.x}
                  cy={cy}
                  w={SERVICE.w}
                  title={s.label}
                  sub={`${s.method} ${s.path}`}
                  className={`service${on ? ' active' : ''}`}
                  nodeRef={registerNode(s.id)}
                />
              </Link>
              <Node
                x={STORE.x}
                cy={cy}
                w={STORE.w}
                title={s.store.label}
                sub={s.store.sub}
                className={`store${on ? ' active' : ''}`}
                nodeRef={registerNode(`store-${s.id}`)}
              />
            </g>
          )
        })}
      </svg>

      {/* Small screens: the same map as a vertical list */}
      <ol className="map-mobile" aria-label="Sections">
        {services.map((s) => (
          <li key={s.id}>
            <Link to={s.path}>
              <span>
                <strong>{s.label}</strong> <span className="muted">{s.path}</span>
              </span>
              <span aria-hidden="true">›</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
