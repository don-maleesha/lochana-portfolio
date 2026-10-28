export type Service = {
  id: string
  label: string
  path: string
  method: 'GET' | 'POST'
  store: { label: string; sub: string }
}

/** Add a node to the landing map by adding one object here. */
export const services: Service[] = [
  { id: 'about', label: 'About', path: '/about', method: 'GET', store: { label: 'profile.json', sub: 'bio · skills' } },
  { id: 'projects', label: 'Projects', path: '/projects', method: 'GET', store: { label: 'GitHub API', sub: 'repos · activity' } },
  { id: 'experience', label: 'Experience', path: '/experience', method: 'GET', store: { label: 'work-history', sub: 'roles · timeline' } },
  { id: 'contact', label: 'Contact', path: '/contact', method: 'POST', store: { label: 'inbox', sub: 'mail queue' } },
]
