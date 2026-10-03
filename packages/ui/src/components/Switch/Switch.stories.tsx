import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';
import type { SwitchProps } from './Switch';

const meta = {
  title: 'Formulários/Switch',
  component: Switch,
  args: {
    label: 'Receber resumo semanal por e-mail',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    size: { control: 'radio', options: ['md', 'sm'] },
    label: { control: 'text' },
    description: { control: 'text' },
    checked: { control: 'boolean' },
    onCheckedChange: { control: false },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Caso padrão (não controlado): clique no trilho ou no rótulo, Espaço/Enter pelo teclado. */
export const Padrao: Story = {};

/** Descrição secundária abaixo do rótulo, ligada por aria-describedby. */
export const ComDescricao: Story = {
  args: {
    description: 'Um e-mail com os principais aprendizados da semana.',
  },
};

/** `md` (44×24px) e `sm` (36×20px); ambos mantêm 44px de área de toque. */
export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 4, minWidth: 320 }}>
      <Switch {...args} size="md" label="Médio (44×24px)" defaultChecked />
      <Switch {...args} size="sm" label="Pequeno (36×20px)" defaultChecked />
    </div>
  ),
};

/** Estados: desligado, ligado (azul + ícone de check) e desabilitado nos dois estados. */
export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 4, minWidth: 320 }}>
      <Switch {...args} label="Desligado" />
      <Switch {...args} label="Ligado" defaultChecked />
      <Switch {...args} label="Desabilitado e desligado" disabled />
      <Switch {...args} label="Desabilitado e ligado" disabled defaultChecked />
    </div>
  ),
};

function SwitchControlado(args: SwitchProps) {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ display: 'grid', gap: 16, minWidth: 320 }}>
      <Switch {...args} checked={checked} onCheckedChange={setChecked} />
      <p style={{ margin: 0 }} aria-live="polite">
        Resumo semanal: <strong>{checked ? 'ligado' : 'desligado'}</strong>
      </p>
    </div>
  );
}

/** Controlado: `checked` + `onCheckedChange(checked)` com estado no componente pai. */
export const Controlado: Story = {
  args: { description: 'Um e-mail com os principais aprendizados da semana.' },
  render: (args) => <SwitchControlado {...args} />,
};

/** Sobre fundo escuro: trilho desligado usa a borda do tema; ligado permanece azul vivo. */
export const SobreFundoEscuro: Story = {
  globals: { backgrounds: { value: 'escuro' } },
  render: (args) => (
    <div className="mdia-dark" style={{ display: 'grid', gap: 4, padding: 24, minWidth: 320 }}>
      <Switch
        {...args}
        label="Receber resumo semanal por e-mail"
        description="Um e-mail com os principais aprendizados da semana."
      />
      <Switch {...args} label="Avisos sobre novas turmas da mentoria" defaultChecked />
      <Switch {...args} label="Participar de pesquisas da MD.IA" size="sm" defaultChecked />
      <Switch {...args} label="Desabilitado" disabled />
    </div>
  ),
};
