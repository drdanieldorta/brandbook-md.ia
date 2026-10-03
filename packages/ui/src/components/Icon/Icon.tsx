import { useId } from 'react';
import type { LucideIcon, LucideProps } from 'lucide-react';
import { cx } from '../../utils/cx';
import { GOLD_ICON_STOPS } from '../../tokens/tokens';

export type IconTone = 'current' | 'gold' | 'brand' | 'secondary';

export interface IconProps extends Omit<LucideProps, 'ref' | 'children' | 'stroke' | 'color'> {
  /** Componente de ícone do lucide-react, ex.: `Sparkles`. */
  icon: LucideIcon;
  /** `gold`: traço em gradiente dourado (identidade v2); `brand`: azul; `secondary`: texto de apoio; `current`: herda a cor. */
  tone?: IconTone;
  /** Lado em px (padrão 24). */
  size?: number | string;
  /** Nome acessível. Sem ele o ícone é decorativo (aria-hidden) e precisa de um rótulo ao lado. */
  label?: string;
}

/**
 * Ícone do lucide-react com os tons da identidade. No tom `gold` o traço usa o
 * gradiente dourado do playbook, definido dentro do próprio SVG com id único
 * por instância (funciona em qualquer página, sem defs globais).
 */
export function Icon({
  icon: LucideIconComponent,
  tone = 'current',
  size = 24,
  label,
  className,
  strokeWidth,
  ...rest
}: IconProps) {
  const reactId = useId();
  const gradientId = `mdia-gold-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const gold = tone === 'gold';
  const a11y = label
    ? { role: 'img' as const, 'aria-label': label }
    : { 'aria-hidden': true as const };
  return (
    <LucideIconComponent
      className={cx('mdia-icon', `mdia-icon--${tone}`, className)}
      size={size}
      strokeWidth={strokeWidth ?? (gold ? 1.8 : 2)}
      stroke={gold ? `url(#${gradientId})` : 'currentColor'}
      focusable="false"
      {...a11y}
      {...rest}
    >
      {gold ? (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {GOLD_ICON_STOPS.map(([offset, color]) => (
              <stop key={offset} offset={offset} stopColor={color} />
            ))}
          </linearGradient>
        </defs>
      ) : null}
    </LucideIconComponent>
  );
}
