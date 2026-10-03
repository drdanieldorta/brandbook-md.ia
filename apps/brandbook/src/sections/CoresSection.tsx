import { Alert, Badge, Card, Grid, Heading, Section, Stack, Text } from '@mdia/ui';
import type { ColorEntry } from '../content/brand';
import {
  colorRules,
  contrastPairs,
  goldGradient,
  identityPalette,
  paletteGuide,
  paletteNeutrals,
  paletteSemantic,
} from '../content/brand';
import { contrastLevel, contrastRatio, formatRatio } from '../lib/contrast';
import { SectionIntro } from '../components/SectionIntro';
import { StatusBadge } from '../components/StatusBadge';

function Swatches({ title, entries }: { title: string; entries: ColorEntry[] }) {
  return (
    <Stack gap={4}>
      <Heading level={3} size="heading">
        {title}
      </Heading>
      <Grid minItemWidth="220px" gap={4}>
        {entries.map((c) => (
          <Card key={c.token} padding="sm">
            <Stack gap={3}>
              <div className="swatch__color" style={{ background: c.hex }} aria-hidden="true" />
              <Stack gap={1}>
                <Stack direction="row" gap={2} align="center" wrap>
                  <Text weight="semibold">{c.nome}</Text>
                  <StatusBadge status={c.status} />
                </Stack>
                <Text size="sm" tone="secondary">
                  <code>{c.hex}</code> · <code>{c.token}</code>
                </Text>
                <Text size="sm">{c.papel}</Text>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
}

const LEVEL_TONE = { AA: 'success', 'AA grande': 'warning', Reprova: 'error' } as const;

export function CoresSection() {
  return (
    <Section id="cores" aria-labelledby="cores-titulo" spacing="lg" className="anchor-offset">
      <Stack gap={7}>
        <SectionIntro
          eyebrow="03 · Cores"
          id="cores-titulo"
          title="Cores e contraste"
          lead="Na identidade escura, o carvão sustenta a leitura em off-white, o dourado marca ações e ícones, e o azul orienta links e kickers. No tema claro do guia: azul-noite e branco para leitura, azul vivo para a ação, dourado e roxo em pequenos gestos."
        />
        <Stack gap={4}>
          <Heading level={3} size="heading">
            Identidade escura (proposta v2)
          </Heading>
          <Text measure>
            Carvão em três camadas, texto off-white e dourado em gradiente, derivados do playbook
            MD.IA. É o tema padrão da biblioteca; a paleta clara do guia continua disponível por
            escopo.
          </Text>
          <Card padding="sm">
            <Stack gap={3}>
              <div
                className="swatch__color"
                style={{ background: goldGradient }}
                aria-hidden="true"
              />
              <Stack gap={1}>
                <Stack direction="row" gap={2} align="center" wrap>
                  <Text weight="semibold">Gradiente dourado</Text>
                  <StatusBadge status="proposta" />
                </Stack>
                <Text size="sm" tone="secondary">
                  <code>gradients.gold</code> · botão principal, ícones e linhas; texto sobre ele em{' '}
                  <code>#17130D</code>.
                </Text>
              </Stack>
            </Stack>
          </Card>
        </Stack>
        <Swatches title="Camadas e texto da identidade escura" entries={identityPalette} />
        <Swatches title="Paleta sólida de apoio (guia 4.0)" entries={paletteGuide} />
        <Swatches title="Neutros de interface" entries={paletteNeutrals} />
        <Swatches
          title="Estados semânticos no tema claro (proposta v1)"
          entries={paletteSemantic}
        />

        <Stack gap={4}>
          <Heading level={3} size="heading">
            Contraste dos pares em uso
          </Heading>
          <Text measure>
            Calculado ao vivo pela fórmula WCAG 2.x. Texto comum exige 4,5:1; componentes e texto
            grande, 3:1.
          </Text>
          <div className="doc-table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th scope="col">Par</th>
                  <th scope="col">Amostra</th>
                  <th scope="col">Relação</th>
                  <th scope="col">Resultado</th>
                  <th scope="col">Nota</th>
                </tr>
              </thead>
              <tbody>
                {contrastPairs.map((p) => {
                  const ratio = contrastRatio(p.fg, p.bg);
                  const level = contrastLevel(ratio);
                  return (
                    <tr key={p.nome}>
                      <td>{p.nome}</td>
                      <td>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: 6,
                            color: p.fg,
                            background: p.bg,
                            border: '1px solid var(--mdia-color-border)',
                            fontWeight: 600,
                          }}
                        >
                          Aa
                        </span>
                      </td>
                      <td>
                        <code>{formatRatio(ratio)}</code>
                      </td>
                      <td>
                        <Badge tone={LEVEL_TONE[level]} variant="soft" size="sm">
                          {level}
                        </Badge>
                      </td>
                      <td>{p.nota ?? ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Stack>

        <Grid columns={2} gap={5}>
          <Card padding="lg" tone="alt">
            <Stack gap={3}>
              <Heading level={3} size="heading">
                Regras
              </Heading>
              <ul className="list">
                {colorRules.map((r) => (
                  <Text key={r} as="li" size="sm">
                    {r}
                  </Text>
                ))}
              </ul>
            </Stack>
          </Card>
          <Stack gap={4}>
            <Alert tone="info" title="Estados nunca só por cor">
              Combine rótulo, ícone ou instrução. Os componentes de feedback desta biblioteca já
              fazem isso.
            </Alert>
            <Alert tone="warning" title="Impressão">
              CMYK aproximado a partir do RGB, sem perfil ICC; não há Pantone definido. Ajustar com
              a gráfica e validar em prova.
            </Alert>
          </Stack>
        </Grid>
      </Stack>
    </Section>
  );
}
