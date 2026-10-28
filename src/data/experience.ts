export type Release = {
  id: string
  tag: string
  title: string
  org: string
  period: string
  notes: string[]
  stack: string[]
  projects: string[]
}

/** Roles and education shown as tagged releases. Replace placeholder notes. */
export const releases: Release[] = [
  {
    id: 'v2',
    tag: 'v2.0 · current',
    title: 'Trainee – Software Engineer',
    org: 'Ones and Zeros Pvt Ltd',
    period: '[start date] – present',
    notes: [
      '[What you built or owned — replace with a real changelog item]',
      '[Another concrete contribution]',
      '[Something you improved or learned]',
    ],
    stack: ['Java', 'Spring Boot', 'React', 'MUI'],
    projects: ['project-01', 'project-02'],
  },
  {
    id: 'v1',
    tag: 'v1.0 · 2025',
    title: 'BSc. Information Systems',
    org: 'University of Colombo School of Computing',
    period: 'Graduated 2025',
    notes: ['[Focus areas, final-year project or achievements]'],
    stack: [],
    projects: [],
  },
]
