import { http, HttpResponse } from 'msw';

import { appConfig } from '@/app/config';
import type { ExampleMessage } from '@/features/example/types';

export const EXAMPLE_MESSAGE: ExampleMessage = {
  message: 'Hello from the mock API.',
  generatedAt: '2026-01-01T00:00:00.000Z',
};

export const exampleEndpointUrl = new URL(
  `${appConfig.apiBaseUrl}/example`,
  window.location.origin,
).toString();

export const handlers = [
  http.get(exampleEndpointUrl, () => {
    return HttpResponse.json(EXAMPLE_MESSAGE);
  }),
];
