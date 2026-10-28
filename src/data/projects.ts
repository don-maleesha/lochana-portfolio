export type ProjectEntry = {
  slug: string
  name: string
  summary: string
  role: string
  stack: string[]
  year: string
  problem: string
  approach: string
  outcome: string
}

/** Placeholder content — replace with your real (and shareable) projects. */
export const projects: ProjectEntry[] = [
  {
    slug: 'project-01',
    name: '[Project 01]',
    summary: '[One-line summary of what it does and who it is for.]',
    role: '[your role]',
    stack: ['Java', 'Spring Boot', 'React'],
    year: '[year]',
    problem: '[What problem did this solve?]',
    approach: '[How did you design and build it?]',
    outcome: '[What changed because of it?]',
  },
  {
    slug: 'project-02',
    name: '[Project 02]',
    summary: '[One-line summary of what it does and who it is for.]',
    role: '[your role]',
    stack: ['React', 'MUI'],
    year: '[year]',
    problem: '[What problem did this solve?]',
    approach: '[How did you design and build it?]',
    outcome: '[What changed because of it?]',
  },
]
