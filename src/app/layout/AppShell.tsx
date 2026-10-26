import { Link, NavLink, Outlet } from 'react-router';

import { appConfig } from '@/app/config';
import { ThemeToggle } from '@/app/theme/ThemeToggle';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

function navLinkClassName({ isActive }: { isActive: boolean }): string {
  return cn(
    'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
    isActive ? 'bg-surface-raised text-ink' : 'text-muted hover:bg-surface-raised hover:text-ink',
  );
}

export function AppShell() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="bg-accent text-canvas sr-only z-50 rounded-md px-3 py-2 text-xs font-medium focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Skip to content
      </a>

      <header className="border-line/80 bg-canvas/85 sticky top-0 z-30 border-b backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="border-accent/30 bg-accent/10 text-accent group-hover:bg-accent/15 grid size-8 place-items-center rounded-lg border text-sm font-bold transition-colors">
              W
            </span>
            <span>
              <span className="text-ink block text-sm font-semibold tracking-tight">
                {appConfig.name}
              </span>
              <span className="text-faint block text-[9px] tracking-[0.14em] uppercase">
                React starter
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="order-3 flex w-full gap-1 sm:order-none sm:ml-4 sm:w-auto"
          >
            <NavLink to="/" end className={navLinkClassName}>
              Home
            </NavLink>
            <NavLink to="/example" className={navLinkClassName}>
              API example
            </NavLink>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {appConfig.useMockApi ? <Badge variant="info">Mock API</Badge> : null}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12"
      >
        <Outlet />
      </main>

      <footer className="border-line/70 border-t">
        <div className="text-faint mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-[10px] sm:px-6">
          <span>Built with React, React Router, TanStack Query, and Tailwind CSS.</span>
          <span>Starter template · Replace the example feature with your domain.</span>
        </div>
      </footer>
    </div>
  );
}
