import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Toast, ToastStack } from './Toast';

describe('Toast', () => {
  it('renderiza como status educado com o tom info por padrão', () => {
    render(<Toast>Revise as informações antes de continuar.</Toast>);
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('aria-live', 'polite');
    expect(toast).toHaveClass('mdia-toast', 'mdia-toast--info');
  });

  it('usa status/polite para sucesso e alert/assertive para atenção e erro', () => {
    const { rerender } = render(<Toast tone="success">Alterações salvas.</Toast>);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    rerender(<Toast tone="warning">Confirme os dados antes de enviar.</Toast>);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
    rerender(<Toast tone="error">Não foi possível salvar. Tente novamente.</Toast>);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });

  it('permite sobrescrever role e aria-live', () => {
    render(
      <Toast tone="error" role="status" aria-live="polite">
        Não foi possível salvar. Tente novamente.
      </Toast>,
    );
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('mostra o ícone do tom escondido de tecnologias assistivas', () => {
    const { container } = render(<Toast tone="success">Alterações salvas.</Toast>);
    const icon = container.querySelector('.mdia-toast__icon');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon?.querySelector('svg')).not.toBeNull();
  });

  it('em carregamento mostra um spinner decorativo no lugar do ícone', () => {
    const { container } = render(<Toast loading>Salvando…</Toast>);
    expect(container.querySelector('.mdia-toast__icon svg')).toBeNull();
    expect(container.querySelector('.mdia-spinner')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Salvando…');
  });

  it('renderiza título e ação', () => {
    render(
      <Toast
        tone="error"
        title="Não foi possível salvar."
        action={<button>Tentar novamente</button>}
      >
        Tente novamente em instantes.
      </Toast>,
    );
    expect(screen.getByText('Não foi possível salvar.')).toHaveClass('mdia-toast__title');
    expect(screen.getByRole('button', { name: 'Tentar novamente' })).toBeInTheDocument();
  });

  it('só mostra o botão de fechar com onDismiss e o chama ao clicar', async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(<Toast>Alterações salvas.</Toast>);
    expect(screen.queryByRole('button', { name: 'Fechar notificação' })).toBeNull();
    rerender(<Toast onDismiss={onDismiss}>Alterações salvas.</Toast>);
    await user.click(screen.getByRole('button', { name: 'Fechar notificação' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});

describe('ToastStack', () => {
  it('é uma região chamada "Notificações" no canto inferior direito por padrão', () => {
    render(
      <ToastStack>
        <Toast>Alterações salvas.</Toast>
      </ToastStack>,
    );
    const region = screen.getByRole('region', { name: 'Notificações' });
    expect(region).toHaveClass('mdia-toast-stack', 'mdia-toast-stack--bottom-right');
    expect(region).toContainElement(screen.getByRole('status'));
  });

  it('aceita posição e rótulo próprios', () => {
    render(<ToastStack position="top-center" label="Avisos" />);
    expect(screen.getByRole('region', { name: 'Avisos' })).toHaveClass(
      'mdia-toast-stack--top-center',
    );
  });
});
