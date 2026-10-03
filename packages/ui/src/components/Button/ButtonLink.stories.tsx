import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight } from 'lucide-react';
import { ButtonLink } from './Button';

const meta = {
  title: 'Ações/ButtonLink',
  component: ButtonLink,
  args: {
    children: 'Falar com a MD.IA',
    href: '#contato',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    iconStart: { control: false },
    iconEnd: { control: false },
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Navegação com aparência de botão: use para chamadas para ação que levam a outra página. */
export const Principal: Story = {};

export const Variantes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <ButtonLink {...args} variant="primary" iconEnd={<ArrowRight />}>
        Agendar conversa
      </ButtonLink>
      <ButtonLink {...args} variant="secondary">
        Conhecer a mentoria
      </ButtonLink>
      <ButtonLink {...args} variant="ghost">
        Ver detalhes
      </ButtonLink>
    </div>
  ),
};

/** Desabilitado remove o destino e bloqueia o clique, mantendo o rótulo legível. */
export const Desabilitado: Story = {
  args: { disabled: true },
};
