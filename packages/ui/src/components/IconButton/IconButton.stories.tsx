import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus, Search, Settings, Star, X } from 'lucide-react';
import { IconButton } from './IconButton';
import type { IconButtonProps } from './IconButton';

const meta = {
  title: 'Ações/IconButton',
  component: IconButton,
  args: {
    label: 'Fechar',
    icon: <X />,
    variant: 'ghost',
    size: 'md',
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    pressed: { control: 'boolean' },
    icon: { control: false },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Botão de alternância de exemplo: `pressed` vira `aria-pressed` e o ícone preenchido reforça o estado além da cor. */
function Favoritar(args: IconButtonProps) {
  const [pressed, setPressed] = useState(false);
  return (
    <IconButton
      {...args}
      label="Favoritar"
      icon={<Star fill={pressed ? 'currentColor' : 'none'} />}
      pressed={pressed}
      onClick={() => setPressed((value) => !value)}
    />
  );
}

/** Caso padrão: ação discreta com rótulo acessível obrigatório, lido por leitores de tela e exibido como dica. */
export const Padrao: Story = {};

/** `ghost` para ações discretas; `secondary` e `primary` seguem o Button (uma ação principal por contexto, guia §7). */
export const Variantes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <IconButton {...args} variant="ghost" icon={<Search />} label="Buscar" />
      <IconButton {...args} variant="secondary" icon={<Settings />} label="Configurações" />
      <IconButton {...args} variant="primary" icon={<Plus />} label="Adicionar" />
    </div>
  ),
};

/** `md` tem 44px (toque mínimo); `sm` reduz o visual para 36px preservando 44px de área de toque; `lg` tem 52px. */
export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <IconButton {...args} size="sm" label="Fechar (pequeno)" />
      <IconButton {...args} size="md" label="Fechar (médio, 44px)" />
      <IconButton {...args} size="lg" label="Fechar (grande)" />
    </div>
  ),
};

/** Carregamento troca o ícone pelo spinner e desabilita; desabilitado não reage; o último alterna `aria-pressed` ao clicar. */
export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <IconButton {...args} label="Fechar" />
      <IconButton {...args} loading icon={<Search />} label="Buscando…" />
      <IconButton {...args} disabled label="Fechar" />
      <Favoritar {...args} />
    </div>
  ),
};

/** Sobre fundo escuro: a ação discreta e o secundário herdam o off-white do tema; o pressionado usa a superfície escura de hover. */
export const SobreFundoEscuro: Story = {
  globals: { backgrounds: { value: 'escuro' } },
  render: (args) => (
    <div className="mdia-dark" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: 24 }}>
      <IconButton {...args} variant="ghost" icon={<Search />} label="Buscar" />
      <IconButton {...args} variant="secondary" icon={<Settings />} label="Configurações" />
      <IconButton {...args} variant="primary" icon={<Plus />} label="Adicionar" />
      <Favoritar {...args} />
    </div>
  ),
};
