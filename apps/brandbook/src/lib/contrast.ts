/** Contraste WCAG 2.x entre duas cores hexadecimais (#RRGGBB). */
export function relativeLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  const channel = (i: number) => {
    const v = parseInt(clean.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
}

export function contrastRatio(foreground: string, background: string): number {
  const [light, dark] = [relativeLuminance(foreground), relativeLuminance(background)].sort(
    (a, b) => b - a,
  ) as [number, number];
  return (light + 0.05) / (dark + 0.05);
}

export type ContrastLevel = 'AA' | 'AA grande' | 'Reprova';

/** Classificação para texto comum (4,5:1) e texto grande/componentes (3:1). */
export function contrastLevel(ratio: number): ContrastLevel {
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA grande';
  return 'Reprova';
}

export function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2).replace('.', ',')}:1`;
}
