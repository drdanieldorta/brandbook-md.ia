import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonLink } from '../Button/Button';
import { Heading } from '../Heading/Heading';
import { Section } from '../Section/Section';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { SiteHeader } from './SiteHeader';

const links = [
  { label: 'Essência', href: '#essencia' },
  { label: 'Logo', href: '#logo' },
  { label: 'Cores', href: '#cores', current: true },
  { label: 'Componentes', href: '#componentes' },
];

const meta = {
  title: 'Página/SiteHeader',
  component: SiteHeader,
  args: {
    links,
    homeHref: '#inicio',
    brandLabel: 'MD.IA — início',
    cta: (
      <ButtonLink href="#contato" size="sm">
        Agendar conversa
      </ButtonLink>
    ),
    sticky: true,
    tone: 'default',
    navLabel: 'Principal',
    menuLabel: 'Menu',
    defaultMenuOpen: false,
  },
  argTypes: {
    tone: { control: 'radio', options: ['default', 'dark'] },
    logo: { control: false },
    cta: { control: false },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Barra de 64px (72px a partir de 1024px) com o logo limpo de 160px, quatro links,
 * a página atual sublinhada e uma chamada para ação. Abaixo de 768px a navegação
 * vira o menu móvel; abaixo de 640px o logo dá lugar ao M do favicon (guia §3).
 */
export const Padrao: Story = {};

/** Tom escuro: escopo `mdia-dark`, logo off-white, marca monocromática e dourado na página atual. */
export const Escuro: Story = {
  args: { tone: 'dark' },
  globals: { backgrounds: { value: 'escuro' } },
};

/** Menu móvel aberto: painel sob a barra com os links em coluna e a chamada para ação ao fim. */
export const MenuAberto: Story = {
  args: { defaultMenuOpen: true },
  globals: { viewport: { value: 'mobile1', isRotated: false } },
};

/** Sem chamada para ação: só marca e navegação. */
export const SemCta: Story = {
  args: { cta: undefined },
};

/** Fixo no topo: role a página para ver a barra acompanhar o conteúdo. */
export const Fixo: Story = {
  render: (args) => (
    <>
      <SiteHeader {...args} />
      <Section tone="default" spacing="lg" aria-labelledby="fixo-essencia">
        <Stack gap={4} align="start">
          <Heading id="fixo-essencia" level={1} balance>
            Inteligência humana. Potencial ampliado.
          </Heading>
          <Text size="lg" measure>
            Consultoria e mentoria em inteligência artificial para quem lidera negócios de saúde.
          </Text>
        </Stack>
      </Section>
      <Section tone="alt" spacing="lg" aria-labelledby="fixo-criterio">
        <Stack gap={4} align="start">
          <Heading id="fixo-criterio" level={2} balance>
            Clareza para decidir. Confiança para evoluir.
          </Heading>
          <Text size="lg" measure>
            Consultoria oferece visão estratégica; mentoria desenvolve autonomia.
          </Text>
        </Stack>
      </Section>
      <Section tone="dark" spacing="lg" aria-labelledby="fixo-protagonismo">
        <Stack gap={4} align="start">
          <Heading id="fixo-protagonismo" level={2} balance>
            Tecnologia com critério. Saúde com protagonismo humano.
          </Heading>
          <Text size="lg" measure>
            Vamos identificar onde a IA pode apoiar sua operação.
          </Text>
        </Stack>
      </Section>
    </>
  ),
};
