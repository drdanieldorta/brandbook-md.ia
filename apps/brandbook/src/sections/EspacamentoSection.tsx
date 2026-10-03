import { Button, Card, Grid, Heading, Section, Stack, Text } from '@mdia/ui';
import { radii, spacingScale } from '../content/brand';
import { SectionIntro } from '../components/SectionIntro';

export function EspacamentoSection() {
  return (
    <Section
      id="espacamento"
      aria-labelledby="espacamento-titulo"
      spacing="lg"
      className="anchor-offset"
    >
      <Stack gap={7}>
        <SectionIntro
          id="espacamento-titulo"
          title="Espaçamento, raios e toque"
          lead="Escala completa do JSON: 4, 8, 12, 16, 24, 32, 48, 64 e 96 px. Preservar respiro, hierarquia e uma ideia por bloco."
        />
        <Grid columns={2} gap={5}>
          <Card padding="lg">
            <Stack gap={4}>
              <Heading level={3} size="heading">
                Escala de espaçamento
              </Heading>
              <Stack gap={2}>
                {spacingScale.map((px, i) => (
                  <Stack key={px} direction="row" gap={4} align="center">
                    <Text as="span" size="sm" tone="secondary" style={{ width: 120 }}>
                      <code>--mdia-space-{i + 1}</code>
                    </Text>
                    <div className="space-bar" style={{ width: px }} aria-hidden="true" />
                    <Text as="span" size="sm">
                      {px} px
                    </Text>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Card>
          <Stack gap={5}>
            <Card padding="lg">
              <Stack gap={4}>
                <Heading level={3} size="heading">
                  Raios
                </Heading>
                <Stack direction="row" gap={6} wrap>
                  {radii.map((r) => (
                    <Stack key={r.token} gap={2}>
                      <div
                        className="radius-sample"
                        style={{ borderRadius: r.valor }}
                        aria-hidden="true"
                      />
                      <Text size="sm" weight="semibold">
                        <code>{r.token}</code> · {r.valor}
                      </Text>
                      <Text size="sm" tone="secondary">
                        {r.uso}
                      </Text>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Card>
            <Card padding="lg">
              <Stack gap={4}>
                <Heading level={3} size="heading">
                  Toque e foco
                </Heading>
                <Stack direction="row" gap={5} align="center" wrap>
                  <span className="touch-sample">44 px</span>
                  <Button className="focus-sample">Foco visível de 3 px</Button>
                </Stack>
                <Text size="sm" tone="secondary">
                  Área de toque mínima de 44 × 44 px e contorno de foco de 3 px em roxo, sempre
                  visível. O guia não define grade, gutters ou breakpoints normativos; os
                  breakpoints 640/768/1024/1280 desta implementação são proposta v1.
                </Text>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Stack>
    </Section>
  );
}
