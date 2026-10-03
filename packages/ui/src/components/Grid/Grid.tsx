import type { CSSProperties, ElementType, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { SpaceStep } from '../Stack/Stack';

export type GridColumns = 1 | 2 | 3 | 4 | 6 | 12;
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';
export type GridElement = 'div' | 'section' | 'ul' | 'ol' | 'article';

/** Estilo inline do Grid: só a custom property lida pelo CSS. */
interface GridStyle extends CSSProperties {
  '--mdia-grid-min'?: string;
}

export interface GridProps extends HTMLAttributes<HTMLElement> {
  /** Elemento renderizado; `ul`/`ol` perdem marcadores e recuo. */
  as?: GridElement;
  /**
   * Colunas fixas. Responsivo pelos breakpoints propostos: abaixo de 768px (md)
   * 3+ colunas viram 1; 2 colunas viram 1 abaixo de 640px (sm).
   */
  columns?: GridColumns;
  /**
   * Largura mínima de cada item (ex.: `'280px'`): gera
   * `repeat(auto-fit, minmax(min(100%, X), 1fr))` e tem precedência sobre `columns`.
   */
  minItemWidth?: string;
  /** Espaço entre células pela escala: `5` → `--mdia-space-5` (24px). */
  gap?: SpaceStep;
  /** Alinhamento vertical das células (`align-items`). */
  align?: GridAlign;
}

/**
 * Grade CSS com colunas fixas ou fluidas. A largura mínima do item é a única
 * exceção a "sem estilo inline": vai na custom property `--mdia-grid-min`.
 */
export function Grid({
  as = 'div',
  columns = 1,
  minItemWidth,
  gap = 5,
  align,
  className,
  style,
  ...rest
}: GridProps) {
  const Tag = as as ElementType;
  const fluid = minItemWidth != null;
  const gridStyle: GridStyle | undefined = fluid
    ? { ...style, '--mdia-grid-min': minItemWidth }
    : style;
  return (
    <Tag
      className={cx(
        'mdia-grid',
        fluid ? 'mdia-grid--fluid' : `mdia-grid--cols-${columns}`,
        `mdia-grid--gap-${gap}`,
        align && `mdia-grid--align-${align}`,
        className,
      )}
      style={gridStyle}
      {...rest}
    />
  );
}
