import {
  Alert,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Heading,
  Section,
  Stack,
  Text,
} from '@mdia/ui';
import { essence } from '../content/brand';
import { SectionIntro } from '../components/SectionIntro';

export function EssenciaSection() {
  return (
    <Section id="essencia" aria-labelledby="essencia-titulo" spacing="lg" className="anchor-offset">
      <Stack gap={7}>
        <SectionIntro
          id="essencia-titulo"
          title="Essência e linguagem verbal"
          lead={essence.atuacao}
        />

        <Grid minItemWidth="260px" gap={5}>
          {essence.principios.map((p) => (
            <Card key={p.nome} tone="alt" padding="lg">
              <CardHeader>
                <Heading level={3} size="heading">
                  {p.nome}
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>{p.regra}</Text>
              </CardBody>
            </Card>
          ))}
        </Grid>

        <Grid columns={2} gap={5}>
          <Stack gap={4}>
            <Heading level={3} size="heading">
              Público e tom
            </Heading>
            <Text measure>{essence.publico}</Text>
            <Text measure>{essence.tom}</Text>
          </Stack>
          <Stack gap={4}>
            <Heading level={3} size="heading">
              Como falar
            </Heading>
            <Card padding="md">
              <Stack gap={3}>
                <Stack direction="row" gap={3} align="center">
                  <Badge tone="success" variant="soft">
                    Usar
                  </Badge>
                  <Text as="span">“{essence.usar}”</Text>
                </Stack>
                <Stack direction="row" gap={3} align="center">
                  <Badge tone="error" variant="soft">
                    Evitar
                  </Badge>
                  <Text as="span">“{essence.evitar}”</Text>
                </Stack>
              </Stack>
            </Card>
            <Alert tone="warning" title="Limites da promessa">
              {essence.limites}
            </Alert>
          </Stack>
        </Grid>

        <Stack gap={4}>
          <Heading level={3} size="heading">
            Frases propostas
          </Heading>
          <Grid minItemWidth="280px" gap={4}>
            {essence.frases.map((frase) => (
              <Card key={frase} tone="dark" padding="lg">
                <Heading level={4} size="subheading" balance>
                  {frase}
                </Heading>
              </Card>
            ))}
          </Grid>
          <Text size="sm" tone="secondary">
            Frases existentes no guia 4.0 com status de proposta, sujeitas à validação da marca.
          </Text>
        </Stack>
      </Stack>
    </Section>
  );
}
