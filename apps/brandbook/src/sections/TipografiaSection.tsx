import { Alert, Card, Grid, Heading, Section, Stack, Text } from '@mdia/ui';
import { typeRules, typeScale } from '../content/brand';
import { SectionIntro } from '../components/SectionIntro';
import { StatusBadge } from '../components/StatusBadge';

const SIZE_CLASS: Record<string, string> = {
  Display: 'mdia-heading mdia-heading--display',
  Título: 'mdia-heading mdia-heading--title',
  Heading: 'mdia-heading mdia-heading--heading',
  Subheading: 'mdia-heading mdia-heading--subheading',
  Corpo: 'mdia-text mdia-text--lg',
  Rótulo: 'mdia-text mdia-text--sm mdia-text--semibold',
  Legenda: 'mdia-text mdia-text--caption',
};

export function TipografiaSection() {
  return (
    <Section
      id="tipografia"
      aria-labelledby="tipografia-titulo"
      tone="alt"
      spacing="lg"
      className="anchor-offset"
    >
      <Stack gap={7}>
        <SectionIntro
          id="tipografia-titulo"
          title="Tipografia"
          lead="Inter embarcada (proposta v1), com Segoe UI e Arial do guia como fallback. Peso 600 para títulos e rótulos, 400 para o corpo; entrelinha 1,1 em títulos e 1,6 no corpo."
        />
        <Card padding="lg">
          <div>
            {typeScale.map((t) => (
              <div key={t.nivel} className="specimen">
                <div className="specimen__meta">
                  <Text as="span" size="sm" weight="semibold">
                    {t.nivel}
                  </Text>
                  <Text as="span" size="sm" tone="secondary">
                    {t.tamanho} · peso {t.peso}
                  </Text>
                  <StatusBadge status={t.status} />
                </div>
                <p className={SIZE_CLASS[t.nivel] ?? 'mdia-text'}>{t.exemplo}</p>
              </div>
            ))}
          </div>
        </Card>
        <Grid columns={2} gap={5}>
          <Stack gap={3}>
            <Heading level={3} size="heading">
              Regras
            </Heading>
            <ul className="list">
              {typeRules.map((r) => (
                <Text key={r} as="li" size="sm">
                  {r}
                </Text>
              ))}
            </ul>
          </Stack>
          <Alert tone="warning" title="Fonte do lettering">
            A fonte original do logo não foi identificada com segurança. Nenhuma fonte de interface
            deve ser usada para reconstruir o lettering.
          </Alert>
        </Grid>
      </Stack>
    </Section>
  );
}
