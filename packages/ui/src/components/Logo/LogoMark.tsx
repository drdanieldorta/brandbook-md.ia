import { useId, useMemo } from 'react';
import type { SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import { LOGO_MARK_MONO_BODY, LOGO_MARK_SOURCE } from './logos.generated';

export type LogoMarkVariant = 'gradiente' | 'monocromatico';

export interface LogoMarkProps extends Omit<
  SVGAttributes<SVGSVGElement>,
  'width' | 'height' | 'children' | 'dangerouslySetInnerHTML'
> {
  /** `gradiente` reproduz o favicon oficial; `monocromatico` usa o mesmo contorno em currentColor. */
  variant?: LogoMarkVariant;
  /** Lado do quadrado em px (número) ou valor CSS. */
  size?: number | string;
  /** Texto alternativo. Use '' quando for decorativo. */
  title?: string;
}

/**
 * Marca "M" derivada do favicon oficial. Indicada para tamanhos abaixo do
 * mínimo do logo completo (160px): favicon, avatar, ícone de app.
 */
export function LogoMark({
  variant = 'gradiente',
  size = 32,
  title = 'MD.IA',
  className,
  style,
  ...rest
}: LogoMarkProps) {
  const reactId = useId();
  const html = useMemo(() => {
    const body = variant === 'gradiente' ? LOGO_MARK_SOURCE.body : LOGO_MARK_MONO_BODY;
    return {
      __html: body
        .split(LOGO_MARK_SOURCE.idPrefix)
        .join(`mdia-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}-`),
    };
  }, [reactId, variant]);
  const cssSize = typeof size === 'number' ? `${size}px` : size;
  const decorative = title === '';
  return (
    <svg
      viewBox={LOGO_MARK_SOURCE.viewBox}
      preserveAspectRatio="xMidYMid meet"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
      className={cx('mdia-logomark', `mdia-logomark--${variant}`, className)}
      style={{ width: cssSize, height: cssSize, ...style }}
      data-variant={variant}
      dangerouslySetInnerHTML={html}
      {...rest}
    />
  );
}
