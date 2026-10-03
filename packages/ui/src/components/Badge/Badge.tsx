import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'gold';
export type BadgeVariant = 'soft' | 'solid' | 'outline';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLElement> {
  /** `gold` só aparece sobre fundo escuro (dourado sobre branco reprova em contraste, guia §4). */
  tone?: BadgeTone;
  /** `soft`: fundo claro do tom; `solid`: fundo no tom; `outline`: só contorno. */
  variant?: BadgeVariant;
  /** `md` = 24px / 14px; `sm` = 20px / 12px. */
  size?: BadgeSize;
  /** Ícone decorativo antes do rótulo. */
  icon?: ReactNode;
  /** `strong` quando o rótulo tem peso semântico; `span` por padrão. */
  as?: 'span' | 'strong';
  /** Rótulo curto, sem caixa alta forçada. */
  children: ReactNode;
}

/** Rótulo curto de status ou categoria: pílula de 24px (ou 20px), peso 600, sem caixa alta. */
export function Badge({
  tone = 'neutral',
  variant = 'soft',
  size = 'md',
  icon,
  as: Tag = 'span',
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <Tag
      className={cx(
        'mdia-badge',
        `mdia-badge--${tone}`,
        `mdia-badge--${variant}`,
        `mdia-badge--${size}`,
        className,
      )}
      {...rest}
    >
      {icon != null ? (
        <span className="mdia-badge__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </Tag>
  );
}
