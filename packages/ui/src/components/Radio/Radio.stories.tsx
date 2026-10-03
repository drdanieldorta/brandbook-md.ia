import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';
import type { RadioGroupProps } from './RadioGroup';

const OPCOES = [
  { value: 'consultoria', label: 'Consultoria' },
  { value: 'mentoria', label: 'Mentoria' },
  { value: 'nao-sei', label: 'Ainda não sei' },
];

const OPCOES_COM_DESCRICAO = [
  {
    value: 'consultoria',
    label: 'Consultoria',
    description: 'Diagnóstico e plano de implementação para a sua clínica.',
  },
  {
    value: 'mentoria',
    label: 'Mentoria',
    description: 'Acompanhamento para aplicar IA no seu dia a dia.',
  },
  {
    value: 'nao-sei',
    label: 'Ainda não sei',
    description: 'Conversamos para entender o melhor caminho.',
  },
];

const meta = {
  title: 'Formulários/Radio',
  component: RadioGroup,
  subcomponents: { Radio },
  args: {
    label: 'Como prefere começar?',
    name: 'inicio',
    orientation: 'vertical',
    required: false,
    disabled: false,
    invalid: false,
    options: OPCOES,
  },
  argTypes: {
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
    hint: { control: 'text' },
    error: { control: 'text' },
    options: { control: false },
    children: { control: false },
    onChange: { control: false },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Grupo vertical (padrão) a partir de `options`; a legenda é o nome acessível do fieldset. */
export const Vertical: Story = {};

/** Opções lado a lado, com quebra de linha quando faltar espaço. */
export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};

/** Cada opção pode ter uma descrição ligada por aria-describedby. */
export const ComDescricoes: Story = {
  args: { options: OPCOES_COM_DESCRICAO, hint: 'Você pode mudar de ideia depois.' },
};

/** Radios declarados como children consomem `name`, seleção e estados do grupo. */
export const ComChildren: Story = {
  args: { options: undefined, defaultValue: 'mentoria' },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="consultoria" label="Consultoria" />
      <Radio value="mentoria" label="Mentoria" />
      <Radio value="nao-sei" label="Ainda não sei" />
    </RadioGroup>
  ),
};

function RadioGroupControlado(args: RadioGroupProps) {
  const [value, setValue] = useState('consultoria');
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <RadioGroup {...args} value={value} onChange={setValue} />
      <p style={{ margin: 0 }}>
        Selecionado: <strong>{value}</strong>
      </p>
    </div>
  );
}

/** Controlado: `value` + `onChange(value)`. */
export const Controlado: Story = {
  render: (args) => <RadioGroupControlado {...args} />,
};

/** Estados: erro com mensagem (role="alert"), grupo desabilitado e opção desabilitada. */
export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 32 }}>
      <RadioGroup
        {...args}
        name="inicio-erro"
        hint="Você pode mudar de ideia depois."
        error="Escolha uma opção para continuar."
      />
      <RadioGroup {...args} name="inicio-desabilitado" defaultValue="mentoria" disabled />
      <RadioGroup
        {...args}
        name="inicio-opcao-desabilitada"
        options={[
          { value: 'consultoria', label: 'Consultoria' },
          { value: 'mentoria', label: 'Mentoria (turma lotada)', disabled: true },
          { value: 'nao-sei', label: 'Ainda não sei' },
        ]}
      />
    </div>
  ),
};

/** Radio avulso, fora de um grupo: funciona como input nativo com `name`/`checked` próprios. */
export const Avulso: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 4 }}>
      <Radio name="formato" value="online" label="Online" defaultChecked />
      <Radio name="formato" value="presencial" label="Presencial" description="Na sua clínica." />
    </div>
  ),
};

/** Sobre fundo escuro os tokens semânticos trocam superfície, borda e texto; o azul marcado permanece. */
export const SobreFundoEscuro: Story = {
  globals: { backgrounds: { value: 'escuro' } },
  render: (args) => (
    <div className="mdia-dark" style={{ display: 'grid', gap: 32, padding: 24, minWidth: 320 }}>
      <RadioGroup {...args} options={OPCOES_COM_DESCRICAO} defaultValue="mentoria" />
      <RadioGroup {...args} name="inicio-erro-escuro" error="Escolha uma opção para continuar." />
      <RadioGroup {...args} name="inicio-desabilitado-escuro" defaultValue="consultoria" disabled />
    </div>
  ),
};
