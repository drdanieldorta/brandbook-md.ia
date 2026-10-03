import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  args: { size: 'md', tone: 'brand', label: 'Carregando…' },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
    </div>
  ),
};

export const ComTexto: Story = {
  render: (args) => (
    <p style={{ display: 'inline-flex', gap: 8, alignItems: 'center', margin: 0 }}>
      <Spinner {...args} decorative />
      Salvando…
    </p>
  ),
};
