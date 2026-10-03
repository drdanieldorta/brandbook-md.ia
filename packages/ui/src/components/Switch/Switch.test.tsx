import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renderiza um botão role="switch" desligado, nomeado pelo rótulo visível', () => {
    render(<Switch label="Receber resumo semanal por e-mail" />);
    const control = screen.getByRole('switch', { name: 'Receber resumo semanal por e-mail' });
    expect(control.tagName).toBe('BUTTON');
    expect(control).toHaveAttribute('type', 'button');
    expect(control).toHaveAttribute('aria-checked', 'false');
    expect(control).toHaveClass('mdia-switch__control');
    expect(control.closest('label')).toHaveClass('mdia-switch', 'mdia-switch--md');
    expect(control.closest('label')).toHaveAttribute('for', control.id);
  });

  it('não controlado: alterna aria-checked ao clicar e chama onCheckedChange com o novo estado', async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch label="Resumo semanal" onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole('switch', { name: 'Resumo semanal' });
    await user.click(control);
    expect(control).toHaveAttribute('aria-checked', 'true');
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
    await user.click(control);
    expect(control).toHaveAttribute('aria-checked', 'false');
    expect(onCheckedChange).toHaveBeenLastCalledWith(false);
    expect(onCheckedChange).toHaveBeenCalledTimes(2);
  });

  it('não controlado: respeita defaultChecked e alterna ao clicar no rótulo', async () => {
    const user = userEvent.setup();
    render(<Switch label="Resumo semanal" defaultChecked />);
    const control = screen.getByRole('switch');
    expect(control).toHaveAttribute('aria-checked', 'true');
    await user.click(screen.getByText('Resumo semanal'));
    expect(control).toHaveAttribute('aria-checked', 'false');
  });

  it('controlado: reflete a prop checked e só muda quando ela muda', async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <Switch label="Resumo semanal" checked={false} onCheckedChange={onCheckedChange} />,
    );
    const control = screen.getByRole('switch');
    await user.click(control);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(control).toHaveAttribute('aria-checked', 'false');
    rerender(<Switch label="Resumo semanal" checked onCheckedChange={onCheckedChange} />);
    expect(control).toHaveAttribute('aria-checked', 'true');
    await user.click(control);
    expect(onCheckedChange).toHaveBeenLastCalledWith(false);
    expect(control).toHaveAttribute('aria-checked', 'true');
  });

  it('alterna com Espaço e Enter pelo teclado', async () => {
    const user = userEvent.setup();
    render(<Switch label="Resumo semanal" />);
    const control = screen.getByRole('switch');
    await user.tab();
    expect(control).toHaveFocus();
    await user.keyboard(' ');
    expect(control).toHaveAttribute('aria-checked', 'true');
    await user.keyboard('{Enter}');
    expect(control).toHaveAttribute('aria-checked', 'false');
  });

  it('desabilitado não alterna nem chama onCheckedChange', async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Switch label="Resumo semanal" disabled defaultChecked onCheckedChange={onCheckedChange} />,
    );
    const control = screen.getByRole('switch');
    expect(control).toBeDisabled();
    expect(control.closest('label')).toHaveClass('mdia-switch--disabled');
    await user.click(control);
    await user.click(screen.getByText('Resumo semanal'));
    expect(control).toHaveAttribute('aria-checked', 'true');
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('liga a descrição por aria-describedby, aplica size, encaminha ref e className', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Switch
        ref={ref}
        label="Resumo semanal"
        description="Um e-mail por semana."
        size="sm"
        className="extra"
        data-testid="switch"
      />,
    );
    const control = screen.getByRole('switch', { name: 'Resumo semanal' });
    expect(ref.current).toBe(control);
    expect(control).toHaveAccessibleDescription('Um e-mail por semana.');
    expect(control).toHaveAttribute('data-testid', 'switch');
    expect(control).not.toHaveClass('extra');
    expect(control.closest('label')).toHaveClass('mdia-switch--sm', 'extra');
    expect(control.querySelector('.mdia-switch__thumb')).toHaveAttribute('aria-hidden', 'true');
  });
});
