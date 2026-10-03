import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Text } from '../Text';
import { Divider } from './Divider';

const meta = {
  title: 'Layout/Divider',
  component: Divider,
  args: { orientation: 'horizontal', spacing: 4, decorative: true },
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    spacing: { control: 'select', options: [0, 2, 4, 6, 8] },
    label: { control: 'text' },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Linha de 1px na cor da borda, com 16px de margem vertical (`spacing={4}`). */
export const Horizontal: Story = {
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <Text>Consultoria oferece visão estratégica.</Text>
      <Divider {...args} />
      <Text>Mentoria desenvolve autonomia.</Text>
    </div>
  ),
};

/** Vertical: estica na altura do contêiner flex e usa a margem na horizontal. */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Text>Consultoria</Text>
      <Divider {...args} />
      <Text>Mentoria</Text>
    </div>
  ),
};

/** Com rótulo central, ex.: "ou" entre duas ações. */
export const ComRotulo: Story = {
  args: { label: 'ou' },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <Button fullWidth>Agendar conversa</Button>
      <Divider {...args} />
      <Button variant="secondary" fullWidth>
        Conhecer a mentoria
      </Button>
    </div>
  ),
};

/** `decorative={false}`: anunciado como separador (`<hr>`), quando a divisão tem significado para leitores de tela. */
export const Semantico: Story = {
  args: { decorative: false, spacing: 6 },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <Text>Inteligência humana. Potencial ampliado.</Text>
      <Divider {...args} />
      <Text>Clareza para decidir. Confiança para evoluir.</Text>
    </div>
  ),
};

/** Margens pela escala: 0, 8, 16, 32 e 64px. */
export const Espacamentos: Story = {
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      {([0, 2, 4, 6, 8] as const).map((spacing) => (
        <div key={spacing}>
          <Text size="sm" tone="secondary">
            spacing={spacing}
          </Text>
          <Divider {...args} spacing={spacing} />
        </div>
      ))}
    </div>
  ),
};

/** Sobre fundo escuro a linha usa a borda translúcida do tema. */
export const SobreFundoEscuro: Story = {
  globals: { backgrounds: { value: 'escuro' } },
  render: (args) => (
    <div className="mdia-dark" style={{ maxWidth: 480, padding: 24 }}>
      <Text>Consultoria oferece visão estratégica.</Text>
      <Divider {...args} />
      <Text>Mentoria desenvolve autonomia.</Text>
      <Divider {...args} label="ou" />
      <Button variant="secondary" fullWidth>
        Conhecer a mentoria
      </Button>
    </div>
  ),
};
