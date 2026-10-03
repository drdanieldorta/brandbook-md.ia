import { forwardRef } from 'react';
import type { ElementType, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type CardTone = 'default' | 'alt' | 'dark';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardElement = 'div' | 'article' | 'section' | 'li' | 'a';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Elemento renderizado. Com `href` o padrão passa a ser `a`. */
  as?: CardElement;
  /** Destino do cartão-link (`as="a"`). */
  href?: string;
  /** `default`: superfície elevada com borda; `alt`: superfície alternativa (gelo no tema claro); `dark`: escopo `mdia-dark`, tema escuro mesmo em área clara. */
  tone?: CardTone;
  /** `sm` 16px, `md` 24px, `lg` 32px, `none` 0. */
  padding?: CardPadding;
  /** Sombra `--mdia-shadow-md` permanente. */
  elevated?: boolean;
  /** Hover eleva e escurece a borda. Padrão `true` quando o cartão é link. */
  interactive?: boolean;
}

/**
 * Superfície de conteúdo com raio de painel de 16px (guia §6). Compõe com
 * `CardHeader`, `CardBody` e `CardFooter`; com essas partes o cartão vira coluna
 * flex, o que alinha os rodapés em cartões de mesma altura (ex.: dentro de `Grid`).
 */
export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { as, href, tone = 'default', padding = 'md', elevated = false, interactive, className, ...rest },
  ref,
) {
  const element: CardElement = as ?? (href != null ? 'a' : 'div');
  const Tag = element as ElementType;
  const isLink = element === 'a';
  return (
    <Tag
      ref={ref}
      href={isLink ? href : undefined}
      className={cx(
        'mdia-card',
        tone !== 'default' && `mdia-card--${tone}`,
        tone === 'dark' && 'mdia-dark',
        `mdia-card--padding-${padding}`,
        elevated && 'mdia-card--elevated',
        (interactive ?? isLink) && 'mdia-card--interactive',
        className,
      )}
      {...rest}
    />
  );
});

export type CardPartProps = HTMLAttributes<HTMLDivElement>;

/** Cabeçalho: título à esquerda e ação ou rótulo à direita, com gap. */
export function CardHeader({ className, ...rest }: CardPartProps) {
  return <div className={cx('mdia-card__header', className)} {...rest} />;
}

/** Corpo: ocupa o espaço restante quando o cartão é esticado. */
export function CardBody({ className, ...rest }: CardPartProps) {
  return <div className={cx('mdia-card__body', className)} {...rest} />;
}

/** Rodapé: borda superior e respiro, para ações como "Ver detalhes". */
export function CardFooter({ className, ...rest }: CardPartProps) {
  return <div className={cx('mdia-card__footer', className)} {...rest} />;
}
