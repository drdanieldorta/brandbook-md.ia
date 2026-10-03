import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renderiza um botão do tipo button com o rótulo como nome acessível e dica', () => {
    render(<IconButton label="Fechar" icon={<svg />} />);
    const button = screen.getByRole('button', { name: 'Fechar' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-label', 'Fechar');
    expect(button).toHaveAttribute('title', 'Fechar');
    expect(button).toHaveClass(
      'mdia-button',
      'mdia-button--ghost',
      'mdia-button--md',
      'mdia-icon-button',
      'mdia-icon-button--md',
    );
  });

  it('permite sobrescrever a dica sem alterar o nome acessível', () => {
    render(<IconButton label="Fechar" title="Fechar painel (Esc)" icon={<svg />} />);
    expect(screen.getByRole('button', { name: 'Fechar' })).toHaveAttribute(
      'title',
      'Fechar painel (Esc)',
    );
  });

  it('esconde o ícone de tecnologias assistivas', () => {
    render(<IconButton label="Buscar" icon={<svg data-testid="icon" />} />);
    const wrapper = screen.getByTestId('icon').parentElement;
    expect(wrapper).toHaveClass('mdia-icon-button__icon');
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
  });

  it('aplica variante e tamanho', () => {
    render(<IconButton label="Adicionar" icon={<svg />} variant="primary" size="sm" />);
    expect(screen.getByRole('button')).toHaveClass(
      'mdia-button--primary',
      'mdia-button--sm',
      'mdia-icon-button--sm',
    );
  });

  it('em carregamento desabilita, marca aria-busy e troca o ícone pelo spinner', () => {
    render(<IconButton label="Buscando…" icon={<svg data-testid="icon" />} loading />);
    const button = screen.getByRole('button', { name: 'Buscando…' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveClass('mdia-button--loading');
    expect(button.querySelector('.mdia-spinner')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('reflete pressed em aria-pressed e omite o atributo quando não é alternância', () => {
    const { rerender } = render(<IconButton label="Favoritar" icon={<svg />} />);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-pressed');
    rerender(<IconButton label="Favoritar" icon={<svg />} pressed={false} />);
    expect(screen.getByRole('button', { pressed: false })).toHaveAttribute('aria-pressed', 'false');
    rerender(<IconButton label="Favoritar" icon={<svg />} pressed />);
    expect(screen.getByRole('button', { pressed: true })).toHaveAttribute('aria-pressed', 'true');
  });

  it('dispara onClick e respeita disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(<IconButton label="Fechar" icon={<svg />} onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(<IconButton label="Fechar" icon={<svg />} onClick={onClick} disabled />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('encaminha a ref para o elemento button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton ref={ref} label="Fechar" icon={<svg />} />);
    expect(ref.current).toBe(screen.getByRole('button'));
  });
});
