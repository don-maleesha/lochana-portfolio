/**
 * Site-wide profile copy and the About page content. Edit text here; components only render it.
 *
 * name        Full name: header wordmark (≥ 480px), home <h1>, page titles.
 * shortName   Header wordmark below 480px, where the full name pushes the status line to a second row.
 * headline    Home hero line. No employer, client, industry or tech stack.
 *             Keep the meta/og descriptions in index.html in sync with it.
 * about       Everything on /about. Must not mention a job title or employer.
 *   eyebrow, title, intro   Small label, <h1> and the line under it.
 *   introLink               Link shown right under the intro, so contact is reachable without scrolling.
 *   bioHeading, bio         Bio card heading; each string is one paragraph.
 *   skillsHeading, skills   Skills card heading; one row per category, chips in the given order.
 *   links                   Closing links under Skills; `to` must be one of the site's routes.
 */

/** Routes a content link may point to (see App.tsx). */
export type SitePath = '/' | '/about' | '/projects' | '/experience' | '/contact' | '/accessibility'

export type SkillCategory = { name: string; items: string[] }
export type ContentLink = { label: string; to: SitePath }

export type AboutContent = {
  eyebrow: string
  title: string
  intro: string
  introLink: ContentLink
  bioHeading: string
  bio: string[]
  skillsHeading: string
  skills: SkillCategory[]
  links: ContentLink[]
}

export type Profile = {
  name: string
  shortName: string
  headline: string
  about: AboutContent
}

export const profile: Profile = {
  name: 'Lochana Thilakarathne',
  shortName: 'Lochana T.',
  headline: 'Transforming ideas into digital experiences.',
  about: {
    eyebrow: 'profile.json',
    title: 'About',
    intro: 'BSc. in Information Systems, University of Colombo School of Computing',
    introLink: { label: 'Get in touch →', to: '/contact' },
    bioHeading: 'Bio',
    bio: [
      "I'm a full-stack engineer from Sri Lanka who likes owning a problem end to end, from the database schema to the last pixel on screen. I studied Information Systems at the University of Colombo School of Computing, and my approach still follows that: understand how the people, the data and the process fit together before writing any code.",
      'I build Java and Spring Boot services and React interfaces for government agriculture platforms, including certification and registry systems. These are systems with real users, strict workflows and data that has to be right, which has taught me to value clear data models, predictable APIs and interfaces people can use without a manual.',
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
}
