import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renderiza um checkbox nativo com o rótulo visível como nome acessível', () => {
    render(<Checkbox label="Aceito os termos de uso" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Aceito os termos de uso' });
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveClass('mdia-visually-hidden');
    expect(checkbox.closest('label')).toHaveClass('mdia-checkbox');
    expect(checkbox.nextElementSibling).toHaveAttribute('aria-hidden', 'true');
  });

  it('marca e desmarca ao clicar no rótulo ou no controle, disparando onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Agenda" onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox', { name: 'Agenda' });
    await user.click(screen.getByText('Agenda'));
    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('liga a descrição por aria-describedby sem incluí-la no nome', () => {
    render(<Checkbox label="Receber novidades" description="Um e-mail por semana." />);
    const checkbox = screen.getByRole('checkbox', { name: 'Receber novidades' });
    expect(checkbox).toHaveAccessibleDescription('Um e-mail por semana.');
  });

  it('reflete indeterminate no DOM e remove ao atualizar a prop', () => {
    const { rerender } = render(<Checkbox label="Todas as áreas" indeterminate />);
    const checkbox = screen.getByRole<HTMLInputElement>('checkbox');
    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox).toBePartiallyChecked();
    rerender(<Checkbox label="Todas as áreas" indeterminate={false} />);
    expect(checkbox.indeterminate).toBe(false);
    expect(checkbox).not.toBePartiallyChecked();
  });

  it('exibe erro com role="alert", liga por aria-describedby e marca aria-invalid', () => {
    render(<Checkbox label="Aceito os termos" error="Aceite os termos para continuar." />);
    const checkbox = screen.getByRole('checkbox', { name: 'Aceito os termos' });
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Aceite os termos para continuar.');
    expect(alert.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox.getAttribute('aria-describedby')).toContain(alert.id);
    expect(checkbox).toHaveAccessibleDescription('Aceite os termos para continuar.');
    expect(checkbox.closest('label')).toHaveClass('mdia-checkbox--invalid');
  });

  it('invalid sem mensagem só marca aria-invalid', () => {
    render(<Checkbox label="Agenda" invalid />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('desabilitado não alterna nem dispara onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Faturamento" disabled onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox', { name: 'Faturamento' });
    expect(checkbox).toBeDisabled();
    expect(checkbox.closest('label')).toHaveClass('mdia-checkbox--disabled');
    await user.click(screen.getByText('Faturamento'));
    expect(checkbox).not.toBeChecked();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('encaminha ref para o input, className para o rótulo e mescla aria-describedby externo', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <>
        <p id="dica">Dica externa</p>
        <Checkbox
          ref={ref}
          label="Agenda"
          description="Interna"
          aria-describedby="dica"
          className="extra"
          name="areas"
          value="agenda"
        />
      </>,
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Agenda' });
    expect(ref.current).toBe(checkbox);
    expect(checkbox).toHaveAttribute('name', 'areas');
    expect(checkbox).toHaveAttribute('value', 'agenda');
    expect(checkbox).not.toHaveClass('extra');
    expect(checkbox.closest('label')).toHaveClass('mdia-checkbox', 'extra');
    expect(checkbox).toHaveAccessibleDescription('Interna Dica externa');
  });
  it('não alterna ao clicar na mensagem de erro', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Aceito os termos" error="Aceite os termos para continuar." />);
    await user.click(screen.getByRole('alert'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
