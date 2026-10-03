import { Alert, Badge, Grid, Heading, Section, Stack, Text } from '@mdia/ui';
import { imagery } from '../content/brand';
import { asset } from '../lib/assets';
import { SectionIntro } from '../components/SectionIntro';

export function ImagemSection() {
  return (
    <Section
      id="imagem"
      aria-labelledby="imagem-titulo"
      tone="alt"
      spacing="lg"
      className="anchor-offset"
    >
      <Stack gap={7}>
        <SectionIntro
          eyebrow="08 · Fotografia e 3D"
          id="imagem-titulo"
          title="Fotografia e linguagem 3D"
          lead="Pessoas antes da tecnologia. Volume com sobriedade: azul fosco, metal dourado acetinado e pontos roxos."
        />
        <Alert tone="warning" title="Referências sintéticas">
          {imagery.aviso}
        </Alert>
        <Grid columns={2} gap={6}>
          <Stack gap={4}>
            <figure className="image-figure">
              <img
                src={asset('assets/brand/images/direcao-foto.png')}
                alt="Referência de direção fotográfica gerada por IA: pessoas em ambiente real, luz natural, colaboração."
                width={1536}
                height={1024}
                loading="lazy"
              />
              <figcaption>
                <Stack direction="row" gap={2} align="center" wrap>
                  <Text as="span" weight="semibold">
                    Direção de fotografia
                  </Text>
                  <Badge tone="warning" size="sm">
                    Imagem sintética (IA)
                  </Badge>
                </Stack>
              </figcaption>
            </figure>
            <Heading level={3} size="heading">
              Fotografia
            </Heading>
            <ul className="list">
              {imagery.fotografia.map((r) => (
                <Text key={r} as="li" size="sm">
                  {r}
                </Text>
              ))}
            </ul>
          </Stack>
          <Stack gap={4}>
            <figure className="image-figure">
              <img
                src={asset('assets/brand/images/direcao-3d.png')}
                alt="Referência de direção 3D gerada por IA: objeto único em azul fosco com detalhes dourados e pontos roxos."
                width={1536}
                height={1024}
                loading="lazy"
              />
              <figcaption>
                <Stack direction="row" gap={2} align="center" wrap>
                  <Text as="span" weight="semibold">
                    Direção 3D
                  </Text>
                  <Badge tone="warning" size="sm">
                    Imagem sintética (IA)
                  </Badge>
                </Stack>
              </figcaption>
            </figure>
            <Heading level={3} size="heading">
              Linguagem 3D
            </Heading>
            <ul className="list">
              {imagery.tresD.map((r) => (
                <Text key={r} as="li" size="sm">
                  {r}
                </Text>
              ))}
            </ul>
          </Stack>
        </Grid>
      </Stack>
    </Section>
  );
}
