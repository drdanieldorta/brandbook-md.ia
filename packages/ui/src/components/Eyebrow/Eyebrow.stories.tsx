import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from '../Heading/Heading';
import { Eyebrow } from './Eyebrow';

const meta = {
  title: 'Texto/Eyebrow',
  component: Eyebrow,
  args: { children: 'Da ideia à apresentação', tone: 'brand', dot: true },
  argTypes: { tone: { control: 'radio', options: ['brand', 'gold', 'secondary'] } },
} satisfies Meta<typeof Eyebrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};

export const Tons: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Eyebrow {...args} tone="brand">
        Seu caminho
      </Eyebrow>
      <Eyebrow {...args} tone="gold">
        Guia 4.0
      </Eyebrow>
      <Eyebrow {...args} tone="secondary">
        Playbook prático
      </Eyebrow>
    </div>
  ),
};

/** Composição típica: kicker acima do título display. */
export const ComTitulo: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Eyebrow {...args} />
      <Heading level={1}>Crie slides no ChatGPT.</Heading>
    </div>
  ),
};

export const SemPonto: Story = { args: { dot: false } };
