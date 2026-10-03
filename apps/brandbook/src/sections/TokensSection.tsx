import { useMemo } from 'react';
import { Download } from 'lucide-react';
import { ButtonLink, Card, Grid, Heading, Link, Section, Stack, Text, tokens } from '@mdia/ui';
import tokensCss from '@mdia/ui/tokens.css?raw';
import { asset } from '../lib/assets';
import { SectionIntro } from '../components/SectionIntro';

function useDownloadUrl(content: string, type: string): string {
  return useMemo(() => {
    if (typeof URL === 'undefined' || typeof Blob === 'undefined') return '#';
    return URL.createObjectURL(new Blob([content], { type }));
  }, [content, type]);
}

const SNIPPET = `import '@mdia/ui/styles.css';
import { Button, Heading, Logo, Text } from '@mdia/ui';

export function Chamada() {
  return (
    <section>
      <Logo variant="limpo" width={280} />
      <Heading level={1}>Inteligência humana. Potencial ampliado.</Heading>
      <Text measure>Consultoria oferece visão estratégica; mentoria desenvolve autonomia.</Text>
      <Button>Agendar conversa</Button>
    </section>
  );
}`;

export function TokensSection() {
  const jsonUrl = useDownloadUrl(JSON.stringify(tokens, null, 2), 'application/json');
  const cssUrl = useDownloadUrl(tokensCss, 'text/css');
  return (
    <Section id="tokens" aria-labelledby="tokens-titulo" spacing="lg" className="anchor-offset">
      <Stack gap={7}>
        <SectionIntro
          eyebrow="11 · Tokens"
          id="tokens-titulo"
          title="Tokens e uso em código"
          lead="Uma folha de estilo única com fontes, variáveis --mdia-* e componentes. Os nomes originais do guia (--mdia-blue, --mdia-font, --mdia-radius…) continuam válidos como aliases."
        />
        <Grid columns={2} gap={5}>
          <Card padding="lg">
            <Stack gap={4}>
              <Heading level={3} size="heading">
                Começar
              </Heading>
              <pre
                className="doc-code"
                style={{ margin: 0, overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.5 }}
              >
                <code>{SNIPPET}</code>
              </pre>
              <Text size="sm" tone="secondary">
                O tema escuro é o padrão. Para o tema claro do guia, envolva uma área com{' '}
                <code>{'<ThemeScope mode="light">'}</code> (ou a classe <code>mdia-light</code> /{' '}
                <code>data-theme="light"</code>).
              </Text>
            </Stack>
          </Card>
          <Card padding="lg" tone="alt">
            <Stack gap={4}>
              <Heading level={3} size="heading">
                Baixar
              </Heading>
              <Stack direction="row" gap={3} wrap>
                <ButtonLink
                  href={jsonUrl}
                  download="mdia-tokens.json"
                  variant="secondary"
                  iconStart={<Download />}
                >
                  tokens.json
                </ButtonLink>
                <ButtonLink
                  href={cssUrl}
                  download="mdia-tokens.css"
                  variant="secondary"
                  iconStart={<Download />}
                >
                  tokens.css
                </ButtonLink>
              </Stack>
              <Text size="sm" tone="secondary">
                Originais do guia 4.0:{' '}
                <Link href={asset('assets/brand/tokens/mdia-tokens.json')} external>
                  mdia-tokens.json
                </Link>{' '}
                e{' '}
                <Link href={asset('assets/brand/tokens/mdia-tokens.css')} external>
                  mdia-tokens.css
                </Link>
                .
              </Text>
            </Stack>
          </Card>
        </Grid>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th scope="col">Grupo</th>
                <th scope="col">Tokens</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Identidade escura (proposta v2)</td>
                <td>
                  {Object.entries(tokens.identity)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(' · ')}
                </td>
              </tr>
              <tr>
                <td>Cores do guia</td>
                <td>
                  {Object.entries(tokens.colors)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(' · ')}
                </td>
              </tr>
              <tr>
                <td>Estados (proposta)</td>
                <td>
                  {Object.entries(tokens.semantic)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(' · ')}
                </td>
              </tr>
              <tr>
                <td>Espaçamento</td>
                <td>{tokens.spacing.join(' / ')} px</td>
              </tr>
              <tr>
                <td>Raios</td>
                <td>
                  {Object.entries(tokens.radius)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(' · ')}
                </td>
              </tr>
              <tr>
                <td>Movimento</td>
                <td>
                  {Object.entries(tokens.motion)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(' · ')}
                </td>
              </tr>
              <tr>
                <td>Breakpoints (proposta)</td>
                <td>
                  {Object.entries(tokens.breakpoints)
                    .map(([k, v]) => `${k}: ${v}px`)
                    .join(' · ')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Stack>
    </Section>
  );
}
