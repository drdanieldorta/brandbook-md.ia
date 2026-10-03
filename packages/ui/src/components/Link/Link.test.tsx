import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Link } from './Link';

describe('Link', () => {
  it('renderiza um link estilizado', () => {
    render(<Link href="#mentoria">Conhecer a mentoria</Link>);
    const link = screen.getByRole('link', { name: 'Conhecer a mentoria' });
    expect(link).toHaveAttribute('href', '#mentoria');
    expect(link).toHaveClass('mdia-link');
  });

  it('links externos abrem em nova aba com rel seguro e aviso acessível', () => {
    render(
      <Link href="https://mdia.com.br" external>
        Site
      </Link>,
    );
    const link = screen.getByRole('link', { name: /Site.*abre em nova aba/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
