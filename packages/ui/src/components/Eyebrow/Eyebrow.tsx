import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type EyebrowTone = 'brand' | 'gold' | 'secondary';
export type EyebrowElement = 'p' | 'span' | 'div' | 'h2' | 'h3';

export interface EyebrowProps extends HTMLAttributes<HTMLElement> {
  as?: EyebrowElement;
  /** `brand`: azul com ponto roxo (kicker do playbook); `gold`; `secondary`. */
  tone?: EyebrowTone;
  /** Ponto decorativo antes do texto. */
  dot?: boolean;
  children: ReactNode;
}

/** Rótulo curto acima de um título (kicker): caixa alta, 13px, espaçamento de letras. */
export function Eyebrow({
  as: Tag = 'p',
  tone = 'brand',
  dot = true,
  className,
  children,
  ...rest
}: EyebrowProps) {
  return (
    <Tag className={cx('mdia-eyebrow', `mdia-eyebrow--${tone}`, className)} {...rest}>
      {dot ? <span className="mdia-eyebrow__dot" aria-hidden="true" /> : null}
      {children}
    </Tag>
  );
}
