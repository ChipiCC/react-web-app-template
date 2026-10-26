import { appConfig } from '@/app/config';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ExampleQueryCard } from '@/features/example/components/ExampleQueryCard';

const STEPS = [
  {
    label: 'Endpoint',
    value: 'features/example/api.ts',
    description: 'Calls apiRequest and declares the query options.',
  },
  {
    label: 'Hook',
    value: 'features/example/hooks/useExampleMessage.ts',
    description: 'Owns the TanStack Query subscription.',
  },
  {
    label: 'View',
    value: 'features/example/components/ExampleQueryCard.tsx',
    description: 'Renders loading, error, and success states.',
  },
] as const;

export function ApiExamplePage() {
  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">Example feature</Badge>
          {appConfig.useMockApi ? <Badge variant="info">Mock API</Badge> : null}
        </div>
        <h1 className="text-ink text-3xl font-semibold tracking-tight sm:text-4xl">
          Typed data fetching, end to end.
        </h1>
        <p className="text-muted text-sm leading-6">
          This route demonstrates the default pattern: a feature-owned endpoint function, a TanStack
          Query hook, and a presentational component that makes loading and error states visible.
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <ExampleQueryCard />

        <Card className="p-6">
          <h2 className="text-ink text-base font-semibold tracking-tight">How it fits together</h2>
          <ol className="mt-5 space-y-4">
            {STEPS.map((step, index) => (
              <li key={step.label} className="flex gap-3">
                <span className="border-line bg-surface-raised text-muted grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[10px]">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-ink text-xs font-medium">{step.label}</p>
                  <p className="text-accent mt-0.5 font-mono text-[11px] break-all">{step.value}</p>
                  <p className="text-muted mt-1 text-xs leading-5">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="border-line mt-6 space-y-2 border-t pt-4">
            <p className="text-muted text-[10px] font-medium tracking-[0.14em] uppercase">
              API base URL
            </p>
            <code className="bg-surface-raised text-ink inline-flex rounded-md px-2 py-1 font-mono text-[11px]">
              {appConfig.apiBaseUrl}
            </code>
            <p className="text-faint text-[11px] leading-5">
              Change it in <code>.env.local</code>. All <code>VITE_*</code> values are public in the
              browser bundle.
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-ink text-base font-semibold tracking-tight">Add your first endpoint</h2>
        <p className="text-muted mt-1.5 max-w-2xl text-sm leading-6">
          Create a feature folder, add a typed function that calls <code>apiRequest</code>, and
          expose it through a query hook. Keep query keys in <code>src/lib/api/queryKeys.ts</code>{' '}
          so invalidation stays predictable.
        </p>
        <pre className="bg-canvas border-line text-ink mt-5 overflow-x-auto rounded-xl border p-4 font-mono text-xs leading-6">
          <code>{`export function getExampleMessage(signal?: AbortSignal) {
  return apiRequest<ExampleMessage>('/example', { signal });
}`}</code>
        </pre>
      </Card>
    </div>
  );
}
