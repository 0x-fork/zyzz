/** Defines the playground's editable projects and versioned share links. @module */
import LZString from 'lz-string'

/** Source files supplied to the compiler, keyed by project-relative paths. */
export type Files = Record<string, string>

/** Preview runtimes supported by the browser bundler. */
export type Framework = 'react' | 'vanilla'

/** Source entrypoint mounted by each preview runtime. */
export const entryFiles = { react: 'App.tsx', vanilla: 'App.js' } as const

/** Editable source and presentation state persisted in share links. */
export type State = {
  /** Source insertion order remains independent of tab order and CSS emission. */
  files: Files
  /** Runtime used to mount the entrypoint's default export. */
  framework: Framework
  /** File tabs in their displayed order. */
  order: readonly string[]
}

const config = `import { defineConfig } from 'zyzz'

// Color pairs follow the document's color scheme.
export const { style, variants, vars } = defineConfig({
  vars: {
    color: {
      accent: { dark: '#52a8ff', light: '#0072f5' },
      accentHover: { dark: '#8ec8ff', light: '#0062d1' },
      border: { dark: '#333333', light: '#e5e5e5' },
      canvas: { dark: '#0a0a0a', light: '#ffffff' },
      ink: { dark: '#ededed', light: '#171717' },
      muted: { dark: '#a1a1a1', light: '#666666' },
      onAccent: { dark: '#171717', light: '#ffffff' },
      paper: { dark: '#111111', light: '#fafafa' },
      subtle: { dark: '#1f1f1f', light: '#f0f0f0' },
    },
    spacing: { gap: '16px' },
  },
})
`

/** Starter projects in the order shown by the example picker. */
export const examples: Record<
  string,
  { description: string; files: Files; framework: Framework }
