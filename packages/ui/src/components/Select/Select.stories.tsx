import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '../Field';
import { Select } from './Select';

const INTERESSES = [
  { value: 'consultoria', label: 'Consultoria' },
  { value: 'mentoria', label: 'Mentoria' },
  { value: 'nao-sei', label: 'Ainda não sei' },
];

const meta = {
  title: 'Formulários/Select',
  component: Select,
  args: {
    placeholder: 'Selecione uma opção',
    options: INTERESSES,
    fullWidth: false,
    invalid: false,
    disabled: false,
  },
  argTypes: { children: { control: false } },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 420px)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Field label="Interesse" hint="Dá para mudar de ideia depois.">
      <Select {...args} />
    </Field>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `<select>` nativo com seta decorativa; o placeholder é uma opção vazia e desabilitada. */
export const Padrao: Story = {};

export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Field label="Interesse" error="Escolha uma opção.">
        <Select {...args} />
      </Field>
      <Field label="Interesse" disabled>
        <Select {...args} defaultValue="mentoria" />
      </Field>
      <Field label="Interesse" required>
        <Select {...args} />
      </Field>
    </div>
  ),
};

/** Sem placeholder, a opção inicial vem de `defaultValue` (ou da primeira opção). */
export const ComValorInicial: Story = {
  args: { placeholder: undefined, defaultValue: 'consultoria' },
};

/** `children` com `<option>` é a alternativa a `options`; opções podem ser desabilitadas. */
export const ComChildren: Story = {
  args: { options: undefined },
  render: (args) => (
    <Field label="Especialidade">
      <Select {...args}>
        <option value="clinica-geral">Clínica geral</option>
        <option value="odontologia">Odontologia</option>
        <option value="fisioterapia">Fisioterapia</option>
        <option value="outra" disabled>
          Outra (em breve)
        </option>
      </Select>
    </Field>
  ),
};

export const LarguraTotal: Story = {
  args: { fullWidth: true },
};
