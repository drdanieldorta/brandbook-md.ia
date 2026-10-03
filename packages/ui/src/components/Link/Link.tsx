import { forwardRef } from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** `inverse` para fundos escuros. */
  tone?: 'default' | 'inverse';
  /** Abre em nova aba com rel seguro e aviso para leitores de tela. */
  external?: boolean;
}

/** Link de texto: azul vivo sublinhado, hover #104DAE, foco visível. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { tone = 'default', external = false, target, rel, className, children, ...rest },
  ref,
) {
  const opensNewTab = external || target === '_blank';
  return (
    <a
      ref={ref}
      className={cx('mdia-link', tone === 'inverse' && 'mdia-link--inverse', className)}
      target={opensNewTab ? '_blank' : target}
      rel={opensNewTab ? (rel ?? 'noopener noreferrer') : rel}
      {...rest}
    >
      {children}
      {opensNewTab ? <span className="mdia-visually-hidden"> (abre em nova aba)</span> : null}
    </a>
  );
});
