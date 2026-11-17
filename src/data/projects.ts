/**
 * Projects shown on /projects and their case-study pages (/projects/:slug).
 * Keep [square brackets] for anything not yet confirmed; never invent results or numbers.
 *
 * slug         URL segment; also referenced from experience.ts.
 * title        Project name (card title and case-study <h1>).
 * year         Year or range.
 * featured     true for the one project shown large at the top of /projects.
 * context      Meta line, e.g. 'Team of 2 · Learning project'.
 * summary      One sentence on what was built and by whom, max ~120 characters (clamped to 2 lines).
 * stack        Full stack, shown on the case-study page.
 * keyStack     3–4 key technologies for the card (only the first 4 are shown).
 * thumbnail    Optional screenshot path (e.g. '/projects/cakeshop.png' in public/); cards show initials without it.
 * description  "What it does": one paragraph.
 * built        "What I built": your own part, one bullet per string.
 * learned      "What I learned": one bullet per string.
 * diagram      "How it fits together": columns of nodes left to right, plus edges between node ids.
 * links        External links (repo, demo), shown as standalone links.
 */

export type DiagramNode = {
  id: string
  title: string
  sub: string
  /** 'store' draws a dashed box, as for data stores and external services on the landing map */
  kind?: 'store'
}
export type DiagramColumn = { label: string; nodes: DiagramNode[] }
export type ProjectDiagram = { columns: DiagramColumn[]; edges: [from: string, to: string][] }
export type ExternalLink = { label: string; href: `https://${string}` }

export type ProjectEntry = {
  slug: string
  title: string
  year: string
  featured: boolean
  context: string
  summary: string
  stack: string[]
  keyStack: string[]
  thumbnail?: string
  description: string
  built: string[]
  learned: string[]
  diagram: ProjectDiagram
  links: ExternalLink[]
}

/** Copy for the /projects page itself */
export const projectsPage = {
  eyebrow: 'GET /projects',
  title: 'Projects',
  intro: "Things I've built outside work, from team builds to solo experiments.",
  featuredHeading: 'Featured',
  moreHeading: 'More projects',
  cardCta: 'deploy case study',
  experience: { text: 'Looking for production work?', label: '→ view experience', to: '/experience' },
  github: { label: 'More on GitHub →', href: 'https://github.com/don-maleesha' } as ExternalLink,
}

