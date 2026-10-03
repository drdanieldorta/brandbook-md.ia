import type { ElementType, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

/** `lg` usa `--mdia-container-max` (1200px); `sm` 720px e `md` 960px são PROPOSTA v1; `full` ocupa 100%. */
export type ContainerSize = 'sm' | 'md' | 'lg' | 'full';
export type ContainerElement = 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'nav';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Elemento renderizado. */
  as?: ContainerElement;
  /** Largura máxima: `sm` 720px, `md` 960px, `lg` 1200px (token), `full` 100%. */
  size?: ContainerSize;
  /** Respiro horizontal de `--mdia-container-gutter` (24px); `false` encosta o conteúdo nas bordas. */
  gutter?: boolean;
}

/**
 * Centraliza o conteúdo e limita a largura. O guia (§6) não define largura de
 * container nem breakpoints; os valores são PROPOSTA v1 (tokens.json → proposals).
 */
export function Container({
  as = 'div',
  size = 'lg',
  gutter = true,
  className,
  ...rest
}: ContainerProps) {
  const Tag = as as ElementType;
  return (
    <Tag
      className={cx(
        'mdia-container',
        `mdia-container--${size}`,
        !gutter && 'mdia-container--flush',
        className,
      )}
      {...rest}
    />
  );
}
