import { useId } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Container } from '../Container/Container';
import { Divider } from '../Divider/Divider';
import { Grid } from '../Grid/Grid';
import { Heading } from '../Heading/Heading';
import { Link } from '../Link/Link';
import { Logo, LOGO_MIN_WIDTH } from '../Logo/Logo';
import { Text } from '../Text/Text';

export interface SiteFooterLink {
  label: string;
  href: string;
  /** Abre em nova aba com rel seguro e aviso para leitores de tela (prop `external` do Link). */
  external?: boolean;
}

export interface SiteFooterColumn {
  /** Título da coluna; também nomeia o `<nav>` via `aria-labelledby`. */
  title: string;
  links: SiteFooterLink[];
}

export type SiteFooterTone = 'dark' | 'default';

export interface SiteFooterProps extends HTMLAttributes<HTMLElement> {
  /** `dark` (padrão): fundo da página com escopo `mdia-dark` e logo off-white; `default`: superfície e logo limpo. */
  tone?: SiteFooterTone;
  /** Slot do logo; por padrão o `Logo` de 160px na variante do tom, com nome "MD.IA". */
  logo?: ReactNode;
  /** Texto curto sob o logo, ex.: "Consultoria e mentoria em inteligência artificial para quem lidera negócios de saúde." */
  description?: ReactNode;
  /** Colunas de links; cada uma vira um `<nav>` nomeado pelo título. */
  columns?: SiteFooterColumn[];
  /** Linha final, ex.: "Conversão documental do guia 4.0. Não constitui nova aprovação da marca." */
  legal?: ReactNode;
  /** Slot extra entre as colunas e a linha legal. */
  children?: ReactNode;
}

/**
 * Rodapé de site: coluna da marca (logo oficial e descrição) e colunas de
 * links em grade fluida, seguidas da linha legal separada por `Divider`.
 * Respiro vertical de 64px (48px abaixo de 768px, breakpoint PROPOSTO v1).
 */
export function SiteFooter({
  tone = 'dark',
  logo,
  description,
  columns = [],
  legal,
  className,
  children,
  ...rest
}: SiteFooterProps) {
  const baseId = useId();
  const dark = tone === 'dark';
  return (
    <footer
      className={cx(
        'mdia-site-footer',
        dark && 'mdia-site-footer--dark',
        dark && 'mdia-dark',
        className,
      )}
      {...rest}
    >
      <Container size="lg">
        <Grid minItemWidth="220px" gap={6} className="mdia-site-footer__grid">
          <div className="mdia-site-footer__brand">
            {logo ?? (
              <Logo
                variant={dark ? 'offwhite' : 'limpo'}
                width={LOGO_MIN_WIDTH}
                title="MD.IA"
                className="mdia-site-footer__logo"
              />
            )}
            {description != null ? (
              <Text tone="secondary" className="mdia-site-footer__description">
                {description}
              </Text>
            ) : null}
          </div>
          {columns.map((column, index) => {
            const titleId = `${baseId}-${index}`;
            return (
              <nav
                key={column.title}
                aria-labelledby={titleId}
                className="mdia-site-footer__column"
              >
                <Heading
                  id={titleId}
                  level={2}
                  size="subheading"
                  className="mdia-site-footer__title"
                >
                  {column.title}
                </Heading>
                <ul className="mdia-site-footer__list">
                  {column.links.map((link) => (
                    <li key={link.href} className="mdia-site-footer__item">
                      <Link
                        href={link.href}
                        external={link.external}
                        className="mdia-site-footer__link"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </Grid>
        {children != null ? <div className="mdia-site-footer__extra">{children}</div> : null}
        {legal != null ? (
          <>
            <Divider spacing={6} />
            <Text size="sm" tone="secondary" className="mdia-site-footer__legal">
              {legal}
            </Text>
          </>
        ) : null}
      </Container>
    </footer>
  );
}
