import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

const meta = {
  title: 'Texto/Link',
  component: Link,
  args: { children: 'Conhecer a mentoria', href: '#mentoria', tone: 'default', external: false },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};

export const Externo: Story = {
  args: { external: true, href: 'https://mdia.com.br', children: 'Site da MD.IA' },
};

export const EmParagrafo: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <p style={{ maxWidth: '60ch', margin: 0 }}>
      Consultoria oferece visão estratégica; mentoria desenvolve autonomia. <Link {...args} /> para
      entender qual caminho faz sentido para a sua clínica.
    </p>
  ),
};

export const SobreFundoEscuro: Story = {
  globals: { backgrounds: { value: 'escuro' } },
  render: (args) => (
    <div className="mdia-dark" style={{ padding: 24 }}>
      <Link {...args} />
    </div>
  ),
};