> = {
  Styles: {
    description: 'React · Themed sign-in form',
    framework: 'react',
    files: {
      'App.tsx': `import { useState } from 'react'
import Logo from './Logo.js'
import { style } from './zyzz.config.js'

const links = [
  { href: 'https://zyzz.style/docs/introduction/getting-started', label: 'Docs' },
  { href: 'https://github.com/wevm/zyzz', label: 'GitHub' },
  { href: 'https://www.npmjs.com/package/zyzz', label: 'npm' },
]

export default function App() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <div {...styles.page()}>
      <header {...styles.header()}>
        <Logo />
      </header>
      <main {...styles.main()}>
        {sent ? (
          <div {...styles.intro()}>
            <h1 {...styles.title()}>Check your email</h1>
            <p {...styles.subtitle()}>We sent a sign-in link to {email}.</p>
            <button {...styles.help()} onClick={() => setSent(false)} type="button">
              Use a different email
            </button>
          </div>
        ) : (
          <form
            {...styles.form()}
            onSubmit={(event) => {
              event.preventDefault()
              setSent(true)
            }}
          >
            <div {...styles.intro()}>
              <h1 {...styles.title()}>Welcome to Zyzz</h1>
              <p {...styles.subtitle()}>Log in or sign up to get started.</p>
            </div>
            <label {...styles.field()}>
              <span {...styles.label()}>Email</span>
              <input
                {...styles.input()}
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                value={email}
              />
            </label>
            <button {...styles.button()} disabled={!email.includes('@')} type="submit">
              Continue
            </button>
          </form>
        )}
      </main>
      <footer {...styles.footer()}>
        <a {...styles.help()} href="https://zyzz.style/docs" rel="noreferrer" target="_blank">
          Help
        </a>
        <nav aria-label="Resources" {...styles.links()}>
          {links.map((link) => (
            <a key={link.label} {...styles.link()} href={link.href} rel="noreferrer" target="_blank">
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  )
}

namespace styles {
  export const page = style({
    backgroundColor: 'paper',
    color: 'ink',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    minHeight: '100vh !custom',
  })

  export const header = style({
    padding: '24px !custom',
    '& svg': { display: 'block', height: '20px !custom', width: '73px !custom' },
  })

  export const main = style({
    display: 'grid',
    padding: '24px !custom',
    placeItems: 'center',
  })

  export const form = style({
    display: 'grid',
    gap: '24px !custom',
    maxWidth: '400px !custom',
    width: '100% !custom',
  })

  export const intro = style({
    display: 'grid',
    gap: '8px !custom',
    justifyItems: 'center',
    textAlign: 'center',
  })

  export const title = style({
    fontSize: '24px',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    margin: '0 !custom',
  })

  export const subtitle = style({ color: 'muted', fontSize: '16px' })

  // The label sits inside the field, and the whole field takes the focus ring.
  export const field = style({
    backgroundColor: 'canvas',
    border: '1.5px solid',
    borderColor: 'border',
    borderRadius: '10px',
    cursor: 'text',
    display: 'grid',
    gap: '2px !custom',
    padding: '8px 14px !custom',
    transition: 'border-color 150ms',
    ':hover': { borderColor: 'muted' },
    ':focus-within': { borderColor: 'ink' },
  })

  export const label = style({ color: 'muted', fontSize: '12px' })

  export const input = style({
    backgroundColor: 'transparent !custom',
    border: 'none',
    color: 'ink',
    font: 'inherit',
    fontSize: '16px',
    outline: 'none',
    padding: '0 !custom',
  })

  export const button = style({
    backgroundColor: 'ink',
    backgroundImage: 'linear-gradient(rgb(255 255 255 / 0.12), transparent)',
    border: 'none',
    borderRadius: '999px',
    color: 'canvas',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    height: '52px !custom',
    ':disabled': { color: 'muted', cursor: 'not-allowed' },
    ':focus-visible': { outline: '2px solid', outlineColor: 'accent', outlineOffset: '3px' },
  })

  export const footer = style({
    alignItems: 'center',
    display: 'grid',
    gap: '16px !custom',
    justifyItems: 'center',
    padding: '24px 24px 48px !custom',
  })

  export const help = style({
    backgroundColor: 'subtle',
    border: 'none',
    borderRadius: '999px',
    color: 'ink',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 500,
    padding: '8px 16px !custom',
    textDecoration: 'none',
    ':hover': { backgroundColor: 'border' },
    ':focus-visible': { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
  })

  export const links = style({ display: 'flex', gap: '12px !custom' })

  export const link = style({
    color: 'muted',
    fontSize: '12px',
    textDecoration: 'none',
    ':hover': { color: 'ink' },
  })
}
`,
      'Logo.tsx': `// The Zyzz wordmark uses the surrounding text color.
export default function Logo() {
  return (
    <svg aria-label="Zyzz" role="img" viewBox="12 24 233 64" fill="currentColor">
      <path d="M12.7256 88L14.5713 79.0352L54.6494 36.1885V35.9248H24.5908L26.9639 24.5869H73.7217L71.876 33.5078L31.8418 76.3984V76.6621H63.4824L61.1533 88H12.7256ZM101.144 88H87.7842L92.7939 64.4893L79.1709 24.5869H93.0137L101.759 51.7451H102.022L121.974 24.5869H136.607L106.065 65.0166L101.144 88ZM127.687 88L129.532 79.0352L169.61 36.1885V35.9248H139.552L141.925 24.5869H188.683L186.837 33.5078L146.803 76.3984V76.6621H178.443L176.114 88H127.687ZM183.585 88L185.431 79.0352L225.509 36.1885V35.9248H195.45L197.823 24.5869H244.581L242.735 33.5078L202.701 76.3984V76.6621H234.342L232.013 88H183.585Z" />
    </svg>
  )
}
`,
      'zyzz.config.ts': config,
    },
  },
  Variants: {
    description: 'React · Interactive button variants',
    framework: 'react',
    files: {
      'App.tsx': `import { useState } from 'react'
import { style, variants } from './zyzz.config.js'

export default function App() {
  const [active, setActive] = useState(false)
  return (
    <main {...styles.page()}>
      <h1>One definition. Two variants.</h1>
      <button
        {...styles.button({ tone: active ? 'accent' : 'neutral' })}
        onClick={() => setActive(!active)}
      >
        {active ? 'Accent selected' : 'Click to switch'}
      </button>
    </main>
  )
}

namespace styles {
  export const page = style({ padding: '40px !custom' })

  // The runtime selects precompiled styles, without generating CSS.
  export const button = variants({
    base: {
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
      padding: '14px 24px !custom',
    },
    variants: {
      tone: {
        accent: { backgroundColor: 'accent', color: 'onAccent' },
        neutral: { backgroundColor: 'border', color: 'ink' },
      },
    },
  })
}
`,
      'zyzz.config.ts': config,
    },
  },
  'Vanilla JS': {
    description: 'DOM · No framework required',
    framework: 'vanilla',
    files: {
      'App.js': `import { style } from './zyzz.config.js'

export default function App() {
  const main = document.createElement('main')
  Object.assign(main, pageStyle())
  const heading = document.createElement('h1')
  heading.textContent = 'Just JavaScript and CSS.'
  const button = document.createElement('button')
  Object.assign(button, buttonStyle())
  let count = 0
  button.textContent = 'Count: 0'
  button.onclick = () => { button.textContent = 'Count: ' + ++count }
  main.append(heading, button)
  return main
}

const pageStyle = style({ padding: '40px !custom' })

// Static className props apply directly to DOM elements.
const buttonStyle = style({
  backgroundColor: 'accent',
  border: 'none',
  borderRadius: '10px',
  color: 'onAccent',
  cursor: 'pointer',
  padding: '14px 24px !custom',
})
`,
      'zyzz.config.js': config,
    },
  },
}

