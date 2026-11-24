/**
 * Site-wide profile copy and the About page content. Edit text here; components only render it.
 *
 * name        Full name: header wordmark (≥ 480px), home <h1>, page titles.
 * shortName   Header wordmark below 480px, where the full name pushes the status line to a second row.
 * headline    Home hero line. No employer, client, industry or tech stack.
 *             Keep the meta/og descriptions in index.html in sync with it.
 * about       Everything on /about. Must not mention a job title or employer.
 *   eyebrow, title, intro   Small label, <h1> and the lines under it (each string on its own line).
 *   bioHeading, bio         Bio card heading; each string is one paragraph.
 *   skillsHeading, skills   Skills card heading; one row per category, chips in the given order.
 *   links                   Closing links under Skills; `to` must be one of the site's routes.
 * glance      "At a glance" panel on /experience: location, domain, stack and the CV button.
 *             Status comes from availability.ts; role, company and the shipped count come from
 *             the current release in experience.ts, so none of them is written twice.
 *             The CV button only appears when public/cv.pdf exists at build time.
 */

/** Routes a content link may point to (see App.tsx). */
export type SitePath = '/' | '/about' | '/projects' | '/experience' | '/contact'

export type SkillCategory = { name: string; items: string[] }
export type ContentLink = { label: string; to: SitePath }

export type AboutContent = {
  eyebrow: string
  title: string
  intro: string[]
  bioHeading: string
  bio: string[]
  skillsHeading: string
  skills: SkillCategory[]
  links: ContentLink[]
}

export type GlanceContent = {
  heading: string
  labels: { status: string; role: string; company: string; location: string; domain: string; shipped: string; stack: string }
  location: string
  domain: string
  stack: string[]
  cv: { href: string; label: string }
}

export type Profile = {
  name: string
  shortName: string
  headline: string
  about: AboutContent
  glance: GlanceContent
}

export const profile: Profile = {
  name: 'Lochana Thilakarathne',
  shortName: 'Lochana T.',
  headline: 'Transforming ideas into digital experiences.',
  about: {
    eyebrow: 'profile.json',
    title: 'About',
    intro: ['BSc. in Information Systems', 'University of Colombo School of Computing'],
    bioHeading: 'Bio',
    bio: [
      "I'm a full-stack engineer from Sri Lanka who likes owning a problem end to end, from the schema to the screen. My degree in Information Systems from the University of Colombo School of Computing shaped how I work: I start by understanding how the people, the data and the process fit together, before writing any code.",
      'I build back-end services and web interfaces for government bodies, international organisations and private-sector teams, including agricultural certification and registry systems. These are systems with real users, strict workflows and data that has to be right, which has taught me to value clear data models, predictable APIs and interfaces people can use without a manual.',
      "Away from the keyboard I'm drawn to the night sky, to cricket and to community work. I'm a member of the Old Ranabima Astronomical Society and the Rotaract Club of Kandy, and serve on the committee of the Ranabima Royal College Cricket Foundation. All three reward patience and teamwork, which is most of what good engineering needs too.",
    ],
    skillsHeading: 'Skills',
    skills: [
      { name: 'Languages', items: ['Java', 'JavaScript', 'TypeScript', 'PHP', 'C'] },
      { name: 'Frontend', items: ['React', 'MUI', 'Next.js', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS'] },
      { name: 'Backend', items: ['Spring Boot', 'Node.js', 'Express'] },
      { name: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
      { name: 'Tools', items: ['Git', 'Postman', 'Figma', 'Jira', 'Linux'] },
    ],
    links: [
      { label: 'View projects →', to: '/projects' },
      { label: 'Get in touch →', to: '/contact' },
    ],
  },
  glance: {
    heading: 'at a glance',
    labels: { status: 'status', role: 'role', company: 'company', location: 'location', domain: 'domain', shipped: 'shipped', stack: 'stack' },
    location: 'Sri Lanka',
    domain: 'Government agriculture systems',
    stack: ['Java', 'Spring Boot', 'React', 'MUI'],
    cv: { href: '/cv.pdf', label: 'Download CV' },
  },
}
