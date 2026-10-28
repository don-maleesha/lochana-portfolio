import { useState } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/system'

const W = 1060
const PAD_B = 8
const NODE_H = 72
const rowY = (i: number) => 70 + i * 125
const MID = rowY((services.length - 1) / 2)
const H = rowY(services.length - 1) + NODE_H / 2 + PAD_B

const CLIENT = { x: 0, w: 150 }
const GATEWAY = { x: 230, w: 180 }
const SERVICE = { x: 540, w: 200 }
const STORE = { x: 860, w: 200 }
const TRUNK_X = 475
const HEAD_GAP = 6

type NodeProps = {
  x: number
  cy: number
  w: number
  title: string
  sub: string
  className?: string
}

function Node({ x, cy, w, title, sub, className = '' }: NodeProps) {
  return (
    <g className={`node ${className}`}>
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
  const first = rowY(0)
  const last = rowY(services.length - 1)

  return (
    <div>
      <svg
        className="map-svg"
        viewBox={`0 0 ${W} ${H}`}
        role="group"
        aria-label="System map: visitor, gateway, services and data stores"
      >
        <defs>
          <marker id="head" className="head" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" />
          </marker>
          <marker id="head-active" className="head-active" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" />
          </marker>
        </defs>

        <text className="col-label" x={CLIENT.x} y={MID - NODE_H / 2 - 16}>CLIENT</text>
        <text className="col-label" x={GATEWAY.x} y={MID - NODE_H / 2 - 16}>GATEWAY</text>
        <text className="col-label" x={SERVICE.x} y={first - NODE_H / 2 - 16}>SERVICES</text>
        <text className="col-label" x={STORE.x} y={first - NODE_H / 2 - 16}>DATA</text>

        {/* client -> gateway */}
        <path className="edge" d={`M ${CLIENT.x + CLIENT.w} ${MID} H ${GATEWAY.x - HEAD_GAP}`} markerEnd="url(#head)" />
        {/* gateway -> trunk */}
        <path className="edge" d={`M ${GATEWAY.x + GATEWAY.w} ${MID} H ${TRUNK_X}`} />
        <path className="edge" d={`M ${TRUNK_X} ${first} V ${last}`} />

        {services.map((s, i) => {
          const cy = rowY(i)
          const on = active === s.id
          const marker = on ? 'url(#head-active)' : 'url(#head)'
          return (
            <g key={s.id}>
              <path className={`edge${on ? ' active' : ''}`} d={`M ${TRUNK_X} ${cy} H ${SERVICE.x - HEAD_GAP}`} markerEnd={marker} />
              <path
                className={`edge${on ? ' active' : ''}`}
                d={`M ${SERVICE.x + SERVICE.w} ${cy} H ${STORE.x - HEAD_GAP}`}
                markerEnd={marker}
              />
            </g>
          )
        })}

        <Node x={CLIENT.x} cy={MID} w={CLIENT.w} title="Visitor" sub="browser" />
        <Node x={GATEWAY.x} cy={MID} w={GATEWAY.w} title="Gateway" sub="home · intro" />

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
                onFocus={() => setActive(s.id)}
                onBlur={() => setActive(null)}
              >
                <Node
                  x={SERVICE.x}
                  cy={cy}
                  w={SERVICE.w}
                  title={s.label}
                  sub={`${s.method} ${s.path}`}
                  className={`service${on ? ' active' : ''}`}
                />
              </Link>
              <Node
                x={STORE.x}
                cy={cy}
                w={STORE.w}
                title={s.store.label}
                sub={s.store.sub}
                className={`store${on ? ' active' : ''}`}
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
