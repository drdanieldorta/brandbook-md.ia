import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Eyebrow } from './Eyebrow';

describe('Eyebrow', () => {
  it('renderiza o kicker com ponto decorativo', () => {
    render(<Eyebrow>Seu caminho</Eyebrow>);
    const el = screen.getByText('Seu caminho');
    expect(el.tagName).toBe('P');
    expect(el).toHaveClass('mdia-eyebrow', 'mdia-eyebrow--brand');
    expect(el.querySelector('.mdia-eyebrow__dot')).toHaveAttribute('aria-hidden', 'true');
  });

  it('aceita elemento, tom e remoção do ponto', () => {
    render(
      <Eyebrow as="span" tone="gold" dot={false}>
        Guia 4.0
      </Eyebrow>,
    );
    const el = screen.getByText('Guia 4.0');
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveClass('mdia-eyebrow--gold');
    expect(el.querySelector('.mdia-eyebrow__dot')).toBeNull();
  });
});
