import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeScope } from './ThemeScope';

describe('ThemeScope', () => {
  it('é escuro por padrão: div com escopo mdia-dark e data-theme', () => {
    render(<ThemeScope data-testid="scope">conteúdo</ThemeScope>);
    const el = screen.getByTestId('scope');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('mdia-theme', 'mdia-dark');
    expect(el).toHaveAttribute('data-theme', 'dark');
    expect(el).not.toHaveClass('mdia-light', 'mdia-theme--inset', 'mdia-theme--fill');
    expect(el).toHaveTextContent('conteúdo');
  });

  it('claro, com respiro e elemento semântico', () => {
    render(
      <ThemeScope as="section" mode="light" inset aria-label="Área clara">
        x
      </ThemeScope>,
    );
    const el = screen.getByRole('region', { name: 'Área clara' });
    expect(el.tagName).toBe('SECTION');
    expect(el).toHaveClass('mdia-theme', 'mdia-light', 'mdia-theme--inset');
    expect(el).not.toHaveClass('mdia-dark');
    expect(el).toHaveAttribute('data-theme', 'light');
  });

  it('fill e className extra', () => {
    render(<ThemeScope fill className="extra" data-testid="scope" />);
    expect(screen.getByTestId('scope')).toHaveClass('mdia-theme', 'mdia-theme--fill', 'extra');
  });
});
