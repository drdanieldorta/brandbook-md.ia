import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('é decorativo por padrão: hr com role presentation e spacing 4', () => {
    render(<Divider />);
    const el = screen.getByRole('presentation');
    expect(el.tagName).toBe('HR');
    expect(el).toHaveClass('mdia-divider', 'mdia-divider--spacing-4');
    expect(el).not.toHaveClass('mdia-divider--vertical', 'mdia-divider--labeled');
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });

  it('semântico vira um hr com papel de separador', () => {
    render(<Divider decorative={false} spacing={6} />);
    const el = screen.getByRole('separator');
    expect(el.tagName).toBe('HR');
    expect(el).not.toHaveAttribute('role');
    expect(el).not.toHaveAttribute('aria-orientation');
    expect(el).toHaveClass('mdia-divider--spacing-6');
  });

  it('vertical aplica a classe e, quando semântico, aria-orientation', () => {
    const { rerender } = render(<Divider orientation="vertical" />);
    expect(screen.getByRole('presentation')).toHaveClass('mdia-divider--vertical');
    expect(screen.getByRole('presentation')).not.toHaveAttribute('aria-orientation');
    rerender(<Divider orientation="vertical" decorative={false} />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('com rótulo renderiza o texto central', () => {
    render(<Divider label="ou" spacing={0} />);
    const label = screen.getByText('ou');
    expect(label).toHaveClass('mdia-divider__label');
    const el = screen.getByRole('presentation');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('mdia-divider--labeled', 'mdia-divider--spacing-0');
    expect(el).toContainElement(label);
  });

  it('com rótulo e semântico usa role separator', () => {
    render(<Divider label="ou" decorative={false} />);
    const el = screen.getByRole('separator');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveTextContent('ou');
  });

  it('repassa className e atributos', () => {
    render(<Divider className="extra" data-testid="divisor" />);
    expect(screen.getByTestId('divisor')).toHaveClass('mdia-divider', 'extra');
  });
});
