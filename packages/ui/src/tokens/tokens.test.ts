import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { mediaQuery, tokens } from './tokens';

const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf8').toLowerCase();

function collectHex(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') {
    for (const m of value.matchAll(/#[0-9a-f]{6}\b/gi)) out.push(m[0].toLowerCase());
  } else if (Array.isArray(value)) {
    value.forEach((v) => collectHex(v, out));
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((v) => collectHex(v, out));
  }
  return out;
}

describe('tokens', () => {
  it('preserva os valores do guia 4.0', () => {
    expect(tokens.colors.blue).toBe('#1761D8');
    expect(tokens.colors.navy).toBe('#102B50');
    expect(tokens.colors.gold).toBe('#C6A45C');
    expect(tokens.colors.purple).toBe('#8056C7');
    expect(tokens.colors.ice).toBe('#F3F6FA');
    expect(tokens.spacing).toEqual([4, 8, 12, 16, 24, 32, 48, 64, 96]);
    expect(tokens.radius.button).toBe('8px');
    expect(tokens.radius.panel).toBe('16px');
    expect(tokens.motion.feedback).toBe('180ms');
    expect(tokens.logo.viewBox).toBe('220 630 1160 390');
  });

  it('declara em tokens.css toda cor presente em tokens.json', () => {
    const missing = [...new Set(collectHex(tokens))].filter((hex) => !css.includes(hex));
    expect(missing).toEqual([]);
  });

  it('mantém os nomes originais de mdia-tokens.css como aliases', () => {
    for (const name of [
      '--mdia-blue',
      '--mdia-navy',
      '--mdia-gold',
      '--mdia-purple',
      '--mdia-ice',
      '--mdia-font',
      '--mdia-radius',
      '--mdia-motion',
    ]) {
      expect(css).toContain(`${name}:`);
    }
  });

  it('gera media queries a partir dos breakpoints propostos', () => {
    expect(mediaQuery('md')).toBe('(min-width: 768px)');
  });
});
