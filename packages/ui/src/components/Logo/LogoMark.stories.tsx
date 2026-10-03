import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogoMark } from './LogoMark';

const meta = {
  title: 'Marca/LogoMark',
  component: LogoMark,
  args: { variant: 'gradiente', size: 48, title: 'MD.IA' },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof LogoMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gradiente: Story = {};

export const Monocromatico: Story = {
  args: { variant: 'monocromatico' },
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <span style={{ color: '#102B50' }}>
        <LogoMark {...args} />
      </span>
      <span
        style={{
          color: '#F5F3EE',
          background: '#102B50',
          padding: 12,
          borderRadius: 8,
          display: 'inline-flex',
        }}
      >
        <LogoMark {...args} />
      </span>
    </div>
  ),
};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
      {[16, 24, 32, 48, 64].map((size) => (
        <LogoMark key={size} {...args} size={size} />
      ))}
    </div>
  ),
};
