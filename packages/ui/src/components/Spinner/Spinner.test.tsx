import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('anuncia o estado de carregamento', () => {
    render(<Spinner />);
    expect(screen.getByRole('status', { name: 'Carregando…' })).toBeInTheDocument();
  });

  it('pode ser decorativo', () => {
    const { container } = render(<Spinner decorative />);
    expect(screen.queryByRole('status')).toBeNull();
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});
