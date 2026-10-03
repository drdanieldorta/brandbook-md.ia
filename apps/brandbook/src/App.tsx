import { ArrowRight, BookOpen } from 'lucide-react';
import { Badge, ButtonLink, Hero, Logo, SiteFooter, SiteHeader } from '@mdia/ui';
import { sections } from './content/brand';
import { REPO_URL, STORYBOOK_URL } from './lib/assets';
import { AplicacoesSection } from './sections/AplicacoesSection';
import { ComponentesSection } from './sections/ComponentesSection';
import { CoresSection } from './sections/CoresSection';
import { EspacamentoSection } from './sections/EspacamentoSection';
import { EssenciaSection } from './sections/EssenciaSection';
import { ImagemSection } from './sections/ImagemSection';
import { LogoSection } from './sections/LogoSection';
import { MovimentoSection } from './sections/MovimentoSection';
import { StatusSection } from './sections/StatusSection';
import { TipografiaSection } from './sections/TipografiaSection';
import { TokensSection } from './sections/TokensSection';

const HEADER_IDS = new Set([
  'essencia',
  'logo',
  'cores',
  'tipografia',
  'componentes',
  'status',
  'tokens',
]);

export function App() {
  const headerLinks = sections
    .filter((s) => HEADER_IDS.has(s.id))
    .map((s) => ({ label: s.label, href: `#${s.id}` }));
  const anchor = (id: string) => ({
    label: sections.find((s) => s.id === id)?.label ?? id,
    href: `#${id}`,
  });

  return (
    <>
      <ButtonLink href="#conteudo" size="sm" className="skip-link">
        Ir para o conteúdo
      </ButtonLink>
      <SiteHeader
        links={headerLinks}
        homeHref="#"
        brandLabel="MD.IA — início"
        cta={
          <ButtonLink href={STORYBOOK_URL} size="sm" variant="secondary" iconEnd={<ArrowRight />}>
            Storybook
          </ButtonLink>
        }
      />
      <main id="conteudo">
        <Hero
          eyebrow={
            <Badge tone="gold" variant="soft">
              Brandbook · Guia 4.0
            </Badge>
          }
          title="Inteligência humana. Potencial ampliado."
          lead="Identidade, tokens e componentes da MD.IA, prontos para usar em código. Os valores do guia são preservados; o que o guia não define está marcado como proposta."
          actions={
            <>
              <ButtonLink href="#componentes" variant="secondary" iconEnd={<ArrowRight />}>
                Explorar componentes
              </ButtonLink>
              <ButtonLink href={STORYBOOK_URL} variant="ghost" iconStart={<BookOpen />}>
                Abrir Storybook
              </ButtonLink>
            </>
          }
          aside={<Logo variant="mestre" width="100%" title="Logo MD.IA, mestre com brilho" />}
        />
        <EssenciaSection />
        <LogoSection />
        <CoresSection />
        <TipografiaSection />
        <EspacamentoSection />
        <MovimentoSection />
        <ComponentesSection />
        <ImagemSection />
        <AplicacoesSection />
        <StatusSection />
        <TokensSection />
      </main>
      <SiteFooter
        description="Consultoria e mentoria em inteligência artificial para quem lidera negócios de saúde."
        columns={[
          {
            title: 'Marca',
            links: [anchor('essencia'), anchor('logo'), anchor('cores'), anchor('tipografia')],
          },
          {
            title: 'Sistema',
            links: [
              anchor('componentes'),
              anchor('tokens'),
              { label: 'Storybook', href: STORYBOOK_URL, external: true },
            ],
          },
          {
            title: 'Documentos',
            links: [
              {
                label: 'Brandbook técnico',
                href: `${REPO_URL}/blob/main/docs/brandbook.md`,
                external: true,
              },
              {
                label: 'Propostas v1',
                href: `${REPO_URL}/blob/main/docs/propostas-v1.md`,
                external: true,
              },
              { label: 'Repositório', href: REPO_URL, external: true },
            ],
          },
        ]}
        legal="Conversão documental do guia 4.0 (setembro de 2026). Esta implementação não constitui nova aprovação da marca."
      />
    </>
  );
}
