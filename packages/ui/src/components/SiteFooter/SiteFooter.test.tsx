import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteFooter } from './SiteFooter';

const columns = [
  {
    title: 'Marca',
    links: [
      { label: 'Essência', href: '#essencia' },
      { label: 'Logo', href: '#logo' },
    ],
  },
  {
    title: 'Sistema',
    links: [
      { label: 'Componentes', href: '#componentes' },
      { label: 'Storybook', href: '/storybook/', external: true },
    ],
  },
];

const legal = 'Conversão documental do guia 4.0. Não constitui nova aprovação da marca.';

describe('SiteFooter', () => {
  it('renderiza o contentinfo escuro com o logo off-white e a descrição', () => {
    render(
      <SiteFooter description="Consultoria e mentoria em inteligência artificial para quem lidera negócios de saúde." />,
    );
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('mdia-site-footer', 'mdia-site-footer--dark', 'mdia-dark');
    const logo = screen.getByRole('img', { name: 'MD.IA' });
    expect(logo).toHaveClass('mdia-logo', 'mdia-site-footer__logo');
    expect(logo).toHaveAttribute('data-variant', 'offwhite');
    expect(logo).toHaveStyle({ width: '160px' });
    const description = screen.getByText(/Consultoria e mentoria/);
    expect(description).toHaveClass(
      'mdia-text',
      'mdia-tone-secondary',
      'mdia-site-footer__description',
    );
    expect(footer.querySelector('.mdia-grid')).toHaveClass('mdia-grid--fluid', 'mdia-grid--gap-6');
  });

  it('no tom claro remove o escopo escuro e usa o logo limpo', () => {
    render(<SiteFooter tone="default" />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).not.toHaveClass('mdia-site-footer--dark', 'mdia-dark');
    expect(screen.getByRole('img', { name: 'MD.IA' })).toHaveAttribute('data-variant', 'limpo');
  });

  it('renderiza cada coluna como um nav nomeado pelo título em h2', () => {
    render(<SiteFooter columns={columns} />);
    const marca = screen.getByRole('navigation', { name: 'Marca' });
    const sistema = screen.getByRole('navigation', { name: 'Sistema' });
    expect(marca).toHaveClass('mdia-site-footer__column');
    const titulo = within(marca).getByRole('heading', { level: 2, name: 'Marca' });
    expect(titulo).toHaveClass('mdia-heading--subheading');
    expect(titulo.id).not.toBe('');
    expect(marca).toHaveAttribute('aria-labelledby', titulo.id);
    expect(sistema).toHaveAttribute(
      'aria-labelledby',
      within(sistema).getByRole('heading', { level: 2 }).id,
    );
    expect(
      within(marca)
        .getAllByRole('link')
        .map((link) => link.textContent),
    ).toEqual(['Essência', 'Logo']);
    const essencia = within(marca).getByRole('link', { name: 'Essência' });
    expect(essencia).toHaveAttribute('href', '#essencia');
    expect(essencia).toHaveClass('mdia-link', 'mdia-site-footer__link');
    expect(essencia).not.toHaveAttribute('target');
  });

  it('links externos abrem em nova aba com rel seguro e aviso acessível', () => {
    render(<SiteFooter columns={columns} />);
    const link = screen.getByRole('link', { name: /Storybook.*abre em nova aba/ });
    expect(link).toHaveAttribute('href', '/storybook/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renderiza a linha legal após o Divider e omite ambos sem legal', () => {
    const { rerender } = render(<SiteFooter legal={legal} />);
    const footer = screen.getByRole('contentinfo');
    const legalEl = screen.getByText(legal);
    expect(legalEl).toHaveClass(
      'mdia-text',
      'mdia-text--sm',
      'mdia-tone-secondary',
      'mdia-site-footer__legal',
    );
    const divider = footer.querySelector('.mdia-divider');
    expect(divider).toHaveClass('mdia-divider--spacing-6');
    expect(divider?.nextElementSibling).toBe(legalEl);

    rerender(<SiteFooter />);
    expect(screen.queryByText(legal)).not.toBeInTheDocument();
    expect(footer.querySelector('.mdia-divider')).toBeNull();
  });

  it('aceita logo próprio e o slot extra entre as colunas e a linha legal', () => {
    render(
      <SiteFooter logo={<span data-testid="logo-proprio">MD.IA</span>} legal={legal}>
        <p>Vamos identificar onde a IA pode apoiar sua operação.</p>
      </SiteFooter>,
    );
    const footer = screen.getByRole('contentinfo');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(footer.querySelector('.mdia-site-footer__brand')).toContainElement(
      screen.getByTestId('logo-proprio'),
    );
    const extra = screen.getByText(/Vamos identificar/).parentElement;
    expect(extra).toHaveClass('mdia-site-footer__extra');
    expect(extra?.previousElementSibling).toHaveClass('mdia-grid');
    expect(extra?.nextElementSibling).toHaveClass('mdia-divider');
  });

  it('repassa id, className e atributos ao footer', () => {
    render(<SiteFooter id="rodape" className="extra" data-testid="x" />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveAttribute('id', 'rodape');
    expect(footer).toHaveClass('mdia-site-footer', 'extra');
    expect(footer).toHaveAttribute('data-testid', 'x');
    expect(footer.querySelector('.mdia-container')).toHaveClass('mdia-container--lg');
  });
});
