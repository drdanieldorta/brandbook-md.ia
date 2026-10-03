import type { ElementType, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

/** Índice da escala de espaçamento do guia (§6): 1=4px, 2=8px, 3=12px, 4=16px, 5=24px, 6=32px, 7=48px, 8=64px, 9=96px. */
export type SpaceStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type StackDirection = 'column' | 'row';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';
export type StackElement =
  'div' | 'section' | 'ul' | 'ol' | 'nav' | 'header' | 'footer' | 'article' | 'span';

export interface StackProps extends HTMLAttributes<HTMLElement> {
  /** Elemento renderizado; `ul`/`ol` perdem marcadores e recuo. */
  as?: StackElement;
  /** `column` empilha (padrão); `row` enfileira. */
  direction?: StackDirection;
  /** Espaço entre itens pela escala: `4` → `--mdia-space-4` (16px). */
  gap?: SpaceStep;
  /** Alinhamento no eixo transversal (`align-items`). */
  align?: StackAlign;
  /** Distribuição no eixo principal (`justify-content`). */
  justify?: StackJustify;
  /** Permite quebra de linha (`flex-wrap`). */
  wrap?: boolean;
}

/** Empilha ou enfileira filhos com espaçamento da escala do guia (§6), só por classes. */
export function Stack({
  as = 'div',
  direction = 'column',
  gap = 4,
  align,
  justify,
  wrap = false,
  className,
  ...rest
}: StackProps) {
  const Tag = as as ElementType;
  return (
    <Tag
      className={cx(
        'mdia-stack',
        `mdia-stack--${direction}`,
        `mdia-stack--gap-${gap}`,
        align && `mdia-stack--align-${align}`,
        justify && `mdia-stack--justify-${justify}`,
        wrap && 'mdia-stack--wrap',
        className,
      )}
      {...rest}
    />
  );
}
