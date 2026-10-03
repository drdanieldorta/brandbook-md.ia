import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Button, ButtonLink } from './Button';

const meta = {
  title: 'Ações/Button',
  component: Button,
  args: {
    children: 'Agendar conversa',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    iconStart: { control: false },
    iconEnd: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Uma ação principal por contexto; rótulo com verbo claro (guia §7). */
export const Principal: Story = {};

export const Variantes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Button {...args} variant="primary">
        Agendar conversa
      </Button>
      <Button {...args} variant="secondary">
        Conhecer a mentoria
      </Button>
      <Button {...args} variant="ghost">
        Ver detalhes
      </Button>
    </div>
  ),
};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args} size="sm">
        Pequeno
      </Button>
      <Button {...args} size="md">
        Médio (44px)
      </Button>
      <Button {...args} size="lg">
        Grande
      </Button>
    </div>
  ),
};

/** Carregamento desabilita o botão e evita duplo envio; "Salvando…" é o texto sugerido pelo guia. */
export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Button {...args}>Normal</Button>
      <Button {...args} loading loadingLabel="Salvando…">
        Salvar
      </Button>
      <Button {...args} disabled>
        Desabilitado
      </Button>
    </div>
  ),
};

export const ComIcone: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Button {...args} iconStart={<CalendarDays />}>
        Agendar conversa
      </Button>
      <Button {...args} variant="secondary" iconEnd={<ArrowRight />}>
        Conhecer a mentoria
      </Button>
    </div>
  ),
};

export const LarguraTotal: Story = {
  args: { fullWidth: true },
  parameters: { layout: 'padded' },
};

/** Sobre fundo escuro: o secundário e a ação discreta herdam o off-white do tema. */
export const SobreFundoEscuro: Story = {
  globals: { backgrounds: { value: 'escuro' } },
  render: (args) => (
    <div className="mdia-dark" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: 24 }}>
      <Button {...args} variant="primary">
        Agendar conversa
      </Button>
      <Button {...args} variant="secondary">
        Conhecer a mentoria
      </Button>
      <Button {...args} variant="ghost">
        Ver detalhes
      </Button>
    </div>
  ),
};

export const ComoLink: Story = {
  render: (args) => (
    <ButtonLink href="#contato" variant={args.variant} size={args.size} iconEnd={<ArrowRight />}>
      Falar com a MD.IA
    </ButtonLink>
  ),
};
