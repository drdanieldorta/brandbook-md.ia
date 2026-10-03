import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TextInput } from '../TextInput/TextInput';
import { Field, useFieldContext } from './Field';

function Probe({ name }: { name: string }) {
  const field = useFieldContext();
  return <output data-testid={name}>{field ? JSON.stringify(field) : 'null'}</output>;
}

describe('Field', () => {
  it('associa o rótulo ao controle e anuncia a dica via aria-describedby', () => {
    render(
      <Field label="Nome da clínica" hint="Como aparece no CNPJ.">
        <TextInput />
      </Field>,
    );
    const input = screen.getByRole('textbox', { name: 'Nome da clínica' });
    expect(screen.getByLabelText('Nome da clínica')).toBe(input);
    expect(input).toHaveAccessibleDescription('Como aparece no CNPJ.');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input).not.toBeRequired();
    expect(input).toBeEnabled();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('com erro: alerta com ícone decorativo, aria-invalid e aria-describedby com dica e erro', () => {
    render(
      <Field
        label="Nome da clínica"
        hint="Como aparece no CNPJ."
        error="Informe o nome da clínica."
      >
        <TextInput />
      </Field>,
    );
    const input = screen.getByRole('textbox', { name: 'Nome da clínica' });
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Informe o nome da clínica.');
    expect(alert.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Como aparece no CNPJ. Informe o nome da clínica.');
    const hint = screen.getByText('Como aparece no CNPJ.');
    expect(input).toHaveAttribute('aria-describedby', `${hint.id} ${alert.id}`);
    expect(input.closest('.mdia-field')).toHaveClass('mdia-field--invalid');
  });

  it('só com erro, aria-describedby aponta apenas para o erro', () => {
    render(
      <Field label="Nome" id="nome" error="Informe o nome.">
        <TextInput />
      </Field>,
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'nome-error');
    expect(screen.getByRole('alert')).toHaveAttribute('id', 'nome-error');
  });

  it('obrigatório: indicador fora do nome acessível, required no controle e sem optionalText', () => {
    render(
      <Field label="E-mail" required optionalText="opcional">
        <TextInput type="email" />
      </Field>,
    );
    const input = screen.getByRole('textbox', { name: 'E-mail' });
    expect(input).toBeRequired();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByText('(opcional)')).not.toBeInTheDocument();
  });

  it('optionalText entra no rótulo quando o campo não é obrigatório', () => {
    render(
      <Field label="Telefone" optionalText="opcional">
        <TextInput type="tel" />
      </Field>,
    );
    const input = screen.getByRole('textbox', { name: 'Telefone (opcional)' });
    expect(input).not.toBeRequired();
    expect(screen.getByText('(opcional)')).toHaveClass('mdia-field__optional');
  });

  it('disabled chega ao controle e marca o invólucro', () => {
    render(
      <Field label="Nome" disabled>
        <TextInput />
      </Field>,
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input.closest('.mdia-field')).toHaveClass('mdia-field--disabled');
  });

  it('usa o id informado no controle (não no div) e gera um quando ausente', () => {
    const { container, rerender } = render(
      <Field label="Nome" id="clinica" hint="Dica" data-testid="field" className="extra">
        <TextInput />
      </Field>,
    );
    const field = screen.getByTestId('field');
    expect(field).toHaveClass('mdia-field', 'extra');
    expect(field).not.toHaveAttribute('id');
    expect(container.querySelector('label')).toHaveAttribute('for', 'clinica');
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'clinica');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'clinica-hint');

    rerender(
      <Field label="Nome">
        <TextInput />
      </Field>,
    );
    const input = screen.getByLabelText('Nome');
    expect(input.id).not.toBe('');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('useFieldContext expõe id, describedBy, invalid, required e disabled; fora do Field é null', () => {
    render(
      <>
        <Field label="Nome" id="n" hint="Dica" error="Erro" required disabled>
          <Probe name="dentro" />
        </Field>
        <Probe name="fora" />
      </>,
    );
    expect(JSON.parse(screen.getByTestId('dentro').textContent ?? '')).toEqual({
      id: 'n',
      describedBy: 'n-hint n-error',
      invalid: true,
      required: true,
      disabled: true,
    });
    expect(screen.getByTestId('fora')).toHaveTextContent('null');
  });
});
