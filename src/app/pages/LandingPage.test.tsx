import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LandingPage } from '@/app/pages/LandingPage';
import { renderWithProviders } from '@/test/render';

describe('LandingPage', () => {
  it('renders the primary call to action', () => {
    renderWithProviders(<LandingPage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Ship the product, not the boilerplate.',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore the API example' })).toHaveAttribute(
      'href',
      '/example',
    );
  });
});
