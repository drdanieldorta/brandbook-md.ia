import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Card, CardBody, CardFooter, CardHeader } from './Card';

const meta = {
  title: 'Layout/Card',
  component: Card,
  args: { tone: 'default', padding: 'md', elevated: false, as: 'div' },
  argTypes: {
    tone: { control: 'radio', options: ['default', 'alt', 'dark'] },
    padding: { control: 'radio', options: ['none', 'sm', 'md', 'lg'] },
    as: { control: 'select', options: ['div', 'article', 'section', 'li', 'a'] },
    interactive: { control: 'boolean' },
    href: { control: 'text' },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Cabeçalho, corpo e rodapé compondo título, texto e uma ação discreta. */
export const Padrao: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <CardHeader>
        <Heading level={3} size="subheading">
          Consultoria
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>Visão estratégica para decidir onde a IA apoia a operação.</Text>
      </CardBody>
      <CardFooter>
        <Button variant="ghost" size="sm">
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  ),
};

/** `default` (branco com borda), `alt` (gelo) e `dark` (azul-noite, escopo `mdia-dark`). */
export const Tons: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
      }}
    >
      <Card {...args} tone="default">
        <Heading level={3} size="subheading">
          Padrão
        </Heading>
        <Text>Superfície branca com borda.</Text>
      </Card>
      <Card {...args} tone="alt">
        <Heading level={3} size="subheading">
          Alternativo
        </Heading>
        <Text>Gelo, para destacar sobre o branco.</Text>
      </Card>
      <Card {...args} tone="dark">
        <Heading level={3} size="subheading">
          Escuro
        </Heading>
        <Text>Azul-noite; o conteúdo usa os tokens do tema escuro.</Text>
      </Card>
    </div>
  ),
};

/** Preenchimento pela escala: sm 16px, md 24px (padrão), lg 32px. */
export const Preenchimentos: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
      }}
    >
      <Card {...args} padding="sm">
        <Text>sm · 16px</Text>
      </Card>
      <Card {...args} padding="md">
        <Text>md · 24px</Text>
      </Card>
      <Card {...args} padding="lg">
        <Text>lg · 32px</Text>
      </Card>
    </div>
  ),
};

/** Sombra `--mdia-shadow-md` permanente (proposta v1 de elevação). */
export const Elevado: Story = {
  args: { elevated: true },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <Heading level={3} size="subheading">
        Mentoria
      </Heading>
      <Text>Autonomia para a equipe entender e aplicar IA na gestão, com critério.</Text>
    </Card>
  ),
};

/** Interativo: no hover a sombra sobe e a borda escurece, com transição de feedback (180ms). */
export const Interativo: Story = {
  args: { interactive: true },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <Heading level={3} size="subheading">
        Consultoria
      </Heading>
      <Text>Passe o mouse para ver o estado.</Text>
    </Card>
  ),
};

/** Com `href` o cartão vira um link em bloco, interativo por padrão e com foco visível. */
export const ComoLink: Story = {
  args: { href: '#consultoria' },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <Stack gap={2}>
        <Heading level={3} size="subheading">
          Consultoria
        </Heading>
        <Text>Visão estratégica para decidir onde a IA apoia a operação.</Text>
        <Text size="sm" weight="semibold" tone="brand">
          Ver detalhes
        </Text>
      </Stack>
    </Card>
  ),
};

/** Dentro de `.mdia-dark`, os tons `default` e `alt` passam a usar as superfícies escuras. */
export const SobreFundoEscuro: Story = {
  globals: { backgrounds: { value: 'escuro' } },
  render: (args) => (
    <div
      className="mdia-dark"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
        padding: 24,
      }}
    >
      <Card {...args} tone="default">
        <CardHeader>
          <Heading level={3} size="subheading">
            Consultoria
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>Visão estratégica para decidir onde a IA apoia a operação.</Text>
        </CardBody>
        <CardFooter>
          <Button variant="ghost" size="sm">
            Ver detalhes
          </Button>
        </CardFooter>
      </Card>
      <Card {...args} tone="alt">
        <CardHeader>
          <Heading level={3} size="subheading">
            Mentoria
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>Autonomia para a equipe entender e aplicar IA na gestão, com critério.</Text>
        </CardBody>
        <CardFooter>
          <Button size="sm">Agendar conversa</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
