import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { buttonClassName } from '../Button/Button';
import type { ButtonSize, ButtonVariant } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Nome acessível obrigatório: vira `aria-label` e, por padrão, também `title`. Ex.: "Fechar". */
  label: string;
  /** Ícone de `lucide-react`, sempre decorativo: o nome do botão vem de `label`. */
  icon: ReactNode;
  /** `ghost` (padrão): ação discreta em barras e cards. `primary` e `secondary` seguem o Button. */
  variant?: ButtonVariant;
  /** `md` tem 44px (toque mínimo do guia); `sm` reduz o visual para 36px mantendo 44px de toque; `lg` tem 52px. */
  size?: ButtonSize;
  /** Estado de carregamento: desabilita o botão (evita duplo envio) e mostra o spinner no lugar do ícone. */
  loading?: boolean;
  /**
   * Botão de alternância (ex.: favoritar): quando definido, renderiza `aria-pressed`.
   * Combine com uma mudança no ícone (ex.: preenchido) para não indicar o estado só por cor (guia §7).
   */
  pressed?: boolean;
}

/**
 * Botão quadrado só com ícone. Reutiliza variantes, foco visível de 3px e estados
 * do Button (guia §7). O rótulo acessível é obrigatório via `label`, que também
 * vira a dica (`title`). `type` é `button` por padrão.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    label,
    icon,
    variant = 'ghost',
    size = 'md',
    loading = false,
    pressed,
    disabled = false,
    type = 'button',
    title,
    className,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClassName(
        { variant, size },
        'mdia-icon-button',
        `mdia-icon-button--${size}`,
        loading && 'mdia-button--loading',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={label}
      aria-pressed={pressed}
      title={title ?? label}
      {...rest}
    >
      {loading ? (
        <Spinner
          size={size === 'sm' ? 'sm' : 'md'}
          decorative
          className="mdia-icon-button__spinner"
        />
      ) : (
        <span className="mdia-icon-button__icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
});
