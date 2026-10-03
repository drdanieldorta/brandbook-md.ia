import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '../Field';
import { TextArea } from './TextArea';

const meta = {
  title: 'Formulários/TextArea',
  component: TextArea,
  args: { rows: 4, resize: 'vertical', fullWidth: false, invalid: false, disabled: false },
  argTypes: {
    resize: { control: 'radio', options: ['vertical', 'none'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 420px)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Field label="Mensagem" hint="Conte brevemente o contexto da clínica.">
      <TextArea {...args} />
    </Field>
  ),
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Dentro de um `Field`: recebe `id`, `aria-describedby`, `aria-invalid` e `required` automaticamente. */
export const Padrao: Story = {};

export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Field label="Mensagem" error="Descreva brevemente o contexto.">
        <TextArea {...args} />
      </Field>
      <Field label="Mensagem" disabled>
        <TextArea {...args} defaultValue="Queremos entender onde a IA pode apoiar a recepção." />
      </Field>
      <Field label="Mensagem" required>
        <TextArea {...args} />
      </Field>
    </div>
  ),
};

/** `resize="none"` fixa a altura; o padrão permite ajuste vertical. */
export const SemRedimensionar: Story = {
  args: { resize: 'none', rows: 3 },
};

export const LarguraTotal: Story = {
  args: { fullWidth: true },
};
