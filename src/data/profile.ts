/** Display name, landing headline and About page content. Keep index.html's meta descriptions in sync with the headline. */
export const profile = {
  name: 'Lochana Thilakarathne',
  /** Header wordmark below 480px, where the full name pushes the status line to a second row */
  shortName: 'Lochana T.',
  /** Landing hero line: no employer, client, industry or tech stack (those live on /about and /experience) */
  headline: 'Transforming ideas into digital experiences.',
  /** About page: no job title or employer anywhere below */
  aboutIntro: 'BSc. in Information Systems, University of Colombo School of Computing',
  bio: [
    "I'm a full-stack engineer from Sri Lanka who likes owning a problem end to end, from the database schema to the last pixel on screen. I studied Information Systems at the University of Colombo School of Computing, and my approach still follows that: understand how the people, the data and the process fit together before writing any code.",
    'I build Java and Spring Boot services and React interfaces for government agriculture platforms, including certification and registry systems. These are systems with real users, strict workflows and data that has to be right, which has taught me to value clear data models, predictable APIs and interfaces people can use without a manual.',
    "Away from the keyboard I'm drawn to the night sky and to cricket. I'm a member of the Old Ranabima Astronomical Society and serve on the committee of the Ranabima Royal College Cricket Foundation. Both reward patience and teamwork, which is most of what good engineering needs too.",
  ],
  skills: [
    { name: 'Languages', items: ['Java', 'JavaScript', 'TypeScript', 'PHP', 'C'] },
    { name: 'Frontend', items: ['React', 'MUI', 'Next.js', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS'] },
    { name: 'Backend', items: ['Spring Boot', 'Node.js', 'Express'] },
    { name: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
    { name: 'Tools', items: ['Git', 'Postman', 'Figma', 'Jira', 'Linux'] },
  ],
}
