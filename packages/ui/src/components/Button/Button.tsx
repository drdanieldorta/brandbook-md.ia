import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { ClassValue } from '../../utils/cx';
import { Spinner } from '../Spinner/Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonStyleProps {
  /** `primary`: azul vivo (uma por contexto). `secondary`: contorno azul-noite. `ghost`: ação discreta. */
  variant?: ButtonVariant;
  /** `md` tem 44px de altura (toque mínimo do guia); `sm` reduz o visual mantendo 44px de área de toque. */
  size?: ButtonSize;
  fullWidth?: boolean;
}

interface ButtonContentProps extends ButtonStyleProps {
  /** Ícone antes do rótulo (decorativo; o rótulo continua obrigatório). */
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  /** Rótulo com verbo claro, ex.: "Agendar conversa". */
  children: ReactNode;
}

export interface ButtonProps
  extends ButtonContentProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Estado de carregamento: desabilita o botão (evita duplo envio) e mostra o spinner. */
  loading?: boolean;
  /** Rótulo exibido durante o carregamento, ex.: "Salvando…". */
  loadingLabel?: ReactNode;
}

export function buttonClassName(
  { variant = 'primary', size = 'md', fullWidth = false }: ButtonStyleProps,
  ...extra: ClassValue[]
): string {
  return cx(
    'mdia-button',
    `mdia-button--${variant}`,
    `mdia-button--${size}`,
    fullWidth && 'mdia-button--full',
    ...extra,
  );
}

function ButtonContent({
  iconStart,
  iconEnd,
  loading = false,
  loadingLabel,
  children,
}: Pick<ButtonProps, 'iconStart' | 'iconEnd' | 'loading' | 'loadingLabel' | 'children'>) {
  return (
    <>
      {loading ? (
        <Spinner size="sm" decorative className="mdia-button__spinner" />
      ) : iconStart ? (
        <span className="mdia-button__icon" aria-hidden="true">
          {iconStart}
        </span>
      ) : null}
      <span className="mdia-button__label">
        {loading && loadingLabel != null ? loadingLabel : children}
      </span>
      {iconEnd && !loading ? (
        <span className="mdia-button__icon" aria-hidden="true">
          {iconEnd}
        </span>
      ) : null}
    </>
  );
}

/**
 * Botão do guia 4.0 (§7): raio 8px, área de toque 44px, foco visível de 3px,
 * principal azul com hover #104DAE, secundário com contorno azul-noite e ação
 * discreta transparente. `type` é `button` por padrão.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    size,
    fullWidth,
    iconStart,
    iconEnd,
    loading = false,
    loadingLabel,
    disabled = false,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClassName(
        { variant, size, fullWidth },
        loading && 'mdia-button--loading',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      <ButtonContent
        iconStart={iconStart}
        iconEnd={iconEnd}
        loading={loading}
        loadingLabel={loadingLabel}
      >
        {children}
      </ButtonContent>
    </button>
  );
});

export interface ButtonLinkProps
  extends ButtonContentProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> {
  href: string;
  /** Remove o destino e marca o link como desabilitado. */
  disabled?: boolean;
}

/** Link com a aparência de botão, para navegação (ex.: chamada para ação no hero). */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  {
    variant,
    size,
    fullWidth,
    iconStart,
    iconEnd,
    disabled = false,
    href,
    onClick,
    className,
    children,
    ...rest
  },
  ref,
) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };
  return (
    <a
      ref={ref}
      href={disabled ? undefined : href}
      role={disabled ? 'link' : undefined}
      aria-disabled={disabled || undefined}
      className={buttonClassName({ variant, size, fullWidth }, className)}
      onClick={handleClick}
      {...rest}
    >
      <ButtonContent iconStart={iconStart} iconEnd={iconEnd}>
        {children}
      </ButtonContent>
    </a>
  );
});
