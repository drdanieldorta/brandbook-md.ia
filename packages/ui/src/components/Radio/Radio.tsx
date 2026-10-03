import { forwardRef, useId } from 'react';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useRadioGroupContext } from './RadioGroupContext';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  /** Rótulo visível, obrigatório. Vira o nome acessível do controle (aria-labelledby). */
  label: ReactNode;
  /** Texto secundário abaixo do rótulo, ligado ao input por aria-describedby. */
  description?: ReactNode;
  /** Borda de erro no controle (o papel radio não admite aria-invalid; anuncie o erro no RadioGroup). Dentro de um RadioGroup, herda do grupo. */
  invalid?: boolean;
  /** Valor enviado no formulário e comparado com o `value` do RadioGroup. */
  value?: string;
}

/**
 * Botão de opção com `<input type="radio">` nativo e a mesma anatomia do
 * Checkbox: círculo de 20px com ponto interno quando marcado, foco de 3px e
 * linha com 44px de área de toque. Dentro de um `RadioGroup` herda `name`,
 * seleção, `disabled`, `invalid` e `required` do grupo. `className` vai para o
 * rótulo raiz; os demais atributos vão para o `<input>`.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    label,
    description,
    invalid = false,
    name,
    value,
    checked,
    defaultChecked,
    disabled = false,
    required = false,
    onChange,
    className,
    'aria-describedby': describedBy,
    ...rest
  },
  ref,
) {
  const group = useRadioGroupContext();
  const uid = useId();
  const labelId = `${uid}-label`;
  const hasDescription = Boolean(description);
  const descriptionId = hasDescription ? `${uid}-description` : undefined;
  const isDisabled = disabled || Boolean(group?.disabled);
  const isInvalid = invalid || Boolean(group?.invalid);
  const isRequired = required || Boolean(group?.required);
  const isChecked = group ? value !== undefined && group.value === value : checked;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    group?.onChange(event.target.value);
  };

  return (
    <label
      className={cx(
        'mdia-radio',
        isDisabled && 'mdia-radio--disabled',
        isInvalid && 'mdia-radio--invalid',
        className,
      )}
    >
      <input
        ref={ref}
        type="radio"
        className="mdia-radio__input mdia-visually-hidden"
        name={group?.name ?? name}
        value={value}
        checked={isChecked}
        defaultChecked={group ? undefined : defaultChecked}
        disabled={isDisabled}
        required={isRequired}
        onChange={handleChange}
        aria-labelledby={labelId}
        aria-describedby={cx(descriptionId, describedBy) || undefined}
        {...rest}
      />
      <span className="mdia-radio__box" aria-hidden="true" />
      <span id={labelId} className="mdia-radio__label">
        {label}
      </span>
      {hasDescription ? (
        <span id={descriptionId} className="mdia-radio__description">
          {description}
        </span>
      ) : null}
    </label>
  );
});
