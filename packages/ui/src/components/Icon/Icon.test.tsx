import { render, screen } from '@testing-library/react';
import { Sparkles } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { Icon } from './Icon';

describe('Icon', () => {
  it('é decorativo por padrão e herda a cor', () => {
    const { container } = render(<Icon icon={Sparkles} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveClass('mdia-icon', 'mdia-icon--current');
  });

  it('no tom dourado define o gradiente dentro do próprio SVG', () => {
    const { container } = render(<Icon icon={Sparkles} tone="gold" />);
    const svg = container.querySelector('svg');
    const gradient = container.querySelector('linearGradient');
    expect(gradient).not.toBeNull();
    expect(svg).toHaveAttribute('stroke', `url(#${gradient?.id})`);
    expect(container.querySelectorAll('stop')).toHaveLength(5);
  });

  it('com rótulo vira imagem nomeada', () => {
    render(<Icon icon={Sparkles} label="Dados protegidos" />);
    expect(screen.getByRole('img', { name: 'Dados protegidos' })).toBeInTheDocument();
  });

  it('aplica tamanho e tom', () => {
    const { container } = render(<Icon icon={Sparkles} tone="brand" size={32} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveClass('mdia-icon--brand');
  });
});
