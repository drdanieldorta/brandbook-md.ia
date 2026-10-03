import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../Button/Button';
import { Toast, ToastStack } from './Toast';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  args: {
    tone: 'success',
    children: 'Alterações salvas.',
    loading: false,
    onDismiss: fn(),
  },
  argTypes: {
    tone: { control: 'radio', options: ['info', 'success', 'warning', 'error'] },
    title: { control: 'text' },
    action: { control: false },
    onDismiss: { control: false },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Caso padrão: "Alterações salvas." com botão "Fechar notificação". Entrada única de 400ms. */
export const Padrao: Story = {};

/** Info e sucesso anunciam de forma educada (`status`/`polite`); atenção e erro interrompem (`alert`/`assertive`). */
export const Tons: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12, width: 'min(420px, 100%)' }}>
      <Toast {...args} tone="info">
        Revise as informações antes de continuar.
      </Toast>
      <Toast {...args} tone="success">
        Alterações salvas.
      </Toast>
      <Toast {...args} tone="warning">
        Confirme os dados antes de enviar.
      </Toast>
      <Toast {...args} tone="error">
        Não foi possível salvar. Tente novamente.
      </Toast>
    </div>
  ),
};

/** Título, ação discreta e fechar. */
export const Completo: Story = {
  args: {
    tone: 'error',
    title: 'Não foi possível salvar.',
    children: 'Tente novamente em instantes.',
  },
  render: (args) => (
    <Toast
      {...args}
      action={
        <Button variant="ghost" size="sm">
          Tentar novamente
        </Button>
      }
    />
  ),
};

/** Versão compacta: só a mensagem, sem botão de fechar (o app remove o toast após alguns segundos). */
export const Compacto: Story = {
  args: { onDismiss: undefined },
};

/** "Salvando…" com spinner decorativo no lugar do ícone; o texto já anuncia o estado. */
export const Carregando: Story = {
  args: { tone: 'info', loading: true, children: 'Salvando…', onDismiss: undefined },
};

/**
 * `ToastStack` é uma região fixa ("Notificações") que empilha os toasts no canto
 * escolhido. Sem provider: o app controla a lista. Como a pilha é `position: fixed`,
 * ela se posiciona na janela do iframe da story.
 */
export const Empilhados: StoryObj<typeof ToastStack> = {
  parameters: { layout: 'fullscreen' },
  args: { position: 'bottom-right', label: 'Notificações' },
  argTypes: {
    position: {
      control: 'radio',
      options: ['bottom-right', 'bottom-left', 'bottom-center', 'top-right', 'top-center'],
    },
  },
  render: ({ position, label }) => (
    <div style={{ position: 'relative', height: 320 }}>
      <ToastStack position={position} label={label}>
        <Toast tone="info" loading>
          Salvando…
        </Toast>
        <Toast tone="success" onDismiss={fn()}>
          Alterações salvas.
        </Toast>
        <Toast
          tone="error"
          onDismiss={fn()}
          action={
            <Button variant="ghost" size="sm">
              Tentar novamente
            </Button>
          }
        >
          Não foi possível salvar. Tente novamente.
        </Toast>
      </ToastStack>
    </div>
  ),
};
