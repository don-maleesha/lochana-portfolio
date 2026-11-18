/**
 * Experience page (/experience): roles and education as a release timeline, newest first.
 * Keep [square brackets] for anything not yet confirmed.
 *
 * section   'work' entries get a summary and project changelogs; 'education' entries are compact.
 * version   Version tag in the timeline rail, e.g. 'v2.0'.
 * current   Marks the current role: filled accent dot and a CURRENT label.
 * title     Role or qualification (<h3>).
 * org       Employer or institution.
 * period    Date range or year.
 * summary   Work only: one line under the title.
 * projects  Work only: changelog sub-entries, each with 2–4 bullets and its deps (plain text, not pills).
 */

export type ReleaseProject = {
  name: string
  context: string
  bullets: string[]
  deps: string[]
}

export type Release = {
  section: 'work' | 'education'
  version: string
  current?: boolean
  title: string
  org: string
  period: string
  summary?: string
  projects?: ReleaseProject[]
}

export const experiencePage = {
  eyebrow: 'GET /experience',
  title: 'Release history',
  intro: 'Roles and education, shipped as releases.',
  sections: { work: 'Work', education: 'Education' },
  currentLabel: 'CURRENT',
  changelogLabel: 'changelog',
  depsLabel: 'deps:',
}

export const releases: Release[] = [
  {
    section: 'work',
    version: 'v2.0',
    current: true,
    title: 'Trainee – Software Engineer',
    org: 'Ones and Zeros Pvt Ltd',
    period: 'Nov 2025 – present',
    summary: 'Full-stack development on government agriculture systems for Sri Lanka and Vanuatu.',
    projects: [
      {
        name: 'CROPIX',
        context: 'Seed certification platform, Department of Agriculture, Sri Lanka',
        bullets: [
          'Built and fixed features across the SCS and SPMDC modules in a Spring Boot + React codebase',
          'Resolved race conditions in multi-step registration forms with cascading dropdowns and auto-fill',
          'Moved S3 file access to on-demand presigned URLs instead of storing them',
          'Wrote the user manual for the Seed Act Registration system',
        ],
        deps: ['Java', 'Spring Boot', 'MySQL', 'Flyway', 'React', 'MUI', 'AWS S3'],
      },
      {
        name: 'Digital Farmer Registry',
        context: 'Ministry of Agriculture (MALFB), Vanuatu',
        bullets: [
          'Debugged the bulk farmer import API, including MongoDB field-name and non-transactional account-creation issues',
          'Produced user and developer guides',
        ],
        deps: ['[fill in]', 'MongoDB', 'Keycloak'],
      },
      {
        name: 'GAP Certification Portal',
        context: 'Cinnamon Development, Sri Lanka',
        bullets: ['Built master data for fertilizers, pesticides, diseases and pests used in cinnamon cultivation'],
        deps: ['[fill in]'],
      },
    ],
  },
  {
    section: 'education',
    version: 'v1.0',
    title: 'BSc. Information Systems',
    org: 'University of Colombo School of Computing',
    period: '2025',
  },
  {
    section: 'education',
    version: 'v0.1',
    title: 'G.C.E. Advanced Level, Physical Science',
    org: 'Ranabima Royal College',
    period: '2020',
  },
]
