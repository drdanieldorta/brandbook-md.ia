import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Text } from '../Text';
import { Stack } from './Stack';

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  args: { direction: 'column', gap: 4, wrap: false, as: 'div' },
  argTypes: {
    direction: { control: 'radio', options: ['column', 'row'] },
    gap: { control: 'select', options: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between', 'around'] },
    as: {
      control: 'select',
      options: ['div', 'section', 'ul', 'ol', 'nav', 'header', 'footer', 'article', 'span'],
    },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Empilha com 16px (`gap={4}`) por padrão; `align="start"` evita esticar os botões. */
export const Vertical: Story = {
  args: { align: 'start' },
  render: (args) => (
    <Stack {...args}>
      <Button>Agendar conversa</Button>
      <Button variant="secondary">Conhecer a mentoria</Button>
      <Button variant="ghost">Ver detalhes</Button>
    </Stack>
  ),
};

/** Em linha, com quebra em telas estreitas. */
export const Horizontal: Story = {
  args: { direction: 'row', align: 'center', wrap: true },
  render: (args) => (
    <Stack {...args}>
      <Button>Agendar conversa</Button>
      <Button variant="secondary">Conhecer a mentoria</Button>
      <Button variant="ghost">Ver detalhes</Button>
    </Stack>
  ),
};

/** O espaço entre itens vem da escala do guia (§6): 8, 16, 24 e 32px. */
export const Espacamentos: Story = {
  args: { direction: 'row', align: 'center', wrap: true },
  render: (args) => (
    <Stack gap={6}>
      {([2, 4, 5, 6] as const).map((gap) => (
        <Stack key={gap} gap={2}>
          <Text size="sm" tone="secondary">
            gap={gap}
          </Text>
          <Stack {...args} gap={gap}>
            <Button size="sm">Agendar conversa</Button>
            <Button size="sm" variant="secondary">
              Conhecer a mentoria
            </Button>
            <Button size="sm" variant="ghost">
              Ver detalhes
            </Button>
          </Stack>
        </Stack>
      ))}
    </Stack>
  ),
};

/** Distribuição no eixo principal, ex.: ação à esquerda e à direita. */
export const Distribuicao: Story = {
  args: { direction: 'row', align: 'center', justify: 'between' },
  render: (args) => (
    <Stack {...args}>
      <Button variant="ghost">Voltar</Button>
      <Button>Continuar</Button>
    </Stack>
  ),
};

/** Como lista semântica (`as="ul"`), sem marcadores. */
export const ComoLista: Story = {
  args: { as: 'ul', gap: 2 },
  render: (args) => (
    <Stack {...args}>
      <Text as="li">Clareza: traduzir o complexo com exemplos próximos da rotina.</Text>
      <Text as="li">
        Critério: relacionar tecnologia a necessidades, limites e responsabilidade.
      </Text>
      <Text as="li">Proximidade: orientar líderes e equipes com escuta e método.</Text>
    </Stack>
  ),
};
