import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, ToastStack } from './Toast';

const meta = {
  title: 'Feedback/ToastStack',
  component: ToastStack,
  args: { position: 'bottom-right', label: 'Notificações' },
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom-right', 'bottom-left', 'bottom-center', 'top-right', 'top-center'],
    },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ToastStack>;

export default meta;
type Story = StoryObj<typeof meta>;

function Pilha(args: Story['args']) {
  return (
    <div style={{ position: 'relative', minHeight: 360 }}>
      <ToastStack {...args}>
        <Toast tone="success">Alterações salvas.</Toast>
        <Toast tone="info" loading>
          Salvando…
        </Toast>
        <Toast tone="error" title="Erro">
          Não foi possível salvar. Tente novamente.
        </Toast>
      </ToastStack>
    </div>
  );
}

/** Região fixa, nomeada, que empilha notificações; o app controla a lista. */
export const InferiorDireita: Story = { render: (args) => <Pilha {...args} /> };

export const SuperiorCentro: Story = {
  args: { position: 'top-center' },
  render: (args) => <Pilha {...args} />,
};
