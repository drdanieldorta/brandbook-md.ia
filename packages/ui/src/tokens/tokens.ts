import tokensJson from './tokens.json';

/**
 * Tokens de design da MD.IA, espelho tipado de `tokens.json`.
 * Os valores do guia 4.0 ficam em `colors`; a identidade escura (proposta v2)
 * em `identity` e `gradients`; `proposals` lista o que aguarda validação.
 */
export const tokens = tokensJson;
export type Tokens = typeof tokens;

export type Breakpoint = keyof typeof tokens.breakpoints;

/** Media query `min-width` para um breakpoint proposto (ex.: `@media ${mediaQuery('md')}`). */
export function mediaQuery(breakpoint: Breakpoint): string {
  return `(min-width: ${tokens.breakpoints[breakpoint]}px)`;
}

/** Paradas do gradiente dourado usado em ícones (offset, cor). */
export const GOLD_ICON_STOPS: ReadonlyArray<readonly [string, string]> =
  tokens.gradients.goldIconStops.map(
    ([offset, color]) => [offset ?? '0', color ?? '#E3B777'] as const,
  );
