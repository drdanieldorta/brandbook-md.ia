import { useId } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Heading } from '../Heading/Heading';
import { Section } from '../Section/Section';
import type { SectionTone } from '../Section/Section';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';

export type HeroTone = SectionTone;
/** `center` centraliza texto e ações quando não há `aside`. */
export type HeroAlign = 'start' | 'center';
/** Respiro vertical da Section: `md` 64px, `lg` 96px. */
export type HeroSpacing = 'md' | 'lg';

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Título da página: vira o único `h1` (tamanho display), com quebra equilibrada. */
  title: ReactNode;
  /** Rótulo acima do título, ex.: `<Badge tone="gold" variant="soft">Guia 4.0</Badge>`. */
  eyebrow?: ReactNode;
  /** Parágrafo de apoio em 18px com medida de 65 caracteres. */
  lead?: ReactNode;
  /** Ações em linha com quebra; uma principal por contexto (guia §7). */
  actions?: ReactNode;
  /** Coluna lateral a partir de 1024px, ex.: `<Logo variant="mestre" width="100%" />` sobre fundo escuro. */
  aside?: ReactNode;
  /** `dark` (padrão): azul-noite com escopo `mdia-dark`; `default`: superfície; `alt`: gelo. */
  tone?: HeroTone;
  /** `center` centraliza conteúdo (máx. 60ch) e ações quando não há `aside`. */
  align?: HeroAlign;
  /** Respiro vertical: `lg` 96px (padrão) ou `md` 64px. */
  spacing?: HeroSpacing;
}

/**
 * Abertura de página sobre `Section`: eyebrow, `h1` display, lead e ações em
 * coluna, com `aside` opcional em grade 3:2 a partir de 1024px (breakpoint
 * PROPOSTO v1). A faixa recebe `aria-labelledby` apontando para o título.
 * O mestre com brilho só entra no `aside` sobre o tom escuro (guia §3).
 */
export function Hero({
  title,
  eyebrow,
  lead,
  actions,
  aside,
  tone = 'dark',
  align = 'start',
  spacing = 'lg',
  className,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}: HeroProps) {
  const titleId = useId();
  const hasAside = aside != null;
  return (
    <Section
      as="section"
      tone={tone}
      spacing={spacing}
      aria-labelledby={ariaLabelledBy ?? titleId}
      className={cx(
        'mdia-hero',
        `mdia-hero--${align}`,
        hasAside && 'mdia-hero--with-aside',
        className,
      )}
      {...rest}
    >
      <div className={cx('mdia-hero__grid', hasAside && 'mdia-hero__grid--with-aside')}>
        <Stack gap={5} className="mdia-hero__content">
          {eyebrow != null ? <div className="mdia-hero__eyebrow">{eyebrow}</div> : null}
          <Heading id={titleId} level={1} size="display" balance className="mdia-hero__title">
            {title}
          </Heading>
          {lead != null ? (
            <Text size="lg" measure className="mdia-hero__lead">
              {lead}
            </Text>
          ) : null}
          {actions != null ? (
            <Stack direction="row" gap={3} wrap className="mdia-hero__actions">
              {actions}
            </Stack>
          ) : null}
        </Stack>
        {hasAside ? <div className="mdia-hero__aside">{aside}</div> : null}
      </div>
    </Section>
  );
}
