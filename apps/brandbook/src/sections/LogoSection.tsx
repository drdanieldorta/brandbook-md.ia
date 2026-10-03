import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Heading,
  Link,
  Logo,
  LogoMark,
  LOGO_VARIANT_INFO,
  LOGO_VARIANTS,
  Section,
  Stack,
  Text,
} from '@mdia/ui';
import type { LogoVariant } from '@mdia/ui';
import { logoFiles, logoRules } from '../content/brand';
import { asset } from '../lib/assets';
import { SectionIntro } from '../components/SectionIntro';

const DARK: ReadonlySet<LogoVariant> = new Set(['mestre', 'offwhite', 'branco']);
const ICE: ReadonlySet<LogoVariant> = new Set(['limpo', 'referencia', 'monocromatico']);

export function LogoSection() {
  return (
    <Section
      id="logo"
      aria-labelledby="logo-titulo"
      tone="alt"
      spacing="lg"
      className="anchor-offset"
    >
      <Stack gap={7}>
        <SectionIntro
          id="logo-titulo"
          title="Logo e ativos de identidade"
          lead="Reconstruções vetoriais controladas da referência final. Os componentes Logo e LogoMark renderizam os SVGs oficiais sem alterar geometria, gradientes ou filtro."
        />

        <Grid minItemWidth="300px" gap={5}>
          {LOGO_VARIANTS.map((variant) => (
            <figure key={variant} className="logo-figure">
              <div
                className={`logo-figure__frame${DARK.has(variant) ? ' logo-figure__frame--dark' : ICE.has(variant) ? ' logo-figure__frame--ice' : ''}`}
              >
                <Logo variant={variant} width="100%" title={LOGO_VARIANT_INFO[variant].label} />
              </div>
              <figcaption>
                <Text weight="semibold">{LOGO_VARIANT_INFO[variant].label}</Text>
                <Text size="sm" tone="secondary">
                  {LOGO_VARIANT_INFO[variant].uso}
                </Text>
              </figcaption>
            </figure>
          ))}
          <figure className="logo-figure">
            <div className="logo-figure__frame">
              <Stack direction="row" gap={5} align="center">
                <LogoMark size={64} title="Favicon M" />
                <LogoMark size={32} title="" />
                <LogoMark size={16} title="" />
              </Stack>
            </div>
            <figcaption>
              <Text weight="semibold">Favicon M (LogoMark)</Text>
              <Text size="sm" tone="secondary">
                Abaixo de 160 px, usar o nome por escrito ou o favicon derivado do M.
              </Text>
            </figcaption>
          </figure>
        </Grid>

        <Grid columns={2} gap={5}>
          <Card padding="lg">
            <CardHeader>
              <Heading level={3} size="heading">
                Proporção, proteção e redução
              </Heading>
            </CardHeader>
            <CardBody>
              <dl className="list list--plain">
                {logoRules.proporcao.map((r) => (
                  <div key={r.rotulo}>
                    <Text as="dt" weight="semibold" size="sm">
                      {r.rotulo}
                    </Text>
                    <Text as="dd" size="sm" tone="secondary">
                      {r.valor}
                    </Text>
                  </div>
                ))}
              </dl>
            </CardBody>
          </Card>
          <Card padding="lg">
            <CardHeader>
              <Heading level={3} size="heading">
                Fundos
              </Heading>
            </CardHeader>
            <CardBody>
              <ul className="list">
                {logoRules.fundos.map((f) => (
                  <Text key={f} as="li" size="sm">
                    {f}
                  </Text>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Grid>

        <Alert tone="error" title="Não fazer">
          <ul className="list">
            {logoRules.proibido.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Alert>

        <Stack gap={4}>
          <Heading level={3} size="heading">
            Preservar
          </Heading>
          <Text measure>{logoRules.preservar}</Text>
        </Stack>

        <Stack gap={4}>
          <Heading level={3} size="heading">
            Arquivos oficiais
          </Heading>
          <div className="doc-table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th scope="col">Arquivo</th>
                  <th scope="col">Natureza e uso</th>
                </tr>
              </thead>
              <tbody>
                {logoFiles.map((f) => (
                  <tr key={f.arquivo}>
                    <td>
                      <Link href={asset(`assets/brand/logos/${f.arquivo}`)} external>
                        <code>{f.arquivo}</code>
                      </Link>
                    </td>
                    <td>{f.natureza}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Text size="sm" tone="secondary">
            PNGs exportados do mestre, da variante limpa, dos monocromáticos e do vetor sem fundo
            têm 4640 × 1560 px com transparência.
          </Text>
        </Stack>
      </Stack>
    </Section>
  );
}
