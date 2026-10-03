import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Field } from '../Field/Field';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('renderiza um textarea com 4 linhas e redimensionamento vertical por padrão', () => {
    render(<TextArea aria-label="Mensagem" name="mensagem" />);
    const textarea = screen.getByRole('textbox', { name: 'Mensagem' });
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('rows', '4');
    expect(textarea).toHaveAttribute('name', 'mensagem');
    expect(textarea).toHaveClass('mdia-text-area');
    expect(textarea).not.toHaveClass('mdia-text-area--resize-none', 'mdia-text-area--full');
    expect(textarea).not.toHaveAttribute('aria-invalid');
    expect(textarea).not.toHaveAttribute('aria-describedby');
  });

  it('aplica rows, resize none, largura total e className', () => {
    render(<TextArea aria-label="Mensagem" rows={6} resize="none" fullWidth className="extra" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '6');
    expect(textarea).toHaveClass('mdia-text-area--resize-none', 'mdia-text-area--full', 'extra');
  });

  it('invalid marca aria-invalid; disabled desabilita', () => {
    render(<TextArea aria-label="Mensagem" invalid disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toBeDisabled();
  });

  it('dentro de um Field recebe id, aria-describedby, aria-invalid, required e disabled', () => {
    render(
      <Field
        label="Mensagem"
        id="mensagem"
        hint="Conte brevemente o contexto."
        error="Descreva brevemente o contexto."
        required
      >
        <TextArea />
      </Field>,
    );
    const textarea = screen.getByRole('textbox', { name: 'Mensagem' });
    expect(screen.getByLabelText(/Mensagem/)).toBe(textarea);
    expect(textarea).toHaveAttribute('id', 'mensagem');
    expect(textarea).toHaveAttribute('aria-describedby', 'mensagem-hint mensagem-error');
    expect(textarea).toHaveAccessibleDescription(
      'Conte brevemente o contexto. Descreva brevemente o contexto.',
    );
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toBeRequired();
  });

  it('herda disabled do Field', () => {
    render(
      <Field label="Mensagem" disabled>
        <TextArea />
      </Field>,
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('aceita digitação e dispara onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TextArea aria-label="Mensagem" onChange={onChange} />);
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Olá');
    expect(textarea).toHaveValue('Olá');
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('encaminha a ref ao textarea nativo', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<TextArea ref={ref} aria-label="Mensagem" />);
    expect(ref.current).toBe(screen.getByRole('textbox'));
  });
});
