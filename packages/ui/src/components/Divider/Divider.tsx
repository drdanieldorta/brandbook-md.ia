import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type DividerOrientation = 'horizontal' | 'vertical';
/** Margem externa pela escala: 0, 2 (8px), 4 (16px), 6 (32px) ou 8 (64px). */
export type DividerSpacing = 0 | 2 | 4 | 6 | 8;
export type DividerTone = 'default' | 'gold';

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  orientation?: DividerOrientation;
  /** `gold`: linha em gradiente dourado que se dissolve nas pontas (identidade v2). */
  tone?: DividerTone;
  /** Margem vertical no horizontal e horizontal no vertical; padrão `4` (16px). */
  spacing?: DividerSpacing;
  /** Texto central, ex.: "ou". */
  label?: ReactNode;
  /**
   * `true` (padrão): só visual, `role="presentation"`. `false`: separador
   * semântico (`<hr>`, ou `role="separator"` quando há rótulo).
   */
  decorative?: boolean;
}

/** Linha de 1px na cor da borda (`--mdia-color-border`), com rótulo opcional. */
export function Divider({
  orientation = 'horizontal',
  tone = 'default',
  spacing = 4,
  label,
  decorative = true,
  className,
  ...rest
}: DividerProps) {
  const vertical = orientation === 'vertical';
  const classes = cx(
    'mdia-divider',
    vertical && 'mdia-divider--vertical',
    `mdia-divider--spacing-${spacing}`,
    label != null && 'mdia-divider--labeled',
    tone === 'gold' && 'mdia-divider--gold',
    className,
  );
  const ariaOrientation = !decorative && vertical ? 'vertical' : undefined;

  if (label == null) {
    return (
      <hr
        className={classes}
        role={decorative ? 'presentation' : undefined}
        aria-orientation={ariaOrientation}
        {...rest}
      />
    );
  }
  return (
    <div
      className={classes}
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={ariaOrientation}
      {...rest}
    >
      <span className="mdia-divider__label">{label}</span>
    </div>
  );
}
