import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
  it('renderiza uma div com largura lg e respiro lateral por padrão', () => {
    render(<Container>Conteúdo</Container>);
    const el = screen.getByText('Conteúdo');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('mdia-container', 'mdia-container--lg');
    expect(el).not.toHaveClass('mdia-container--flush');
  });

  it('aplica o tamanho e remove o respiro', () => {
    render(
      <Container size="sm" gutter={false}>
        Conteúdo
      </Container>,
    );
    const el = screen.getByText('Conteúdo');
    expect(el).toHaveClass('mdia-container--sm', 'mdia-container--flush');
    expect(el).not.toHaveClass('mdia-container--lg');
  });

  it('troca o elemento com `as` e repassa atributos', () => {
    render(
      <Container as="main" id="principal" className="extra">
        Conteúdo
      </Container>,
    );
    const el = screen.getByRole('main');
    expect(el).toHaveAttribute('id', 'principal');
    expect(el).toHaveClass('mdia-container', 'mdia-container--lg', 'extra');
  });
});
