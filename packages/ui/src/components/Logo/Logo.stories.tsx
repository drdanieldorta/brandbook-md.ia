import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo, LOGO_VARIANT_INFO, LOGO_VARIANTS } from './Logo';

const meta = {
  title: 'Marca/Logo',
  component: Logo,
  args: { variant: 'limpo', width: 280, safeSpace: false, title: 'MD.IA' },
  argTypes: { variant: { control: 'select', options: LOGO_VARIANTS } },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

const DARK_VARIANTS = new Set(['mestre', 'offwhite', 'branco']);

/** Variante limpa: a apresentação priorizada pelo guia 4.0. */
export const Limpo: Story = {};

/** Mestre com brilho: apenas sobre fundo escuro uniforme. */
export const MestreComBrilho: Story = {
  args: { variant: 'mestre' },
  globals: { backgrounds: { value: 'escuro' } },
  render: (args) => (
    <div className="mdia-dark" style={{ display: 'inline-block', padding: 32, borderRadius: 16 }}>
      <Logo {...args} />
    </div>
  ),
};

/** Todas as variantes sobre o fundo que o guia indica para cada uma. */
export const Variantes: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 16,
      }}
    >
      {LOGO_VARIANTS.map((variant) => (
        <figure
          key={variant}
          style={{
            margin: 0,
            padding: 24,
            borderRadius: 16,
            background: DARK_VARIANTS.has(variant)
              ? '#102B50'
              : variant === 'preto'
                ? '#FFFFFF'
                : '#F3F6FA',
            color: DARK_VARIANTS.has(variant) ? '#F5F3EE' : '#102B50',
            border: '1px solid #DDE4ED',
          }}
        >
          <Logo {...args} variant={variant} width="100%" />
          <figcaption style={{ marginTop: 12, fontSize: 14 }}>
            <strong>{LOGO_VARIANT_INFO[variant].label}</strong>
            <br />
            {LOGO_VARIANT_INFO[variant].uso}
          </figcaption>
        </figure>
      ))}
    </div>
  ),
};

/** 280px recomendado na tela; 160px é o mínimo da variante sem brilho em contexto identificado. */
export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <Logo {...args} width={280} />
      <Logo {...args} width={160} />
    </div>
  ),
};

/** Área de proteção: a prancheta já inclui ~30 unidades; `safeSpace` adiciona mais 1x. */
export const AreaDeProtecao: Story = {
  args: { safeSpace: true },
  render: (args) => (
    <span style={{ display: 'inline-block', outline: '1px dashed #8056C7' }}>
      <Logo {...args} />
    </span>
  ),
};
