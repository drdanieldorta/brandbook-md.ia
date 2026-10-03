import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { ThemeScope } from './ThemeScope';

const meta = {
  title: 'Layout/ThemeScope',
  component: ThemeScope,
  args: { mode: 'dark', inset: true, fill: false },
  argTypes: {
    mode: { control: 'radio', options: ['dark', 'light'] },
    as: { control: 'select', options: ['div', 'section', 'main', 'article', 'aside'] },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ThemeScope>;

export default meta;
type Story = StoryObj<typeof meta>;

function Amostra() {
  return (
    <Stack gap={3} style={{ maxWidth: 420 }}>
      <div>
        <Badge tone="gold">Identidade v2</Badge>
      </div>
      <Heading level={3} size="heading">
        Inteligência humana. Potencial ampliado.
      </Heading>
      <Text tone="secondary">
        Fundo e cor do texto vêm do escopo; os componentes internos herdam o tema.
      </Text>
      <div>
        <Button>Agendar conversa</Button>
      </div>
    </Stack>
  );
}

/** Escuro (padrão da biblioteca): carvão com texto off-white e respiro de 24px (`inset`). */
export const Escuro: Story = {
  render: (args) => (
    <ThemeScope {...args}>
      <Amostra />
    </ThemeScope>
  ),
};

/** Claro: a paleta do guia 4.0 em uma área delimitada; tudo dentro passa ao tema claro. */
export const Claro: Story = {
  args: { mode: 'light' },
  render: (args) => (
    <ThemeScope {...args}>
      <Amostra />
    </ThemeScope>
  ),
};

/** Aninhado: um painel claro dentro de uma área escura; cada escopo redefine os tokens. */
export const Aninhado: Story = {
  render: (args) => (
    <ThemeScope {...args}>
      <Stack gap={4} style={{ maxWidth: 480 }}>
        <Text>Área escura: texto off-white sobre carvão.</Text>
        <ThemeScope mode="light" inset style={{ borderRadius: 16 }}>
          <Stack gap={3}>
            <Text>Área clara aninhada: azul-noite sobre branco.</Text>
            <div>
              <Button variant="secondary">Ação no tema claro</Button>
            </div>
          </Stack>
        </ThemeScope>
      </Stack>
    </ThemeScope>
  ),
};
