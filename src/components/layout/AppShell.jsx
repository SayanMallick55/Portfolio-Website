import { useLenis } from '../../hooks/useLenis'

export function AppShell({ children }) {
  useLenis()

  return (
    <div className="site-shell">
      <div className="noise-overlay" />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-space-accent focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-space-bg"
        href="#main-content"
      >
        Skip to content
      </a>
      <header className="section-shell pointer-events-auto fixed left-1/2 top-0 z-30 flex h-20 -translate-x-1/2 items-center justify-between">
        <a href="/" className="font-display text-sm font-bold uppercase tracking-[0.22em] text-space-text">
          Portfolio
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-space-muted md:flex" aria-label="Primary navigation">
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
            <a className="transition hover:text-space-text" href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <div className="h-px w-10 bg-gradient-to-r from-transparent via-space-accent to-transparent md:hidden" />
      </header>
      <main id="main-content" className="relative z-10">
        {children}
      </main>
    </div>
  )
}
