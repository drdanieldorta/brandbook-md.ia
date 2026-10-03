import { useId, useMemo, useState } from 'react';
import type { FieldsetHTMLAttributes, ReactNode } from 'react';
import { CircleAlert } from 'lucide-react';
import { cx } from '../../utils/cx';
import { Radio } from './Radio';
import { RadioGroupContext } from './RadioGroupContext';
import type { RadioGroupContextValue } from './RadioGroupContext';

export type RadioGroupOrientation = 'vertical' | 'horizontal';

export interface RadioGroupOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'onChange' | 'defaultValue' | 'name' | 'disabled'
> {
  /** Legenda visível do grupo (obrigatória): vira o nome acessível do fieldset. */
  label: ReactNode;
  /** Dica abaixo da legenda, ligada ao fieldset por aria-describedby. */
  hint?: ReactNode;
  /** Mensagem de erro anunciada (role="alert") e ligada por aria-describedby; marca o grupo e os radios como inválidos. */
  error?: ReactNode;
  /** `name` compartilhado por todos os radios do grupo. */
  name: string;
  /** Valor selecionado (modo controlado). */
  value?: string;
  /** Valor inicial (modo não controlado). */
  defaultValue?: string;
  /** Recebe o `value` do radio selecionado. */
  onChange?: (value: string) => void;
  /** `vertical` (padrão) empilha as opções; `horizontal` alinha em linha com quebra. */
  orientation?: RadioGroupOrientation;
  required?: boolean;
  /** Desabilita o fieldset inteiro (e, por contexto, cada Radio). */
  disabled?: boolean;
  /** Marca o grupo como inválido sem exibir mensagem. */
  invalid?: boolean;
  /** Atalho para renderizar os radios a partir de dados. Pode ser combinado com `children`. */
  options?: RadioGroupOption[];
  /** Radios declarados manualmente (renderizados depois de `options`). */
  children?: ReactNode;
}

/**
 * Grupo de opções exclusivas em `<fieldset>` com `<legend>`, navegável por
 * setas (comportamento nativo do radio). Controlado (`value`) ou não
 * (`defaultValue`); `onChange` recebe o valor selecionado.
 */
export function RadioGroup({
  label,
  hint,
  error,
  name,
  value,
  defaultValue,
  onChange,
  orientation = 'vertical',
  required = false,
  disabled = false,
  invalid = false,
  options,
  children,
  className,
  'aria-describedby': describedBy,
  ...rest
}: RadioGroupProps) {
  const uid = useId();
  const hasHint = Boolean(hint);
  const hasError = Boolean(error);
  const hintId = hasHint ? `${uid}-hint` : undefined;
  const errorId = hasError ? `${uid}-error` : undefined;
  const isInvalid = invalid || hasError;
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  const context = useMemo<RadioGroupContextValue>(
    () => ({
      name,
      value: currentValue,
      disabled,
      invalid: isInvalid,
      required,
      onChange: (next: string) => {
        if (!isControlled) setInternalValue(next);
        onChange?.(next);
      },
    }),
    [name, currentValue, disabled, isInvalid, required, isControlled, onChange],
  );

  return (
    <fieldset
      className={cx(
        'mdia-radio-group',
        `mdia-radio-group--${orientation}`,
        disabled && 'mdia-radio-group--disabled',
        isInvalid && 'mdia-radio-group--invalid',
        className,
      )}
      disabled={disabled}
      aria-describedby={cx(hintId, errorId, describedBy) || undefined}
      {...rest}
    >
      <legend className="mdia-radio-group__legend">{label}</legend>
      {hasHint ? (
        <div id={hintId} className="mdia-radio-group__hint">
          {hint}
        </div>
      ) : null}
      <RadioGroupContext.Provider value={context}>
        <div className="mdia-radio-group__options">
          {options?.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              label={option.label}
              description={option.description}
              disabled={option.disabled}
            />
          ))}
          {children}
        </div>
      </RadioGroupContext.Provider>
      {hasError ? (
        <div id={errorId} className="mdia-radio-group__error" role="alert">
          <CircleAlert aria-hidden="true" />
          <span>{error}</span>
        </div>
      ) : null}
    </fieldset>
  );
}
