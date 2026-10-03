import { useEffect, useId, useRef, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import { cx } from '../../utils/cx';
import { Container } from '../Container/Container';
import { IconButton } from '../IconButton/IconButton';
import { Logo, LOGO_MIN_WIDTH } from '../Logo/Logo';
import { LogoMark } from '../Logo/LogoMark';

export interface SiteHeaderLink {
  /** Rótulo visível do link, ex.: "Componentes". */
  label: string;
  href: string;
  /** Página atual: recebe `aria-current="page"` e o sublinhado de 2px. */
  current?: boolean;
}

export type SiteHeaderTone = 'default' | 'dark';

export interface SiteHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Links da navegação principal. */
  links: SiteHeaderLink[];
  /** Destino do link da marca; padrão `/`. */
  homeHref?: string;
  /** Nome acessível do link da marca (o logo padrão é decorativo); padrão "MD.IA — início". */
  brandLabel?: string;
  /**
   * Slot do logo. Por padrão renderiza o `Logo` com 160px (mínimo do guia §3) a
   * partir de 640px e o `LogoMark` de 32px abaixo disso, alternados por CSS.
   */
  logo?: ReactNode;
  /** Chamada para ação, ex.: `<ButtonLink href="#contato" size="sm">Agendar conversa</ButtonLink>`. */
  cta?: ReactNode;
  /** Fixa a barra no topo (`position: sticky`, camada `--mdia-z-sticky`); padrão `true`. */
  sticky?: boolean;
  /** `dark` aplica o escopo `mdia-dark`: fundo azul-noite, logo off-white e marca monocromática. */
  tone?: SiteHeaderTone;
  /** Rótulo do `<nav>`; padrão "Principal". */
  navLabel?: string;
  /** Rótulo do botão que abre e fecha o menu móvel; padrão "Menu". */
  menuLabel?: string;
  /** Estado inicial do menu móvel (não controlado); útil em stories e testes. */
  defaultMenuOpen?: boolean;
}

/**
 * Cabeçalho de site ou app: link da marca com o logo oficial, navegação
 * principal, chamada para ação e menu móvel abaixo de 768px (breakpoint
 * PROPOSTO v1). O painel fecha com Escape, ao clicar num link ou no botão
 * de alternância, que expõe `aria-expanded` e `aria-controls`.
 */
export function SiteHeader({
  links,
  homeHref = '/',
  brandLabel = 'MD.IA — início',
  logo,
  cta,
  sticky = true,
  tone = 'default',
  navLabel = 'Principal',
  menuLabel = 'Menu',
  defaultMenuOpen = false,
  className,
  ...rest
}: SiteHeaderProps) {
  const navId = useId();
  const [open, setOpen] = useState(defaultMenuOpen);
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const dark = tone === 'dark';

  // Escape fecha o painel enquanto ele está aberto. O listener fica no documento
  // (um `onKeyDown` no <header> é barrado pelo jsx-a11y) e devolve o foco ao
  // botão quando o foco estava dentro do painel, para não o perder ao escondê-lo.
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      if (navRef.current?.contains(document.activeElement)) toggleRef.current?.focus();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cx(
        'mdia-site-header',
        sticky && 'mdia-site-header--sticky',
        dark && 'mdia-site-header--dark',
        dark && 'mdia-dark',
        className,
      )}
      {...rest}
    >
      <Container size="lg">
        <div className="mdia-site-header__bar">
          <a className="mdia-site-header__brand" href={homeHref} aria-label={brandLabel}>
            {logo ?? (
              <>
                <Logo
                  variant={dark ? 'offwhite' : 'limpo'}
                  width={LOGO_MIN_WIDTH}
                  title=""
                  className="mdia-site-header__logo"
                />
                <LogoMark
                  variant={dark ? 'monocromatico' : 'gradiente'}
                  size={32}
                  title=""
                  className="mdia-site-header__logomark"
                />
              </>
            )}
          </a>
          <nav
            ref={navRef}
            id={navId}
            aria-label={navLabel}
            className={cx('mdia-site-header__nav', open && 'mdia-site-header__nav--open')}
          >
            <ul className="mdia-site-header__list">
              {links.map((link) => (
                <li key={link.href} className="mdia-site-header__item">
                  <a
                    className="mdia-site-header__link"
                    href={link.href}
                    aria-current={link.current ? 'page' : undefined}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            {cta != null ? <div className="mdia-site-header__cta">{cta}</div> : null}
          </nav>
          <IconButton
            ref={toggleRef}
            className="mdia-site-header__toggle"
            label={menuLabel}
            icon={open ? <X /> : <Menu />}
            aria-expanded={open}
            aria-controls={navId}
            onClick={() => setOpen((value) => !value)}
          />
        </div>
      </Container>
    </header>
  );
}
