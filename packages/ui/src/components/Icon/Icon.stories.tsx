import type { Meta, StoryObj } from '@storybook/react-vite';
import * as icons from '../../icons/icons';
import { Icon } from './Icon';

const { Sparkles, ShieldCheck } = icons;

const meta = {
  title: 'Marca/Icon',
  component: Icon,
  args: { icon: Sparkles, tone: 'gold', size: 32 },
  argTypes: {
    icon: { control: false },
    tone: { control: 'radio', options: ['gold', 'brand', 'secondary', 'current'] },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Traço em gradiente dourado: a marca dos ícones na identidade escura. */
export const Dourado: Story = {};

/** O conjunto `icons` da biblioteca: ícones lucide escolhidos para saúde, gestão e navegação. */
export const Biblioteca: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, max-content)',
        gap: 24,
        justifyItems: 'center',
      }}
    >
      {Object.entries(icons).map(([name, icon]) => (
        <div key={name} style={{ display: 'grid', gap: 8, justifyItems: 'center', fontSize: 12 }}>
          <Icon {...args} icon={icon} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Tons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Icon {...args} tone="gold" />
      <Icon {...args} tone="brand" />
      <Icon {...args} tone="secondary" />
      <span style={{ color: 'var(--mdia-color-success)', display: 'inline-flex' }}>
        <Icon {...args} tone="current" />
      </span>
    </div>
  ),
};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      {[16, 20, 24, 32, 44].map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

/** Com `label`, o ícone passa a ser imagem nomeada para leitores de tela. */
export const ComRotulo: Story = {
  args: { icon: ShieldCheck, label: 'Dados protegidos' },
};

/** No tema claro do guia, o gradiente dourado continua legível sobre branco por ser traço grosso, não texto. */
export const SobreFundoClaro: Story = {
  render: (args) => (
    <div className="mdia-light" style={{ display: 'flex', gap: 24, padding: 24, borderRadius: 16 }}>
      <Icon {...args} tone="gold" />
      <Icon {...args} tone="brand" />
      <Icon {...args} tone="secondary" />
    </div>
  ),
};
