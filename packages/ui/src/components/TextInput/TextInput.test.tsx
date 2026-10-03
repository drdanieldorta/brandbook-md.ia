import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Field } from '../Field/Field';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('renderiza um textbox com as classes padrão e repassa atributos nativos ao input', () => {
    render(<TextInput aria-label="Buscar" name="busca" placeholder="Nome ou prontuário" />);
    const input = screen.getByRole('textbox', { name: 'Buscar' });
    expect(input).toHaveAttribute('name', 'busca');
    expect(input).toHaveAttribute('placeholder', 'Nome ou prontuário');
    expect(input).toHaveClass('mdia-text-input__control');
    expect(input.parentElement).toHaveClass('mdia-text-input', 'mdia-text-input--md');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input).not.toHaveAttribute('aria-describedby');
    expect(input).not.toBeRequired();
  });

  it('aplica tamanho, largura total e className no invólucro', () => {
    render(<TextInput aria-label="Nome" size="lg" fullWidth className="extra" />);
    expect(screen.getByRole('textbox').parentElement).toHaveClass(
      'mdia-text-input--lg',
      'mdia-text-input--full',
      'extra',
    );
  });

  it('esconde os ícones de tecnologias assistivas e marca o invólucro', () => {
    render(
      <TextInput
        aria-label="E-mail"
        iconStart={<svg data-testid="start" />}
        iconEnd={<svg data-testid="end" />}
      />,
    );
    expect(screen.getByTestId('start').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('end').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('textbox').parentElement).toHaveClass(
      'mdia-text-input--icon-start',
      'mdia-text-input--icon-end',
    );
  });

  it('invalid marca aria-invalid; disabled desabilita e marca o invólucro', () => {
    render(<TextInput aria-label="Nome" invalid disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toBeDisabled();
    expect(input.parentElement).toHaveClass('mdia-text-input--disabled');
  });

  it('dentro de um Field recebe id, aria-describedby (mesclado), aria-invalid e required', () => {
    render(
      <Field
        label="Nome da clínica"
        id="clinica"
        hint="Como aparece no CNPJ."
        error="Informe o nome da clínica."
        required
      >
        <TextInput aria-describedby="extra" />
      </Field>,
    );
    const input = screen.getByRole('textbox', { name: 'Nome da clínica' });
    expect(input).toHaveAttribute('id', 'clinica');
    expect(input).toHaveAttribute('aria-describedby', 'clinica-hint clinica-error extra');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toBeRequired();
  });

  it('props explícitas prevalecem sobre o contexto do Field', () => {
    render(
      <Field label="Nome" error="Erro" required disabled>
        <TextInput id="meu-id" invalid={false} required={false} disabled={false} />
      </Field>,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'meu-id');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input).not.toBeRequired();
    expect(input).toBeEnabled();
  });

  it('aceita digitação e dispara onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TextInput aria-label="Nome" onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Clínica');
    expect(input).toHaveValue('Clínica');
    expect(onChange).toHaveBeenCalledTimes(7);
  });

  it('encaminha a ref ao input nativo', () => {
    const ref = createRef<HTMLInputElement>();
    render(<TextInput ref={ref} aria-label="Nome" />);
    expect(ref.current).toBe(screen.getByRole('textbox'));
  });
});
