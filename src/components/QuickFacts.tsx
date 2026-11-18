import type { ProjectEntry } from '../data/projects'
import { projectsPage } from '../data/projects'

/** "Quick facts" panel: role, team, duration, then one row per stack group (items as plain text). */
export default function QuickFacts({ project }: { project: ProjectEntry }) {
  const labels = projectsPage.quickFacts
  const rows: [label: string, value: string][] = []
  if (project.role) rows.push([labels.role, project.role])
  if (project.team) rows.push([labels.team, project.team])
  if (project.duration) rows.push([labels.duration, project.duration])
  for (const group of project.stackGroups ?? []) rows.push([group.label, group.items.join(', ')])
  if (rows.length === 0) return null

  return (
    <aside className="card quick-facts" aria-labelledby="quick-facts-title">
      <h2 id="quick-facts-title" className="eyebrow">
        {labels.heading}
      </h2>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label} className="quick-facts-row">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}
