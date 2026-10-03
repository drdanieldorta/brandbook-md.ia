import { forwardRef, useCallback, useEffect, useId, useRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { Check, CircleAlert, Minus } from 'lucide-react';
import { cx } from '../../utils/cx';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Rótulo visível, obrigatório. Vira o nome acessível do controle (aria-labelledby). */
  label: ReactNode;
  /** Texto secundário abaixo do rótulo, ligado ao input por aria-describedby. */
  description?: ReactNode;
  /** Marca o controle como inválido (aria-invalid e borda de erro) sem exibir mensagem. */
  invalid?: boolean;
  /** Estado "parcialmente marcado" (ex.: "Todas as áreas" com parte dos itens). Aplicado no DOM via ref. */
  indeterminate?: boolean;
  /** Mensagem de erro anunciada (role="alert") e ligada por aria-describedby; também marca o controle como inválido. */
  error?: ReactNode;
}

/**
 * Caixa de seleção com `<input type="checkbox">` nativo (teclado e leitores de
 * tela) e visual do guia (§7): caixa de 20px com raio 4px, marcado em azul vivo
 * com ícone, foco visível de 3px e linha com 44px de área de toque. Estados
 * combinam cor e ícone. `className` vai para o rótulo raiz; os demais
 * atributos vão para o `<input>`.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    description,
    invalid = false,
    indeterminate = false,
    error,
    disabled = false,
    className,
    'aria-describedby': describedBy,
    ...rest
  },
  ref,
) {
  const uid = useId();
  const labelId = `${uid}-label`;
  const hasDescription = Boolean(description);
  const hasError = Boolean(error);
  const descriptionId = hasDescription ? `${uid}-description` : undefined;
  const errorId = hasError ? `${uid}-error` : undefined;
  const isInvalid = invalid || hasError;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const setRefs = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      className={cx(
        'mdia-checkbox',
        disabled && 'mdia-checkbox--disabled',
        isInvalid && 'mdia-checkbox--invalid',
        className,
      )}
    >
      <input
        ref={setRefs}
        type="checkbox"
        className="mdia-checkbox__input mdia-visually-hidden"
        disabled={disabled}
        aria-labelledby={labelId}
        aria-describedby={cx(descriptionId, errorId, describedBy) || undefined}
        aria-invalid={isInvalid || undefined}
        {...rest}
      />
      <span className="mdia-checkbox__box" aria-hidden="true">
        <Check className="mdia-checkbox__icon mdia-checkbox__icon--check" strokeWidth={3} />
        <Minus className="mdia-checkbox__icon mdia-checkbox__icon--minus" strokeWidth={3} />
      </span>
      <span id={labelId} className="mdia-checkbox__label">
        {label}
      </span>
      {hasDescription ? (
        <span id={descriptionId} className="mdia-checkbox__description">
          {description}
        </span>
      ) : null}
      {hasError ? (
        <span id={errorId} className="mdia-checkbox__error" role="alert">
          <CircleAlert aria-hidden="true" />
          <span>{error}</span>
        </span>
      ) : null}
    </label>
  );
});
