import type { ElementType, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type TextTone =
  | 'default'
  | 'secondary'
  | 'disabled'
  | 'inverse'
  | 'brand'
  | 'gold'
  | 'success'
  | 'warning'
  | 'error';
export type TextAlign = 'start' | 'center' | 'end';
export type TextSize = 'lg' | 'md' | 'sm' | 'caption';
export type TextWeight = 'regular' | 'semibold';
export type TextElement =
  'p' | 'span' | 'div' | 'label' | 'small' | 'strong' | 'em' | 'figcaption' | 'li' | 'dt' | 'dd';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Elemento renderizado. */
  as?: TextElement;
  /** `md` = 16px (token base); `lg` = 18px; `sm` = 14px; `caption` = 12px (proposta). */
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  align?: TextAlign;
  /** Limita a largura a 65 caracteres (intervalo 45–75 do guia). */
  measure?: boolean;
  htmlFor?: string;
}

/** Texto corrido do guia (§5): 16–18px, entrelinha 1,6, sem caixa alta em parágrafos. */
export function Text({
  as = 'p',
  size = 'md',
  weight = 'regular',
  tone = 'default',
  align,
  measure = false,
  className,
  ...rest
}: TextProps) {
  const Tag = as as ElementType;
  return (
    <Tag
      className={cx(
        'mdia-text',
        size !== 'md' && `mdia-text--${size}`,
        weight === 'semibold' && 'mdia-text--semibold',
        tone !== 'default' && `mdia-tone-${tone}`,
        align && `mdia-align-${align}`,
        measure && 'mdia-text--measure',
        className,
      )}
      {...rest}
    />
  );
}
