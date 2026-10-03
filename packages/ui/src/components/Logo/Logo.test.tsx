import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Logo, LOGO_VARIANTS } from './Logo';
import { LogoMark } from './LogoMark';
import { LOGO_SOURCES } from './logos.generated';

const LOGOS_DIR = resolve(__dirname, '../../../../../public/assets/brand/logos');

describe('Logo', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza a prancheta completa do guia com texto alternativo', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '220 630 1160 390');
    expect(svg).toHaveAttribute('role', 'img');
    expect(svg).toHaveAttribute('aria-label', 'MD.IA');
    expect(svg).toHaveStyle({ width: '280px' });
  });

  it.each(LOGO_VARIANTS)('preserva todos os paths do SVG oficial da variante %s', (variant) => {
    const original = readFileSync(resolve(LOGOS_DIR, LOGO_SOURCES[variant].file), 'utf8');
    const paths = original.match(/\bd="[^"]+"/g) ?? [];
    expect(paths.length).toBeGreaterThan(0);
    const { container } = render(<Logo variant={variant} />);
    const html = container.innerHTML;
    for (const d of paths) expect(html).toContain(d);
  });

  it('mantém o filtro do mestre e o remove da variante limpa', () => {
    const { container: mestre } = render(<Logo variant="mestre" />);
    const { container: limpo } = render(<Logo variant="limpo" />);
    expect(mestre.querySelector('filter')).not.toBeNull();
    expect(limpo.querySelector('filter')).toBeNull();
  });

  it('gera ids únicos por instância para não colidir gradientes', () => {
    const { container } = render(
      <>
        <Logo variant="limpo" />
        <Logo variant="limpo" />
      </>,
    );
    const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
    const fills = container.innerHTML.match(/url\(#([^)]+)\)/g) ?? [];
    for (const fill of fills) {
      const id = fill.slice(5, -1);
      expect(container.querySelector(`[id="${id}"]`)).not.toBeNull();
    }
  });

  it('aceita uso decorativo sem papel de imagem', () => {
    const { container } = render(<Logo title="" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).not.toHaveAttribute('role');
  });

  it('acrescenta a proteção de 30 unidades proporcional à largura', () => {
    const { container } = render(<Logo width={580} safeSpace />);
    const frame = container.querySelector('.mdia-logo__safe');
    expect(frame).toHaveStyle({ padding: '15px' });
  });

  it('avisa em desenvolvimento quando a largura fica abaixo do mínimo do guia', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Logo width={120} />);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('160px'));
  });
});

describe('LogoMark', () => {
  it('renderiza o M do favicon oficial', () => {
    const { container } = render(<LogoMark size={24} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '440 640 224 210');
    expect(svg).toHaveStyle({ width: '24px', height: '24px' });
    expect(container.querySelector('linearGradient')).not.toBeNull();
  });

  it('usa currentColor na versão monocromática', () => {
    const { container } = render(<LogoMark variant="monocromatico" />);
    expect(container.querySelector('linearGradient')).toBeNull();
    expect(container.querySelector('path')).toHaveAttribute('fill', 'currentColor');
  });
});
