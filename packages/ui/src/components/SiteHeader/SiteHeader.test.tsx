import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ButtonLink } from '../Button/Button';
import { SiteHeader } from './SiteHeader';

const links = [
  { label: 'Essência', href: '#essencia' },
  { label: 'Logo', href: '#logo' },
  { label: 'Cores', href: '#cores', current: true },
  { label: 'Componentes', href: '#componentes' },
];

describe('SiteHeader', () => {
  it('renderiza o banner fixo, o link da marca e a navegação nomeada com a página atual', () => {
    render(<SiteHeader links={links} />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('mdia-site-header', 'mdia-site-header--sticky');
    expect(header).not.toHaveClass('mdia-site-header--dark', 'mdia-dark');

    const brand = screen.getByRole('link', { name: 'MD.IA — início' });
    expect(brand).toHaveAttribute('href', '/');
    expect(brand).toHaveClass('mdia-site-header__brand');

    const nav = screen.getByRole('navigation', { name: 'Principal' });
    const items = within(nav).getAllByRole('link');
    expect(items.map((item) => item.textContent)).toEqual([
      'Essência',
      'Logo',
      'Cores',
      'Componentes',
    ]);
    expect(within(nav).getByRole('link', { name: 'Cores' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(within(nav).getByRole('link', { name: 'Logo' })).not.toHaveAttribute('aria-current');
    expect(within(nav).getByRole('link', { name: 'Logo' })).toHaveAttribute('href', '#logo');
  });

  it('por padrão renderiza o logo limpo de 160px e o LogoMark, ambos decorativos', () => {
    render(<SiteHeader links={links} />);
    const brand = screen.getByRole('link', { name: 'MD.IA — início' });
    const logo = brand.querySelector('.mdia-site-header__logo');
    const mark = brand.querySelector('.mdia-site-header__logomark');
    expect(logo).toHaveClass('mdia-logo');
    expect(logo).toHaveAttribute('data-variant', 'limpo');
    expect(logo).toHaveAttribute('aria-hidden', 'true');
    expect(logo).toHaveStyle({ width: '160px' });
    expect(mark).toHaveClass('mdia-logomark');
    expect(mark).toHaveAttribute('data-variant', 'gradiente');
    expect(mark).toHaveAttribute('aria-hidden', 'true');
    expect(mark).toHaveStyle({ width: '32px' });
  });

  it('no tom escuro aplica o escopo mdia-dark, o logo off-white e a marca monocromática', () => {
    render(<SiteHeader links={links} tone="dark" />);
    expect(screen.getByRole('banner')).toHaveClass('mdia-site-header--dark', 'mdia-dark');
    const brand = screen.getByRole('link', { name: 'MD.IA — início' });
    expect(brand.querySelector('.mdia-logo')).toHaveAttribute('data-variant', 'offwhite');
    expect(brand.querySelector('.mdia-logomark')).toHaveAttribute('data-variant', 'monocromatico');
  });

  it('aceita destino e rótulo da marca, rótulos do nav e do menu e um logo próprio', () => {
    render(
      <SiteHeader
        links={links}
        homeHref="/inicio"
        brandLabel="Brandbook MD.IA"
        navLabel="Seções"
        menuLabel="Abrir seções"
        logo={<span data-testid="logo-proprio">MD.IA</span>}
      />,
    );
    const brand = screen.getByRole('link', { name: 'Brandbook MD.IA' });
    expect(brand).toHaveAttribute('href', '/inicio');
    expect(brand).toContainElement(screen.getByTestId('logo-proprio'));
    expect(brand.querySelector('.mdia-logo')).toBeNull();
    expect(screen.getByRole('navigation', { name: 'Seções' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Abrir seções' })).toBeInTheDocument();
  });

  it('o botão de menu alterna aria-expanded, controla o nav e troca o ícone', async () => {
    const user = userEvent.setup();
    render(<SiteHeader links={links} />);
    const toggle = screen.getByRole('button', { name: 'Menu' });
    const nav = screen.getByRole('navigation', { name: 'Principal' });
    expect(nav.id).not.toBe('');
    expect(toggle).toHaveAttribute('aria-controls', nav.id);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle.querySelector('svg')).toHaveClass('lucide-menu');
    expect(nav).not.toHaveClass('mdia-site-header__nav--open');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle.querySelector('svg')).toHaveClass('lucide-x');
    expect(nav).toHaveClass('mdia-site-header__nav--open');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(nav).not.toHaveClass('mdia-site-header__nav--open');
  });

  it('defaultMenuOpen abre o menu de início', () => {
    render(<SiteHeader links={links} defaultMenuOpen />);
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: 'Principal' })).toHaveClass(
      'mdia-site-header__nav--open',
    );
  });

  it('Escape fecha o menu e devolve o foco ao botão quando o foco estava no painel', async () => {
    const user = userEvent.setup();
    render(<SiteHeader links={links} defaultMenuOpen />);
    const toggle = screen.getByRole('button', { name: 'Menu' });
    screen.getByRole('link', { name: 'Essência' }).focus();
    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('navigation', { name: 'Principal' })).not.toHaveClass(
      'mdia-site-header__nav--open',
    );
    expect(toggle).toHaveFocus();
  });

  it('Escape com o menu fechado não altera nada', async () => {
    const user = userEvent.setup();
    render(<SiteHeader links={links} />);
    const toggle = screen.getByRole('button', { name: 'Menu' });
    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).not.toHaveFocus();
  });

  it('clicar num link fecha o menu', async () => {
    const user = userEvent.setup();
    render(<SiteHeader links={links} defaultMenuOpen />);
    await user.click(screen.getByRole('link', { name: 'Componentes' }));
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('renderiza a chamada para ação dentro do nav e a omite quando ausente', () => {
    const { rerender } = render(
      <SiteHeader
        links={links}
        cta={
          <ButtonLink href="#contato" size="sm">
            Agendar conversa
          </ButtonLink>
        }
      />,
    );
    const nav = screen.getByRole('navigation', { name: 'Principal' });
    const cta = within(nav).getByRole('link', { name: 'Agendar conversa' });
    expect(cta).toHaveClass('mdia-button');
    expect(cta.parentElement).toHaveClass('mdia-site-header__cta');

    rerender(<SiteHeader links={links} />);
    expect(screen.queryByRole('link', { name: 'Agendar conversa' })).not.toBeInTheDocument();
    expect(nav.querySelector('.mdia-site-header__cta')).toBeNull();
  });

  it('sem sticky remove a classe fixa e repassa id, className e atributos', () => {
    render(<SiteHeader links={links} sticky={false} id="topo" className="extra" data-testid="x" />);
    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('mdia-site-header--sticky');
    expect(header).toHaveClass('mdia-site-header', 'extra');
    expect(header).toHaveAttribute('id', 'topo');
    expect(header).toHaveAttribute('data-testid', 'x');
  });
});
