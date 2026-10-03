import { describe, expect, it } from 'vitest';
import * as icons from './icons';

describe('icons', () => {
  it('expõe o conjunto da marca com componentes lucide', () => {
    const names = Object.keys(icons);
    expect(names.length).toBeGreaterThanOrEqual(40);
    expect(names).toEqual(expect.arrayContaining(['Sparkles', 'Stethoscope', 'ShieldCheck']));
    for (const name of names) {
      const value = icons[name as keyof typeof icons];
      expect(['function', 'object']).toContain(typeof value);
      expect(/^[A-Z]/.test(name)).toBe(true);
    }
  });
});
