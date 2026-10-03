import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../Button/Button';
import { Alert } from './Alert';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  args: {
    tone: 'info',
    children: 'Revise as informações antes de continuar.',
    onDismiss: undefined,
  },
  argTypes: {
    tone: { control: 'radio', options: ['info', 'success', 'warning', 'error'] },
    title: { control: 'text' },
    action: { control: false },
    onDismiss: { control: false },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Caso padrão: tom `info`, só mensagem. Ícone + texto garantem que o estado não dependa da cor. */
export const Padrao: Story = {};

/** Info e sucesso usam `role="status"`; atenção e erro usam `role="alert"`, anunciados de imediato. */
export const Tons: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Alert {...args} tone="info" title="Informação">
        Revise as informações antes de continuar.
      </Alert>
      <Alert {...args} tone="success" title="Sucesso">
        Alterações salvas.
      </Alert>
      <Alert {...args} tone="warning" title="Atenção">
        Confirme os dados antes de enviar.
      </Alert>
      <Alert {...args} tone="error" title="Erro">
        Não foi possível salvar. Tente novamente.
      </Alert>
    </div>
  ),
};

/** Título, ação discreta e botão de fechar ("Fechar aviso", área de toque de 44px). */
export const Completo: Story = {
  args: {
    tone: 'error',
    title: 'Não foi possível salvar.',
    children: 'Verifique sua conexão e tente novamente.',
    onDismiss: fn(),
  },
  render: (args) => (
    <Alert
      {...args}
      action={
        <Button variant="ghost" size="sm">
          Tentar novamente
        </Button>
      }
    />
  ),
};

/** Versão compacta: apenas a mensagem, para feedback junto a formulários. */
export const Compacto: Story = {
  args: { tone: 'success', children: 'Alterações salvas.' },
};

/** Sobre fundo escuro os tokens semânticos trocam sozinhos: fundos translúcidos e tons mais claros. */
export const SobreFundoEscuro: Story = {
  globals: { backgrounds: { value: 'escuro' } },
  args: { onDismiss: fn() },
  render: (args) => (
    <div className="mdia-dark" style={{ display: 'grid', gap: 16, padding: 24 }}>
      <Alert {...args} tone="info" title="Informação">
        Revise as informações antes de continuar.
      </Alert>
      <Alert {...args} tone="success">
        Alterações salvas.
      </Alert>
      <Alert {...args} tone="warning" title="Atenção">
        Confirme os dados antes de enviar.
      </Alert>
      <Alert
        {...args}
        tone="error"
        title="Não foi possível salvar."
        action={
          <Button variant="ghost" size="sm">
            Tentar novamente
          </Button>
        }
      >
        Verifique sua conexão e tente novamente.
      </Alert>
    </div>
  ),
};
