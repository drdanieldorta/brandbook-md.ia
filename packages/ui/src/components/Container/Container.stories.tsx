import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { Text } from '../Text';
import { Container } from './Container';

/* Bloco de visualização: fundo gelo e borda tracejada para enxergar os limites do container. */
const blocoStyle: CSSProperties = {
  padding: 16,
  background: 'var(--mdia-color-surface-alt)',
  border: '1px dashed var(--mdia-color-border)',
  borderRadius: 'var(--mdia-radius-button)',
  textAlign: 'center',
};

function Bloco({ children }: { children: ReactNode }) {
  return <div style={blocoStyle}>{children}</div>;
}

const meta = {
  title: 'Layout/Container',
  component: Container,
  args: { size: 'lg', gutter: true, as: 'div' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg', 'full'] },
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'main', 'header', 'footer', 'nav'],
    },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `lg` (1200px, token `--mdia-container-max`) é o padrão de página; o respiro lateral vem de `--mdia-container-gutter`. */
export const Padrao: Story = {
  render: (args) => (
    <div style={{ padding: '24px 0' }}>
      <Container {...args}>
        <Bloco>
          <Text>Conteúdo centralizado, com largura máxima e respiro lateral.</Text>
        </Bloco>
      </Container>
    </div>
  ),
};

/** Larguras propostas (v1): sm 720px, md 960px, lg 1200px (token) e full 100%. */
export const Tamanhos: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16, padding: '24px 0' }}>
      <Container {...args} size="sm">
        <Bloco>
          <Text size="sm">sm · 720px</Text>
        </Bloco>
      </Container>
      <Container {...args} size="md">
        <Bloco>
          <Text size="sm">md · 960px</Text>
        </Bloco>
      </Container>
      <Container {...args} size="lg">
        <Bloco>
          <Text size="sm">lg · 1200px (padrão)</Text>
        </Bloco>
      </Container>
      <Container {...args} size="full">
        <Bloco>
          <Text size="sm">full · 100%</Text>
        </Bloco>
      </Container>
    </div>
  ),
};

/** Sem respiro lateral, para faixas que já cuidam do próprio padding. */
export const SemRespiro: Story = {
  args: { gutter: false },
  render: (args) => (
    <div style={{ padding: '24px 0' }}>
      <Container {...args}>
        <Bloco>
          <Text>Encosta nas bordas em telas estreitas.</Text>
        </Bloco>
      </Container>
    </div>
  ),
};
