import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Field } from '../Field/Field';
import { Select } from './Select';

const OPTIONS = [
  { value: 'consultoria', label: 'Consultoria' },
  { value: 'mentoria', label: 'Mentoria' },
  { value: 'nao-sei', label: 'Ainda não sei', disabled: true },
];

describe('Select', () => {
  it('renderiza um combobox com as opções e o placeholder vazio, desabilitado e selecionado', () => {
    render(<Select aria-label="Interesse" placeholder="Selecione uma opção" options={OPTIONS} />);
    const select = screen.getByRole('combobox', { name: 'Interesse' });
    expect(select).toHaveClass('mdia-select__control');
    expect(select.parentElement).toHaveClass('mdia-select');
    expect(select).toHaveValue('');

    const placeholder = screen.getByRole('option', { name: 'Selecione uma opção' });
    expect(placeholder).toHaveAttribute('value', '');
    expect(placeholder).toBeDisabled();
    expect(screen.getByRole('option', { name: 'Selecione uma opção', selected: true })).toBe(
      placeholder,
    );

    expect(screen.getAllByRole('option')).toHaveLength(4);
    expect(screen.getByRole('option', { name: 'Mentoria' })).toHaveValue('mentoria');
    expect(screen.getByRole('option', { name: 'Ainda não sei' })).toBeDisabled();
  });

  it('a seta é decorativa e some do acessível', () => {
    render(<Select aria-label="Interesse" options={OPTIONS} />);
    const icon = screen.getByRole('combobox').parentElement?.querySelector('svg');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveClass('mdia-select__icon');
  });

  it('sem placeholder, defaultValue define a opção inicial', () => {
    render(<Select aria-label="Interesse" options={OPTIONS} defaultValue="mentoria" />);
    expect(screen.getByRole('combobox')).toHaveValue('mentoria');
    expect(screen.queryByRole('option', { name: 'Selecione uma opção' })).not.toBeInTheDocument();
  });

  it('com placeholder e defaultValue, a opção informada fica selecionada', () => {
    render(
      <Select
        aria-label="Interesse"
        placeholder="Selecione uma opção"
        options={OPTIONS}
        defaultValue="consultoria"
      />,
    );
    expect(screen.getByRole('combobox')).toHaveValue('consultoria');
  });

  it('aceita children com <option> no lugar de options', () => {
    render(
      <Select aria-label="Especialidade">
        <option value="odontologia">Odontologia</option>
        <option value="fisioterapia">Fisioterapia</option>
      </Select>,
    );
    expect(screen.getAllByRole('option')).toHaveLength(2);
    expect(screen.getByRole('combobox')).toHaveValue('odontologia');
  });

  it('aplica largura total e className no invólucro; invalid e disabled no controle', () => {
    render(
      <Select
        aria-label="Interesse"
        options={OPTIONS}
        fullWidth
        className="extra"
        invalid
        disabled
      />,
    );
    const select = screen.getByRole('combobox');
    expect(select.parentElement).toHaveClass('mdia-select--full', 'mdia-select--disabled', 'extra');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toBeDisabled();
  });

  it('dentro de um Field recebe id, aria-describedby, aria-invalid e required', () => {
    render(
      <Field
        label="Interesse"
        id="interesse"
        hint="Dá para mudar depois."
        error="Escolha uma opção."
        required
      >
        <Select placeholder="Selecione uma opção" options={OPTIONS} />
      </Field>,
    );
    const select = screen.getByRole('combobox', { name: 'Interesse' });
    expect(screen.getByLabelText(/Interesse/)).toBe(select);
    expect(select).toHaveAttribute('id', 'interesse');
    expect(select).toHaveAttribute('aria-describedby', 'interesse-hint interesse-error');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toBeRequired();
    expect(select).toBeInvalid();
  });

  it('permite selecionar uma opção e dispara onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select
        aria-label="Interesse"
        placeholder="Selecione uma opção"
        options={OPTIONS}
        onChange={onChange}
      />,
    );
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'mentoria');
    expect(select).toHaveValue('mentoria');
    expect(screen.getByRole('option', { name: 'Mentoria', selected: true })).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('encaminha a ref ao select nativo', () => {
    const ref = createRef<HTMLSelectElement>();
    render(<Select ref={ref} aria-label="Interesse" options={OPTIONS} />);
    expect(ref.current).toBe(screen.getByRole('combobox'));
  });
});
