import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Card, CardBody, CardFooter, CardHeader } from '../Card';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { Grid } from './Grid';

const servicos = [
  {
    id: 'consultoria',
    titulo: 'Consultoria',
    texto: 'Visão estratégica para decidir onde a IA apoia a operação.',
  },
  {
    id: 'mentoria',
    titulo: 'Mentoria',
    texto: 'Autonomia para a equipe entender e aplicar IA na gestão, com critério.',
  },
  {
    id: 'conversa',
    titulo: 'Conversa inicial',
    texto: 'Vamos identificar onde a IA pode apoiar sua operação.',
  },
];

function CartaoServico({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <Card as="li">
      <CardHeader>
        <Heading level={3} size="subheading">
          {titulo}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>{texto}</Text>
      </CardBody>
      <CardFooter>
        <Button variant="ghost" size="sm">
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  );
}

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  args: { columns: 3, gap: 5, as: 'ul' },
  argTypes: {
    columns: { control: 'select', options: [1, 2, 3, 4, 6, 12] },
    minItemWidth: { control: 'text' },
    gap: { control: 'select', options: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
    as: { control: 'select', options: ['div', 'section', 'ul', 'ol', 'article'] },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Três colunas fixas; abaixo de 768px (breakpoint proposto) viram uma. Os rodapés alinham porque os cartões esticam. */
export const TresColunas: Story = {
  render: (args) => (
    <Grid {...args}>
      {servicos.map((servico) => (
        <CartaoServico key={servico.id} titulo={servico.titulo} texto={servico.texto} />
      ))}
    </Grid>
  ),
};

/** Duas colunas; viram uma abaixo de 640px (sm). */
export const DuasColunas: Story = {
  args: { columns: 2 },
  render: (args) => (
    <Grid {...args}>
      {servicos.slice(0, 2).map((servico) => (
        <CartaoServico key={servico.id} titulo={servico.titulo} texto={servico.texto} />
      ))}
    </Grid>
  ),
};

/** Com `minItemWidth`, as colunas se ajustam ao espaço: cada item tem no mínimo 280px e cabe quantos couberem por linha. */
export const Fluida: Story = {
  args: { minItemWidth: '280px' },
  render: (args) => (
    <Grid {...args}>
      {[...servicos, ...servicos].map((servico, index) => (
        <CartaoServico
          key={`${servico.id}-${index}`}
          titulo={servico.titulo}
          texto={servico.texto}
        />
      ))}
    </Grid>
  ),
};

/** `align="start"` evita esticar cartões de alturas diferentes. */
export const AlinhamentoNoTopo: Story = {
  args: { align: 'start' },
  render: (args) => (
    <Grid {...args}>
      <Card as="li">
        <Heading level={3} size="subheading">
          Consultoria
        </Heading>
      </Card>
      <Card as="li">
        <Heading level={3} size="subheading">
          Mentoria
        </Heading>
        <Text>Autonomia para a equipe entender e aplicar IA na gestão, com critério.</Text>
      </Card>
      <Card as="li">
        <Heading level={3} size="subheading">
          Conversa inicial
        </Heading>
      </Card>
    </Grid>
  ),
};
