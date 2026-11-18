import { useEffect, useId, useRef, useState } from 'react'
import type { ProjectDiagram as Diagram } from '../data/projects'

const NODE_W = 172
const NODE_H = 64
const COL_GAP = 40
const ROW_GAP = 24
const TOP = 40 // room for the column labels
const HEAD_GAP = 6
/** Below this scale the 12–14px labels get too small to read, so the text list is shown instead */
const MIN_SCALE = 0.75

/**
 * A project's architecture in the landing map's visual language: columns left to right,
 * orthogonal arrows between nodes. When its container is too narrow for readable labels
 * (and always for screen readers), the same connections are listed as text.
 */
export default function ProjectDiagram({ diagram }: { diagram: Diagram }) {
  const markerId = `head-${useId().replace(/:/g, '')}`
  const tallest = Math.max(...diagram.columns.map((c) => c.nodes.length))
  const bodyH = tallest * NODE_H + (tallest - 1) * ROW_GAP
  const W = diagram.columns.length * NODE_W + (diagram.columns.length - 1) * COL_GAP
  const H = TOP + bodyH + 4

  // Show the SVG only when the container can fit it at MIN_SCALE or larger
  const wrapRef = useRef<HTMLDivElement>(null)
  const [fits, setFits] = useState(true)
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setFits(entry.contentRect.width >= W * MIN_SCALE))
    ro.observe(el)
    return () => ro.disconnect()
  }, [W])

  // Node positions: each column's nodes are centred vertically
  const pos = new Map<string, { x: number; cy: number; title: string }>()
  diagram.columns.forEach((col, ci) => {
    const colH = col.nodes.length * NODE_H + (col.nodes.length - 1) * ROW_GAP
    col.nodes.forEach((n, ri) => {
      pos.set(n.id, { x: ci * (NODE_W + COL_GAP), cy: TOP + (bodyH - colH) / 2 + ri * (NODE_H + ROW_GAP) + NODE_H / 2, title: n.title })
    })
  })
  const edges = diagram.edges.flatMap(([from, to]) => {
    const a = pos.get(from)
    const b = pos.get(to)
    return a && b ? [{ key: `${from}-${to}`, a, b }] : []
  })

  return (
    <div ref={wrapRef}>
      {fits && (
        <svg className="diagram-svg" viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: W }} aria-hidden="true">
          <defs>
            <marker id={markerId} className="head" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" />
            </marker>
          </defs>

          {diagram.columns.map((col, ci) => (
            <text key={col.label} className="col-label" x={ci * (NODE_W + COL_GAP)} y={14}>
              {col.label}
            </text>
          ))}

          {edges.map(({ key, a, b }) => {
            const x1 = a.x + NODE_W
            const x2 = b.x - HEAD_GAP
            const midX = x1 + COL_GAP / 2
            const d = a.cy === b.cy ? `M ${x1} ${a.cy} H ${x2}` : `M ${x1} ${a.cy} H ${midX} V ${b.cy} H ${x2}`
            return <path key={key} className="edge" d={d} markerEnd={`url(#${markerId})`} />
          })}

          {diagram.columns.map((col) =>
            col.nodes.map((n) => {
              const p = pos.get(n.id)!
              return (
                <g key={n.id} className={`node${n.kind === 'store' ? ' store' : ''}`}>
                  <rect x={p.x} y={p.cy - NODE_H / 2} width={NODE_W} height={NODE_H} rx={8} />
                  <text className="t" x={p.x + NODE_W / 2} y={p.cy - 4} textAnchor="middle">
                    {n.title}
                  </text>
                  <text className="s" x={p.x + NODE_W / 2} y={p.cy + 15} textAnchor="middle">
                    {n.sub}
                  </text>
                </g>
              )
            }),
          )}
        </svg>
      )}

      <ol className={fits ? 'diagram-list sr-only' : 'diagram-list'}>
        {edges.map(({ key, a, b }) => (
          <li key={key}>
            {a.title} <span aria-hidden="true">→</span>
            <span className="sr-only">connects to</span> {b.title}
          </li>
        ))}
      </ol>
    </div>
  )
}
