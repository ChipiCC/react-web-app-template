import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/test/render';

import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('cycles the preference and applies it to the document', () => {
    renderWithProviders(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /Theme: System/ });

    fireEvent.click(button);
    expect(button).toHaveAccessibleName(/Theme: Light/);
    expect(document.documentElement.dataset.theme).toBe('light');

    fireEvent.click(button);
    expect(button).toHaveAccessibleName(/Theme: Dark/);
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
