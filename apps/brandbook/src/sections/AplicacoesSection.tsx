import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Heading,
  Link,
  Section,
  Stack,
  Text,
} from '@mdia/ui';
import { applications } from '../content/brand';
import { asset } from '../lib/assets';
import { SectionIntro } from '../components/SectionIntro';

export function AplicacoesSection() {
  return (
    <Section
      id="aplicacoes"
      aria-labelledby="aplicacoes-titulo"
      spacing="lg"
      className="anchor-offset"
    >
      <Stack gap={7}>
        <SectionIntro
          id="aplicacoes-titulo"
          title="Aplicações existentes"
          lead="Modelos SVG editáveis de slide, post e cartão. Priorizam a variante sem halo e usam textos sugeridos, sem contatos inventados."
        />
        <Grid minItemWidth="280px" gap={5}>
          {applications.map((a) => (
            <Card key={a.arquivo} padding="md">
              <CardHeader>
                <Heading level={3} size="subheading">
                  {a.nome}
                </Heading>
              </CardHeader>
              <CardBody>
                <Stack gap={3}>
                  <figure className="image-figure template-figure">
                    <img
                      src={asset(`assets/brand/templates/${a.arquivo}`)}
                      alt={`Modelo ${a.nome}`}
                      loading="lazy"
                    />
                  </figure>
                  <Text size="sm" tone="secondary">
                    {a.tamanho}
                  </Text>
                  <Text size="sm">{a.regra}</Text>
                  <Link href={asset(`assets/brand/templates/${a.arquivo}`)} external>
                    Abrir {a.arquivo}
                  </Link>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Grid>
        <Alert tone="info" title="Impressão">
          Preparar sangria, perfil de cor e prova com a gráfica. Nenhuma medida normativa de sangria
          foi fornecida; o cartão descreve a prancheta, não o tamanho físico final.
        </Alert>
      </Stack>
    </Section>
  );
}
