import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';

const OPTIONS = [
  {
    value: 'consultoria',
    label: 'Consultoria',
    description: 'Visão estratégica para decidir onde a IA apoia a operação.',
  },
  {
    value: 'mentoria',
    label: 'Mentoria',
    description: 'Autonomia para líderes e equipes, com escuta e método.',
  },
  { value: 'nao-sei', label: 'Ainda não sei' },
];

const meta = {
  title: 'Formulários/RadioGroup',
  component: RadioGroup,
  args: {
    label: 'Como prefere começar?',
    name: 'inicio',
    options: OPTIONS,
    defaultValue: 'consultoria',
    orientation: 'vertical',
  },
  argTypes: { orientation: { control: 'radio', options: ['vertical', 'horizontal'] } },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Grupo em fieldset com legend; cada opção pode ter descrição. */
export const Vertical: Story = {};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    options: OPTIONS.map(({ value, label }) => ({ value, label })),
  },
};

/** Dica e erro ligados ao grupo por aria-describedby; o erro é anunciado. */
export const ComDicaEErro: Story = {
  args: {
    hint: 'Você pode mudar depois.',
    error: 'Escolha uma opção para continuar.',
    defaultValue: undefined,
  },
};

export const Desabilitado: Story = {
  args: { disabled: true },
};

export const SobreFundoEscuro: Story = {
  globals: { backgrounds: { value: 'escuro' } },
  render: (args) => (
    <div className="mdia-dark" style={{ padding: 24 }}>
      <RadioGroup {...args} />
    </div>
  ),
};
