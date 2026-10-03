import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { Button, ButtonLink } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import { ThemeScope } from '../ThemeScope/ThemeScope';
import { Hero } from './Hero';

const meta = {
  title: 'Página/Hero',
  component: Hero,
  args: {
    title: 'Inteligência humana. Potencial ampliado.',
    lead: 'Identidade, tokens e componentes da MD.IA, prontos para usar em código.',
    tone: 'dark',
    align: 'start',
    spacing: 'lg',
  },
  argTypes: {
    tone: { control: 'radio', options: ['dark', 'default', 'alt'] },
    align: { control: 'radio', options: ['start', 'center'] },
    spacing: { control: 'radio', options: ['md', 'lg'] },
    eyebrow: { control: false },
    actions: { control: false },
    aside: { control: false },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Fundo escuro (carvão) com o mestre com brilho na lateral (só sobre fundo escuro, guia §3),
 * eyebrow dourado, título display e duas ações sem concorrer com uma principal.
 */
export const Padrao: Story = {
  args: {
    eyebrow: (
      <Badge tone="gold" variant="soft">
        Brandbook · Guia 4.0
      </Badge>
    ),
    actions: (
      <>
        <ButtonLink href="#componentes" variant="secondary">
          Explorar componentes
        </ButtonLink>
        <ButtonLink href="/storybook/" variant="ghost">
          Abrir Storybook
        </ButtonLink>
      </>
    ),
    aside: <Logo variant="mestre" width="100%" />,
  },
};

/** Tema claro do guia por escopo (`ThemeScope mode="light"`): tom padrão, variante limpa na lateral e uma ação principal (guia §7). */
export const Claro: Story = {
  render: (args) => (
    <ThemeScope mode="light">
      <Hero {...args} />
    </ThemeScope>
  ),
  args: {
    tone: 'default',
    title: 'Tecnologia com critério. Saúde com protagonismo humano.',
    lead: 'Consultoria e mentoria em inteligência artificial para quem lidera negócios de saúde.',
    eyebrow: (
      <Badge tone="brand" variant="soft">
        Consultoria e mentoria
      </Badge>
    ),
    actions: (
      <>
        <Button>Agendar conversa</Button>
        <Button variant="ghost">Conhecer a mentoria</Button>
      </>
    ),
    aside: <Logo variant="limpo" width="100%" />,
  },
};

/** Sem lateral e centralizado sobre a faixa alternativa (`alt`): conteúdo com no máximo 60ch. */
export const Centralizado: Story = {
  args: {
    tone: 'alt',
    align: 'center',
    title: 'Clareza para decidir. Confiança para evoluir.',
    lead: 'Consultoria oferece visão estratégica; mentoria desenvolve autonomia.',
    eyebrow: (
      <Badge tone="brand" variant="soft">
        Mentoria
      </Badge>
    ),
    actions: (
      <>
        <Button>Agendar conversa</Button>
        <Button variant="ghost">Conhecer a mentoria</Button>
      </>
    ),
  },
};

/** Sem lateral, alinhado ao início: uma coluna em todas as larguras. */
export const SemAside: Story = {
  args: {
    title: 'Clareza na estratégia. Consistência na expressão.',
    actions: (
      <>
        <ButtonLink href="#componentes" variant="secondary">
          Explorar componentes
        </ButtonLink>
        <ButtonLink href="/storybook/" variant="ghost">
          Abrir Storybook
        </ButtonLink>
      </>
    ),
  },
};
