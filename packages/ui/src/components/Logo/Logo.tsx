import { useId, useMemo } from 'react';
import type { SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import { LOGO_SOURCES } from './logos.generated';
import type { LogoVariant } from './logos.generated';

export type { LogoVariant };

/** Prancheta do mestre (guia §3): viewBox 220 630 1160 390, proporção 116:39. */
export const LOGO_VIEWBOX = '220 630 1160 390';
export const LOGO_ASPECT_RATIO = 1160 / 390;
/** Largura preferida na tela (guia §3). */
export const LOGO_RECOMMENDED_WIDTH = 280;
/** Largura mínima da variante sem brilho em contexto já identificado (guia §3). */
export const LOGO_MIN_WIDTH = 160;
/** Proteção mínima: 1x = 30 unidades do desenho ao redor do desenho sólido (guia §3). */
export const LOGO_SAFE_SPACE_UNITS = 30;
const LOGO_VIEWBOX_WIDTH = 1160;

export const LOGO_VARIANTS: readonly LogoVariant[] = [
  'mestre',
  'limpo',
  'referencia',
  'offwhite',
  'preto',
  'branco',
  'monocromatico',
];

/** Orientação de uso de cada variante (guia §3 e docs/orientacoes-originais.txt). */
export const LOGO_VARIANT_INFO: Record<LogoVariant, { label: string; uso: string }> = {
  mestre: {
    label: 'Mestre com brilho',
    uso: 'Fundo escuro uniforme. Filtro SVG nativo; em renderizadores incompatíveis use PNG ou a variante limpa.',
  },
  limpo: {
    label: 'Limpo (apresentação priorizada)',
    uso: 'Mesmas formas e gradientes do mestre, sem filtro. Fundos claros, reprodução compacta e sistemas sem filtro.',
  },
  referencia: {
    label: 'Referência sem fundo vetorizada',
    uso: 'Reconstrução específica do PNG sem fundo; desenho distinto do mestre. Selecionar explicitamente, nunca trocar pela variante limpa.',
  },
  offwhite: { label: 'Off-white (#F5F3EE)', uso: 'Uma tinta, para fundos escuros.' },
  preto: { label: 'Preto (#000000)', uso: 'Uma tinta, para fundos claros.' },
  branco: { label: 'Branco (#FFFFFF)', uso: 'Uma tinta; "reverso" é alias desta variante.' },
  monocromatico: {
    label: 'Monocromático azul-noite (#102B50)',
    uso: 'Uma tinta, para fundos claros.',
  },
};

export interface LogoProps extends Omit<
  SVGAttributes<SVGSVGElement>,
  'width' | 'height' | 'children' | 'dangerouslySetInnerHTML'
> {
  /** Variante do logo. `limpo` é a apresentação priorizada pelo guia. */
  variant?: LogoVariant;
  /** Largura em px (número) ou valor CSS. O guia recomenda 280px e admite 160px para a variante sem brilho. */
  width?: number | string;
  /** Adiciona 1x (30 unidades do desenho) de proteção extra ao redor da prancheta completa. */
  safeSpace?: boolean;
  /** Texto alternativo. Use '' quando o logo for decorativo e o nome já estiver escrito ao lado. */
  title?: string;
}

const warned = new Set<string>();
function warnOnce(key: string, message: string) {
  if (warned.has(key)) return;
  warned.add(key);
  if (typeof console !== 'undefined') console.warn(message);
}

function isDev(): boolean {
  return typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production';
}

function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, '');
}

/**
 * Logo MD.IA renderizado a partir dos SVGs oficiais (geometria e gradientes
 * intactos). Cada instância recebe ids únicos, permitindo várias variantes na
 * mesma página sem colisão de gradientes.
 */
export function Logo({
  variant = 'limpo',
  width = LOGO_RECOMMENDED_WIDTH,
  safeSpace = false,
  title = 'MD.IA',
  className,
  style,
  ...rest
}: LogoProps) {
  const reactId = useId();
  const source = LOGO_SOURCES[variant];
  const html = useMemo(
    () => ({ __html: source.body.split(source.idPrefix).join(`mdia-${sanitizeId(reactId)}-`) }),
    [reactId, source],
  );

  if (isDev() && typeof width === 'number' && width < LOGO_MIN_WIDTH) {
    warnOnce(
      `width-${width}`,
      `[@mdia/ui] Logo com ${width}px fica abaixo do mínimo do guia (${LOGO_MIN_WIDTH}px). Use LogoMark ou o nome por escrito.`,
    );
  }

  const cssWidth = typeof width === 'number' ? `${width}px` : width;
  const decorative = title === '';
  const svg = (
    <svg
      viewBox={source.viewBox}
      preserveAspectRatio="xMidYMid meet"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
      className={cx('mdia-logo', `mdia-logo--${variant}`, className)}
      style={{
        width: cssWidth,
        height: 'auto',
        aspectRatio: `${LOGO_VIEWBOX_WIDTH} / 390`,
        ...style,
      }}
      data-variant={variant}
      dangerouslySetInnerHTML={html}
      {...rest}
    />
  );
  if (!safeSpace) return svg;

  const pad =
    typeof width === 'number'
      ? `${(width * LOGO_SAFE_SPACE_UNITS) / LOGO_VIEWBOX_WIDTH}px`
      : `calc(${width} * ${LOGO_SAFE_SPACE_UNITS / LOGO_VIEWBOX_WIDTH})`;
  return (
    <span className="mdia-logo__safe" style={{ padding: pad }} data-safe-space="">
      {svg}
    </span>
  );
}
