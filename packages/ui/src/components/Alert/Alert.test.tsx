import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renderiza como status com o tom info por padrão', () => {
    render(<Alert>Revise as informações antes de continuar.</Alert>);
    const alert = screen.getByRole('status');
    expect(alert).toHaveTextContent('Revise as informações antes de continuar.');
    expect(alert).toHaveClass('mdia-alert', 'mdia-alert--info');
  });

  it('usa status para sucesso e alert para atenção e erro', () => {
    const { rerender } = render(<Alert tone="success">Alterações salvas.</Alert>);
    expect(screen.getByRole('status')).toHaveClass('mdia-alert--success');
    rerender(<Alert tone="warning">Confirme os dados antes de enviar.</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('mdia-alert--warning');
    rerender(<Alert tone="error">Não foi possível salvar. Tente novamente.</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('mdia-alert--error');
  });

  it('permite sobrescrever o papel acessível', () => {
    render(
      <Alert tone="error" role="status">
        Não foi possível salvar. Tente novamente.
      </Alert>,
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('mostra o ícone do tom escondido de tecnologias assistivas', () => {
    const { container } = render(<Alert tone="success">Alterações salvas.</Alert>);
    const icon = container.querySelector('.mdia-alert__icon');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon?.querySelector('svg')).not.toBeNull();
  });

  it('renderiza título e ação', () => {
    render(
      <Alert
        tone="error"
        title="Não foi possível salvar."
        action={<button>Tentar novamente</button>}
      >
        Verifique sua conexão.
      </Alert>,
    );
    expect(screen.getByText('Não foi possível salvar.')).toHaveClass('mdia-alert__title');
    expect(screen.getByRole('button', { name: 'Tentar novamente' })).toBeInTheDocument();
  });

  it('só mostra o botão de fechar com onDismiss e o chama ao clicar', async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(<Alert>Revise as informações.</Alert>);
    expect(screen.queryByRole('button', { name: 'Fechar aviso' })).toBeNull();
    rerender(<Alert onDismiss={onDismiss}>Revise as informações.</Alert>);
    await user.click(screen.getByRole('button', { name: 'Fechar aviso' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
