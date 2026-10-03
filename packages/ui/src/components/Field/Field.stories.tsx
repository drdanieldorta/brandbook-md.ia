import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail } from 'lucide-react';
import { Button } from '../Button';
import { Select } from '../Select';
import { TextArea } from '../TextArea';
import { TextInput } from '../TextInput';
import { Field } from './Field';

const INTERESSES = [
  { value: 'consultoria', label: 'Consultoria' },
  { value: 'mentoria', label: 'Mentoria' },
  { value: 'nao-sei', label: 'Ainda não sei' },
];

const meta = {
  title: 'Formulários/Field',
  component: Field,
  args: {
    label: 'Nome da clínica',
    hint: 'Como aparece no CNPJ.',
    required: false,
    disabled: false,
    children: <TextInput fullWidth />,
  },
  argTypes: {
    children: { control: false },
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 420px)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Rótulo visível associado ao controle; a dica é anunciada via `aria-describedby`. */
export const Padrao: Story = {};

/** Erro com ícone e texto (nunca só por cor), anunciado com `role="alert"`; o controle recebe `aria-invalid`. */
export const ComErro: Story = {
  args: { error: 'Informe o nome da clínica.' },
};

/** O indicador é decorativo: o `required` chega ao controle e é anunciado por ele. */
export const Obrigatorio: Story = {
  args: { required: true },
};

/** `optionalText` marca os campos não obrigatórios quando a maioria do formulário é obrigatória. */
export const Opcional: Story = {
  args: {
    label: 'Telefone',
    hint: undefined,
    optionalText: 'opcional',
    children: <TextInput type="tel" autoComplete="tel" fullWidth />,
  },
};

export const Desabilitado: Story = {
  args: { disabled: true },
};

export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Field {...args} />
      <Field {...args} label="E-mail" hint="Usamos só para responder ao seu contato." required>
        <TextInput type="email" autoComplete="email" iconStart={<Mail />} fullWidth />
      </Field>
      <Field {...args} error="Informe o nome da clínica." />
      <Field {...args} disabled />
    </div>
  ),
};

/** Composição realista: campos em largura total, uma ação principal ("Enviar") e uma discreta ("Cancelar"). Sem integração real de envio. */
export const FormularioCompleto: Story = {
  render: () => (
    <form style={{ display: 'grid', gap: 24 }} onSubmit={(event) => event.preventDefault()}>
      <Field label="Nome" required>
        <TextInput name="nome" autoComplete="name" fullWidth />
      </Field>
      <Field label="E-mail" hint="Usamos só para responder ao seu contato." required>
        <TextInput type="email" name="email" autoComplete="email" iconStart={<Mail />} fullWidth />
      </Field>
      <Field label="Nome da clínica" hint="Como aparece no CNPJ.">
        <TextInput name="clinica" autoComplete="organization" fullWidth />
      </Field>
      <Field label="Interesse" required>
        <Select name="interesse" placeholder="Selecione uma opção" options={INTERESSES} fullWidth />
      </Field>
      <Field
        label="Mensagem"
        hint="Conte brevemente o contexto da clínica."
        optionalText="opcional"
      >
        <TextArea name="mensagem" fullWidth />
      </Field>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Button type="submit">Enviar</Button>
        <Button variant="ghost">Cancelar</Button>
      </div>
    </form>
  ),
};

/** Sobre fundo escuro os controles usam os tokens semânticos (superfície, borda, texto) e continuam legíveis. */
export const SobreFundoEscuro: Story = {
  globals: { backgrounds: { value: 'escuro' } },
  render: (args) => (
    <div className="mdia-dark" style={{ display: 'grid', gap: 24, padding: 24, borderRadius: 16 }}>
      <Field {...args} />
      <Field {...args} label="Interesse" hint={undefined} required>
        <Select placeholder="Selecione uma opção" options={INTERESSES} fullWidth />
      </Field>
      <Field {...args} label="Mensagem" hint={undefined} error="Descreva brevemente o contexto.">
        <TextArea fullWidth />
      </Field>
      <Field {...args} label="Telefone" hint={undefined} optionalText="opcional" disabled>
        <TextInput type="tel" fullWidth />
      </Field>
    </div>
  ),
};
