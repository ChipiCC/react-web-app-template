import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Spinner } from '@/components/ui/Spinner';
import { StatePanel } from '@/components/ui/StatePanel';
import { errorMessage } from '@/lib/api/errors';

import { useExampleMessage } from '../hooks/useExampleMessage';

function formatDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(date);
}

export function ExampleQueryCard() {
  const query = useExampleMessage();

  return (
    <Card className="p-6" aria-live="polite">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-accent font-mono text-[10px] tracking-[0.16em] uppercase">
            GET /example
          </p>
          <h2 className="text-ink mt-1 text-lg font-semibold tracking-tight">Live response</h2>
        </div>
        {query.isFetching && !query.isPending ? (
          <Spinner className="text-muted mt-1" label="Refreshing response" />
        ) : null}
      </div>

      <div className="mt-6">
        {query.isPending ? (
          <div className="space-y-3" aria-label="Loading API response">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-9 w-28" />
          </div>
        ) : query.isError ? (
          <StatePanel
            tone="error"
            compact
            title="The request failed"
            description={errorMessage(query.error)}
            action={
              <Button
                variant="secondary"
                size="sm"
                onClick={() => void query.refetch()}
                disabled={query.isFetching}
              >
                {query.isFetching ? 'Retrying…' : 'Try again'}
              </Button>
            }
          />
        ) : (
          <div className="space-y-5">
            <div>
              <p className="text-muted text-[10px] font-medium tracking-[0.14em] uppercase">
                Response
              </p>
              <p className="text-ink mt-1 text-xl font-semibold tracking-tight">
                {query.data.message}
              </p>
            </div>

            <dl className="border-line border-t pt-3 text-xs">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <dt className="text-muted">Generated at</dt>
                <dd className="text-ink font-mono">{formatDateTime(query.data.generatedAt)}</dd>
              </div>
            </dl>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => void query.refetch()}
              disabled={query.isFetching}
            >
              {query.isFetching ? 'Refreshing…' : 'Refetch'}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
