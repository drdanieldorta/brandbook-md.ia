import { forwardRef, useId, useState } from 'react';
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cx } from '../../utils/cx';

export type SwitchSize = 'md' | 'sm';

export interface SwitchProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'role' | 'onChange' | 'children'
> {
  /** Rótulo visível, obrigatório, renderizado ao lado e ligado por aria-labelledby. */
  label: ReactNode;
  /** Texto secundário abaixo do rótulo, ligado por aria-describedby. */
  description?: ReactNode;
  /** Estado ligado (modo controlado). */
  checked?: boolean;
  /** Estado inicial (modo não controlado). */
  defaultChecked?: boolean;
  /** Recebe o novo estado a cada alternância. */
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** `md`: trilho 44×24px; `sm`: 36×20px. Ambos mantêm 44px de área de toque. */
  size?: SwitchSize;
}

/**
 * Alternância ligado/desligado com `<button role="switch" aria-checked>`:
 * Espaço/Enter alternam, o rótulo ao lado também. O estado ligado combina cor
 * (azul vivo), posição do polegar e ícone de check (guia §7: nunca só cor).
 * Não participa do envio nativo de formulário; use `checked`/`onCheckedChange`.
 * `className` vai para o rótulo raiz; os demais atributos vão para o `<button>`.
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    label,
    description,
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
    size = 'md',
    id,
    className,
    onClick,
    'aria-describedby': describedBy,
    ...rest
  },
  ref,
) {
  const uid = useId();
  const controlId = id ?? `${uid}-control`;
  const labelId = `${uid}-label`;
  const hasDescription = Boolean(description);
  const descriptionId = hasDescription ? `${uid}-description` : undefined;
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = checked ?? internalChecked;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <label
      htmlFor={controlId}
      className={cx(
        'mdia-switch',
        `mdia-switch--${size}`,
        disabled && 'mdia-switch--disabled',
        className,
      )}
    >
      <button
        ref={ref}
        id={controlId}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-labelledby={labelId}
        aria-describedby={cx(descriptionId, describedBy) || undefined}
        className="mdia-switch__control"
        disabled={disabled}
        onClick={handleClick}
        {...rest}
      >
        <span className="mdia-switch__thumb" aria-hidden="true">
          <Check className="mdia-switch__icon" strokeWidth={3} />
        </span>
      </button>
      <span id={labelId} className="mdia-switch__label">
        {label}
      </span>
      {hasDescription ? (
        <span id={descriptionId} className="mdia-switch__description">
          {description}
        </span>
      ) : null}
    </label>
  );
});
