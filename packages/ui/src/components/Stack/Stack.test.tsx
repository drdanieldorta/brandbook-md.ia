import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renderiza uma div em coluna com gap 4 por padrão', () => {
    render(<Stack data-testid="stack">Conteúdo</Stack>);
    const el = screen.getByTestId('stack');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('mdia-stack', 'mdia-stack--column', 'mdia-stack--gap-4');
    expect(el).not.toHaveClass('mdia-stack--wrap');
    expect(el.getAttribute('style')).toBeNull();
  });

  it('aplica direção, gap, alinhamento, distribuição e quebra por classes', () => {
    render(
      <Stack data-testid="stack" direction="row" gap={2} align="center" justify="between" wrap>
        Conteúdo
      </Stack>,
    );
    expect(screen.getByTestId('stack')).toHaveClass(
      'mdia-stack--row',
      'mdia-stack--gap-2',
      'mdia-stack--align-center',
      'mdia-stack--justify-between',
      'mdia-stack--wrap',
    );
  });

  it('troca o elemento com `as` e mantém className extra', () => {
    render(
      <Stack as="ul" gap={1} className="extra">
        <li>Item</li>
      </Stack>,
    );
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('UL');
    expect(list).toHaveClass('mdia-stack', 'mdia-stack--gap-1', 'extra');
    expect(screen.getByRole('listitem')).toHaveTextContent('Item');
  });
});
