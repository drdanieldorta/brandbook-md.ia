import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerTone = 'current' | 'brand' | 'inverse';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  /** `current` herda a cor do texto; `brand` usa o azul vivo; `inverse` usa branco. */
  tone?: SpinnerTone;
  /** Texto anunciado a leitores de tela. */
  label?: string;
  /** Oculta de tecnologias assistivas quando o contexto já anuncia o estado (ex.: botão com aria-busy). */
  decorative?: boolean;
}

/**
 * Indicador de carregamento. Única animação contínua da biblioteca, por ser
 * funcional; com `prefers-reduced-motion` ela fica estática (guia §10).
 */
export function Spinner({
  size = 'md',
  tone = 'current',
  label = 'Carregando…',
  decorative = false,
  className,
  ...rest
}: SpinnerProps) {
  return (
    <span
      className={cx(
        'mdia-spinner',
        `mdia-spinner--${size}`,
        tone !== 'current' && `mdia-spinner--${tone}`,
        className,
      )}
      role={decorative ? undefined : 'status'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
      {...rest}
    />
  );
}
