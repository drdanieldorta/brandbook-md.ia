import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta = {
  title: 'Texto/Heading',
  component: Heading,
  args: {
    children: 'Inteligência humana. Potencial ampliado.',
    level: 2,
    tone: 'default',
    balance: true,
  },
  argTypes: { level: { control: 'radio', options: [1, 2, 3, 4, 5, 6] } },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Titulo: Story = {};

/** Escala do guia: display 56–64px, título 32–40px; níveis intermediários são propostas. */
export const Escala: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Heading {...args} level={1} size="display">
        Display: Clareza para decidir.
      </Heading>
      <Heading {...args} level={2} size="title">
        Título: Confiança para evoluir.
      </Heading>
      <Heading {...args} level={3} size="heading">
        Heading: Tecnologia com critério.
      </Heading>
      <Heading {...args} level={4} size="subheading">
        Subheading: Saúde com protagonismo humano.
      </Heading>
    </div>
  ),
};

export const SobreFundoEscuro: Story = {
  globals: { backgrounds: { value: 'escuro' } },
  render: (args) => (
    <div className="mdia-dark" style={{ padding: 24 }}>
      <Heading {...args} level={1}>
        Inteligência humana. Potencial ampliado.
      </Heading>
    </div>
  ),
};
