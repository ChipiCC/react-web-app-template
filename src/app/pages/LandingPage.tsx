import { appConfig } from '@/app/config';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { buttonClassName } from '@/components/ui/buttonStyles';
import { Card } from '@/components/ui/Card';

const FEATURES = [
  {
    tag: 'lib/api',
    title: 'Typed API client',
    description:
      'One fetch gateway with JSON handling, timeouts, cancellation, and normalized errors.',
  },
  {
    tag: 'features',
    title: 'Feature slices',
    description: 'Each domain owns its endpoints, query hooks, components, and tests.',
  },
  {
    tag: 'theme',
    title: 'Themeable by default',
    description: 'Semantic design tokens with light, dark, and system preference support.',
  },
  {
    tag: 'quality',
    title: 'Quality gates',
    description: 'ESLint, Prettier, strict TypeScript, Vitest, and a CI workflow already wired.',
  },
] as const;

const STACK = [
  'React 19',
  'React Router',
  'TanStack Query',
  'Tailwind CSS 4',
  'TypeScript',
  'Vite',
  'Bun',
  'Vitest',
  'MSW',
] as const;

export function LandingPage() {
  return (
    <div className="space-y-16 pb-6">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent" dot>
              Frontend starter
            </Badge>
            <Badge variant="outline">{appConfig.name}</Badge>
          </div>

          <h1 className="text-ink mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Ship the product, not the boilerplate.
          </h1>
          <p className="text-muted mt-4 max-w-xl text-base leading-7">
            A small React SPA template with typed data fetching, routing, a themeable design system,
            and quality gates already in place. Start with the landing page, then replace the
            example feature with your first domain.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink to="/example" variant="primary">
              Explore the API example
            </ButtonLink>
            <a href="#included" className={buttonClassName({ variant: 'ghost' })}>
              See what&apos;s included
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2" aria-label="Stack">
            {STACK.map((item) => (
              <Badge key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="border-line flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="bg-negative/70 size-2 rounded-full" />
              <span className="bg-warning/70 size-2 rounded-full" />
              <span className="bg-positive/70 size-2 rounded-full" />
            </div>
            <span className="text-faint text-[10px] font-medium tracking-[0.14em] uppercase">
              Quick start
            </span>
          </div>
          <pre className="text-ink overflow-x-auto p-5 font-mono text-xs leading-7">
            <code>{`bun install
cp .env.example .env.local
bun run dev`}</code>
          </pre>
          <div className="border-line border-t px-5 py-4">
            <p className="text-muted text-xs leading-5">
              Development defaults to a mock API, so the example route works without a backend.
            </p>
          </div>
        </Card>
      </section>

      <section id="included" aria-labelledby="included-heading" className="scroll-mt-24 space-y-5">
        <div className="max-w-2xl">
          <p className="text-accent text-[10px] font-medium tracking-[0.16em] uppercase">
            Included
          </p>
          <h2 id="included-heading" className="text-ink mt-1 text-2xl font-semibold tracking-tight">
            A working baseline, not a demo graveyard.
          </h2>
          <p className="text-muted mt-2 text-sm leading-6">
            Every file has a job. Delete the example feature and the remaining structure is still a
            complete starting point.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="p-5">
              <Badge variant="outline">{feature.tag}</Badge>
              <h3 className="text-ink mt-4 text-sm font-semibold">{feature.title}</h3>
              <p className="text-muted mt-1.5 text-xs leading-5">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="stack"
        aria-labelledby="stack-heading"
        className="border-line bg-surface/70 rounded-2xl border p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-md">
            <p className="text-accent text-[10px] font-medium tracking-[0.16em] uppercase">Stack</p>
            <h2 id="stack-heading" className="text-ink mt-1 text-xl font-semibold tracking-tight">
              Deliberately small and replaceable.
            </h2>
            <p className="text-muted mt-2 text-sm leading-6">
              Server state lives in TanStack Query. Routing comes from React Router. Styling uses
              Tailwind tokens. No global state library is required until your app actually needs
              one.
            </p>
          </div>
          <div className="flex max-w-md flex-wrap gap-2">
            {STACK.map((item) => (
              <span
                key={item}
                className="border-line bg-surface-raised text-muted rounded-lg border px-2.5 py-1 text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
