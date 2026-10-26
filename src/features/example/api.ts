import { queryOptions } from '@tanstack/react-query';

import { apiRequest } from '@/lib/api/client';
import { queryKeys } from '@/lib/api/queryKeys';

import type { ExampleMessage } from './types';

export function getExampleMessage(signal?: AbortSignal): Promise<ExampleMessage> {
  return apiRequest<ExampleMessage>('/example', { signal });
}

export const exampleMessageQuery = queryOptions({
  queryKey: queryKeys.example.message,
  queryFn: ({ signal }) => getExampleMessage(signal),
});
