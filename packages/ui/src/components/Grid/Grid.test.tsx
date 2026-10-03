import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renderiza uma div com uma coluna e gap 5 por padrão', () => {
    render(<Grid data-testid="grid">Conteúdo</Grid>);
    const el = screen.getByTestId('grid');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('mdia-grid', 'mdia-grid--cols-1', 'mdia-grid--gap-5');
    expect(el.getAttribute('style')).toBeNull();
  });

  it('aplica colunas fixas, gap e alinhamento por classes', () => {
    render(
      <Grid data-testid="grid" columns={3} gap={2} align="start">
        Conteúdo
      </Grid>,
    );
    const el = screen.getByTestId('grid');
    expect(el).toHaveClass('mdia-grid--cols-3', 'mdia-grid--gap-2', 'mdia-grid--align-start');
    expect(el).not.toHaveClass('mdia-grid--fluid');
  });

  it('com minItemWidth define --mdia-grid-min e ignora columns', () => {
    render(
      <Grid data-testid="grid" columns={3} minItemWidth="280px" style={{ marginTop: 8 }}>
        Conteúdo
      </Grid>,
    );
    const el = screen.getByTestId('grid');
    expect(el).toHaveClass('mdia-grid--fluid');
    expect(el).not.toHaveClass('mdia-grid--cols-3');
    expect(el.style.getPropertyValue('--mdia-grid-min')).toBe('280px');
    expect(el.style.marginTop).toBe('8px');
  });

  it('troca o elemento com `as`', () => {
    render(
      <Grid as="ul" columns={2}>
        <li>Item</li>
      </Grid>,
    );
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('UL');
    expect(list).toHaveClass('mdia-grid', 'mdia-grid--cols-2');
  });
});
