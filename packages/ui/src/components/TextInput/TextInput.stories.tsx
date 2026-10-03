import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Search } from 'lucide-react';
import { Field } from '../Field';
import { TextInput } from './TextInput';

const meta = {
  title: 'Formulários/TextInput',
  component: TextInput,
  args: { size: 'md', fullWidth: false, invalid: false, disabled: false },
  argTypes: {
    size: { control: 'radio', options: ['md', 'lg'] },
    iconStart: { control: false },
    iconEnd: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 420px)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Field label="Nome da clínica" hint="Como aparece no CNPJ.">
      <TextInput {...args} />
    </Field>
  ),
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Dentro de um `Field`: recebe `id`, `aria-describedby`, `aria-invalid` e `required` automaticamente. */
export const Padrao: Story = {};

/** Erro, desabilitado e obrigatório vêm do `Field`; `invalid` e `disabled` também funcionam fora dele. */
export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Field
        label="Nome da clínica"
        hint="Como aparece no CNPJ."
        error="Informe o nome da clínica."
      >
        <TextInput {...args} />
      </Field>
      <Field label="Nome da clínica" hint="Como aparece no CNPJ." disabled>
        <TextInput {...args} defaultValue="Clínica exemplo" />
      </Field>
      <Field label="E-mail" required>
        <TextInput {...args} type="email" autoComplete="email" />
      </Field>
    </div>
  ),
};

/** Ícones decorativos (`aria-hidden`), antes ou depois do texto; o rótulo continua obrigatório. */
export const ComIcones: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Field label="E-mail">
        <TextInput {...args} type="email" autoComplete="email" iconStart={<Mail />} />
      </Field>
      <Field label="Buscar paciente">
        <TextInput {...args} type="search" placeholder="Nome ou prontuário" iconEnd={<Search />} />
      </Field>
    </div>
  ),
};

/** `md` tem 44px (toque mínimo do guia); `lg` tem 52px. */
export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Field label="Médio (44px)">
        <TextInput {...args} size="md" />
      </Field>
      <Field label="Grande (52px)">
        <TextInput {...args} size="lg" />
      </Field>
    </div>
  ),
};

export const LarguraTotal: Story = {
  args: { fullWidth: true },
};
