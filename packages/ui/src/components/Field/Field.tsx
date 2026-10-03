import { createContext, useContext, useId } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { CircleAlert } from 'lucide-react';
import { cx } from '../../utils/cx';

export interface FieldContextValue {
  /** `id` do controle; o `<label for>` do Field aponta para ele. */
  id: string;
  /** ids da dica e do erro (separados por espaço) para `aria-describedby`; `undefined` sem nenhum dos dois. */
  describedBy: string | undefined;
  /** `true` quando o Field tem `error`. */
  invalid: boolean;
  required: boolean;
  disabled?: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/**
 * Lê o contexto do `Field` mais próximo. Retorna `null` fora de um Field, para que
 * `TextInput`, `TextArea` e `Select` funcionem sozinhos.
 */
export function useFieldContext(): FieldContextValue | null {
  return useContext(FieldContext);
}

export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  /** Rótulo visível, sempre presente (guia §7). */
  label: ReactNode;
  /** Texto de apoio entre o rótulo e o controle, anunciado via `aria-describedby`. */
  hint?: ReactNode;
  /** Mensagem de erro: estado inválido, `aria-invalid` no controle e anúncio com `role="alert"`. */
  error?: ReactNode;
  /** Mostra o indicador de obrigatório e passa `required` ao controle. */
  required?: boolean;
  /** Passa `disabled` ao controle e esmaece rótulo e dica. */
  disabled?: boolean;
  /** Texto entre parênteses após o rótulo quando o campo não é obrigatório, ex.: "opcional". */
  optionalText?: string;
  /** `id` do controle (gerado com `useId` se ausente). Não é aplicado ao `<div>`. */
  id?: string;
  children?: ReactNode;
}

function hasContent(node: ReactNode): boolean {
  return node != null && node !== false && node !== '';
}

/**
 * Invólucro acessível de um controle de formulário (guia §7): rótulo associado,
 * dica e erro ligados por `aria-describedby`, erro com ícone e texto (nunca só por
 * cor). `TextInput`, `TextArea` e `Select` leem o contexto automaticamente.
 */
export function Field({
  label,
  hint,
  error,
  required = false,
  disabled = false,
  optionalText,
  id: idProp,
  className,
  children,
  ...rest
}: FieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const showHint = hasContent(hint);
  const showError = hasContent(error);
  const describedBy = cx(showHint && hintId, showError && errorId) || undefined;

  return (
    <div
      className={cx(
        'mdia-field',
        showError && 'mdia-field--invalid',
        disabled && 'mdia-field--disabled',
        className,
      )}
      {...rest}
    >
      <label className="mdia-field__label" htmlFor={id}>
        {label}
        {required ? (
          <>
            {' '}
            <span className="mdia-field__required" aria-hidden="true">
              *
            </span>
          </>
        ) : optionalText ? (
          <>
            {' '}
            <span className="mdia-field__optional">({optionalText})</span>
          </>
        ) : null}
      </label>
      {showHint ? (
        <p id={hintId} className="mdia-field__hint">
          {hint}
        </p>
      ) : null}
      <FieldContext.Provider value={{ id, describedBy, invalid: showError, required, disabled }}>
        {children}
      </FieldContext.Provider>
      {showError ? (
        <p id={errorId} className="mdia-field__error" role="alert">
          <CircleAlert className="mdia-field__error-icon" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}
