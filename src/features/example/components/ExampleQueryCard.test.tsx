import { http, HttpResponse } from 'msw';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ExampleQueryCard } from '@/features/example/components/ExampleQueryCard';
import { renderWithProviders } from '@/test/render';
import { exampleEndpointUrl } from '@/test/mocks/handlers';
import { server } from '@/test/mocks/server';

describe('ExampleQueryCard', () => {
  it('renders the API response', async () => {
    renderWithProviders(<ExampleQueryCard />);

    expect(await screen.findByText('Hello from the mock API.')).toBeInTheDocument();
    expect(screen.getByText('Generated at')).toBeInTheDocument();
  });

  it('shows an error and a retry action when the request fails', async () => {
    server.use(
      http.get(exampleEndpointUrl, () => {
        return HttpResponse.json(
          { error: { code: 'server_error', message: 'The example endpoint failed.' } },
          { status: 500 },
        );
      }),
    );

    renderWithProviders(<ExampleQueryCard />);

    expect(await screen.findByText('The example endpoint failed.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });
});
