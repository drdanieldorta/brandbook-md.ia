import type { ElementType, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Container } from '../Container/Container';
import type { ContainerSize } from '../Container/Container';

export type SectionTone = 'default' | 'alt' | 'dark';
/** Respiro vertical: `sm` 48px, `md` 64px, `lg` 96px; um degrau a menos abaixo de 768px. */
export type SectionSpacing = 'sm' | 'md' | 'lg';
export type SectionElement = 'section' | 'div' | 'header' | 'footer';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Elemento renderizado. */
  as?: SectionElement;
  /** `default`: superfície; `alt`: superfície alternativa (gelo no tema claro); `dark`: fundo da página com escopo `mdia-dark`. */
  tone?: SectionTone;
  /** Padding vertical pela escala: `sm` 48px, `md` 64px, `lg` 96px. */
  spacing?: SectionSpacing;
  /** Envolve os filhos em um `Container` (padrão `true`). */
  contained?: boolean;
  /** Tamanho do `Container` interno; padrão `lg`. */
  containerSize?: ContainerSize;
}

/**
 * Faixa de página com fundo e respiro vertical. Com `tone="dark"` aplica o
 * escopo `mdia-dark`, e os componentes internos passam a usar o tema escuro.
 * Dê nome à faixa com `aria-labelledby` apontando para o seu `Heading`.
 */
export function Section({
  as = 'section',
  tone = 'default',
  spacing = 'md',
  contained = true,
  containerSize = 'lg',
  className,
  children,
  ...rest
}: SectionProps) {
  const Tag = as as ElementType;
  return (
    <Tag
      className={cx(
        'mdia-section',
        tone !== 'default' && `mdia-section--${tone}`,
        tone === 'dark' && 'mdia-dark',
        `mdia-section--${spacing}`,
        className,
      )}
      {...rest}
    >
      {contained ? <Container size={containerSize}>{children}</Container> : children}
    </Tag>
  );
}
