import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { useFieldContext } from '../Field/Field';

export type TextAreaResize = 'vertical' | 'none';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Estado inválido (borda de erro e `aria-invalid`). Dentro de um `Field` com `error` é automático. */
  invalid?: boolean;
  fullWidth?: boolean;
  /** Linhas visíveis (padrão 4). */
  rows?: number;
  /** `vertical` (padrão) deixa a pessoa ajustar a altura; `none` fixa. */
  resize?: TextAreaResize;
}

/**
 * Campo de texto de várias linhas, com o mesmo visual do `TextInput` (altura
 * mínima 44px, raio 8px, foco visível de 3px). Dentro de um `Field` recebe `id`,
 * `aria-describedby`, `aria-invalid`, `required` e `disabled` automaticamente;
 * props explícitas prevalecem.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    invalid,
    fullWidth = false,
    rows = 4,
    resize = 'vertical',
    id,
    required,
    disabled,
    'aria-describedby': ariaDescribedBy,
    className,
    ...rest
  },
  ref,
) {
  const field = useFieldContext();
  const isInvalid = invalid ?? field?.invalid ?? false;
  return (
    <textarea
      ref={ref}
      id={id ?? field?.id}
      className={cx(
        'mdia-text-area',
        fullWidth && 'mdia-text-area--full',
        resize === 'none' && 'mdia-text-area--resize-none',
        className,
      )}
      rows={rows}
      required={required ?? field?.required}
      disabled={disabled ?? field?.disabled ?? false}
      aria-invalid={isInvalid || undefined}
      aria-describedby={cx(field?.describedBy, ariaDescribedBy) || undefined}
      {...rest}
    />
  );
});
