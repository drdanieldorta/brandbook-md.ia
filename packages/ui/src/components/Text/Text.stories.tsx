import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta = {
  title: 'Texto/Text',
  component: Text,
  args: {
    children:
      'Vamos identificar onde a IA pode apoiar sua operação: com clareza, critério e proximidade, traduzindo o complexo em exemplos próximos da rotina de gestão.',
    size: 'md',
    weight: 'regular',
    tone: 'default',
    measure: true,
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Corpo: Story = {};

export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Text {...args} size="lg">
        Corpo grande (18px): {args.children}
      </Text>
      <Text {...args} size="md">
        Corpo (16px): {args.children}
      </Text>
      <Text {...args} size="sm">
        Pequeno (14px): {args.children}
      </Text>
      <Text {...args} size="caption">
        Legenda (12px): {args.children}
      </Text>
    </div>
  ),
};

export const Tons: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 8 }}>
      <Text {...args}>Padrão: azul-noite sobre superfície clara.</Text>
      <Text {...args} tone="secondary">
        Secundário: informação de apoio.
      </Text>
      <Text {...args} tone="brand" weight="semibold">
        Marca: destaque em azul vivo.
      </Text>
      <Text {...args} tone="success">
        Sucesso: alterações salvas.
      </Text>
      <Text {...args} tone="warning">
        Alerta: revise antes de continuar.
      </Text>
      <Text {...args} tone="error">
        Erro: não foi possível salvar. Tente novamente.
      </Text>
      <Text {...args} tone="disabled">
        Desabilitado: sem interação.
      </Text>
    </div>
  ),
};
