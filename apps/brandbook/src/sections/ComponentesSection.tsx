import { useState } from 'react';
import { ArrowRight, CalendarDays, Search, Star, X } from 'lucide-react';
import {
  Alert,
  Badge,
  Button,
  ButtonLink,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Field,
  Grid,
  Heading,
  IconButton,
  RadioGroup,
  Section,
  Select,
  Stack,
  Switch,
  Text,
  TextArea,
  TextInput,
  Toast,
} from '@mdia/ui';
import { componentRules } from '../content/brand';
import { STORYBOOK_URL } from '../lib/assets';
import { SectionIntro } from '../components/SectionIntro';

function Showcase({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack gap={4}>
      <Heading level={3} size="heading">
        {title}
      </Heading>
      {children}
    </Stack>
  );
}

function FormDemo() {
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSalvo(false);
        setSalvando(true);
        window.setTimeout(() => {
          setSalvando(false);
          setSalvo(true);
        }, 900);
      }}
      aria-label="Formulário de exemplo"
    >
      <Stack gap={5}>
        <Grid columns={2} gap={5}>
          <Field label="Nome da clínica" hint="Como aparece no CNPJ." required>
            <TextInput fullWidth placeholder="Clínica Exemplo" autoComplete="organization" />
          </Field>
          <Field label="Como prefere começar?" required>
            <Select
              fullWidth
              placeholder="Selecione"
              options={[
                { value: 'consultoria', label: 'Consultoria' },
                { value: 'mentoria', label: 'Mentoria' },
                { value: 'nao-sei', label: 'Ainda não sei' },
              ]}
            />
          </Field>
        </Grid>
        <Field
          label="Contexto"
          hint="Onde a IA poderia apoiar a operação hoje?"
          optionalText="opcional"
        >
          <TextArea fullWidth rows={3} />
        </Field>
        <Grid columns={2} gap={5}>
          <RadioGroup
            label="Formato"
            name="formato"
            defaultValue="online"
            options={[
              { value: 'online', label: 'Online' },
              { value: 'presencial', label: 'Presencial' },
            ]}
          />
          <Stack gap={2}>
            <Checkbox
              label="Quero receber o resumo semanal"
              description="Um e-mail por semana, sem promessas de resultado."
            />
            <Switch label="Lembretes por e-mail" defaultChecked />
          </Stack>
        </Grid>
        {salvo ? (
          <Alert tone="success" onDismiss={() => setSalvo(false)}>
            Alterações salvas.
          </Alert>
        ) : null}
        <Stack direction="row" gap={3} wrap>
          <Button type="submit" loading={salvando} loadingLabel="Salvando…">
            Enviar
          </Button>
          <Button type="reset" variant="ghost">
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export function ComponentesSection() {
  const [favorito, setFavorito] = useState(false);
  return (
    <Section
      id="componentes"
      aria-labelledby="componentes-titulo"
      spacing="lg"
      className="anchor-offset"
    >
      <Stack gap={7}>
        <Stack gap={4}>
          <SectionIntro
            id="componentes-titulo"
            title="Componentes e estados"
            lead="Todos os exemplos abaixo são os componentes reais de @mdia/ui. O catálogo completo, com cada variante e estado, está no Storybook."
          />
          <div>
            <ButtonLink href={STORYBOOK_URL} variant="secondary" iconEnd={<ArrowRight />}>
              Abrir o Storybook
            </ButtonLink>
          </div>
        </Stack>

        <Showcase title="Botões">
          <Card padding="lg">
            <Stack gap={5}>
              <Stack direction="row" gap={3} wrap>
                <Button iconStart={<CalendarDays />}>Agendar conversa</Button>
                <Button variant="secondary">Conhecer a mentoria</Button>
                <Button variant="ghost">Ver detalhes</Button>
                <Button loading loadingLabel="Salvando…">
                  Salvar
                </Button>
                <Button disabled>Desabilitado</Button>
              </Stack>
              <Stack direction="row" gap={3} wrap align="center">
                <Button size="sm">Pequeno</Button>
                <Button size="md">Médio (44 px)</Button>
                <Button size="lg">Grande</Button>
                <IconButton label="Buscar" icon={<Search />} variant="secondary" />
                <IconButton
                  label="Favoritar"
                  icon={<ArrowRight />}
                  pressed={favorito}
                  onClick={() => setFavorito((v) => !v)}
                />
                <IconButton label="Fechar" icon={<X />} />
              </Stack>
              <ul className="list">
                {componentRules.botoes.map((r) => (
                  <Text key={r} as="li" size="sm">
                    {r}
                  </Text>
                ))}
              </ul>
            </Stack>
          </Card>
        </Showcase>

        <Showcase title="Formulários e feedback">
          <Grid columns={2} gap={5}>
            <Card padding="lg">
              <FormDemo />
            </Card>
            <Stack gap={4}>
              <Alert tone="info" title="Informação">
                Explique siglas no primeiro uso e nomeie limites.
              </Alert>
              <Alert tone="success">Alterações salvas.</Alert>
              <Alert tone="warning" title="Atenção">
                Revise antes de continuar.
              </Alert>
              <Alert
                tone="error"
                title="Erro"
                action={
                  <Button variant="ghost" size="sm">
                    Tentar novamente
                  </Button>
                }
              >
                Não foi possível salvar. Tente novamente.
              </Alert>
              <Toast tone="info" loading>
                Salvando…
              </Toast>
              <Stack direction="row" gap={2} wrap>
                <Badge>Neutro</Badge>
                <Badge tone="brand">Marca</Badge>
                <Badge tone="success">Sucesso</Badge>
                <Badge tone="warning">Alerta</Badge>
                <Badge tone="error">Erro</Badge>
                <Badge tone="gold">Dourado</Badge>
                <Badge tone="brand" variant="solid">
                  Sólido
                </Badge>
                <Badge tone="brand" variant="outline">
                  Contorno
                </Badge>
              </Stack>
              <ul className="list">
                {componentRules.formularios.map((r) => (
                  <Text key={r} as="li" size="sm">
                    {r}
                  </Text>
                ))}
              </ul>
            </Stack>
          </Grid>
        </Showcase>

        <Showcase title="Superfícies">
          <Grid minItemWidth="280px" gap={5}>
            <Card>
              <CardHeader>
                <Heading level={4} size="subheading">
                  Consultoria
                </Heading>
                <Badge tone="brand" size="sm">
                  Estratégia
                </Badge>
              </CardHeader>
              <CardBody>
                <Text size="sm">Visão estratégica para decidir onde a IA apoia a operação.</Text>
              </CardBody>
              <CardFooter>
                <Button variant="ghost" size="sm" iconEnd={<ArrowRight />}>
                  Ver detalhes
                </Button>
              </CardFooter>
            </Card>
            <Card tone="alt">
              <CardHeader>
                <Heading level={4} size="subheading">
                  Mentoria
                </Heading>
                <Badge tone="gold" size="sm">
                  Autonomia
                </Badge>
              </CardHeader>
              <CardBody>
                <Text size="sm">
                  Desenvolve autonomia de líderes e equipes com escuta e método.
                </Text>
              </CardBody>
              <CardFooter>
                <Button variant="ghost" size="sm" iconEnd={<ArrowRight />}>
                  Ver detalhes
                </Button>
              </CardFooter>
            </Card>
            <Card tone="dark" elevated>
              <CardHeader>
                <Heading level={4} size="subheading">
                  Sobre fundo escuro
                </Heading>
              </CardHeader>
              <CardBody>
                <Text size="sm">
                  Os componentes trocam de tokens automaticamente dentro de uma superfície escura.
                </Text>
              </CardBody>
              <CardFooter>
                <Button variant="secondary" size="sm">
                  Agendar conversa
                </Button>
              </CardFooter>
            </Card>
          </Grid>
          <Divider label="ou" />
          <Text size="sm" tone="secondary" align="center">
            Divisor com rótulo, raio de painel de 16 px e sombras da proposta v1.
          </Text>
        </Showcase>
      </Stack>
    </Section>
  );
}