/** Opens a starter project with its original source and tab order. */
export function create(name: string): State {
  const { files, framework } = examples[name]!
  return { files, framework, order: Object.keys(files) }
}

/** Adds an empty source file, rejecting duplicate, reserved, or unsupported names. */
export function addFile(project: State, name: string): State {
  if (!validName(name))
    throw new Error(
      'Use a top-level .ts, .tsx, .js, or .jsx filename. index.* is reserved.',
    )
  if (Object.hasOwn(project.files, name))
    throw new Error('That file already exists.')
  if (project.order.length >= 20)
    throw new Error('Projects support at most 20 files.')

  return {
    ...project,
    files: { ...project.files, [name]: `// ${name}\n` },
    order: [...project.order, name],
  }
}

/** Encodes source without sending it to a persistence service. */
export function encode(project: State): string {
  return LZString.compressToEncodedURIComponent(
    JSON.stringify({ ...project, version: 2 }),
  )
}

/** Reads a share link, rejecting unknown formats and oversized or unsupported projects. */
export function decode(value: string): State {
  if (value.length > 100_000)
    throw new Error('This shared project is too large.')
  const text = LZString.decompressFromEncodedURIComponent(value)
  if (!text || text.length > 200_000)
    throw new Error('Invalid or oversized shared project.')
  const data: unknown = JSON.parse(text)
  if (
    !data ||
    typeof data !== 'object' ||
    !('version' in data) ||
    (data.version !== 1 && data.version !== 2) ||
    !('files' in data)
  )
    throw new Error('Unsupported shared project version.')
  const files = data.files
  if (!files || typeof files !== 'object' || Array.isArray(files))
    throw new Error('Invalid project files.')
  const framework = 'framework' in data ? data.framework : 'react'
  if (framework !== 'react' && framework !== 'vanilla')
    throw new Error('Unsupported preview framework.')
  const entries = Object.entries(files)
  if (
    entries.length === 0 ||
    entries.length > 20 ||
    !Object.hasOwn(files, entryFiles[framework])
  )
    throw new Error(
      `Projects must include ${entryFiles[framework]} and at most 20 files.`,
    )
  for (const [path, source] of entries)
    if (!validName(path) || typeof source !== 'string')
      throw new Error(
        'Projects support top-level JavaScript and TypeScript files only.',
      )
  const order = 'order' in data ? data.order : Object.keys(files)
  if (
    !Array.isArray(order) ||
    order.length !== entries.length ||
    new Set(order).size !== entries.length ||
    !order.every(
      (name) => typeof name === 'string' && Object.hasOwn(files, name),
    )
  )
    throw new Error('Invalid file tab order.')

  return { files: Object.fromEntries(entries), framework, order }
}

function validName(name: string) {
  return (
    /^[\w-]+(?:\.[\w-]+)*\.(?:tsx?|jsx?)$/.test(name) &&
    !/^index\.(?:tsx?|jsx?)$/.test(name)
  )
}
