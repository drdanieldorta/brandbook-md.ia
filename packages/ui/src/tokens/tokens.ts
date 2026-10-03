import tokensJson from './tokens.json';

/**
 * Tokens de design da MD.IA, espelho tipado de `tokens.json`.
 * Os valores do guia 4.0 são preservados; os itens em `tokens.proposals`
 * são propostas v1 pendentes de validação da marca.
 */
export const tokens = tokensJson;
export type Tokens = typeof tokens;

export type Breakpoint = keyof typeof tokens.breakpoints;

/** Media query `min-width` para um breakpoint proposto (ex.: `@media ${mediaQuery('md')}`). */
export function mediaQuery(breakpoint: Breakpoint): string {
  return `(min-width: ${tokens.breakpoints[breakpoint]}px)`;
}