export const projects: ProjectEntry[] = [
  {
    slug: 'cakeshop',
    title: 'CakeShop',
    year: '2025',
    featured: true,
    context: 'Team of 2 · Learning project',
    summary: 'Cake shop e-commerce app with cart, custom orders, PayHere checkout and an admin dashboard, built with a teammate.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Axios', 'PayHere'],
    keyStack: ['React', 'Tailwind CSS', 'PayHere'],
    description:
      'Customers browse cakes by category with search and filters, add them to a cart or wishlist, request custom cakes and track their orders, paying by cash on delivery or through PayHere with zone-based delivery fees. An admin side manages products, categories, orders, custom requests, reviews and customer messages, with a sales and order analytics dashboard.',
    built: ['[Your part, built with one teammate: which screens, flows or integrations]', '[Back end: did you build the API? Link its repo if public]'],
    learned: ['[What you learned]', '[What you learned]'],
    diagram: {
      columns: [
        { label: 'CLIENT', nodes: [{ id: 'browser', title: 'Browser', sub: 'customers · admins' }] },
        { label: 'FRONTEND', nodes: [{ id: 'spa', title: 'React SPA', sub: 'Vite · Router · Context' }] },
        {
          label: 'SERVICES',
          nodes: [
            { id: 'api', title: '[Back-end API]', sub: '[stack]' },
            { id: 'payhere', title: 'PayHere', sub: 'payments', kind: 'store' },
          ],
        },
        { label: 'DATA', nodes: [{ id: 'db', title: '[Database]', sub: '[type]', kind: 'store' }] },
      ],
      edges: [
        ['browser', 'spa'],
        ['spa', 'api'],
        ['spa', 'payhere'],
        ['api', 'db'],
      ],
    },
    links: [{ label: 'View code on GitHub →', href: 'https://github.com/don-maleesha/CakeShop' }],
  },
  {
    slug: 'ceylon-cuisine',
    title: 'Ceylon Cuisine',
    year: '2024–2025',
    featured: false,
    context: 'Solo · Learning project',
    summary: 'Solo-built recipe-sharing app for Sri Lankan dishes, with member submissions, admin moderation and ratings.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'AJAX', 'CSS'],
    keyStack: ['PHP', 'MySQL', 'JavaScript'],
    description:
      'Guests browse and search recipes; registered members submit their own with ingredients, steps and photos, rate recipes and keep favourites. Submissions go through an admin approval workflow, and an admin dashboard covers user management, recipe moderation and platform statistics. Accounts use hashed passwords and role-based access for admins and members.',
    built: ['Designed and built the whole application on my own: [which parts to highlight]'],
    learned: ['[What you learned]', '[What you learned]'],
    diagram: {
      columns: [
        { label: 'CLIENT', nodes: [{ id: 'browser', title: 'Browser', sub: 'guests · members · admins' }] },
        { label: 'SERVER', nodes: [{ id: 'php', title: 'PHP application', sub: 'pages · AJAX · admin' }] },
        {
          label: 'DATA',
          nodes: [
            { id: 'mysql', title: 'MySQL', sub: 'users · recipes · ratings', kind: 'store' },
            { id: 'uploads', title: 'Uploads', sub: 'recipe images', kind: 'store' },
          ],
        },
      ],
      edges: [
        ['browser', 'php'],
        ['php', 'mysql'],
        ['php', 'uploads'],
      ],
    },
    links: [{ label: 'View code on GitHub →', href: 'https://github.com/don-maleesha/ceylon-cuisine' }],
  },
  {
    slug: 'relaxu',
    title: 'RelaxU',
    year: '2024–2025',
    featured: false,
    context: 'Team of 4 · University project',
    summary: 'Stress-monitoring and workload app for university students, built by a team of four on a custom PHP MVC.',
    stack: ['PHP', 'JavaScript', 'HTML', 'CSS', 'MySQL', 'PHPMailer'],
    keyStack: ['PHP', 'JavaScript', 'MySQL'],
    description:
      'RelaxU helps university students notice stress early and keep their workload under control. It combines self-assessment surveys and typing-behaviour analysis for stress insights with mindfulness, guided meditation and breathing exercises, and recommends counselling at high stress levels. Coursework organisers, reminders and priority-based planning sit alongside discussion forums, peer support groups, articles and videos, and session booking with counsellors and academic advisors. It is built on a custom MVC architecture in plain PHP and JavaScript, with no frameworks.',
    built: ['[Your part in the team of four]'],
    learned: ['[What you learned]', '[What you learned]'],
    diagram: {
      columns: [
        { label: 'CLIENT', nodes: [{ id: 'browser', title: 'Browser', sub: 'HTML · CSS · JS' }] },
        { label: 'ENTRY', nodes: [{ id: 'router', title: 'Router', sub: 'index.php · routes' }] },
        { label: 'APP', nodes: [{ id: 'controllers', title: 'Controllers', sub: 'and services' }] },
        {
          label: 'MVC',
          nodes: [
            { id: 'models', title: 'Models', sub: 'PDO queries' },
            { id: 'views', title: 'Views', sub: 'PHP templates' },
            { id: 'mail', title: 'PHPMailer', sub: 'email', kind: 'store' },
          ],
        },
        { label: 'DATA', nodes: [{ id: 'mysql', title: 'MySQL', sub: 'stress_management', kind: 'store' }] },
      ],
      edges: [
        ['browser', 'router'],
        ['router', 'controllers'],
        ['controllers', 'models'],
        ['controllers', 'views'],
        ['controllers', 'mail'],
        ['models', 'mysql'],
      ],
    },
    links: [{ label: 'View code on GitHub →', href: 'https://github.com/ovindumandith/GroupProject-IS2102' }],
  },
]
