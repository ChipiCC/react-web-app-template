import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { exampleEndpointUrl } from '@/test/mocks/handlers';
import { server } from '@/test/mocks/server';

import { apiRequest } from './client';
import { isApiError } from './errors';

describe('apiRequest', () => {
  it('parses a JSON response', async () => {
    server.use(
      http.get(exampleEndpointUrl, () => {
        return HttpResponse.json({ message: 'ok' });
      }),
    );

    await expect(apiRequest<{ message: string }>('/example')).resolves.toEqual({ message: 'ok' });
  });

  it('normalizes an API error envelope', async () => {
    server.use(
      http.get(exampleEndpointUrl, () => {
        return HttpResponse.json(
          { error: { code: 'bad_request', message: 'The request was invalid.' } },
          { status: 400 },
        );
      }),
    );

    const error = await apiRequest('/example').catch((caught: unknown) => caught);

    expect(isApiError(error)).toBe(true);
    if (isApiError(error)) {
      expect(error.status).toBe(400);
      expect(error.code).toBe('bad_request');
      expect(error.message).toBe('The request was invalid.');
    }
  });
});
