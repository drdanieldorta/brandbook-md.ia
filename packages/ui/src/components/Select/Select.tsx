import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cx } from '../../utils/cx';
import { useFieldContext } from '../Field/Field';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Estado inválido (borda de erro e `aria-invalid`). Dentro de um `Field` com `error` é automático. */
  invalid?: boolean;
  fullWidth?: boolean;
  /** Opção vazia e desabilitada, selecionada quando não há `value` nem `defaultValue`. */
  placeholder?: string;
  /** Opções declarativas; alternativa a `children` com `<option>` (quando presente, `children` é ignorado). */
  options?: SelectOption[];
}

/**
 * Seleção nativa estilizada (guia §7): 44px de altura, raio 8px, foco visível de
 * 3px e seta `ChevronDown` decorativa. Dentro de um `Field` recebe `id`,
 * `aria-describedby`, `aria-invalid`, `required` e `disabled` automaticamente;
 * props explícitas prevalecem. `className` vai no invólucro, o restante no `<select>`.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    invalid,
    fullWidth = false,
    placeholder,
    options,
    id,
    required,
    disabled,
    value,
    defaultValue,
    multiple,
    'aria-describedby': ariaDescribedBy,
    className,
    children,
    ...rest
  },
  ref,
) {
  const field = useFieldContext();
  const isInvalid = invalid ?? field?.invalid ?? false;
  const isDisabled = disabled ?? field?.disabled ?? false;
  const hasPlaceholder = placeholder != null && !multiple;
  const resolvedDefault =
    hasPlaceholder && value === undefined && defaultValue === undefined ? '' : defaultValue;
  return (
    <span
      className={cx(
        'mdia-select',
        fullWidth && 'mdia-select--full',
        isDisabled && 'mdia-select--disabled',
        className,
      )}
    >
      <select
        ref={ref}
        id={id ?? field?.id}
        className="mdia-select__control"
        required={required ?? field?.required}
        disabled={isDisabled}
        multiple={multiple}
        value={value}
        defaultValue={resolvedDefault}
        aria-invalid={isInvalid || undefined}
        aria-describedby={cx(field?.describedBy, ariaDescribedBy) || undefined}
        {...rest}
      >
        {hasPlaceholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options
          ? options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))
          : children}
      </select>
      <ChevronDown className="mdia-select__icon" aria-hidden="true" />
    </span>
  );
});
