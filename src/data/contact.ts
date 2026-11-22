/**
 * Contact page (/contact) copy, endpoints and response messages.
 * The Web3Forms access key comes from VITE_WEB3FORMS_KEY (see .env.example); never put it here.
 */

export type Endpoint = {
  /** Shown as the card title, e.g. 'GET /github' */
  route: string
  /** Real handle or address shown under the route */
  subtitle: string
  href: `https://${string}` | `mailto:${string}`
  /** Value for the copy button (email only) */
  copy?: string
}

const email = 'lochanamt@gmail.com'

export const contactPage = {
  eyebrow: 'POST /contact',
  title: 'Send a request',
  intro: 'The contact form is an API console. Fill the body, send, read the response.',
  endpoint: 'https://api.web3forms.com/submit',
  subject: (name: string) => `Portfolio contact from ${name}`,
  placeholders: { name: 'Kasun Perera', email: 'you@example.com', message: 'What would you like to build or discuss?' },
  messageMin: 10,
  previewMax: 60,
  buttons: { idle: 'Send request', sending: 'Sending…' },
  note: 'Messages go straight to my inbox. Your details are only used to reply.',
  errors: {
    name: 'Enter your name.',
    email: 'Enter an email address like name@example.com.',
    message: 'Enter a message of at least 10 characters.',
  },
  responses: {
    idle: { code: '', text: 'Waiting for a request…' },
    sending: { code: '', text: 'Sending request…' },
    success: { code: '201 Created', text: "Message delivered. I'll reply within 2 days." },
    invalid: { code: '422 Unprocessable', text: 'Check the highlighted fields.' },
    error: { code: '500 Error', text: `Something went wrong. Email me directly at ${email}.` },
  },
  endpointsHeading: 'Other endpoints',
  // Direct contact first, then profiles: GitHub (proof of work) before LinkedIn
  endpoints: [
    { route: 'GET /email', subtitle: email, href: `mailto:${email}`, copy: email },
    { route: 'GET /github', subtitle: 'don-maleesha', href: 'https://github.com/don-maleesha' },
    {
      route: 'GET /linkedin',
      subtitle: 'lochana-thilakarathne',
      href: 'https://www.linkedin.com/in/lochana-thilakarathne-097277269/',
    },
  ] satisfies Endpoint[],
}
