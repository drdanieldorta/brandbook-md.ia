import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ButtonLink } from '../Button/Button';
import { Hero } from './Hero';

const title = 'Inteligência humana. Potencial ampliado.';

describe('Hero', () => {
  it('renderiza uma faixa escura nomeada pelo h1 display com quebra equilibrada', () => {
    render(<Hero title={title} />);
    const heading = screen.getByRole('heading', { level: 1, name: title });
    expect(heading).toHaveClass(
      'mdia-heading--display',
      'mdia-heading--balance',
      'mdia-hero__title',
    );
    expect(heading.id).not.toBe('');

    const section = screen.getByRole('region', { name: title });
    expect(section.tagName).toBe('SECTION');
    expect(section).toHaveAttribute('aria-labelledby', heading.id);
    expect(section).toHaveClass(
      'mdia-section',
      'mdia-section--dark',
      'mdia-dark',
      'mdia-section--lg',
      'mdia-hero',
      'mdia-hero--start',
    );
    expect(section).not.toHaveClass('mdia-hero--with-aside');
    expect(section.querySelector('.mdia-container')).toHaveClass('mdia-container--lg');
    expect(section.querySelector('.mdia-hero__grid')).not.toHaveClass(
      'mdia-hero__grid--with-aside',
    );
  });

  it('empilha eyebrow, título, lead e ações dentro de um Stack de gap 5', () => {
    render(
      <Hero
        title={title}
        eyebrow={<span>Brandbook · Guia 4.0</span>}
        lead="Identidade, tokens e componentes da MD.IA, prontos para usar em código."
        actions={
          <>
            <ButtonLink href="#componentes" variant="secondary">
              Explorar componentes
            </ButtonLink>
            <ButtonLink href="#storybook" variant="ghost">
              Abrir Storybook
            </ButtonLink>
          </>
        }
      />,
    );
    const content = screen.getByRole('region').querySelector('.mdia-hero__content');
    expect(content).toHaveClass('mdia-stack', 'mdia-stack--column', 'mdia-stack--gap-5');
    expect(content?.children).toHaveLength(4);

    expect(screen.getByText('Brandbook · Guia 4.0').parentElement).toHaveClass(
      'mdia-hero__eyebrow',
    );
    const lead = screen.getByText(/Identidade, tokens e componentes/);
    expect(lead.tagName).toBe('P');
    expect(lead).toHaveClass('mdia-text', 'mdia-text--lg', 'mdia-text--measure', 'mdia-hero__lead');
    expect(lead).not.toHaveClass('mdia-tone-secondary');

    const actions = screen.getByRole('link', { name: 'Explorar componentes' }).parentElement;
    expect(actions).toHaveClass(
      'mdia-stack--row',
      'mdia-stack--gap-3',
      'mdia-stack--wrap',
      'mdia-hero__actions',
    );
    expect(within(actions as HTMLElement).getAllByRole('link')).toHaveLength(2);
  });

  it('omite eyebrow, lead, ações e lateral quando ausentes', () => {
    render(<Hero title={title} />);
    const section = screen.getByRole('region');
    expect(section.querySelector('.mdia-hero__eyebrow')).toBeNull();
    expect(section.querySelector('.mdia-hero__lead')).toBeNull();
    expect(section.querySelector('.mdia-hero__actions')).toBeNull();
    expect(section.querySelector('.mdia-hero__aside')).toBeNull();
    expect(section.querySelector('.mdia-hero__content')?.children).toHaveLength(1);
  });

  it('com aside marca a faixa e a grade e renderiza a lateral depois do conteúdo', () => {
    render(<Hero title={title} aside={<img alt="" data-testid="lateral" />} />);
    const section = screen.getByRole('region');
    expect(section).toHaveClass('mdia-hero--with-aside');
    const grid = section.querySelector('.mdia-hero__grid');
    expect(grid).toHaveClass('mdia-hero__grid--with-aside');
    const aside = screen.getByTestId('lateral').parentElement;
    expect(aside).toHaveClass('mdia-hero__aside');
    expect(aside?.previousElementSibling).toHaveClass('mdia-hero__content');
  });

  it('aplica tom, alinhamento e respiro por classes', () => {
    const { rerender } = render(<Hero title={title} tone="alt" align="center" spacing="md" />);
    const section = screen.getByRole('region');
    expect(section).toHaveClass('mdia-section--alt', 'mdia-section--md', 'mdia-hero--center');
    expect(section).not.toHaveClass('mdia-section--dark', 'mdia-dark', 'mdia-hero--start');

    rerender(<Hero title={title} tone="default" />);
    expect(section).not.toHaveClass('mdia-section--alt', 'mdia-section--dark', 'mdia-dark');
    expect(section).toHaveClass('mdia-section--lg', 'mdia-hero--start');
  });

  it('aceita aria-labelledby próprio e repassa id, className e atributos', () => {
    render(
      <Hero
        title={<span id="titulo-proprio">{title}</span>}
        aria-labelledby="titulo-proprio"
        id="abertura"
        className="extra"
        data-testid="x"
      />,
    );
    const section = screen.getByRole('region', { name: title });
    expect(section).toHaveAttribute('aria-labelledby', 'titulo-proprio');
    expect(section).toHaveAttribute('id', 'abertura');
    expect(section).toHaveClass('mdia-hero', 'extra');
    expect(section).toHaveAttribute('data-testid', 'x');
  });
});
