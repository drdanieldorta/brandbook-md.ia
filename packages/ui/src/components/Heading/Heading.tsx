import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { TextAlign, TextTone } from '../Text/Text';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
/** `display` 56–64px, `title` 32–40px (guia §5); `heading` 24px e `subheading` 20px (propostas). */
export type HeadingSize = 'display' | 'title' | 'heading' | 'subheading';

const DEFAULT_SIZE: Record<HeadingLevel, HeadingSize> = {
  1: 'display',
  2: 'title',
  3: 'heading',
  4: 'subheading',
  5: 'subheading',
  6: 'subheading',
};

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Nível semântico (h1–h6). */
  level?: HeadingLevel;
  /** Tamanho visual, independente do nível. */
  size?: HeadingSize;
  tone?: TextTone;
  align?: TextAlign;
  /** Equilibra a quebra de linha (text-wrap: balance). */
  balance?: boolean;
}

/** Títulos do guia (§5): peso 600, entrelinha 1,1, um título por tela. */
export function Heading({
  level = 2,
  size,
  tone = 'default',
  align,
  balance = false,
  className,
  ...rest
}: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      className={cx(
        'mdia-heading',
        `mdia-heading--${size ?? DEFAULT_SIZE[level]}`,
        tone !== 'default' && `mdia-tone-${tone}`,
        align && `mdia-align-${align}`,
        balance && 'mdia-heading--balance',
        className,
      )}
      {...rest}
    />
  );
}
