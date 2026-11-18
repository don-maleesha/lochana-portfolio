/**
 * Projects shown on /projects and their case-study pages (/projects/:slug).
 * Keep [square brackets] for anything not yet confirmed (search for "TODO"); never invent results or numbers.
 *
 * Projects list (cards)
 *   slug         URL segment; also referenced from experience.ts.
 *   title        Project name (card title and case-study <h1>).
 *   year         Year or range.
 *   featured     true for the one project shown large at the top of /projects.
 *   context      Meta line, e.g. 'Team of 2 · Learning project'.
 *   summary      One sentence on what was built and by whom, max ~120 characters.
 *   keyStack     3–4 key technologies for the card (only the first 4 are shown).
 *   thumbnail    Optional 16:9 screenshot in public/ (1200×675 WebP); cards show initials without it.
 *   thumbnailAlt What the thumbnail shows (falls back to 'Screenshot of <title>').
 *
 * Case study (every section is optional and is skipped, with sections renumbered, when empty)
 *   role, team, duration  "Quick facts" rows.
 *   links        { github, demo }: outlined buttons under the summary; a missing link is hidden.
 *   stackGroups  Quick-facts rows, e.g. { label: 'Frontend', items: ['React', 'Vite'] }.
 *   overview     01 Overview: the problem and what the app does, 2–3 sentences.
 *   myRole       02 My role: what you personally built, one bullet per string.
 *   features     03 Key features: 3–5 { title, text }.
 *   screens      Screenshots. screens[0] is the hero image; the rest form 04 Screens (with lightbox).
 *   diagram      Architecture section (after Screens): columns of nodes left to right, plus edges between node ids.
 *   decisions    Technical decisions: { title, text } with the why.
 *   challenges   06 Challenges: { problem, fix }.
 *   learnings    07 What I learned: one bullet per string.
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

export type StackGroup = { label: string; items: string[] }
export type Screen = { src: string; alt: string; caption?: string }
export type TitledText = { title: string; text: string }
export type Challenge = { problem: string; fix: string }

export type ProjectEntry = {
  // Projects list
  slug: string
  title: string
  year: string
  featured: boolean
  context: string
  summary: string
  keyStack: string[]
  thumbnail?: string
  thumbnailAlt?: string
  // Case study
  role?: string
  team?: string
  duration?: string
  links?: { github?: `https://${string}`; demo?: `https://${string}` }
  stackGroups?: StackGroup[]
  overview?: string
  myRole?: string[]
  features?: TitledText[]
  screens?: Screen[]
  decisions?: TitledText[]
  diagram?: ProjectDiagram
  challenges?: Challenge[]
  learnings?: string[]
}

/** Copy for the /projects page and the case-study pages */
export const projectsPage = {
  eyebrow: 'GET /projects',
  title: 'Projects',
  intro: "Things I've built outside work, from team builds to solo experiments.",
  featuredHeading: 'Featured',
  moreHeading: 'More projects',
  cardCta: 'deploy case study',
  /** Shown on the clicked card for ~250ms before navigating */
  cardCtaBusy: 'deploying…',
  /** Case-study top bar status: '● live · <year>' */
  caseStatus: 'live',
  caseLinks: { github: 'GitHub', demo: 'Live demo' },
  quickFacts: { heading: 'Quick facts', role: 'Role', team: 'Team', duration: 'Duration' },
  sections: {
    overview: 'Overview',
    myRole: 'My role',
    features: 'Key features',
    screens: 'Screens',
    architecture: 'Architecture',
    decisions: 'Technical decisions',
    challenges: 'Challenges',
    learnings: 'What I learned',
  },
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
    keyStack: ['React', 'Tailwind CSS', 'PayHere'],
    thumbnail: '/projects/cakeshop.webp',
    thumbnailAlt: 'CakeShop home page with the headline Delicious Cakes Made Fresh Daily, Shop Now and Custom Orders buttons, and a photo of a fruit-topped cake',
    role: 'Full-stack developer',
    team: '2 people',
    duration: 'Jun–Dec 2025', // from the repo's commit history
    links: { github: 'https://github.com/don-maleesha/CakeShop' },
    stackGroups: [
      { label: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Axios'] },
      { label: 'Backend', items: ['Node.js', 'Express'] },
      { label: 'Data', items: ['MongoDB', 'Mongoose'] },
      { label: 'Auth', items: ['JWT', 'bcrypt'] },
      { label: 'Payments', items: ['PayHere'] },
      { label: 'Email', items: ['Nodemailer'] },
    ],
    overview:
      'An online store for a cake boutique that sells ready-made cakes and takes made-to-order custom cakes, with delivery across several districts. Customers browse by category with search and filters, add cakes to a cart or wishlist, request custom cakes and track their orders, paying by cash on delivery or through PayHere. An admin side manages products, orders, custom requests and reviews, with an analytics dashboard.',
    myRole: [
      'Set up the React and Vite client, and built registration, login and role-based access for customers and admins',
      'Built the home and cakes pages, the cart and checkout, and the PayHere payment integration',
      'Built the admin side: product and order management and an analytics dashboard',
      'Added My Orders with a unified order ID, reviews and ratings, and a wishlist, with their Express endpoints',
    ],
    features: [
      {
        title: 'Cart and checkout',
        text: 'Customers choose a size and quantity, and the cart is saved per user, so it survives reloads and switching accounts. Checkout adds a delivery fee by district (Colombo, Gampaha, Kalutara, Kandy and other areas) and takes cash on delivery or PayHere.',
      },
      {
        title: 'Custom cake orders',
        text: 'Customers request a made-to-order cake through a form. Admins review each request and move it through pending, confirmed, in progress and completed, with its own payment status.',
      },
      {
        title: 'Admin analytics',
        text: 'Bar, line and pie charts cover order status, orders by day of week, event type and location, delivery zones, guest versus registered customers, custom orders and low-stock alerts.',
      },
      {
        title: 'Reviews and wishlist',
        text: 'Customers rate and review cakes and can edit or delete their own reviews, which admins moderate. Signed-in customers can save cakes to a wishlist.',
      },
    ],
    // screens[0] is the hero; add more screenshots (1200×675 WebP in public/projects/) to fill "Screens".
    screens: [
      {
        src: '/projects/cakeshop.webp',
        alt: 'CakeShop home page with the headline Delicious Cakes Made Fresh Daily, Shop Now and Custom Orders buttons, and a photo of a fruit-topped cake',
      },
    ],
    decisions: [
      {
        title: 'Separate React client and Express API',
        text: 'The React app and the Express API are separate projects that talk over HTTP. One API serves both the customer pages and the admin dashboard, and payment logic and secrets stay on the server.',
      },
      {
        title: 'PayHere checkout signed by the API',
        text: "PayHere needs a hash built from the merchant secret. The API generates it, so the secret never reaches the browser, which only opens PayHere's checkout with the signed values.",
      },
      {
        title: 'A business-logic layer in the API',
        text: 'Order rules, such as who can place an order and which status changes are allowed, live in their own layer of rules, validators and workflows behind one facade. Route handlers stay thin and each rule is written once.',
      },
    ],
    diagram: {
      columns: [
        { label: 'CLIENT', nodes: [{ id: 'browser', title: 'Browser', sub: 'customers · admins' }] },
        { label: 'FRONTEND', nodes: [{ id: 'spa', title: 'React SPA', sub: 'Vite · React Router' }] },
        {
          label: 'SERVICES',
          nodes: [
            { id: 'api', title: 'Express API', sub: 'Node · JWT auth' },
            { id: 'payhere', title: 'PayHere', sub: 'checkout · API-signed', kind: 'store' },
          ],
        },
        {
          label: 'DATA',
          nodes: [
            { id: 'db', title: 'MongoDB', sub: 'Mongoose models', kind: 'store' },
            { id: 'mail', title: 'Nodemailer', sub: 'order emails', kind: 'store' },
          ],
        },
      ],
      edges: [
        ['browser', 'spa'],
        ['spa', 'api'],
        ['spa', 'payhere'],
        ['api', 'db'],
        ['api', 'mail'],
      ],
    },
    challenges: [
      {
        problem: "Carts are saved per user in the browser, and switching accounts at login or logout could load one user's cart into another's or wipe it before it was saved.",
        fix: 'Saving now waits until the cart has finished loading, keeps a reference to the latest items for the switch, and skips the save that would otherwise fire straight after a load.',
      },
      {
        problem: 'Ready-made and custom orders used different order ID formats, which made it hard to show both kinds together in My Orders.',
        fix: 'One format for both, ORD-PRM-20251024-0012 for ready-made and ORD-CUS-… for custom orders, with a daily sequence, generated in the API and parsed the same way in the client.',
      },
    ],
    learnings: [
      "Managing client-side state across login and logout without mixing users' data",
      'Keeping payment secrets on the server and signing requests there',
      'Settling shared formats, like order IDs, across the API and the client before they spread',
      'Working in a two-person team through feature branches and pull requests',
    ],
  },
  {
    slug: 'ceylon-cuisine',
    title: 'Ceylon Cuisine',
    year: '2024–2025',
    featured: false,
    context: 'Solo · Learning project',
    summary: 'Solo-built recipe-sharing app for Sri Lankan dishes, with member submissions, admin moderation and ratings.',
    keyStack: ['PHP', 'MySQL', 'JavaScript'],
    thumbnail: '/projects/ceylon-cuisine.webp',
    thumbnailAlt: 'Ceylon Cuisine home page welcoming visitors, with Explore and Submit buttons and a photo of a Sri Lankan rice and curry meal',
    role: 'Solo developer',
    team: 'Solo',
    duration: 'May 2024 – Jul 2025', // repo created / last updated
    links: { github: 'https://github.com/don-maleesha/ceylon-cuisine' },
    stackGroups: [
      { label: 'Frontend', items: ['JavaScript', 'AJAX', 'CSS'] },
      { label: 'Backend', items: ['PHP'] },
      { label: 'Data', items: ['MySQL'] },
    ],
    overview:
      'Guests browse and search recipes; registered members submit their own with ingredients, steps and photos, rate recipes and keep favourites. Submissions go through an admin approval workflow, and an admin dashboard covers user management, recipe moderation and platform statistics. Accounts use hashed passwords and role-based access for admins and members.',
    myRole: [
      'Designed and built the whole application on my own: PHP pages and AJAX endpoints, the MySQL schema and the front end',
      'Built sign-up and sign-in with hashed passwords, and role-based access for members and admins',
      'Built recipe submission with image uploads and an admin approval workflow',
      'Added ratings, favourites, category filters, search and sorting, and an admin dashboard with platform statistics',
    ],
    screens: [
      {
        src: '/projects/ceylon-cuisine.webp',
        alt: 'Ceylon Cuisine home page welcoming visitors, with Explore and Submit buttons and a photo of a Sri Lankan rice and curry meal',
      },
    ],
    diagram: {
      columns: [
        { label: 'CLIENT', nodes: [{ id: 'browser', title: 'Browser', sub: 'guests · users · admins' }] },
        { label: 'SERVER', nodes: [{ id: 'php', title: 'PHP application', sub: 'pages · AJAX · admin' }] },
        {
          label: 'DATA',
          nodes: [
            { id: 'mysql', title: 'MySQL', sub: 'recipes · ratings', kind: 'store' },
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
    learnings: ['[What you learned]', '[What you learned]'],
  },
  {
    slug: 'relaxu',
    title: 'RelaxU',
    year: '2024–2025',
    featured: false,
    context: 'Team of 4 · University project',
    summary: 'Stress-monitoring and workload app for university students, built by a team of four on a custom PHP MVC.',
    keyStack: ['PHP', 'JavaScript', 'MySQL'],
    thumbnail: '/projects/relaxu.webp',
    thumbnailAlt: 'RelaxU home page with the headline Healthy Minds, Happy Lives, Student Mental Health Consultancy, a Get started button and a photo of a student studying',
    role: 'Developer, relaxation activities module',
    team: '4 people',
    duration: 'Sep 2024 – May 2025', // team repo created / last updated
    links: { github: 'https://github.com/ovindumandith/GroupProject-IS2102' },
    stackGroups: [
      { label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'] },
      { label: 'Backend', items: ['PHP (custom MVC)'] },
      { label: 'Data', items: ['MySQL (PDO)'] },
      { label: 'Email', items: ['PHPMailer'] },
    ],
    overview:
      'RelaxU helps university students notice stress early and keep their workload under control. It combines self-assessment surveys and typing-behaviour analysis for stress insights with mindfulness, guided meditation and breathing exercises, and recommends counselling at high stress levels. Coursework organisers, reminders and priority-based planning sit alongside discussion forums, peer support groups, and session booking with counsellors and academic advisors.',
    myRole: [
      'Built the relaxation activities module, my part of the team of four',
      'Built the student-facing activity cards, with descriptions and links to guided videos and playlists',
      'Built the admin portal to add, edit and delete activities, across the controller, model and views',
      'Grouped activities by stress level (low, moderate, high) for the stress-level suggester',
    ],
    screens: [
      {
        src: '/projects/relaxu.webp',
        alt: 'RelaxU home page with the headline Healthy Minds, Happy Lives, Student Mental Health Consultancy, a Get started button and a photo of a student studying',
      },
    ],
    diagram: {
      columns: [
        { label: 'CLIENT', nodes: [{ id: 'browser', title: 'Browser', sub: 'HTML · CSS · JS' }] },
        { label: 'APP', nodes: [{ id: 'app', title: 'Controllers', sub: 'router · services' }] },
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
        ['browser', 'app'],
        ['app', 'models'],
        ['app', 'views'],
        ['app', 'mail'],
        ['models', 'mysql'],
      ],
    },
    learnings: ['[What you learned]', '[What you learned]'],
  },
]
