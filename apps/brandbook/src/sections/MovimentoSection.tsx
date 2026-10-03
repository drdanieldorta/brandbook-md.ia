import { Alert, Button, Card, Grid, Heading, Section, Spinner, Stack, Text } from '@mdia/ui';
import { motion } from '../content/brand';
import { SectionIntro } from '../components/SectionIntro';

export function MovimentoSection() {
  return (
    <Section
      id="movimento"
      aria-labelledby="movimento-titulo"
      tone="alt"
      spacing="lg"
      className="anchor-offset"
    >
      <Stack gap={7}>
        <SectionIntro
          eyebrow="06 · Movimento"
          id="movimento-titulo"
          title="Movimento"
          lead="Animar uma vez, sem flashes nem ciclos contínuos. Transições de feedback de 180 ms, entradas de 400 ms, sempre com a mesma curva."
        />
        <Grid columns={2} gap={5}>
          <Card padding="lg">
            <Stack gap={4}>
              <Heading level={3} size="heading">
                Tokens
              </Heading>
              <div className="doc-table-wrap">
                <table className="doc-table">
                  <thead>
                    <tr>
                      <th scope="col">Token</th>
                      <th scope="col">Valor</th>
                      <th scope="col">Uso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {motion.tokens.map((t) => (
                      <tr key={t.token}>
                        <td>
                          <code>{t.token}</code>
                        </td>
                        <td>
                          <code>{t.valor}</code>
                        </td>
                        <td>{t.uso}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Stack direction="row" gap={4} align="center" wrap>
                <Button variant="secondary">Passe o mouse: feedback de 180 ms</Button>
                <Stack direction="row" gap={2} align="center">
                  <Spinner tone="brand" />
                  <Text as="span" size="sm" tone="secondary">
                    Única animação contínua, por ser funcional.
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Card>
          <Stack gap={4}>
            <ul className="list">
              {motion.regras.map((r) => (
                <Text key={r} as="li">
                  {r}
                </Text>
              ))}
            </ul>
            <Alert tone="info" title="Movimento reduzido">
              Com <code>prefers-reduced-motion: reduce</code>, a folha de estilos da biblioteca
              desativa animações e transições e o indicador de carregamento fica estático.
            </Alert>
          </Stack>
        </Grid>
      </Stack>
    </Section>
  );
}
