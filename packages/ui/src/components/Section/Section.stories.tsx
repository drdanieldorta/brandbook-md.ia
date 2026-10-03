import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Section } from './Section';

function Conteudo({ id, titulo, texto }: { id: string; titulo: string; texto: string }) {
  return (
    <Stack gap={4} align="start">
      <Heading id={id} level={2} balance>
        {titulo}
      </Heading>
      <Text size="lg" measure>
        {texto}
      </Text>
      <Button>Agendar conversa</Button>
    </Stack>
  );
}

const meta = {
  title: 'Layout/Section',
  component: Section,
  args: { tone: 'default', spacing: 'md', contained: true, containerSize: 'lg', as: 'section' },
  argTypes: {
    tone: { control: 'radio', options: ['default', 'alt', 'dark'] },
    spacing: { control: 'radio', options: ['sm', 'md', 'lg'] },
    containerSize: { control: 'radio', options: ['sm', 'md', 'lg', 'full'] },
    as: { control: 'select', options: ['section', 'div', 'header', 'footer'] },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Faixa padrão: 64px de respiro vertical e conteúdo dentro de um `Container` lg. */
export const Padrao: Story = {
  render: (args) => (
    <Section {...args} aria-labelledby="secao-padrao">
      <Conteudo
        id="secao-padrao"
        titulo="Inteligência humana. Potencial ampliado."
        texto="Consultoria e mentoria em inteligência artificial para quem lidera negócios de saúde."
      />
    </Section>
  ),
};

/** Faixas alternadas: `default`, `alt` (gelo) e `dark` (azul-noite com escopo `mdia-dark`). */
export const Tons: Story = {
  render: (args) => (
    <>
      <Section {...args} tone="default" aria-labelledby="secao-default">
        <Conteudo
          id="secao-default"
          titulo="Inteligência humana. Potencial ampliado."
          texto="Consultoria e mentoria em inteligência artificial para quem lidera negócios de saúde."
        />
      </Section>
      <Section {...args} tone="alt" aria-labelledby="secao-alt">
        <Conteudo
          id="secao-alt"
          titulo="Clareza para decidir. Confiança para evoluir."
          texto="Consultoria oferece visão estratégica; mentoria desenvolve autonomia."
        />
      </Section>
      <Section {...args} tone="dark" aria-labelledby="secao-dark">
        <Conteudo
          id="secao-dark"
          titulo="Tecnologia com critério. Saúde com protagonismo humano."
          texto="Vamos identificar onde a IA pode apoiar sua operação."
        />
      </Section>
    </>
  ),
};

/** Respiro vertical pela escala: sm 48px, md 64px, lg 96px (um degrau a menos abaixo de 768px). */
export const Respiros: Story = {
  render: (args) => (
    <>
      <Section {...args} spacing="sm" tone="alt">
        <Text>spacing sm · 48px</Text>
      </Section>
      <Section {...args} spacing="md">
        <Text>spacing md · 64px</Text>
      </Section>
      <Section {...args} spacing="lg" tone="alt">
        <Text>spacing lg · 96px</Text>
      </Section>
    </>
  ),
};

/** `containerSize="sm"` estreita a medida de leitura para textos longos. */
export const ContainerEstreito: Story = {
  args: { containerSize: 'sm' },
  render: (args) => (
    <Section {...args} aria-labelledby="secao-estreita">
      <Conteudo
        id="secao-estreita"
        titulo="Clareza para decidir. Confiança para evoluir."
        texto="Tom direto, didático e confiante: explicar siglas no primeiro uso, nomear limites e propor próximos passos concretos."
      />
    </Section>
  ),
};

/** `contained={false}` renderiza os filhos direto na faixa, para conteúdo de borda a borda. */
export const SemContainer: Story = {
  args: { contained: false, tone: 'alt' },
  render: (args) => (
    <Section {...args}>
      <div style={{ padding: '0 24px' }}>
        <Text>Conteúdo sem Container: ocupa toda a largura da faixa.</Text>
      </div>
    </Section>
  ),
};
