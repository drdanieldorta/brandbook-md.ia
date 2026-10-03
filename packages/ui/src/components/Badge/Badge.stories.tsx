import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleCheck, Clock, Sparkles } from 'lucide-react';
import { Badge } from './Badge';
import type { BadgeTone, BadgeVariant } from './Badge';

const TONES: { tone: BadgeTone; label: string }[] = [
  { tone: 'neutral', label: 'Rascunho' },
  { tone: 'brand', label: 'Mentoria' },
  { tone: 'success', label: 'Concluído' },
  { tone: 'warning', label: 'Pendente' },
  { tone: 'error', label: 'Cancelado' },
  { tone: 'gold', label: 'Destaque' },
];
const VARIANTS: BadgeVariant[] = ['soft', 'solid', 'outline'];

const meta = {
  title: 'Feedback/Badge',
  component: Badge,
  args: { tone: 'neutral', variant: 'soft', size: 'md', as: 'span', children: 'Rascunho' },
  argTypes: {
    tone: { control: 'radio', options: TONES.map((t) => t.tone) },
    variant: { control: 'radio', options: VARIANTS },
    size: { control: 'radio', options: ['sm', 'md'] },
    as: { control: 'radio', options: ['span', 'strong'] },
    icon: { control: false },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Caso padrão: tom neutro, variante suave, 24px. */
export const Padrao: Story = {};

/**
 * Tom × variante. `gold` nunca aparece sobre branco: a suave usa azul-noite com
 * dourado (guia §4) e a sólida inverte o par; o contorno dourado usa texto na cor de texto.
 */
export const Variantes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 16 }}>
      {TONES.map(({ tone, label }) =>
        VARIANTS.map((variant) => (
          <Badge key={`${tone}-${variant}`} {...args} tone={tone} variant={variant}>
            {label}
          </Badge>
        )),
      )}
    </div>
  ),
};

/** `md` = 24px / 14px; `sm` = 20px / 12px. Peso 600, sem caixa alta forçada. */
export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Badge {...args} tone="success" size="md">
        Concluído
      </Badge>
      <Badge {...args} tone="success" size="sm">
        Concluído
      </Badge>
    </div>
  ),
};

/** Ícone decorativo (lucide, `aria-hidden`) reforça o estado além da cor; `as="strong"` dá peso semântico. */
export const ComIcone: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge {...args} tone="success" icon={<CircleCheck />}>
        Concluído
      </Badge>
      <Badge {...args} tone="warning" variant="outline" icon={<Clock />}>
        Pendente
      </Badge>
      <Badge {...args} tone="gold" as="strong" icon={<Sparkles />}>
        Destaque
      </Badge>
    </div>
  ),
};

/** Sobre fundo escuro: tons semânticos clareiam; o sólido troca o texto para azul-noite. */
export const SobreFundoEscuro: Story = {
  globals: { backgrounds: { value: 'escuro' } },
  render: (args) => (
    <div
      className="mdia-dark"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 16, padding: 24 }}
    >
      {TONES.map(({ tone, label }) =>
        VARIANTS.map((variant) => (
          <Badge key={`${tone}-${variant}`} {...args} tone={tone} variant={variant}>
            {label}
          </Badge>
        )),
      )}
    </div>
  ),
};
