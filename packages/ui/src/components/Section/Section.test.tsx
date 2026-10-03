import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Section } from './Section';

describe('Section', () => {
  it('renderiza uma section com respiro md e envolve os filhos em um Container lg', () => {
    render(
      <Section data-testid="secao">
        <p>Conteúdo</p>
      </Section>,
    );
    const el = screen.getByTestId('secao');
    expect(el.tagName).toBe('SECTION');
    expect(el).toHaveClass('mdia-section', 'mdia-section--md');
    expect(el).not.toHaveClass('mdia-section--alt', 'mdia-section--dark', 'mdia-dark');
    const container = el.querySelector('.mdia-container');
    expect(container).toHaveClass('mdia-container--lg');
    expect(container).toContainElement(screen.getByText('Conteúdo'));
  });

  it('aplica o tamanho do Container interno', () => {
    render(
      <Section data-testid="secao" containerSize="sm">
        Conteúdo
      </Section>,
    );
    expect(screen.getByTestId('secao').querySelector('.mdia-container')).toHaveClass(
      'mdia-container--sm',
    );
  });

  it('sem contained renderiza os filhos direto na faixa', () => {
    render(
      <Section data-testid="secao" contained={false}>
        <p>Conteúdo</p>
      </Section>,
    );
    const el = screen.getByTestId('secao');
    expect(el.querySelector('.mdia-container')).toBeNull();
    expect(screen.getByText('Conteúdo').parentElement).toBe(el);
  });

  it('aplica tom alt e respiro por classes', () => {
    render(
      <Section data-testid="secao" tone="alt" spacing="lg">
        Conteúdo
      </Section>,
    );
    const el = screen.getByTestId('secao');
    expect(el).toHaveClass('mdia-section--alt', 'mdia-section--lg');
    expect(el).not.toHaveClass('mdia-dark');
  });

  it('no tom escuro aplica o escopo mdia-dark', () => {
    render(
      <Section data-testid="secao" tone="dark" spacing="sm">
        Conteúdo
      </Section>,
    );
    expect(screen.getByTestId('secao')).toHaveClass(
      'mdia-section--dark',
      'mdia-dark',
      'mdia-section--sm',
    );
  });

  it('troca o elemento com `as` e repassa id e aria-labelledby', () => {
    render(
      <Section as="header" id="topo" aria-labelledby="titulo" className="extra">
        <h1 id="titulo">Inteligência humana. Potencial ampliado.</h1>
      </Section>,
    );
    const el = screen.getByRole('banner');
    expect(el).toHaveAttribute('id', 'topo');
    expect(el).toHaveAttribute('aria-labelledby', 'titulo');
    expect(el).toHaveClass('mdia-section', 'extra');
  });
});
