import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Text } from './Text';

describe('Text', () => {
  it('renderiza um parágrafo por padrão', () => {
    render(<Text>Conteúdo</Text>);
    const el = screen.getByText('Conteúdo');
    expect(el.tagName).toBe('P');
    expect(el).toHaveClass('mdia-text');
  });

  it('aplica elemento, tamanho, peso, tom e medida', () => {
    render(
      <Text as="span" size="sm" weight="semibold" tone="secondary" measure>
        Apoio
      </Text>,
    );
    const el = screen.getByText('Apoio');
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveClass(
      'mdia-text--sm',
      'mdia-text--semibold',
      'mdia-tone-secondary',
      'mdia-text--measure',
    );
  });
});
