import { Alert, Card, Grid, Heading, Link, Section, Stack, Text } from '@mdia/ui';
import { differences, openGaps, proposalsSummary } from '../content/brand';
import { REPO_URL } from '../lib/assets';
import { SectionIntro } from '../components/SectionIntro';

export function StatusSection() {
  return (
    <Section
      id="status"
      aria-labelledby="status-titulo"
      tone="alt"
      spacing="lg"
      className="anchor-offset"
    >
      <Stack gap={7}>
        <SectionIntro
          eyebrow="10 · Status"
          id="status-titulo"
          title="Status, diferenças e lacunas"
          lead="Esta implementação preserva o status da fonte: identidade fornecida e recomendações propostas. Não constitui nova aprovação da marca."
        />
        <Stack gap={4}>
          <Heading level={3} size="heading">
            Diferenças entre guia, tokens e demonstração
          </Heading>
          <div className="doc-table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th scope="col">Tema</th>
                  <th scope="col">Evidência</th>
                  <th scope="col">Orientação adotada</th>
                </tr>
              </thead>
              <tbody>
                {differences.map((d) => (
                  <tr key={d.tema}>
                    <td>{d.tema}</td>
                    <td>{d.evidencia}</td>
                    <td>{d.orientacao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Stack>
        <Stack gap={4}>
          <Heading level={3} size="heading">
            Propostas v1 desta implementação
          </Heading>
          <Grid minItemWidth="260px" gap={4}>
            {proposalsSummary.map((p) => (
              <Card key={p.tema} padding="md">
                <Stack gap={2}>
                  <Text weight="semibold">{p.tema}</Text>
                  <Text size="sm" tone="secondary">
                    {p.proposta}
                  </Text>
                </Stack>
              </Card>
            ))}
          </Grid>
          <Text size="sm" tone="secondary">
            Detalhes, contrastes e justificativas em{' '}
            <Link href={`${REPO_URL}/blob/main/docs/propostas-v1.md`} external>
              docs/propostas-v1.md
            </Link>
            .
          </Text>
        </Stack>
        <Grid columns={2} gap={5}>
          <Stack gap={3}>
            <Heading level={3} size="heading">
              Lacunas que permanecem abertas
            </Heading>
            <ul className="list">
              {openGaps.map((g) => (
                <Text key={g} as="li" size="sm">
                  {g}
                </Text>
              ))}
            </ul>
          </Stack>
          <Alert tone="info" title="Como ler este site">
            Valores marcados como “Guia 4.0” vêm do guia sem alteração. “Proposta v1” e “Observado
            na demonstração” preenchem lacunas e aguardam validação da marca. Nada foi inventado
            como aprovado.
          </Alert>
        </Grid>
      </Stack>
    </Section>
  );
}
