import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renderiza um span neutro, suave e médio por padrão', () => {
    render(<Badge>Rascunho</Badge>);
    const badge = screen.getByText('Rascunho');
    expect(badge.tagName).toBe('SPAN');
    expect(badge).toHaveClass(
      'mdia-badge',
      'mdia-badge--neutral',
      'mdia-badge--soft',
      'mdia-badge--md',
    );
  });

  it('aplica classes de tom, variante e tamanho', () => {
    render(
      <Badge tone="success" variant="outline" size="sm">
        Concluído
      </Badge>,
    );
    expect(screen.getByText('Concluído')).toHaveClass(
      'mdia-badge--success',
      'mdia-badge--outline',
      'mdia-badge--sm',
    );
  });

  it('renderiza como strong quando pedido', () => {
    render(
      <Badge tone="gold" as="strong">
        Destaque
      </Badge>,
    );
    expect(screen.getByText('Destaque').tagName).toBe('STRONG');
  });

  it('esconde o ícone de tecnologias assistivas', () => {
    render(<Badge icon={<svg data-testid="icon" />}>Pendente</Badge>);
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Pendente')).toHaveTextContent('Pendente');
  });
});
