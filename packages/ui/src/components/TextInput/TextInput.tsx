import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useFieldContext } from '../Field/Field';

export type TextInputSize = 'md' | 'lg';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Estado inválido (borda de erro e `aria-invalid`). Dentro de um `Field` com `error` é automático. */
  invalid?: boolean;
  fullWidth?: boolean;
  /** Ícone decorativo antes do texto (lucide-react); não substitui o rótulo. */
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  /** `md` = 44px de altura (toque mínimo do guia); `lg` = 52px. */
  size?: TextInputSize;
}

/**
 * Campo de texto de linha única (guia §7): 44px de altura, raio 8px, foco visível
 * de 3px, estados de erro e desabilitado. Dentro de um `Field` recebe `id`,
 * `aria-describedby`, `aria-invalid`, `required` e `disabled` automaticamente;
 * props explícitas prevalecem. `className` vai no invólucro, o restante no `<input>`.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    invalid,
    fullWidth = false,
    iconStart,
    iconEnd,
    size = 'md',
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
  const isDisabled = disabled ?? field?.disabled ?? false;
  const hasIconStart = Boolean(iconStart);
  const hasIconEnd = Boolean(iconEnd);
  return (
    <span
      className={cx(
        'mdia-text-input',
        `mdia-text-input--${size}`,
        fullWidth && 'mdia-text-input--full',
        hasIconStart && 'mdia-text-input--icon-start',
        hasIconEnd && 'mdia-text-input--icon-end',
        isDisabled && 'mdia-text-input--disabled',
        className,
      )}
    >
      {hasIconStart ? (
        <span className="mdia-text-input__icon mdia-text-input__icon--start" aria-hidden="true">
          {iconStart}
        </span>
      ) : null}
      <input
        ref={ref}
        id={id ?? field?.id}
        className="mdia-text-input__control"
        required={required ?? field?.required}
        disabled={isDisabled}
        aria-invalid={isInvalid || undefined}
        aria-describedby={cx(field?.describedBy, ariaDescribedBy) || undefined}
        {...rest}
      />
      {hasIconEnd ? (
        <span className="mdia-text-input__icon mdia-text-input__icon--end" aria-hidden="true">
          {iconEnd}
        </span>
      ) : null}
    </span>
  );
});
