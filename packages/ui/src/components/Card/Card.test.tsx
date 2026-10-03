import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Card, CardBody, CardFooter, CardHeader } from './Card';

describe('Card', () => {
  it('renderiza uma div com tom padrão e preenchimento md', () => {
    render(<Card>Conteúdo</Card>);
    const el = screen.getByText('Conteúdo');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('mdia-card', 'mdia-card--padding-md');
    expect(el).not.toHaveClass(
      'mdia-card--alt',
      'mdia-card--dark',
      'mdia-dark',
      'mdia-card--interactive',
    );
  });

  it('aplica tom, preenchimento, elevação e interatividade por classes', () => {
    render(
      <Card tone="alt" padding="lg" elevated interactive>
        Conteúdo
      </Card>,
    );
    expect(screen.getByText('Conteúdo')).toHaveClass(
      'mdia-card--alt',
      'mdia-card--padding-lg',
      'mdia-card--elevated',
      'mdia-card--interactive',
    );
  });

  it('no tom escuro aplica o escopo mdia-dark', () => {
    render(<Card tone="dark">Conteúdo</Card>);
    expect(screen.getByText('Conteúdo')).toHaveClass('mdia-card--dark', 'mdia-dark');
  });

  it('com href vira link interativo', () => {
    render(<Card href="/consultoria">Consultoria</Card>);
    const link = screen.getByRole('link', { name: 'Consultoria' });
    expect(link).toHaveAttribute('href', '/consultoria');
    expect(link).toHaveClass('mdia-card', 'mdia-card--interactive');
  });

  it('respeita `as` explícito e não passa href para elementos que não são link', () => {
    render(
      <ul>
        <Card as="li" href="/ignorado">
          Item
        </Card>
      </ul>,
    );
    const item = screen.getByRole('listitem');
    expect(item).not.toHaveAttribute('href');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('encaminha ref e repassa atributos', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Card ref={ref} as="article" aria-labelledby="titulo" className="extra">
        <h3 id="titulo">Consultoria</h3>
      </Card>,
    );
    expect(ref.current?.tagName).toBe('ARTICLE');
    expect(ref.current).toHaveAttribute('aria-labelledby', 'titulo');
    expect(ref.current).toHaveClass('mdia-card', 'extra');
  });

  it('compõe cabeçalho, corpo e rodapé com as classes de parte', () => {
    render(
      <Card>
        <CardHeader>Cabeçalho</CardHeader>
        <CardBody>Corpo</CardBody>
        <CardFooter className="extra">Rodapé</CardFooter>
      </Card>,
    );
    expect(screen.getByText('Cabeçalho')).toHaveClass('mdia-card__header');
    expect(screen.getByText('Corpo')).toHaveClass('mdia-card__body');
    expect(screen.getByText('Rodapé')).toHaveClass('mdia-card__footer', 'extra');
  });
});
