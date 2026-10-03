import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Heading } from './Heading';

describe('Heading', () => {
  it('usa h2 e tamanho título por padrão', () => {
    render(<Heading>Seção</Heading>);
    const el = screen.getByRole('heading', { level: 2 });
    expect(el).toHaveClass('mdia-heading', 'mdia-heading--title');
  });

  it('separa nível semântico de tamanho visual', () => {
    render(
      <Heading level={1} size="heading" tone="inverse" align="center">
        Página
      </Heading>,
    );
    const el = screen.getByRole('heading', { level: 1 });
    expect(el).toHaveClass('mdia-heading--heading', 'mdia-tone-inverse', 'mdia-align-center');
  });
});
